import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
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
  Separator,
  TouchableOpacity
} from 'react-native'
import { requestExpenses, createExpense, receiptUpload } from '../api.js'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { useSafeArea } from 'react-native-safe-area-context'
import ImagePickerExample2 from './ImagePicker2'
export default function UploadExpense (props) {
  const { setUpload, currentTrip } = props

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date())
  const [expense, setExpense] = useState()
  const [category, setCategory] = useState('')
  const trip = currentTrip.id
  const [photo, setPhoto] = useState()
  function newDate (event, selectedDate) {
    setDate(selectedDate)
  }

  function handleSubmit () {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    createExpense(title, trip, price, note, formattedDate, category)
    setUpload(false)
  }
  useEffect(() => {
    if (category !== '') {
      createExpense(null, trip, '', '', null, category)
    }
  }, [category])

  useEffect(() => {
    if (category !== '') {
      requestExpenses()
        .then(data => {
          setExpense(data.data[data.data.length - 1])
        //   console.log(data.data[data.data.length - 1])
        })
    }
  }, [category])
  if (photo) {
    console.log(photo)
  }

  useEffect(() => {
    if (photo && expense) {
      receiptUpload(expense.id, photo)
        .then(data => {
          console.log(data)
        })
    }
  }, [photo])

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
          onPress={() => setUpload(false)}
        >
          <Text style={styles.text1}>←</Text>
        </TouchableOpacity>
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
        <ImagePickerExample2 setPhoto={setPhoto} />
        <Text style={styles.label}>Expense</Text>
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
          style={{ flex: 1 }}
          testID='dateTimePicker'
          value={date}
          mode='date'
          display='inline'
          onChange={newDate}
        />

        {/* </View> */}

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
    width: '100%',
    marginTop: 60,
    marginBottom: 60,
    alignItems: 'center',
    backgroundColor: '#00D64B',
    borderRadius: 10
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 60
  },
  textInput: {
    marginTop: 20,
    marginBottom: 50,
    borderColor: '#00C244',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
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