import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image, TextInput, Picker, DatePickerIOS, Button, Alert, Separator } from 'react-native';
import { requestStates, requestCities } from '../api.js'
import Homepage from './Homepage.js';
import DateTimePicker from '@react-native-community/datetimepicker';

const stopWords = ['UM-84', 'UM-81', 'UM-89', 'UM-79', 'UM-86', 'UM-67', 'UM-71', 'UM-76', 'UM-95']

export default function CreateATrip ({ navigation }) {
    const [chosenState, setChosenState] = useState('NC')
    const [city, setCity] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



useEffect(() => {
        requestStates()
        .then(data => {
        let names = []
        data.data.map((st) => {
            if (!stopWords.includes(st.iso2)) {
                names.push(st.iso2)
            }
        })
        setStates(names)
        })
    }, [])

useEffect(() => {
    requestCities(chosenState)
    .then(data => {
        let names = []
        data.data.map((city) => {
            if (city.name.includes("County") === false && city.name.includes("City of ") === false) {
                names.push(city.name)
            }
        })
        setCities(names)
    })
}, [chosenState])




    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <Text style={styles.start}>Create a new trip</Text>
    <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
            <View style={styles.datePicker}>
            <Text>Start Date</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            display="default"
            onChange={onChange}
            />
            <Text>End Date</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            display="default"
            onChange={onChange}
            />
        </View>
        <Text>Select a State</Text>
        <Picker
        selectedValue={chosenState}
        onValueChange={picked => setChosenState(picked)}>
            {states.map((st, index) => {
                return (
                    <Picker.Item label={st} value={st} key={index} />
                )
            })}
        </Picker>

        <Text>Select a State</Text>
        <Picker
        selectedValue={city}
        onValueChange={picked => setCity(picked)}>
            {cities.map((city, index) => {
                return (
                    <Picker.Item label={city} value={city} key={index} />
                )
            })}
        </Picker>
        <TextInput
          secureTextEntry={false}
          placeholder="Budget in USD"
        />
        
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
logo: {
    fontSize: 32,
    fontWeight: '200',
    backgroundColor: '#fffcf5',
    paddingLeft: 150,
    paddingRight: 150,
    fontFamily: 'GilroyLight'
    },
  scrollView: {
    backgroundColor: '#fffcf5',
    padding: 20
  },
  submit: {
    color: 'black',
    padding: 60
  },
  start: {
      backgroundColor: '#fffcf5',
      fontFamily: 'GilroyLight'
  }
})
