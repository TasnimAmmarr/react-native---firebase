import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddRecScreen,
  CreateRecScreen,
  HomeScreen,

} from '../screens';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateRecScreen" component={CreateRecScreen} />
      <Stack.Screen name="AddRecScreen" component={AddRecScreen} />



     </Stack.Navigator>
  );
};

export default AppStackNavigator;