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

const currentTrip = {
  city: 'Seattle',
  photo: require('../assets/JL09SeattleSkylinePD.jpeg'),
  startDate: '08/7/21',
  endDate: '08/16/21',
  budget: 1000
}

const previousTrips = [
  {
    city: 'Seattle',
    photo: require('../assets/JL09SeattleSkylinePD.jpeg'),
    startDate: '11/02/19',
    endDate: '11/16/19',
    budget: 400
  },
  {
    city: 'New York City',
    photo: require('../assets/photo-1609945648638-cefddce6e6d8.jpeg'),
    startDate: '11/02/18',
    endDate: '11/21/18',
    budget: 8000
  }
]

const upcomingTrips = [
  {
    city: 'New Donk City',
    photo: require('../assets/super_mario_odyssey-14.jpeg'),
    startDate: '06/09/22',
    endDate: '06/16/22',
    budget: 4500
  },
  {
    city: 'Chicago',
    photo: require('../assets/loop-1800x900.jpeg'),
    startDate: '02/12/23',
    endDate: '02/16/23',
    budget: 17
  }
]

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
      <Text style={styles.current1}>Upcoming Trips</Text>
        {trips.map((trip, index) => {
            if (moment(trip.start_date).format('MM/DD/YYYY') > today) {
                return (
                    <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(trip)}>
                        <Text style={styles.text}>{trip.city}</Text>
                        {/* <Image source={data.photo} style={styles.image} /> */}
                        <View style={styles.coverText}>
                            <Text style={styles.text}>{trip.start_date}</Text>
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
            if (moment(trip.end_date).format('MM/DD/YYYY') < today) {
                return (
                    <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(trip)}>
                        <Text style={styles.text}>{trip.city}</Text>
                        {/* <Image source={data.photo} style={styles.image} /> */}
                        <View style={styles.coverText}>
                            <Text style={styles.text}>{trip.start_date}</Text>
                            <Text style={styles.text}>${trip.budget}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            
        })}
        </View>

        <Text style={styles.current1}>Current Trip</Text>
        <TouchableOpacity style={styles.current} onPress={() => tripDetails(currentTrip)}>
        <Text style={styles.text}>{currentTrip.city}</Text>
          <Image
            source={currentTrip.photo}
            resizeMode='contain'
            style={styles.image}
          />
          <View style={styles.coverText}>
            <Text style={styles.text}>{currentTrip.startDate}</Text>
            <Text style={styles.text}>${currentTrip.budget}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.current1}>Upcoming Trips</Text>

        <View>
          {upcomingTrips.map((data, index) => {
            return (
              <TouchableOpacity style={styles.current} key={index} onPress={() => tripDetails(data)}>
                <Text style={styles.text}>{data.city}</Text>
                <Image source={data.photo} style={styles.image} />
                <View style={styles.coverText}>
                    <Text style={styles.text}>{data.startDate}</Text>
                    <Text style={styles.text}>${data.budget}</Text>
                </View>
              </TouchableOpacity>
            )
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
