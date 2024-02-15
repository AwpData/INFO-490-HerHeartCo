import React, { useState } from 'react';
import { View, Animated, Text, TextInput } from 'react-native';
import { foodIcon, glucoseIcon, goalsIcon, waterIcon, bpIcon } from './constants';
import AddDataRow from './pageItems/AddDataRow';
import NavBarAddButton from './pageItems/NavBarAddButton';
import AddPageModal from './pageItems/AddPageModal';
import SelfLogHealthData from './pageItems/SelfLogHealthData';
import * as Theme from '../theme';
import { AddWaterView } from './pageItems/AddWaterView';
import { useSelector, useDispatch } from 'react-redux';


export default function AddData() {
    const [modalVisible, setModalVisible] = useState(false);
    const newWater = useSelector(state => state.water.value );

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
                <AddDataRow
                  icon={goalsIcon} title='Goals' value={8} goal={8} unit='goals'
                  expandedContent={<Text>Expanded goals!</Text>} />
                <AddDataRow
                  icon={waterIcon} title='Hydration' value={newWater} goal={64} unit='oz'
                  expandedContent={ <AddWaterView />} />
                <AddDataRow
                  icon={foodIcon} title='Food' value={3} goal={3} unit='meals'
                  expandedContent={<Text>Expanded food!</Text>}/>
                <SelfLogHealthData icon={glucoseIcon} title='Glucose' value={100} unit='mg/dL' />
                <SelfLogHealthData icon={bpIcon} title='Blood Pressure' value='117/75' unit='mm Hg' />
            </View>
        </AddPageModal>
    </View>
  );
}
  
