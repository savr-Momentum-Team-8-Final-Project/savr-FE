import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

export default function Header ({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Text style={styles.profile}>👤</Text></TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.logo}>savr</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateATrip')}><Text style={styles.add}>➕</Text></TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    marginBottom: 10
  },
  logo: {
    fontSize: 30,
    fontWeight: '200'
  },
  profile: {
    fontSize: 30
  },
  add: {
    fontSize: 30
  }
})