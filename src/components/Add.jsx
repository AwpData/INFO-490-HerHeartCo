import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

const todayDate = new Date();

const MyModal = ({ children, visible, onRequestClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
            presentationStyle='pageSheet'
        >
            <View style={styles.modalContainer}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', backgroundColor: 'white', minWidth: '100%', height: 60, padding: 20}}> 
                    <TouchableOpacity onPress={onRequestClose}  >
                        <Text style={{color: 'black', fontSize: 18, }}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={onRequestClose}  >
                        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 20,}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MaterialIcons name='chevron-left' color='#cc3533' size={30} />
                    <Text style={{color: '#cc3533', fontWeight: 'bold', fontSize: 26, textAlign: 'center'}}>{format(todayDate, 'EEEE, MMMM dd')}</Text>
                    <MaterialIcons name='chevron-right' color='#cc3533' size={30} />
                    </View>
                    
                    {children}
                    {/* <Button title="Close" onPress={onRequestClose} /> */}
                </View>
                
                <View style={{ flex: 1 }}>
                    {/* <TouchableOpacity onPress={onRequestClose} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
                        <MaterialIcons 
                            name="cancel" 
                            color='#CC3533' 
                            size={115} 
                            style={{ position: 'absolute', bottom: 35}}
                        />
                    </TouchableOpacity> */}
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
            <View style={{alignItems: 'center', marginVertical: 40
            // borderColor: 'red', borderWidth: 5
            }}>
                
                <TouchableOpacity style={{borderColor: '#e0e0e0', borderWidth: 2, minWidth: '100%', borderRadius: 15, padding: 15, }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialIcons name='flag' color='black' size={35} />
                        <View style={{flexDirection: 'column', paddingHorizontal: 15 }}>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Goals</Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                                <Text style={{fontWeight: 'bold', fontSize: 28, 
                                // borderColor: 'red', borderWidth: 5
                                }}>8</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 20, 
                                color: '#cc3533', 
                                // borderColor: 'red', borderWidth: 5, 
                                paddingBottom: 5}}> / 8 goals</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}} />
                        <MaterialIcons name='chevron-right' color='#e0e0e0' size={30} />
                    </View>
                </TouchableOpacity>
            </View>
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
  