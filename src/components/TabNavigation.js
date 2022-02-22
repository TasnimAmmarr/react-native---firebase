import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from './Screens/Home';
import NotificationScreen from './Screens/Notification';
import ProfileScreen from './Screens/Profile';
import SearchScreen from './Screens/Search';

const TabNavigation = () => {


    
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} 
    activeColor="white" >
          <Tab.Screen name="Home" component={HomeScreen}            //Home Screen
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#50895b',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={26}/>
            ),
        }}/>
          <Tab.Screen name="Search" component={SearchScreen}      // Search Screen
          options={{
            tabBarColor: '#a47e1b',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={26}/>
            ),
        }}/>
        <Tab.Screen name="Notification" component={NotificationScreen} 
     Notification Screen
          options={{
            tabBarColor: '#897245', 
            
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26}/>
            ),
        }}/>
          <Tab.Screen name="Profile" component={ProfileScreen}   // Profile Screen
          options={{
            tabBarColor: '#539879',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle" color={color} 
    size={26}/>
            ),
        }}/>
        
  
        </Tab.Navigator>
}

export default TabNavigation
  
