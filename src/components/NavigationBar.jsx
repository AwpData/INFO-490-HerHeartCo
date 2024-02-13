import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Calendar from './Calendar';
import AddData from './AddData';
import Resources from './Resources';
import Profile from './Profile';

import { 
    activeHomeIcon, inactiveHomeIcon, 
    activeCalendarIcon, inactiveCalendarIcon, 
    activeResourcesIcon, inactiveResourcesIcon,
    activeProfileIcon, inactiveProfileIcon } from './constants';


export default function NavigationBar() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#CC3533',
                    height: 95
                },
                tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12, color: 'white' },
                headerStyle: { backgroundColor: '#CC3533', },
                headerTintColor: 'white', }}>
            <Tab.Screen 
                name="Dashboard" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeHomeIcon : inactiveHomeIcon }, }} />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeCalendarIcon : inactiveCalendarIcon },}} />
            <Tab.Screen 
                name="Add" 
                component={AddData} 
                options={{
                    tabBarIcon: () => { 
                        return ( <AddData /> ); }, }} />
            <Tab.Screen 
                name="Resources" 
                component={Resources} 
                options={{
                tabBarIcon: ({ focused }) => { 
                    return focused ? activeResourcesIcon : inactiveResourcesIcon }, }} />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                tabBarIcon: ({ focused }) => { 
                    return focused ? activeProfileIcon : inactiveProfileIcon }, }} />
        </Tab.Navigator>
    );
}