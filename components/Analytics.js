import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
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
  import PagerView from 'react-native-pager-view';



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
      color: "#baffd2",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Food",
      total: 2800000,
      color: "#63ff9a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Transportation",
      total: 5276120,
      color: "#0ee358",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Tickets",
      total: 8538000,
      color: "#00C244",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
      name: "Grocery",
      total: 11920000,
      color: "#009635",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    },
    {
        name: "Other",
        total: 11000000,
        color: "#005c20",
        legendFontColor: "#7F7F7F",
        legendFontSize: 13
      }
  ]


export default function Analytics () {
    return (
        <>
        <Text style={styles.logo}>s a v r</Text> 
        <PagerView 
            style={styles.pagerView} 
            initialPage={0}
            showPageIndicator='true'
            transitionStyle="scroll">

                <View key="1" style={{backgroundColor: 'white'}}>
                    <Text>Current Trip</Text>
                    <View style={styles.mainView}>
                        <Text>Spent: $900</Text>
                        <PieChart
                        data={data}
                        width={355}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                        />
                        <View style={styles.expense}>
                            <Text>Lodging</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Food</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Transportation</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Tickets</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Grocery</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Other</Text>
                            <Text>$403.23</Text>
                        </View>
                    </View>
                </View>
                <View key="2" style={{backgroundColor: 'white'}}>
                    <Text>All Time</Text>
                    <View style={styles.mainView}>
                        <Text>Spent: $900</Text>
                        <PieChart
                        data={data}
                        width={355}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                        />
                        <View style={styles.expense}>
                            <Text>Lodging</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Food</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Transportation</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Tickets</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Grocery</Text>
                            <Text>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text>Other</Text>
                            <Text>$403.23</Text>
                        </View>
                    </View>
                </View>
        </PagerView>
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
        fontFamily: 'GilroyLight',
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
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
    },
    pagerView: {
        flex: 1,
      },
    expense: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    height: 40,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    }
  })