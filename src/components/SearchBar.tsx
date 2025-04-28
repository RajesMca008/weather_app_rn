import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter any city name"
        value={city}
        onChangeText={setCity}
      />
      <Button   title="Get Weather" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom:10,
    padding: 10,
    borderRadius: 4,
  },
});

export default SearchBar;
