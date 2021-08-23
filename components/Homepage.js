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
import { requestTrips } from "../api.js";
import moment from "moment";
import CreateATrip from "./CreateATrip.js";
import axios from "axios";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import LoginForm from "./Login.js";
import { render } from "react-dom";

export default function Homepage({ navigation }) {
  const today = moment().format("YYYY-MM-DD");
  const [loaded] = useFonts({
    GilroyLight: require("../assets/fonts/Gilroy-Light.otf"),
    GilroyBold: require("../assets/fonts/Gilroy-ExtraBold.otf"),
  });

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [creating, setCreating] = useState(false);
  const [token, setToken] = useState("token", "");

  function setAuthToken(token) {
    setToken(token);
  }

  useEffect(() => {
    requestTrips().then((data) => {
      setTrips(data.data);
    });
  }, [creating]);

  function tripDetails(trip) {
    setSelectedTrip(trip);
    console.log(trip);
  }

  if (!loaded) {
    return null;
  }

  if (creating) {
    return <CreateATrip setCreating={setCreating} />;
  }
  if (token) {
    return selectedTrip ? (
      <Trip setSelectedTrip={setSelectedTrip} selectedTrip={selectedTrip} />
    ) : (
      <>
        <Text style={styles.logo}>s a v r</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

      <TouchableOpacity style={styles.button} onPress={() => setCreating(true)}>
            <Text style={styles.text1}>+</Text>
        </TouchableOpacity>

      <View style={styles.previous}>
      <Text style={styles.current1}>Upcoming Trips</Text>
        {trips.map((trip, index) => {
            if (moment(trip.start_date).isAfter(today)) {
                return (
                  <TouchableOpacity
                    style={styles.current}
                    key={index}
                    onPress={() => tripDetails(trip)}
                  >
                    <Text style={styles.text}>{trip.city}</Text>
                    <Image
                      ssource={{ uri: trip.c_photo }}
                      style={styles.image}
                    />
                    <View style={styles.coverText}>
                      <Text style={styles.text}>
                        {moment(trip.start_date).format('Do')}-
                        {moment(trip.end_date).format('Do MMMM')}
                      </Text>
                      <Text style={styles.text}>${trip.budget}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </View>
          <View style={{ paddingBottom: 60 }} />
        </ScrollView>
      </>
    )
  } else {
    return <LoginForm setAuthToken={setAuthToken} />

  }
}

const styles = StyleSheet.create({
  current: {
    fontFamily: "GilroyLight",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: 'rgba(230, 230, 230, 0.5)',
    borderRadius: 10,
    marginBottom: 30,
  },
  current1: {
    // marginTop: 30,
    fontFamily: 'GilroyBold',
    fontSize: 30,
    marginBottom: 30,
  },
  scrollView: {
    backgroundColor: '#ffffff',
    padding: 20
    // marginBottom: 60
  },
  image: {
    display: "flex",
    width: 340,
    height: 100,
    resizeMode: "cover",
    borderRadius: 11,
    paddingTop: 10,
  },
  previous: {
    // marginBottom: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: '200',
    backgroundColor: '#ffffff',
    paddingLeft: 150,
    paddingRight: 150,
    fontFamily: 'GilroyLight',
  },
  text: {
    fontFamily: "GilroyLight",
    fontSize: 20,
    padding: 10,
  },
  coverText: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#00C244",
    top: 0,
    left: 290,
    alignItems: 'center',
    margin: 0
  },
  text1: {
    color: "white",
    fontSize: 38,
  },
});