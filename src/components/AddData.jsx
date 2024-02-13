import React, { useState } from 'react';
import { View, } from 'react-native';
import { goalsIcon } from './constants';
import AddDataRow from './pageItems/AddDataRow';
import NavBarAddButton from './pageItems/NavBarAddButton';
import AddPageModal from './pageItems/AddPageModal';


export default function AddData() {
    const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', }}>
        <NavBarAddButton openModal={openModal} />
        <AddPageModal visible={modalVisible} onRequestClose={closeModal}>
            <View style={{alignItems: 'center', marginVertical: 40, }}>
                <AddDataRow icon={goalsIcon} title='Goals' value={8} goal={8} unit='goals' />
                
                {/* TODO: add more buttons */}
            </View>
        </AddPageModal>
    </View>
  );
}
  