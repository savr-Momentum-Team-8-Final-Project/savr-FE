import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegisterForm from './Register';
import { requestLogin } from '../api';
import Homepage from './Homepage';

const LoginForm = (props) => {
  const navigation = useNavigation()
  const { storeData, setAuthToken } = props
  const [registering, setRegistering] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  if (registering) {
    return <RegisterForm setRegistering={setRegistering} />
  }
  function handleLogin (event) {
    console.log('logged in')
    event.preventDefault()
    requestLogin(email, password)
    requestLogin(email, password).then((res) => {
      storeData(res.data.auth_token)
      setAuthToken(res.data.auth_token)
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image style={styles.logo} source={require('../assets/favicon.png')} />
      <Text style={styles.formLabel}> SAVR </Text>
      <TextInput
        placeholder='Enter Email'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='default'
        name='email'
        textContentType='emailAddress'
        onChangeText={(text) => setEmail(text)}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder='Enter Password'
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='default'
        name='password'
        textContentType='password'
        onChangeText={(text) => setPassword(text)}
        style={styles.inputStyle}
      />
      <View style={styles.button}>
        <Button
          title='Login'
          onPress={(event) => handleLogin(event)}
          color='white'
        />
      </View>
      <View style={styles.register}>
        <Text>Don't have an account?</Text>
        <Button
          title='Sign Up'
          onPress={() => setRegistering(true)}
          color='#00D64B'
        />
      </View>
    </KeyboardAvoidingView>
  )
};

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
    backgroundColor: '#00D64B',
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

export default LoginForm
