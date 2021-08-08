import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';

export default function Header() {
    return (
        <>
        <View style={styles.container}>
            <Text>👤</Text>
            <Text>savr</Text>
            <Text>➕</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#e3e3e3'
    },
  })