import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Dashboard/Home';
import Calendar from '../Calendar/Calendar';
import DailyGoalsContainer from '../EditDailyGoals/DailyGoalsContainer';
import Resources from '../Resources/Resources';
import Profile from '../Profile/Profile';

import * as Theme from '../../theme';

import { 
    activeHomeIcon, inactiveHomeIcon, 
    activeCalendarIcon, inactiveCalendarIcon, 
    activeResourcesIcon, inactiveResourcesIcon,
    activeProfileIcon, inactiveProfileIcon } from '../../constants';


export default function NavigationBar() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Theme.primaryTint,
                    height: 95
                },
                tabBarLabelStyle: Theme.whiteCaption,
                headerTitleStyle: Theme.lightButtonText,
                headerStyle: { backgroundColor: Theme.primaryTint, },
                headerTintColor: 'white', }}>
            <Tab.Screen 
                name="Dashboard" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeHomeIcon : inactiveHomeIcon },
                    headerShown: false }} />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar} 
                options={{
                    tabBarIcon: ({ focused }) => { 
                        return focused ? activeCalendarIcon : inactiveCalendarIcon },}} />
            <Tab.Screen 
                name="Add" 
                component={DailyGoalsContainer} 
                options={{
                    tabBarIcon: () => { 
                        return ( <DailyGoalsContainer /> ); }, }} />
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