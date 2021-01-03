import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const city_api_url = 'https://www.metaweather.com/api/location/search/?query=';
const city_weather_details_api_url =
  'https://www.metaweather.com/api/location/';

/**
 [
  {
    "title": "Istanbul",
    "location_type": "City",
    "woeid": 2344116,
    "latt_long": "41.040852,28.986179"
  }
]
 */

function WeatherHome() {
  const [city, setCity] = useState('');
  const [cityWeatherDetails, setCityWeatherDetails] = useState({});

  async function findCity() {
    console.log('render findCity start');
    const response = await axios.get(city_api_url + city);
    findCityWeatherDetails(response.data[0].woeid);
  }

  function findCityWeatherDetails(woeid) {
    console.log('render findWeatherCity start');
    axios
      .get(city_weather_details_api_url + woeid)
      .then((response) => {
        console.log(response.data);
        setCityWeatherDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setCity(value)}
        />
        <TouchableOpacity onPress={() => findCity()} style={styles.button}>
          <Icon name="magnify" color={'white'} size={24} />
        </TouchableOpacity>
      </View>
      {cityWeatherDetails ? (
        <View style={styles.weatherCardContainer}>
          <Text>{cityWeatherDetails.title}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#039be5',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#039be5',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  weatherCardContainer: {
    padding: 16,
    marginHorizontal: 8,
  },
});

export {WeatherHome};
