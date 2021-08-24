import React from 'react';
import { Formik } from 'formik';
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
import { requestRegistration } from '../api.js';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { event } from 'react-native-reanimated';
import LoginForm from './Login.js';

const RegisterForm = (props) => {
  const { setRegistering } = props
  const [loaded] = useFonts({
    GilroyLight: require('../assets/fonts/Gilroy-Light.otf'),
    GilroyBold: require('../assets/fonts/Gilroy-ExtraBold.otf')
  })
  if (!loaded) {
    return null
  }
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password2: ''
      }}
      onSubmit={(values) => {
        requestRegistration(
          values.name,
          values.email,
          values.password,
          values.password2
        )
          .then((response) => Alert.alert(response))
          .then(setRegistering(false))
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.formLabel}> S A V R </Text>
          <TextInput
            placeholder='Enter User Name'
            placeholderTextColor='black'
            autoCapitalize='none'
            name='username'
            autoCorrect={false}
            onChangeText={handleChange('name')}
            value={values.username}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder='Enter Email'
            placeholderTextColor='black'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            name='email'
            textContentType='emailAddress'
            onChangeText={handleChange('email')}
            value={values.email}
            style={styles.inputStyle}
          />
          <TextInput
            secureTextEntry
            placeholder='Enter Password'
            placeholderTextColor='black'
            autoCapitalize='none'
            autoCorrect={false}
            name='password'
            textContentType='password'
            onChangeText={handleChange('password')}
            value={values.password}
            style={styles.inputStyle}
          />
          <TextInput
            secureTextEntry
            placeholder='Repeat Password'
            placeholderTextColor='black'
            autoCapitalize='none'
            autoCorrect={false}
            name='password2'
            textContentType='password'
            onChangeText={handleChange('password2')}
            value={values.password2}
            style={styles.inputStyle}
          />
          <View style={styles.button}>
            <Button
              title='Create Account'
              onPress={() => handleSubmit(values)}
              color='white'
            />
          </View>
          <View style={styles.register}>
            <Text style={styles.register1}>Have an account?</Text>
            <Button
              title='Sign In'
              onPress={() => setRegistering(false)}
              color='#00C244'
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'white',
    fontFamily: 'GilroyLight'
  },
  formLabel: {
    fontSize: 40,
    color: 'black',
    fontFamily: 'GilroyLight'
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
    fontFamily: 'GilroyLight'
  },

  button: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#00D64B',
    color: 'white',
    fontFamily: 'GilroyLight'
  },

  register: {
    paddingVertical: 25,
    color: '#00D64B',
    fontFamily: 'GilroyLight',
    fontSize: 15
  },
  register1: {
    paddingVertical: 25,
    color: 'black',
    fontFamily: 'GilroyLight',
    fontSize: 15
  },

  logo: {
    backgroundColor: 'blue',
    justifyContent: 'center'
  }
})

export default RegisterForm
