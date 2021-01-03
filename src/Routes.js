import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WeatherHome, WeatherDetails} from './pages';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WeatherHome" component={WeatherHome} />
        <Stack.Screen name="WeatherDetail" component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
