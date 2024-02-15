import React, { useState } from 'react';
import { View, } from 'react-native';
import { foodIcon, glucoseIcon, goalsIcon, waterIcon, bpIcon } from './constants';
import AddDataRow from './pageItems/AddDataRow';
import NavBarAddButton from './pageItems/NavBarAddButton';
import AddPageModal from './pageItems/AddPageModal';
import SelfLogHealthData from './pageItems/SelfLogHealthData';


export default function AddData() {
    const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // TODO: use real data, make buttons editable

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', }}>
        <NavBarAddButton openModal={openModal} />
        <AddPageModal visible={modalVisible} onRequestClose={closeModal}>
            <View style={{alignItems: 'center', marginVertical: 40, }}>
                <AddDataRow icon={goalsIcon} title='Goals' value={8} goal={8} unit='goals' />
                <AddDataRow icon={waterIcon} title='Hydration' value={8} goal={8} unit='cups' />
                <AddDataRow icon={foodIcon} title='Food' value={3} goal={3} unit='meals' />
                <SelfLogHealthData icon={glucoseIcon} title='Glucose' value={100} unit='mg/dL' />
                <SelfLogHealthData icon={bpIcon} title='Blood Pressure' value='117/75' unit='mm Hg' />
            </View>
        </AddPageModal>
    </View>
  );
}
  