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
      <Button title='Select Trip Image' onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 350, height: 210 }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    width: 340,
    height: 210,
    resizeMode: 'cover',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingTop: 10,
    paddingLeft: 17,
    paddingRight: 10,
    alignItems: 'center'

  }
})
