import React, { useState } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Calendar from './Calendar';
import Add from './Add';
import Resources from './Resources';
import Profile from './Profile';

import { 
    activeHome, inactiveHome, 
    activeCalendar, inactiveCalendar, 
    activeResources, inactiveResources,
    activeProfile, inactiveProfile } from './constants';


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
                headerStyle: {
                backgroundColor: '#CC3533',
                },
                headerTintColor: 'white',
            }}
            >
            <Tab.Screen 
                name="Dashboard" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeHome : inactiveHome }, }} />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeCalendar : inactiveCalendar },}} />
            <Tab.Screen 
                name="Add" 
                component={Add} 
                options={{
                    tabBarIcon: () => { 
                        return ( <Add /> ); }, }} />
            <Tab.Screen 
                name="Resources" 
                component={Resources} 
                options={{
                tabBarIcon: ({ focused }) => { 
                    return focused ? activeResources : inactiveResources }, }} />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                tabBarIcon: ({ focused }) => { 
                    return focused ? activeProfile : inactiveProfile }, }} />
        </Tab.Navigator>
    );
}