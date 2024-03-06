import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity, Keyboard, ScrollView, Image } from 'react-native';

import { useSelector, useDispatch, } from 'react-redux';

import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import * as Theme from '../../theme';
import { imageIcon, infoIcon } from '../../constants';
import { updateBreakfast, updateLunch, updateDinner } from '../../redux/actions';


export default function InsertMealPicture() {
    const dispatch = useDispatch();

    const breakfast = useSelector(state => state.editGoalsReducer.breakfast);
    const lunch = useSelector(state => state.editGoalsReducer.lunch);
    const dinner = useSelector(state => state.editGoalsReducer.dinner);

    useEffect(() => {
        (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to access your photos!');
        }
        })();
    }, []);

    const pickBreakfast = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
            setBreakfast(result.assets[0].uri);
            dispatch(updateBreakfast(result.assets[0].uri));
        }
    }

    const pickLunch = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
            setLunch(result.assets[0].uri);
            dispatch(updateLunch(result.assets[0].uri));
        }
    }

    const pickDinner = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            setDinner(result.assets[0].uri);
            dispatch(updateDinner(result.assets[0].uri));
        }
    }

    const meals = [
        {title: 'Breakfast', pic: breakfast, edit: pickBreakfast}, 
        {title: 'Lunch', pic: lunch, edit: pickLunch}, 
        {title: 'Dinner', pic: dinner, edit: pickDinner}];

    // TODO: refactor style

    return (
        
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />

            <View style={{flexDirection: 'row'}}>
                { meals.map((meal) => (
                    <View key={meal.id} style={{flexDirection: 'column', alignItems: 'center'}}> 
                        {meal.pic ? (
                            <Image source={{ uri: meal.pic }} style={{ width: 100, height: 100, marginHorizontal: 10, borderRadius: 15}} />
                        ) : (
                            <TouchableOpacity onPress={meal.edit} style={{height: 100, width: 100, backgroundColor: Theme.secondaryGray, marginHorizontal: 10, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                {imageIcon}
                            </TouchableOpacity>
                        )}
                        <Text style={{fontWeight: 'bold', color: Theme.primaryTint, paddingTop: 5}}>{meal.title}</Text>
                    </View>
                ))}
            </View>

            <View style={{flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 20, }}>
                {infoIcon}
                <View style={{justifyContent: 'center', paddingLeft: 5}}>
                    <Text style={{color: Theme.primaryTint}}>Upload pictures of your meals</Text>
                </View>
            </View>
        </View>
    );
}