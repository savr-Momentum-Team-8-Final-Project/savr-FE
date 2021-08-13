import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './Header.js';
import { useFonts } from 'expo-font';
import Trip from './Trip.js'
import {requestTrips} from '../api.js'
import moment from 'moment';


export default function Homepage ({ navigation }) {

    const today = moment().format('MM/DD/YYYY')

    const [loaded] = useFonts({
        GilroyLight: require('../assets/fonts/Gilroy-Light.otf'),
        GilroyBold: require('../assets/fonts/Gilroy-ExtraBold.otf')
      })

    const [selectedTrip, setSelectedTrip] = useState(null)
    const [trips, setTrips] = useState([])

    useEffect(() => {
        requestTrips()
        .then(data => {
            setTrips(data.data)
        })
    }, [])

      function tripDetails (trip) {
        setSelectedTrip(trip)
        console.log(trip)
      } 

      if (!loaded) {
        return null
      }

    

  return selectedTrip
        ? (
            <Trip setSelectedTrip={setSelectedTrip} selectedTrip={selectedTrip}/>
        )
        : (
      <>
      <Text style={styles.logo}>s a v r</Text>
      <ScrollView style={styles.scrollView}>
        
      <View style={styles.previous}>
      <Text style={styles.current1}>Current Trip</Text>
        {trips.map((trip, index) => {
            if (moment(trip.start_date).isBefore(today) && moment(trip.end_date).isAfter(today)) {
                return (
                    <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(trip)}>
                        <Text style={styles.text}>{trip.city}</Text>
                        {/* <Image source={data.photo} style={styles.image} /> */}
                        <View style={styles.coverText}>
                            <Text style={styles.text}>{moment(trip.start_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>{moment(trip.end_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>${trip.budget}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            
        })}
        </View>

      <View style={styles.previous}>
      <Text style={styles.current1}>Upcoming Trips</Text>
        {trips.map((trip, index) => {
            if (moment(trip.start_date).isAfter(today)) {
                return (
                    <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(trip)}>
                        <Text style={styles.text}>{trip.city}</Text>
                        {/* <Image source={data.photo} style={styles.image} /> */}
                        <View style={styles.coverText}>
                            <Text style={styles.text}>{moment(trip.start_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>{moment(trip.end_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>${trip.budget}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            
        })}
        </View>
    
      <View style={styles.previous}>
      <Text style={styles.current1}>Previous Trips</Text>
        {trips.map((trip, index) => {
            if (moment(trip.end_date).isBefore(today)) {
                return (
                    <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(trip)}>
                        <Text style={styles.text}>{trip.city}</Text>
                        {/* <Image source={data.photo} style={styles.image} /> */}
                        <View style={styles.coverText}>
                            <Text style={styles.text}>{moment(trip.start_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>{moment(trip.end_date).format('MM/DD/YYYY')}</Text>
                            <Text style={styles.text}>${trip.budget}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            
        })}
        </View>
      </ScrollView>
      
    </>
  )
}

const styles = StyleSheet.create({
  current: {
    fontFamily: 'GilroyLight',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 30
  },
  current1: {
    marginTop: 70,
    fontFamily: 'GilroyBold',
    fontSize: 30,
    marginBottom: 30
  },
  scrollView: {
    backgroundColor: '#fffcf5',
    padding: 20
  },
  image: {
    display: 'flex',
    width: 340,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 11,
    paddingTop: 10
  },
  previous: {
    marginBottom: 60
  },
  logo: {
    fontSize: 32,
    fontWeight: '200',
    backgroundColor: '#fffcf5',
    paddingLeft: 150,
    paddingRight: 150,
    fontFamily: 'GilroyLight'
  },
  text: {
    fontFamily: 'GilroyLight',
    fontSize: 20,
    padding: 10
  },
  coverText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
})
