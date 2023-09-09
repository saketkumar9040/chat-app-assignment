import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const userData = useSelector((state)=>state.auth.userData);
    console.log(userData)
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})