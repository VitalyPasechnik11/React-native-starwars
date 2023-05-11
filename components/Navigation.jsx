import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import PersonScreen from '../screens/PersonScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
import store from "../store";
import { Provider } from 'react-redux';


const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Person" component={PersonScreen} />
          {/* <Stack.Screen name="Favorites" component={FavoritesScreen} /> */}
        </Stack.Navigator>
    
      </Provider>
    </NavigationContainer>
  );
}