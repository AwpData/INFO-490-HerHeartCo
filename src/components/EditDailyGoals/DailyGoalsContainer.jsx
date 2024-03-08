import React, { useState } from 'react';
import { View, Animated, Text, TextInput, TouchableOpacity } from 'react-native';

import NavBarAddButton from '../NavigationBar/NavBarAddButton';
import EditDailyGoalsModal from './EditDailyGoalsModal';
import * as Theme from '../../theme';


export default function DailyGoalsContainer() {
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
  
