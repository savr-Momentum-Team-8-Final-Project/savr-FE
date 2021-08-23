import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Trip from "./Trip.js";
import { requestTrips, requestUserInfo } from "../api.js";
import moment from "moment";
import CreateATrip from "./CreateATrip.js";
import axios from "axios";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import LoginForm from "./Login.js";
import { render } from "react-dom";

export default function Homepage(props) {
    const { authToken } = props

  const today = moment().format("YYYY-MM-DD");
  const [loaded] = useFonts({
    GilroyLight: require("../assets/fonts/Gilroy-Light.otf"),
    GilroyBold: require("../assets/fonts/Gilroy-ExtraBold.otf"),
  });

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [creating, setCreating] = useState(false);
  const [token, setToken] = useState("token", "");
  const [user, setUser] = useState()
  const [ready, setReady] = useState(false)
//   const [userTrips, setUserTrips] = useState([])

  useEffect(() => {
    if (authToken) {
       requestUserInfo(authToken)
       .then(data => {
           setUser(data.data)
       })
    }
}, [])

// const userTrips = []


// useEffect(() => {
//     // if (trips !== []) {
//         trips.map((trip) => {
//             if (trip.guide === user.name) {
//                 userTrips.push(trip)
//                 console.log(trip)
//             }
//         })
//         // setTrips(userTrips)
//         setReady(true)
//     // }
// }, [trips])





useEffect(() => {
    requestTrips().then((data) => {
      setTrips(data.data)
    })
  }, [creating])



  if (!loaded) {
    return null;
  }

  if (creating) {
    return <CreateATrip setCreating={setCreating} />;
  }
  if (token) {
    return  (
      <>
        <Text style={styles.logo}>s a v r</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCreating(true)}
          >
            <Text style={styles.text1}>+</Text>
          </TouchableOpacity>

          <View style={styles.previous}>
            <Text style={styles.current1}>Upcoming Trips</Text>
            {trips.map((trip, index) => {
              if (moment(trip.start_date).isAfter(today) && trip.guide === user.name) {
                return (
                  <View style={styles.current} key={index}>
                    <Text style={styles.city}>{trip.city}</Text>
                    <View style={styles.coverText}>
                      <Text style={styles.date}>{moment(trip.start_date).format('MM-DD-YYYY')} {moment(trip.end_date).format('MM-DD-YYYY')}</Text>
                      <Text style={styles.budget}>  Budget: ${trip.budget}</Text>
                    </View>

                  </View>
                )
              }
            })}
          </View>

            <View style={styles.previous}>
            <Text style={styles.current1}>Previous Trips</Text>
            {trips.map((trip, index) => {
            if (moment(trip.start_date).isAfter(today) && trip.guide === user.name) {
                return (
                <View style={styles.current} key={index}>
                    <Text style={styles.city}>{trip.city}</Text>
                    <View style={styles.coverText}>
                    <Text style={styles.date}>{moment(trip.start_date).format('MM-DD-YYYY')} {moment(trip.end_date).format('MM-DD-YYYY')}</Text>
                    <Text style={styles.budget}>  Budget: ${trip.budget}</Text>
                    </View>
                </View>
                )
            }
            })}
            </View>
          <View style={{ paddingBottom: 60 }} />
        </ScrollView>
      </>
    );
  } else {
      return null
  }
}

const styles = StyleSheet.create({
    current: {
      fontFamily: 'GilroyLight',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      backgroundColor: '#00C244',
      borderRadius: 10,
      marginBottom: 30
    },
    current1: {
      // marginTop: 30,
      fontFamily: 'GilroyBold',
      fontSize: 30,
      marginBottom: 30
    },
    scrollView: {
      backgroundColor: '#ffffff',
      padding: 20
      // marginBottom: 60
    },
    logo: {
      fontSize: 32,
      fontWeight: '200',
      backgroundColor: '#ffffff',
      paddingLeft: 150,
      paddingRight: 150,
      fontFamily: 'GilroyLight'
    },
    city: {
      fontFamily: 'GilroyBold',
      fontSize: 26,
      padding: 10,
      color: 'white'
    },
    coverText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      fontWeight: '600'
    },
    button: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: '#00C244',
      top: 0,
      left: 290,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    },
    AddTrip: {
      color: 'white',
      fontSize: 38
    },
    date: {
      fontFamily: 'Helvetica',
      fontSize: 22,
      padding: 10,
      color: 'white',
      fontWeight: '400',
      width: 170
    },
    budget: {
      fontFamily: 'Helvetica',
      fontSize: 22,
      color: 'white',
      fontWeight: '400',
      width: 100,
      textAlign: 'center'
    },
    estbudget: {
      fontFamily: 'Helvetica',
      fontSize: 22,
      padding: 10,
      color: 'white',
      fontWeight: '400',
      paddingBottom: 20
    },
    text1: {
        color: 'white',
        fontSize: 38
    }
  })