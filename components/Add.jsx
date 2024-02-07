import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyModal = ({ children, visible, onRequestClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                {children}
                <Button title="Close" onPress={onRequestClose} />
                </View>
                
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={onRequestClose} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
                        <MaterialIcons 
                            name="cancel" 
                            color='#CC3533' 
                            size={115} 
                            style={{ position: 'absolute', bottom: 35}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default function Add() {
    const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', }}>
        <TouchableOpacity 
            onPress={openModal} 
            style={{ 
                position: 'absolute', 
                bottom: -10, left: 0, right: 0, 
                alignItems: 'center', 
                shadowOpacity: 0.2, shadowRadius: 5  
        }}>
            <View style={{
                width: 96,
                height: 96,
                borderRadius: 500,
                backgroundColor: 'white',
            }} />
            <MaterialIcons 
                name="add-circle-outline" 
                color='#CC3533' 
                size={85} 
                style={{ position: 'absolute', paddingTop: 5}}
            />
        </TouchableOpacity>
        <MyModal visible={modalVisible} onRequestClose={closeModal}>
            <Text>This is the modal content!</Text>
        </MyModal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 4,
    },
});
  