import React, { Component, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import tw from 'twrnc';
import '../App';

import axios from 'axios';

export const Person = ({ name, birth_year, gender, homeworld, species, item }) => {
  const navigation = useNavigation();

  const [home, setHome] = useState();
  const [speciality, setSpeciality] = useState();
  const [likes, setlikes] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    axios.get(homeworld).then(({ data }) => setHome(data.name));
    axios.get(species).then(({ data }) => setSpeciality(data.name));
  }, [])

  return (
    <View style={tw`flex-row flex-6`}>
      
      <TouchableOpacity
        style={tw`flex-row flex-2 text-xs p-1 flex-wrap`}
        onPress={() => {navigation.navigate('Person', { item })}}
      >
        <Text >{name}</Text>
      </TouchableOpacity>

      <Text style={tw`flex-row flex-1 text-xs p-1 flex-wrap`}>{birth_year}</Text>
      <Text style={tw`flex-row flex-1 text-xs p-1 flex-wrap`}>{gender}</Text>
      <Text style={tw`flex-row flex-1 text-xs p-1 flex-wrap`}>{home}</Text>
      <Text style={tw`flex-row flex-1 text-xs p-1 flex-wrap`}>{speciality}</Text>
    </View>
  );
}