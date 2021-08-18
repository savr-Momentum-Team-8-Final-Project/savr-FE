import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses } from '../api.js'
import CreateAnExpense from './CreateAnExpense'
import moment from 'moment';
import axios from 'axios';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";



const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    // backgroundGradientFrom: "black",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
  };


const data = [
    {
      name: "Lodging",
      total: 10000000,
      color: "#058082",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Food",
      total: 2800000,
      color: "#E28A2C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Transportation",
      total: 5276120,
      color: "#132E41",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Tickets",
      total: 8538000,
      color: "#E9A932",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Grocery",
      total: 11920000,
      color: "#E45239",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
        name: "Other",
        total: 11000000,
        color: "#FFEBC1",
        legendFontColor: "#7F7F7F",
        legendFontSize: 13
      }
  ]


export default function Analytics () {
    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <View style={styles.mainView}>
            <Text>←recent                 Current trip               all time→</Text>
            <View style={styles.donut}></View>
            <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"total"}
            backgroundColor={"transparent"}
            // paddingLeft={"15"}
            // center={[10, 50]}
            // absolute
            />
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 32,
        fontWeight: '200',
        backgroundColor: '#ffffff',
        paddingLeft: 150,
        paddingRight: 150,
        fontFamily: 'GilroyLight'
      },
      graph: {
        width: 250,
        height: 250,
        marginTop: 30,
        marginBottom: 60
    },
    mainView: {
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: 'center'
    },
    donut: {
        zIndex: 999,
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: "white",
        position: 'absolute',
        marginTop: 107,
        right: 253
    }
  })