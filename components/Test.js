import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { requestRegistration } from '../api';

export default function Test (props) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    requestRegistration(username, email, password)
    setUserName('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/favicon.png')} />

      <StatusBar style='auto' />
      <View>
        <TextInput
          placeholder='Enter User Name'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.inputStyle}
          onChangeText={(username) => setUserName(username)}
        />
      </View>

      <View>
        <TextInput
          placeholder='Enter Email'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={(email) => setEmail(email)}
          style={styles.inputStyle}
        />
      </View>
      <View>
        <TextInput
          placeholder='Enter Password'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          textContentType='password'
          onChangeText={(password) => setPassword(password)}
          style={styles.inputStyle}
        />
      </View>
      <View>
        <TextInput
          placeholder='Confirm Password'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          textContentType='password'
          onChangeText={(password2) => setPassword2(password2)}
          style={styles.inputStyle}
        />
      </View>
      <Button title='Create Account' onPress={handleSubmit} color='white' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  formLabel: {
    fontSize: 40,
    color: 'black'
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC'
  },

  button: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    color: 'white'
  },

  register: {
    paddingVertical: 25
  },

  logo: {
    backgroundColor: 'blue',
    justifyContent: 'center'
  },

  forgot: {
    position: 'absolute',
    bottom: 30
  }
})
