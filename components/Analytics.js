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
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  requestTrips,
  requestExpenses,
  getCurrentTripData,
  getAllTimeData,
  requestUserInfo
} from '../api.js';
import CreateAnExpense from './CreateAnExpense';
import moment from 'moment';
import axios from 'axios';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import PagerView from "react-native-pager-view";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, 
  barPercentage: 0.5
}

export default function Analytics (props) {


    const { authToken } = props

    const [user, setUser] = useState()
  const [trips, setTrips] = useState()
  const [currentTrip, setCurrentTrip] = useState()
  const [currentSpent, setCurrentSpent] = useState(0);
  const [currentLodging, setCurrentLodging] = useState(0);
  const [currentFood, setCurrentFood] = useState(0);
  const [currentTransportation, setCurrentTransportation] = useState(0);
  const [currentTicket, setCurrentTicket] = useState(0);
  const [currentGrocery, setCurrentGrocery] = useState(0);
  const [currentOther, setCurrentOther] = useState(0);

  const [allTimeSpent, setAllTimeSpent] = useState(0);
  const [allTimeLodging, setAllTimeLodging] = useState(0);
  const [allTimeFood, setAllTimeFood] = useState(0);
  const [allTimeTransportation, setAllTimeTransportation] = useState(0);
  const [allTimeTicket, setAllTimeTicket] = useState(0);
  const [allTimeGrocery, setAllTimeGrocery] = useState(0);
  const [allTimeOther, setAllTimeOther] = useState(0);

  const today = moment().format("YYYY-MM-DD");

  const currentData = [
    {
      name: "Lodging",
      total: currentLodging,
      color: "#cfffe0",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Food",
      total: currentFood,
      color: "#63ff9a",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Transportation",
      total: currentTransportation,
      color: "#00c244",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Tickets",
      total: currentTicket,
      color: "#00802d",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Grocery",
      total: currentGrocery,
      color: "#00521d",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Other",
      total: currentOther,
      color: "#00290e",
      legendFontColor: "black",
      legendFontSize: 13,
    },
  ];

  const allTimeData = [
    {
      name: "Lodging",
      total: allTimeLodging,
      color: "#cfffe0",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Food",
      total: allTimeFood,
      color: "#63ff9a",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Transportation",
      total: allTimeTransportation,
      color: "#00c244",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Tickets",
      total: allTimeTicket,
      color: "#00802d",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Grocery",
      total: allTimeGrocery,
      color: "#00521d",
      legendFontColor: "black",
      legendFontSize: 13,
    },
    {
      name: "Other",
      total: allTimeOther,
      color: "#00290e",
      legendFontColor: "black",
      legendFontSize: 13,
    },
  ];

  useEffect(() => {
    requestTrips().then((data) => {
      setTrips(data.data);
    });
  }, []);

  useEffect(() => {
    if (trips && user) {
      trips.map((trip, index) => {
        if (
          moment(trip.start_date).isBefore(today) &&
          moment(trip.end_date).isAfter(today) && 
          trip.guide === user.name
        ) {
          setCurrentTrip(trip);
        }
      });
    }
  }, [trips, user])

  useEffect(() => {
    if (currentTrip) {
      getCurrentTripData(currentTrip.id).then((data) => {
        setCurrentSpent(data.data.total_expenses.price__sum);
        setCurrentLodging(data.data.lodging_expenses.price__sum);
        setCurrentFood(data.data.food_expenses.price__sum);
        setCurrentTransportation(data.data.trans_expenses.price__sum);
        setCurrentTicket(data.data.ticket_expenses.price__sum);
        setCurrentGrocery(data.data.grocery_expenses.price__sum);
        setCurrentOther(data.data.other_expenses.price__sum);
      });
    }
    getAllTimeData().then((data) => {
      // console.log(data.data)
      data.data.map((summary) => {
        if (summary.id == user.id) {
          setAllTimeSpent(summary.alltrip_expenses.price__sum);
          setAllTimeLodging(summary.alltrip_lodging.price__sum);
          setAllTimeFood(summary.alltrip_food.price__sum);
          setAllTimeTransportation(summary.alltrip_trans.price__sum);
          setAllTimeTicket(summary.alltrip_ticket.price__sum);
          setAllTimeGrocery(summary.alltrip_grocery.price__sum);
          setAllTimeOther(summary.alltrip_other.price__sum);
        }
      });
    });
  }, [currentTrip]);

  useEffect(() => {
    if (authToken) {
       requestUserInfo(authToken)
       .then(data => {
           setUser(data.data)
       })
    }
}, [])


    if (user) {
        return (
            <>
              <Text style={styles.logo}>s a v r</Text>
              <PagerView
                style={styles.pagerView}
                initialPage={0}
                showPageIndicator="true"
                transitionStyle="scroll"
              >
                <View key="1" style={{ backgroundColor: "white" }}>
                  <View style={styles.heading}>
                    <Text style={styles.title}>Current Trip</Text>
                    <Text style={styles.spent}>Spent: ${currentSpent}</Text>
                  </View>
                  <View style={styles.mainView}>
                    <View style={styles.donut} />
                    <PieChart
                      // style={styles.pieChart}
                      data={currentData}
                      width={355}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="total"
                      backgroundColor="transparent"
                    />
                    {/* {currentData.food_expenses.price__sum} */}
        
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Lodging
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentLodging || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Food
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentFood || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Transportation
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentTransportation || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Tickets
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentTicket || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Grocery
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentGrocery || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Other
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${currentOther || 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <View key="2" style={{ backgroundColor: "white" }}>
                  <View style={styles.heading}>
                    <Text style={styles.title}>All Time</Text>
                    <Text style={styles.spent}>Total: ${allTimeSpent}</Text>
                  </View>
                  <View style={styles.mainView}>
                    <View style={styles.donut} />
                    <PieChart
                      data={allTimeData}
                      width={355}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="total"
                      backgroundColor="transparent"
                    />
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Lodging
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeLodging || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Food
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeFood || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Transportation
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeTransportation || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Tickets
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeTicket || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Grocery
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeGrocery || 0}
                      </Text>
                    </View>
                    <View style={styles.expense}>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        Other
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 20, color: "white" }}>
                        ${allTimeOther || 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </PagerView>
            </>
          );
    } else {
        return null
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
  graph: {
    width: 250,
    height: 250,
    marginTop: 30,
    marginBottom: 60,
  },
  mainView: {
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    // height: '100%'
  },
  donut: {
    zIndex: 999,
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    top: 70,
    right: 243,
  },
  pagerView: {
    flex: 1,
  },
  expense: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    width: "100%",
    // height: 40,
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#00C244",
    borderRadius: 10,
    padding: 10,
  },
  pieChart: {
    marginBottom: 20,
  },
  heading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: "GilroyBold",
    fontSize: 30,
  },
  spent: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    padding: 7,
    // fontFamily: "GilroyBold",
    fontWeight: "600",
    fontSize: 20,
  },
});
