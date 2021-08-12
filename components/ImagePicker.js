import React, { useState, useEffect } from 'react'
import { Button, Image, View, Platform, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function ImagePickerExample () {
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={styles.image}>
      <Button title='➕' onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 180, height: 140 }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 176,
    height: 176,
    borderRadius: 176 / 2,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'black',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 85

  }
})
