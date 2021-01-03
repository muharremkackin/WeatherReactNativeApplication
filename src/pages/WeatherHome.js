import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const city_api_url = 'https://www.metaweather.com/api/location/search/?query=';
const city_weather_details_api_url =
  'https://www.metaweather.com/api/location/';

const icon_url = 'https://www.metaweather.com//static/img/weather/png/';

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
      {Object.keys(cityWeatherDetails).length !== 0 ? (
        <View style={styles.weatherCardContainer}>
          <View style={styles.weatherHeaderContainer}>
            <View>
              <Text style={styles.weatherTitle}>
                {cityWeatherDetails.title}
              </Text>
              <View style={styles.weatherIconContainer}>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri:
                      icon_url +
                      cityWeatherDetails.consolidated_weather[0]
                        .weather_state_abbr +
                      '.png',
                  }}
                />
                <View style={styles.weatherTemp}>
                  <Text style={styles.weatherTempText}>
                    {Math.ceil(
                      cityWeatherDetails.consolidated_weather[0].the_temp,
                    )}{' '}
                    ℃
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.weatherEdgeTempContainer}>
            <Text style={styles.weatherEdgeTemp}>
              Min:{' '}
              {Math.ceil(cityWeatherDetails.consolidated_weather[0].min_temp)} ℃
            </Text>
            <Text style={styles.weatherEdgeTemp}>
              Max:{' '}
              {Math.ceil(cityWeatherDetails.consolidated_weather[0].max_temp)} ℃
            </Text>
          </View>
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
    backgroundColor: 'white',
    borderRadius: 5,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  weatherHeaderContainer: {
    alignItems: 'center',
  },
  weatherTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weatherIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  weatherTemp: {
    backgroundColor: 'rgba(3, 155, 229, 0.75)',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    left: -25,
  },
  weatherTempText: {
    fontSize: 24,
    color: 'white',
  },
  weatherEdgeTempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  weatherEdgeTemp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export {WeatherHome};
