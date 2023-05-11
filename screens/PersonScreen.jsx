import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, RefreshControl, View, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { XMarkIcon } from "react-native-heroicons/solid";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';

import tw from 'twrnc';
import '../App';

import axios from 'axios';

export default function PersonScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  // const fetchPosts = async (url) => await axios.get(url).then(({ data }) => data());

  // const films = item.films.map(i => fetchPosts(i));

  // console.log(films);

  // useEffect(() => {
  //   console.log(item.films[0]);
  //   // axios.get(species).then(({ data }) => setSpacing(data.name));
  // }, [])

  return (
    <SafeAreaView style={tw`flex-col flex-1 text-xs p-1 flex-wrap m-6`}>

      <TouchableOpacity
        onPress={navigation.goBack}
      >
        <View style={tw`text-xs p-3 flex-wrap rounded-full bg-gray-300 shadow-lg shadow-cyan-500/50 w-20 mb-20 content-center`}>
          <ArrowLeftIcon size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigation.goBack}
      >
        <View style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-200`}>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-50`}>Name of the hero: {item.name}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-50`}>Day of birthday: {item.birth_year}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-50`}>Hair color: {item.hear_color}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-50`}>Color of the eye: {item.eye_color}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl rounded items-left justify-center bg-gray-50`}>Height: {item.height}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl roundeditems-left justify-center bg-gray-50`}>Weight of the hero: {item.mass}</Text>
          <Text style={tw`flex-col gap-4 border-2 border-gray-300 p-4 text-xl items-left justify-center bg-gray-50`}>Skin of the hero: {item.skin_color}</Text>
      {/* <Text>Films: {films.join()}</Text> */}
        </View>
      </TouchableOpacity>

      {/* <FlatList
          data={item.films}
          refreshControl={<RefreshControl refreshing={film} onFrefresh={fetchPosts} />}
          renderItem={({ item }) => (
           <Text>{fetchPosts(item)}</Text>
          )}
        /> */}
      
      {/* <FlatList
          data={item.species}
          // refreshControl={<RefreshControl refreshing={isLoading} onFrefresh={fetchPosts} />}
          renderItem={({ item }) => (
            <Text>{item}</Text>
          )}
        />
      
      <FlatList
          data={item.starships}
          // refreshControl={<RefreshControl refreshing={isLoading} onFrefresh={fetchPosts} />}
          renderItem={({ item }) => (
            <Text>{item}</Text>
          )}
        />
      
      <FlatList
          data={item.vehicles}
          // refreshControl={<RefreshControl refreshing={isLoading} onFrefresh={fetchPosts} />}
          renderItem={({ item }) => (
            <Text>{item}</Text>
          )}
        /> */}
    </SafeAreaView>
  );
}
