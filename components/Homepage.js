import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';


const currentTrip =
    {
        city: 'Seattle',
        photo: require('../assets/JL09SeattleSkylinePD.jpeg'),
        startDate: '8/7/21',
        budget: 1000
    }

const previousTrips = [
    {
        city: 'Seattle',
        photo: require('../assets/JL09SeattleSkylinePD.jpeg'),
        startDate: '11/02/19',
        budget: 400
    },
    {
        city: 'New York City',
        photo: require('../assets/photo-1609945648638-cefddce6e6d8.jpeg'),
        startDate: '11/02/18',
        budget: 8000
    }
]

const upcomingTrips = [
    {
        city: 'New Donk City',
        photo: require('../assets/super_mario_odyssey-14.jpeg'),
        startDate: '06/09/24',
        budget: 4500
    }
]



export default function Homepage() {

    return (
        <ScrollView style={styles.scrollView}>
            <Text>Current Trip</Text>
            <View style={styles.current}>
                <Text>{currentTrip.city}</Text>
                <Image source={currentTrip.photo} resizeMode="contain" style={styles.image}/>
                <Text>{currentTrip.startDate}</Text>
                <Text>{currentTrip.budget}</Text>
            </View>
            <Text>Upcoming Trips</Text>
            {upcomingTrips.map((data) => {
            return (
                <View style={styles.current}>
                    <Text>{data.city}</Text>
                    <Image source={data.photo} style={styles.image}/>
                    <Text>{data.startDate}</Text>
                    <Text>{data.budget}</Text>
                </View>
            )})}
            <Text>Previous Trips</Text>
            {previousTrips.map((data) => {
                return (
                    <View style={styles.current}>
                        <Text>{data.city}</Text>
                        <Image source={data.photo} style={styles.image}/>
                        <Text>{data.startDate}</Text>
                        <Text>{data.budget}</Text>
                    </View>
                )})}
        </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    current: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      backgroundColor: 'white',
      borderRadius: 10
    },
    container: {
        flex: 1,
      },
    scrollView: {
        backgroundColor: '#d1d1d1',
        padding: 20
    },
    image: {
        flex: 1,
        width: 200,
        height: 100,
        resizeMode: 'contain',
    }
  });
  