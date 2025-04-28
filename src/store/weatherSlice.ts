import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, fetchWeatherData } from '../services/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, thunkAPI) => {
    try {
      const weather = await fetchWeatherData(city);
      // Store the last search so that it can be reloaded later, easy for
      await AsyncStorage.setItem('lastCity', city);
      return weather;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadLastCityWeather = createAsyncThunk(
  'weather/loadLastCityWeather',
  async (_, thunkAPI) => {
    try {
      const city = await AsyncStorage.getItem('lastCity');
      //console.log('TEST City ',city);
      if (city) {
        const weather = await fetchWeatherData(city);
        return weather;
      } else {
        throw new Error('No results found');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Need todo

const weatherSlice = createSlice({

  name: 'weather',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadLastCityWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLastCityWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadLastCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
