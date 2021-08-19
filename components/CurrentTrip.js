import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses, getCurrentTripData } from '../api.js'
import CreateAnExpense from './CreateAnExpense'
import moment from 'moment';
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
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 196, 69, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  



export default function CurrentTrip () {
    // const { setSelectedTrip, selectedTrip } = props
    const [trips, setTrips] = useState([])
    const [expenses, setExpenses] = useState([])
    const [currentTrip, setCurrentTrip] = useState({})
    const [days, setDays] = useState()
    const [tripDates, setTripDates] = useState()
    const [addingExpense, setAddingExpense] = useState(false)
    const [progress, setProgress] = useState(0)
    const [budget, setBudget] = useState(0)

    let dates = []

    const today = moment().format('YYYY-MM-DD')


    const data = {
        data: [, , , progress]
      };

    useEffect(() => {
        getCurrentTripData()
        .then(data => {
            const a = data.data.total_expenses.price__sum / parseInt(data.data.budget)
            setProgress(a)
            setBudget(data.data.budget_left)
        })
    }, [expenses])


    useEffect(() => {
        requestTrips()
        .then(data => {
            setTrips(data.data)
        })
    }, [])

    useEffect(() => {
        let a = moment(currentTrip.end_date)
        let b = moment(currentTrip.start_date)
        setDays(a.diff(b, 'days')+1)
    }, [currentTrip])

    useEffect(() => {
    if (days) {
        for (let step = 0; step < days; step++) {
            if (dates.length === 0) {
                dates.push(currentTrip.start_date)
            } else {
                const last = dates[dates.length -1]
                const hey = moment(last).add(1, 'days').format('YYYY-MM-DD')
                dates.push(hey);
            };
        } 
        setTripDates(dates)
    }
    }, [days]);

    useEffect(() => {
        requestExpenses()
        .then(data => 
            setExpenses(data.data))
    }, [addingExpense])
    

    useEffect(() => {
        trips.map((trip, index) => {
            if (moment(trip.start_date).isBefore(today) && moment(trip.end_date).isAfter(today)) {
                setCurrentTrip(trip)
        
            }
        })
    }, [trips])


    if (addingExpense) {
        return (
            <CreateAnExpense setAddingExpense={setAddingExpense} currentTrip={currentTrip}/>
        )
    }

    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} stickyHeaderIndices={[3]}>


        
            <View style={styles.heading}>
                <Text style={styles.city}>{currentTrip.city}</Text>
                <View style={{flexDirection: 'row', paddingTop: 8}}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{moment(currentTrip.start_date).format('Do')}-</Text>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{moment(currentTrip.end_date).format('Do MMM')}</Text>
                </View>
            </View>

            <Text style={styles.budget}>${budget}</Text>

             
                <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={20}
                radius={40}
                chartConfig={chartConfig}
                hideLegend={true}
                />
                

        <TouchableOpacity style={styles.button} onPress={() => setAddingExpense(true)}>
            <Text style={styles.text1}>+</Text>
        </TouchableOpacity>
            

            {tripDates && 
                tripDates.map((date, index) => {
                    return (
                        <View style={{width: '100%'}} key={index}>
                        {expenses.map((expense, index) => {
                        if (expense.trip === currentTrip.id && expense.date === date) {
                            return (
                                <View key={index} style={styles.expense}>
                                <Text>{date}</Text>
                                <View key={index}>
                                <Text>{expense.expense_title}</Text>
                                <Text>${expense.price}</Text>
                                <Text>Category: {expense.category}</Text>
                                </View>
                                </View>
                            )
                        }
                        })}
                        </View>
                    )
            })}

            

        </ScrollView>
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
      scrollView: {
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: 'center'
      },
      buttonText: {
        fontFamily: 'GilroyLight',
        fontSize: 20
      },
      graph: {
          width: 250,
          height: 250,
          marginTop: 30,
          marginBottom: 60
      },
      expense: {
          marginBottom: 40,
          marginTop: 20,
          width: '100%',
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
          padding: 10,
      },
      button: {
        width: 50,  
        height: 50,   
        borderRadius: 30,            
        backgroundColor: '#00C244',                                                                         
        bottom: 0,                                                   
        left: 140, 
        alignItems: 'center'
      },
      text1: {
          color: 'white',
          fontSize: 38,
      },
      budget: {
        position: 'absolute', 
        marginTop: 180, 
        fontSize: 30, 
        color: 'black',
        fontWeight: '500'
    },
      heading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
      },
      city: {
        fontFamily: "GilroyBold",
        fontSize: 30
      }
  })