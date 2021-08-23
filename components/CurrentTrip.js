import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses, getCurrentTripData, requestUserInfo } from '../api.js';
import CreateAnExpense from './CreateAnExpense';
import moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { exp } from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 196, 69, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function CurrentTrip(props) {
  const { setRegistering } = props;
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});
  const [days, setDays] = useState();
  const [tripDates, setTripDates] = useState();
  const [addingExpense, setAddingExpense] = useState(false);
  const [progress, setProgress] = useState(0);
  const [budget, setBudget] = useState(0);
  const [user, setUser] = useState()
  const { authToken, setAuthToken } = props;


  const dates = [];

  const today = moment().format("YYYY-MM-DD");

  const data = {
    data: [, , , progress],
  };

  useEffect(() => {
    const a = moment(currentTrip.end_date);
    const b = moment(currentTrip.start_date);
    setDays(a.diff(b, "days") + 1);
  }, [currentTrip]);

  useEffect(() => {
    if (days) {
      for (let step = 0; step < days; step++) {
        if (dates.length === 0) {
          dates.push(currentTrip.start_date);
        } else {
          const last = dates[dates.length - 1];
          const hey = moment(last).add(1, "days").format("YYYY-MM-DD");
          dates.push(hey);
        }
      }
      dates.reverse();
      setTripDates(dates);
    }
  }, [days]);

  useEffect(() => {
    requestExpenses().then((data) => {
        setExpenses(data.data)
    })
  }, [addingExpense])

  useEffect(() => {
    requestTrips().then((data) => {
      data.data.map((trip, index) => {

        if (moment(trip.start_date).isBefore(today) && moment(trip.end_date).isAfter(today) && trip.guide === user.name) {
          setCurrentTrip(trip)
        }
      })
    })
  }, [user])

  useEffect(() => {
    if (currentTrip !== {}) {
      getCurrentTripData(currentTrip.id).then((data) => {
        const a =
          data.data.total_expenses.price__sum / parseInt(data.data.budget);
        setProgress(a);
        setBudget(data.data.budget_left);
      });
    }
  }, [currentTrip, expenses]);


 useEffect(() => {
     if (authToken) {
        requestUserInfo(authToken)
        .then(data => {
            setUser(data.data)
        })
     }
 }, [])






  if (addingExpense) {
    return (
      <CreateAnExpense
        setAddingExpense={setAddingExpense}
        currentTrip={currentTrip}
      />
    );
  }
  if (currentTrip !== {}) {
    return (
      <>
          <Text style={styles.logo}>s a v r</Text>
          <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} >


     <View style={styles.heading}>
                <Text style={styles.city}>{currentTrip.city}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>
                    {moment(currentTrip.start_date).format('Do')}-
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>
                    {moment(currentTrip.end_date).format('Do MMM YYYY')}
                </Text>
                </View>
            </View>
      

          <View style={styles.budget}>
            <Text style={{ fontSize: 35, color: "black", fontWeight: "500" }}>
              ${budget}
            </Text>
            <Text style={{ color: "black", fontWeight: "300" }}>
              remaining budget
            </Text>
          </View>

          <ProgressChart
            data={data}
            width={screenWidth}
            height={220}
            strokeWidth={20}
            radius={40}
            chartConfig={chartConfig}
            hideLegend
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => setAddingExpense(true)}
          >
            <Text style={styles.text1}>+</Text>
          </TouchableOpacity>

          {tripDates &&
                tripDates.map((date, index) => {
                  return (
                      <View style={{ width: '100%' }} key={index}>
                          {expenses.map((expense, index) => {
                          if (expense.trip === currentTrip.id && expense.date === date) {
                            return (
                              <View key={index} style={styles.expense}>
                                  <Text style={{ fontWeight: '600', fontSize: 20, color: 'white' }}>{moment(date).format("MMM Do")}</Text>
                                <View key={index} style={styles.category}>
                                    <Text style={styles.list}>{expense.expense_title}</Text>
                                    <Text style={{ fontWeight: '600', fontSize: 17, color: 'white', textAlign: 'right' }}>${expense.price}</Text>
                                    <Text style={{ fontWeight: '600', fontSize: 15, color: 'white', textAlign: 'right' }}>
                                        {expense.category === 'trans' ? "Transportation" 
                                        : expense.category === 'other' ? "Other" 
                                        : expense.category === 'food' ? "Food" 
                                        : expense.category === 'ticket' ? "Tickets" 
                                        : expense.category === 'grocery' ? "Grocery" 
                                        : expense.category === 'lodging' ? "Lodging" 
                                        : null}</Text>
                                </View>
                            </View>
                            )
                          }
                        })}
                        </View>
                      );
                    
                  })}
            
          <Button
            style={styles.button1}
            title="Logout"
            color="red"
            fontFamily="GilroyLight"
            onPress={() => {
              AsyncStorage.removeItem("token", "").then(() => setAuthToken(""));
            }}
          />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 32,
    fontWeight: "200",
    backgroundColor: "#ffffff",
    paddingLeft: 150,
    paddingRight: 150,
    fontFamily: "GilroyLight",
  },
  scrollView: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "GilroyLight",
    fontSize: 20,
  },
  graph: {
    width: 250,
    height: 250,
    marginTop: 30,
    marginBottom: 60,
  },
  expense: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
    width: "100%",
    // height: 40,
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#00C244",
    borderRadius: 10,
    padding: 10,
    fontWeight: "600",
    fontSize: 20,
    color: "white",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#00C244",
    bottom: 0,
    left: 140,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: 'white',
    fontSize: 38,
    marginTop: -3
  },
  budget: {
    position: "absolute",
    marginTop: 170,
    fontSize: 30,
    color: "black",
    fontWeight: "500",
    // width: 'fit-content',
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  city: {
    fontFamily: "GilroyBold",
    fontSize: 30,
  },
  list: {
    fontWeight: "600",
    fontSize: 20,
    color: "white",
    textAlign: "right",
  },
  category: {
    justifyContent: "flex-end",
    width: "50%",
    textAlign: "right",
  },
  button1: {
    fontFamily: "GilroyBold",
    color: "red",
  },
});

