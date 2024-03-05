import React, { useState } from 'react';
import { View, Animated, Text, TextInput, TouchableOpacity } from 'react-native';
import NavBarAddButton from '../NavigationBar/NavBarAddButton';
import EditDailyGoalsModal from './EditDailyGoalsModal';


export default function DailyGoalsContainer() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', backgroundColor: '#fef7f4', }}>
        <NavBarAddButton openModal={openModal} />
        <EditDailyGoalsModal visible={modalVisible} onRequestClose={closeModal} / >
    </View>
  );
}
  
