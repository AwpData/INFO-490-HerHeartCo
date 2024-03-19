// SelectMealPicturesView.jsx [Saving pictures is not in scope for iSchool dev team]
// 
// The expanded view for user to enter in pictures of their meals (breakfast, lunch, dinner)
// Currently pictures can be selected from user's camera roll but are not saved, as photo storage to the database is not in scope for iSchool dev team


import React, { useEffect } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as Theme from '../../theme';
import { closeCircleFilledIconLarge, imageIcon, infoIcon } from '../../constants';
import { updateBreakfast, updateLunch, updateDinner } from '../../redux/actions';


export default function SelectMealPicturesView() {
    const dispatch = useDispatch();

    const breakfast = useSelector(state => state.userReducer.meals.breakfast);
    const lunch = useSelector(state => state.userReducer.meals.lunch);
    const dinner = useSelector(state => state.userReducer.meals.dinner);

    // Prompt user for photo library permissions
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to access your photos!');
            }
        })();
    }, []);

    // Image picker for breakfast
    const pickBreakfast = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
            dispatch(updateBreakfast(result.assets[0].uri));
        }
    }

    // Delete image for breakfast
    const resetBreakfast = async () => {
        dispatch(updateBreakfast(undefined));
    }

    // Image picker for lunch
    const pickLunch = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
            dispatch(updateLunch(result.assets[0].uri));
        }
    }

    // Delete image for lunch
    const resetLunch = async () => {
        dispatch(updateLunch(undefined));
    }

    // Image picker for dinner 
    const pickDinner = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            dispatch(updateDinner(result.assets[0].uri));
        }
    }

    // Delete image for dinner 
    const resetDinner = async () => {
        dispatch(updateDinner(undefined));
    }

    const meals = [
        {title: 'Breakfast', pic: breakfast, edit: pickBreakfast, remove: resetBreakfast}, 
        {title: 'Lunch', pic: lunch, edit: pickLunch, remove: resetLunch}, 
        {title: 'Dinner', pic: dinner, edit: pickDinner, remove: resetDinner}];

    // TODO: refactor style

    return (
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />

            {/* Container for image picker buttons */}
            <View style={{flexDirection: 'row'}}>
                { meals.map((meal, i) => (
                    <View key={i} style={{flexDirection: 'column', alignItems: 'center'}}> 
                            <TouchableOpacity 
                                key={meal.id} 
                                onPress={meal.edit} 
                                style={{
                                    height: 100, width: 100, 
                                    backgroundColor: Theme.secondaryGray, 
                                    marginHorizontal: 10, borderRadius: 15, 
                                    alignItems: 'center', justifyContent: 'center', 
                                    shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { height: 3 }, 
                                    borderWidth: 0.5, borderColor: Theme.primaryGray}}
                            >
                                { meal.pic ? (
                                    <View style={{position: 'absolute'}}>
                                        <Image 
                                            source={{ uri: meal.pic }} 
                                            style={{ 
                                                width: 100, height: 100, 
                                                marginHorizontal: 10, borderRadius: 15}} 
                                        />

                                        <TouchableOpacity 
                                            onPress={meal.remove} 
                                            style={{
                                                position: 'absolute', alignSelf: 'flex-end', 
                                                backgroundColor: Theme.secondaryBackground, 
                                                shadowRadius: 3, shadowOpacity: 0.3, shadowOffset: { height: 3 },  
                                                borderRadius: 100}}
                                        >
                                            {closeCircleFilledIconLarge}
                                        </TouchableOpacity>
                                        
                                    </View>
                                    
                                ) : imageIcon}
                            </TouchableOpacity>
                        
                        <Text style={{...Theme.boldBody, paddingTop: 10}}>{meal.title}</Text>
                    </View>
                ))}
            </View>

            {/* Info indicator */}
            <View style={{flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 15, }}>
                {infoIcon}
                <View style={{justifyContent: 'center', paddingLeft: 5}}>
                    <Text style={Theme.body}>Upload pictures of your meals</Text>
                </View>
            </View>
        </View>
    );
}