import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image, TextInput, Picker } from 'react-native';
import Header from './Header.js'
import Homepage from './Homepage.js';

export default function CreateATrip () {
    const [currency, setCurrency] = useState('US Dollar')
    const [st8te, setSt8te] = useState('')
    const [city, setCity] = useState('')

    return (
        <>
        <Header />

    <View >
      <Text > Demo Form </Text>
      <View>
        <TextInput 
          placeholder="Email" />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
        />
        <Text>Select a State</Text>
        <Picker
          selectedValue={st8te}
          onValueChange={currentSt8te => setSt8te(currentSt8te)}>
          <Picker.Item label="NC" value="NC" />
          <Picker.Item label="VA" value="VA" />
          <Picker.Item label="CA" value="CA" />
        </Picker>
        <Text>
          Selected state: {st8te}
        </Text>

        <Text>Select a State</Text>
        <Picker
          selectedValue={city}
          onValueChange={currentCity => setCity(currentCity)}>
          <Picker.Item label="Durham" value="Durham" />
          <Picker.Item label="Asheville" value="Asheville" />
          <Picker.Item label="Chapel Hill" value="Chapel Hill" />
        </Picker>
        <Text>
          Selected state: {city}
        </Text>
        <TextInput
          secureTextEntry={false}
          placeholder="Budget in USD"
        />
      </View>
    </View>
    </>
    )
}