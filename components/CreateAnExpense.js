import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  FlatList,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  TextInput,
  Picker,
  DatePickerIOS,
  Button,
  Alert,
  DevSettings,
  Separator,
  TouchableOpacity
} from 'react-native';
import { createExpense } from '../api.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useSafeArea } from 'react-native-safe-area-context';

export default function CreateAnExpense (props) {
  const { setAddingExpense, currentTrip, authToken, user } = props

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date())
  const [category, setCategory] = useState('')
  const trip = currentTrip.id

  function newDate (event, selectedDate) {
    setDate(selectedDate)
  }

  function handleSubmit () {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    createExpense(title, trip, price, note, formattedDate, category, authToken)
    setAddingExpense(false)
    DevSettings.reload()
  }

  return (
    <>
      <Text style={styles.logo}>s a v r</Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setAddingExpense(false)}
        >
          <Text style={styles.text1}>←</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'GilroyBold',
            position: 'absolute',
            marginLeft: 190,
            width: '100%',
            marginTop: 30
          }}
        >
          {' '}
          Create an Expense
        </Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          secureTextEntry={false}
          placeholder='Expense Title'
          placeholderTextColor='grey'
          onChangeText={(text) => setTitle(text)}
          style={styles.textInput}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          secureTextEntry={false}
          maxLength={10}
          placeholder='$17.38'
          keyboardType='numeric'
          placeholderTextColor='grey'
          onChangeText={(text) => setPrice(text)}
          style={styles.textInput}
        />
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={false}
          placeholder='Add a note here'
          placeholderTextColor='grey'
          onChangeText={(text) => setNote(text)}
        />

        {/* <View style={styles.datePicker}> */}

        {/* <Text style={{fontFamily: 'GilroyLight'}}>Date of Expense</Text> */}
        <DateTimePicker
          style={{ flex: 1, marginBottom: 0, marginTop: 20 }}
          testID='dateTimePicker'
          value={date}
          mode='date'
          display='inline'
          themeVariant='dark'
          onChange={newDate}
        />

        {/* </View> */}

        <Text style={styles.label}>Select a Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(picked) => setCategory(picked)}
        >
          <Picker.Item label='Lodging' value='lodging' />
          <Picker.Item label='Food' value='food' />
          <Picker.Item label='Transportation' value='transportation' />
          <Picker.Item label='Tickets' value='ticket' />
          <Picker.Item label='Grocery' value='grocery' />
          <Picker.Item label='Other' value='other' />
        </Picker>

        <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
          <Text style={styles.create}>Create Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 32,
    fontWeight: '200',
    backgroundColor: '#ffffff',
    paddingLeft: 150,
    paddingRight: 150,
    fontFamily: 'GilroyLight'
  },
  scrollView: {
    backgroundColor: '#ffffff',
    padding: 20
  },
  submit: {
    color: 'black',
    width: '100%',
    marginTop: 60,
    marginBottom: 60,
    alignItems: 'center',
    backgroundColor: '#00D64B',
    borderRadius: 10
  },
  datePicker: {
    marginTop: 20
  },
  textInput: {
    marginTop: 20,
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
    fontFamily: 'GilroyLight',
    textAlign: 'center'
  },
  create: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#00D64B',
    color: 'white',
    fontSize: 20
  },
  button: {
    width: 70,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#00D64B',
    top: 0,
    left: 0,
    alignItems: 'center'
  },
  text1: {
    color: 'white',
    fontSize: 25
  },
  label: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    paddingTop: 30,
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  }
})
