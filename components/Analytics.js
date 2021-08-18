import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses, getCurrentTripData, getAllTimeData } from '../api.js'
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

    const [currentSpent, setCurrentSpent] = useState(0)
    const [allTimeSpent, setAllTimeSpent] = useState(0)

    useEffect(() => {
        getCurrentTripData()
        .then(data => {
            const a = data.data.total_expenses.price__sum
            setCurrentSpent(a)
        })
        getAllTimeData()
        .then(data => {
            data.data.map((summary) => {
                if (summary.id == 1) {
                    setAllTimeSpent(summary.alltrip_expenses.price__sum)
                }
            })
        })
    }, [])


    return (
        <>
        <Text style={styles.logo}>s a v r</Text> 
        <PagerView 
            style={styles.pagerView} 
            initialPage={0}
            showPageIndicator='true'
            transitionStyle="scroll">

                <View key="1" style={{backgroundColor: 'white'}}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>Current Trip</Text>
                        <Text style={styles.spent}>Spent: ${currentSpent}</Text>
                    </View>
                    <View style={styles.mainView}>
                                <PieChart
                            style={styles.pieChart}
                            data={data}
                            width={355}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"total"}
                            backgroundColor={"transparent"}
                            />
                        
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Lodging</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Food</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Transportation</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Tickets</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Grocery</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Other</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                    </View>
                </View>
                <View key="2" style={{backgroundColor: 'white'}}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>All Time</Text>
                        <Text style={styles.spent}>Spent: ${allTimeSpent}</Text>
                    </View>
                    <View style={styles.mainView}>
                 
                            <PieChart
                            data={data}
                            width={355}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"total"}
                            backgroundColor={"transparent"}
                            />
                  
                        
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Lodging</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Food</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Transportation</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Tickets</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Grocery</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
                        </View>
                        <View style={styles.expense}>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>Other</Text>
                            <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>$403.23</Text>
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
        // height: '100%'
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
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
    // height: 40,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#00C244',
    borderRadius: 10,
    padding: 10,
    },
    pieChart: {
        marginBottom: 20
    },
    heading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    title: {
        fontFamily: "GilroyBold",
        fontSize: 30,
    },
    spent: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        padding: 7,
        fontFamily: "GilroyBold",
        fontSize: 20,
    }
  })