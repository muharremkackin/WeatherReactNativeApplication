import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WeatherHome, WeatherDetails} from './pages';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="WeatherHome"
          component={WeatherHome}
          options={{title: 'Hava durumu'}}
        />
        <Stack.Screen name="WeatherDetail" component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
