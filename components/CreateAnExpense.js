import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,
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
    TouchableOpacity} from 'react-native';
import { requestStates, requestCities, createTrip } from '../api.js'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const stopWords = ['UM-84', 'UM-81', 'UM-89', 'UM-79', 'UM-86', 'UM-67', 'UM-71', 'UM-76', 'UM-95']

export default function CreateAnExpense (props) {

    const { setAddingExpense } = props 

    const [chosenState, setChosenState] = useState('NC')
    const [city, setCity] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')

    const [date, setDate] = useState(new Date(1598051730000));

    const newStart = (event, selectedDate) => {
        // setEndDate(moment(selectedDate).format('YYYY-MM-DD'))
        setStartDate(selectedDate)
    }
    const newEnd = (event, selectedDate) => {
        // setEndState(moment(selectedDate).format('YYYY-MM-DD'))
        setEndDate(selectedDate)
    }



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


    function handleSubmit () {

        const start = moment(startDate).format('YYYY-MM-DD')
        const end = moment(endDate).format('YYYY-MM-DD')

        createTrip(title, start, end, city, chosenState, budget)
        setCreating(false)
    }




    return (
    <>
    <Text style={styles.logo}>s a v r</Text>
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

        <TouchableOpacity style={styles.button} onPress={() => setAddingExpense(false)}>
            <Text style={styles.text1}>←</Text>
        </TouchableOpacity>

        <TextInput
                secureTextEntry={false}
                maxLength={10}
                placeholder="Name of your trip"
                placeholderTextColor='grey'
                onChangeText={text => setTitle(text)}
                defaultValue={title}
                style={styles.textInput}
            />
    
            <View style={styles.datePicker}>
                <View style={{width:230}}>
                <Text style={{fontFamily: 'GilroyLight'}}>Start Date</Text>
                <DateTimePicker
                style={{flex: 1}}
                testID="dateTimePicker"
                value={startDate}
                mode="date"
                display="compact"
                // textColor="#00C244"
                onChange={newStart}
                />
                </View>

                <View style={{width:130}}>
                <Text style={{fontFamily: 'GilroyLight'}}>End Date</Text>
                <DateTimePicker
                style={{flex: 1}}
                testID="dateTimePicker"
                value={endDate}
                mode="date"
                display="compact"
                // textColor="#00C244"
                onChange={newEnd}
                />
                </View>
            </View>


        <TextInput
            secureTextEntry={false}
            keyboardType='numeric'
            maxLength={10}
            placeholder="Budget in USD"
            placeholderTextColor='grey'
            onChangeText={text => setBudget(text)}
            defaultValue={budget}
            style={styles.textInput}
        />


    
        <Text style={{fontFamily: 'GilroyLight'}}>Select a State</Text>
        <Picker
        selectedValue={chosenState}
        onValueChange={picked => setChosenState(picked)}>
            {states.map((st, index) => {
                return (
                    <Picker.Item label={st} value={st} key={index} />
                )
            })}
        </Picker>
        

        <Text style={{fontFamily: 'GilroyLight'}}>Select a City</Text>
        <Picker
        selectedValue={city}
        onValueChange={picked => setCity(picked)}>
            {cities.map((city, index) => {
                return (
                    <Picker.Item label={city} value={city} key={index} />
                )
            })}
        </Picker>


        <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
            <Text style={styles.create}>Create Trip</Text>
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
      marginBottom: 60,
  },
  textInput: {
      marginTop: 50,
      marginBottom: 80,
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
      fontSize: 20,
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
      fontSize: 25,
  }

})
