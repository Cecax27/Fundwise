import {Tabs} from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto'
import { Slot } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const logo = require('../../assets/icon.png')

export default function TabsLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-SemiBold': require('../../assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-Light': require('../../assets/fonts/Quicksand-Light.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen
      name="dashboard"
      options={{
        title: 'Home',
        tabBarIcon: ({color}) => <MaterialIcons name={ "home" } size={32} color={color}/> ,
        headerShown: false
      }} />
      <Tabs.Screen
      name="transactions"
      options={{
        title: 'Transactions',
        tabBarIcon: ({color}) => <MaterialIcons name={ "payments" } size={32} color={color}/> ,
        headerShown: false
      }} />
      <Tabs.Screen
      name="accounts"
      options={{
        title: 'Accounts',
        tabBarIcon: ({color}) => <MaterialIcons name={ "wallet" } size={32} color={color}/> ,
        headerShown: false
      }} />
      <Tabs.Screen
      name="configuration"
      options={{
        title: 'Configuration',
        tabBarIcon: ({color}) => <MaterialIcons name={ "settings" } size={32} color={color}/> ,
        headerShown: false
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    height: 47,
    width: 47,
    resizeMode: 'center',
  },
});
