import React, { useEffect } from 'react';
import { SafeAreaView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {  useDispatch, useSelector } from 'react-redux';
import {  RootState, AppDispatch } from './../store/store';
import SearchBar from './../components/SearchBar';
import WeatherCard from './../components/WeatherCard';
import { getWeather, loadLastCityWeather, clearError } from './../store/weatherSlice';
import DarkModeToggle from './../components/DarkModeToggle';
import useDarkMode from './../hooks/useDarkMode';
const HomeScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const weatherState = useSelector((state: RootState) => state.weather);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
      dispatch(loadLastCityWeather());
    }, [dispatch]);

    const handleSearch = (city: string) => {
      dispatch(getWeather(city));
    };

    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <SearchBar onSearch={handleSearch} />
        {weatherState.loading && <ActivityIndicator size="large" color="#0000ff" />}
        {weatherState.error && (
          <Text style={styles.error} onPress={() => dispatch(clearError())}>
            {weatherState.error}
          </Text>
        )}
        {weatherState.data && !weatherState.loading && (
          <WeatherCard weather={weatherState.data} />
        )}
      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#e6e5de',
    },
    darkContainer: {
      backgroundColor: '#333',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      margin: 10,
    },
  });
  export default HomeScreen;
