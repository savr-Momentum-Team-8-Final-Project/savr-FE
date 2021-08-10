import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Picker,
  DatePickerIOS,
  Button,
  Alert,
  Separator
} from 'react-native';
import Header from './Header.js';
import HomeHeader from './HomeHeader.js';
import Homepage from './Homepage.js';

export default function CreateATrip ({ navigation }) {
  const [currency, setCurrency] = useState('US Dollar')
  const [st8te, setSt8te] = useState('')
  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <>
      <HomeHeader navigation={navigation} />
      <Text>Create a new trip</Text>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>Start Date</Text>
          <DatePickerIOS date={startDate} onDateChange={setStartDate} />
          <Text>End Date</Text>
          <DatePickerIOS date={endDate} onDateChange={setEndDate} />
          <Text>Select a State</Text>
          <Picker
            selectedValue={st8te}
            onValueChange={(currentSt8te) => setSt8te(currentSt8te)}
          >
            <Picker.Item label='NC' value='NC' />
            <Picker.Item label='VA' value='VA' />
            <Picker.Item label='CA' value='CA' />
          </Picker>
          <Text>Selected state: {st8te}</Text>

          <Text>Select a State</Text>
          <Picker
            selectedValue={city}
            onValueChange={(currentCity) => setCity(currentCity)}
          >
            <Picker.Item label='Durham' value='Durham' />
            <Picker.Item label='Asheville' value='Asheville' />
            <Picker.Item label='Chapel Hill' value='Chapel Hill' />
          </Picker>
          <Text>Selected state: {city}</Text>
          <TextInput secureTextEntry={false} placeholder='Budget in USD' />
        </View>
        <View style={styles.submit}>
          <Button
            title='Create Trip'
            onPress={() => Alert.alert('Hey! Your button works!')}
            color='#000000'
            type='outline'
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e3e3e3',
    padding: 20
  },
  submit: {
    color: 'black',
    padding: 60
  }
})
