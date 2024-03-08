// DailyGoalsModalContainer.jsx
// 
// Circular plus icon in the nav bar
// Container for the modal page that shows up for the user to edit their daily goals 


import React, { useState } from 'react';
import { View, } from 'react-native';

import * as Theme from '../../theme';

import NavBarAddButton from '../NavigationBar/NavBarAddButton';
import EditDailyGoalsModal from './EditDailyGoalsModal';


export default function DailyGoalsModalContainer() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ 
      flexDirection: 'column', 
      alignItems: 'center', position: 'absolute', 
      backgroundColor: Theme.primaryBackground, 
    }}>
        <NavBarAddButton openModal={openModal} />
        <EditDailyGoalsModal visible={modalVisible} onRequestClose={closeModal} />
    </View>
  );
}
  
