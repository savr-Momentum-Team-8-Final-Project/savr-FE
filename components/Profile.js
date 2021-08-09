import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Header from './Header.js'

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
export default class Profile extends Component {
  render () {
    return (
      <>
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.avatar} />
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'
              }}
            />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>Mantis Toboggan, M.D.</Text>
                <Text style={styles.info}>$9,003.45</Text>
                <View>
                  {previousTrips.map((data) => {
                    return (
                      <View style={styles.current}>
                        <Text>{data.city}</Text>
                        <Image source={data.photo} style={styles.image} />
                        <Text>{data.startDate}</Text>
                        <Text>${data.budget}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 200
  },
  avatar: {
    width: 130,
    height: 120,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 5
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    height: '200'
  },
  body: {
    marginTop: 110
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding: 30
  },
  info: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  profile: {
    fontSize: 30
  },
  add: {
    fontSize: 30
  },
  current: {
    flex: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 0
  },
  trips: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 26
  },
  image: {
    flex: 1,
    width: 300,
    resizeMode: 'cover',
    marginTop: 5
  },
  scrollView: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 60,
    height: 200
  }
})
