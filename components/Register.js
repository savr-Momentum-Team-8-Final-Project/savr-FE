import React from 'react';
import { Formik, Field } from 'formik';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { requestRegistration } from '../api.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = (props) => {
  const { setRegistering } = props
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        password2: ''
      }}
      onSubmit={(values) => {
        requestRegistration(
          values.username,
          values.email,
          values.password,
          values.password2
        )
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Image
            style={styles.logo}
            source={require('../assets/favicon.png')}
          />
          <Text style={styles.formLabel}> SAVR </Text>
          <TextInput
            placeholder='Enter User Name'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={handleChange('username')}
            value={values.username}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder='Enter Email'
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
            autoCapitalize='none'
            autoCorrect={false}
            name='password'
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
            <Text>Have an account?</Text>
            <Button
              title='Sign In'
              onPress={() => setRegistering(false)}
              color='#00D64B'
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
    paddingVertical: 25,
    color: '#00D64B'
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

export default RegisterForm
