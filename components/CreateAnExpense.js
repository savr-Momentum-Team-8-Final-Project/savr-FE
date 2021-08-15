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
import { createExpense } from '../api.js'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useSafeArea } from 'react-native-safe-area-context';




export default function CreateAnExpense (props) {

    const { setAddingExpense, currentTrip } = props 

    const [title, setTitle] = useState('')
    const [price, setPrice] =useState('')
    const [note, setNote] = useState('')
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState('')
    const trip = currentTrip.id



    function handleSubmit () {

        

        createTrip(title, trip, price, note, date, category)
        setAddingExpense(false)
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
