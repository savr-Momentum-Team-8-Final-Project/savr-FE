import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';

export default function Header() {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.profile}>🗿</Text>
            <Text style={styles.logo}>savr</Text>
            <Text style={styles.add}>➕</Text>
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
      backgroundColor: '#e3e3e3',
      paddingBottom: 60
    },
    logo: {
        fontSize: 30,
        fontWeight: '200'
    },
    profile: {
        fontSize: 30
    },
    add: {
        fontSize: 30
    }

  })