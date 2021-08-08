import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Image, Alert, Platform, KeyboardAvoidingView } from 'react-native'

const LoginForm = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image style={styles.logo} source={require('../assets/favicon.png')} />
      <Text style={styles.formLabel}> SAVR </Text>
      <TextInput placeholder='Enter Email' style={styles.inputStyle} />
      <TextInput
        secureTextEntry
        placeholder='Enter Password'
        style={styles.inputStyle}
      />
      <View style={styles.button}>
        <Button
          title='Login'
          onPress={() => Alert.alert('Hey! Your button works!')}
          color='white'
        />
      </View>
      <View style={styles.register}>
        <Text>Don't have an account?
        </Text>
        <Button
          title='Sign Up'
          onPress={() => Alert.alert('Hey! Cant see me!')}
        />
      </View>
      <View style={styles.forgot}>
        <Button
          title='Forgot Password?'
          onPress={() => Alert.alert('Hey! Your button works!')}
          color='blue'
        />
      </View>
    </KeyboardAvoidingView>

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

export default LoginForm
