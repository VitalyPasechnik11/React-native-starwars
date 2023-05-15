import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import '../App';
import { Person } from '../components/Person';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFemale, removeFromFemale, selectFemaleItems, deleteAllFemale } from '../features/femaleSlice';
import { addToMale, removeFromMale, selectMaleItems, deletAllMale } from '../features/maleSlice';
import { addToOther, removeFromOther, selectOtherItems, deleteAllOther } from '../features/otherSlice';

import { MagnifyingGlassIcon, HeartIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [page, setPage] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const arr = [
    '1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'
  ];
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const female = useSelector(selectFemaleItems);
  const male = useSelector(selectMaleItems);
  const other = useSelector(selectOtherItems);

  const fetchPosts =(url) => {
    setIsLoading(true); 

    axios
    .get(url)
    .then(({ data }) => {
      setPersons(data);
      setFilteredPersons(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      Alert.alert('Oшибка', 'oшибка получения данных');
    })
    .finally(() => setIsLoading(false));
  };

  const addItemToFimale = ({ item }) => {
    if (female.some(i => i.name === item.name)) {
      dispatch(removeFromFemale(item));
    } else {
    dispatch(addToFemale(item));
    }
  }

  const addItemToMale = ({ item }) => {
    if (male.some(i => i.name === item.name)) {
      dispatch(removeFromMale(item));
    } else {
      dispatch(addToMale(item));
    }
  }

  const addItemToOther = ({ item }) => {
    if (other.some(i => i.name === item.name)) {
      dispatch(removeFromOther(item));
    } else {
      dispatch(addToOther(item));
    }
  }

  const filtPersons = (val) => {
    if (inputVal.length > 0) {
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(val.toLowerCase()));
    setFilteredPersons(filterPersons);
  }
}

  React.useEffect(() => fetchPosts("https://swapi.dev/api/people"), []);

  return (
    <SafeAreaView style={tw`p-4 android:pt-2 bg-whitesmoke-500 dark:bg-black w-full h-full`}>
      <ScrollView>
 
        <View style={tw`flex-col gap-0`}>
{/* -----------------------Header----------------- */}
          <View style={tw`flex-row items-center justify-between p-10 p-5`}>
            <Text style={tw`text-xl font-bold`}>Fans</Text>
              <TouchableOpacity onPress={() => {
                dispatch(deleteAllFemale());
                dispatch(deletAllMale());
                dispatch(deleteAllOther());
              }}>
                <Text style={tw`text-sm text-red-500 p-3 border-rose-500 rounded border-2`}>CLEAR FANS</Text>
            </TouchableOpacity>
          </View>
{/* ----------------------- Fans ----------------- */}

          <View style={tw`flex-row gap-6 justify-between p-4`}>
            <View style={tw`flex-1 flex-col gap-1 rounded justify-between p-4 bg-white shadow-md`}>
              <Text>{female.length}</Text>
              <Text>Female Fans</Text>
            </View>
            <View style={tw`flex-1 flex-col gap-1 rounded justify-between p-4 bg-white shadow-md`}>
              <Text>{male.length}</Text>
              <Text>Male Fans</Text>
            </View>
            <View style={tw`flex-1 flex-col gap-1 rounded justify-between p-4 bg-white shadow-md`}>
              <Text>{other.length}</Text>
              <Text>Others</Text>
            </View>
          </View>
{/* -----------------------Lists----------------- */}

          <View style={tw`flex-col gap-5 rounded bg-white shadow-md m-4 p-4`}>

{/* -----------------------Search----------------- */}
              
            <View style={tw`flex-row gap-1 items-center`}>
              <MagnifyingGlassIcon height="24px" color="black" fill-black="true" />
              <TextInput
                style={tw`text-gray-500`}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setFilteredPersons(e.target.value);
                }}
                value={inputVal}
                placeholder="Search"
                keyboardType="default"
              />
            </View>

{/* -----------------------Lists-Header----------------- */}
            <View>

              <View style={tw`flex-row border-2 border-gray-300`}>
              
                <View style={tw`flex-0 border-2 border-gray-300 p-2 items-center justify-center `}>
                  <HeartIcon color="black" style={tw``} size="16" fill="black" />
                </View>
              
                <View style={tw`flex-row flex-6`}>
                  <Text style={tw`flex-row flex-2 border-2 border-gray-300 text-xs p-1 flex-wrap	`}>Name</Text>
                  <Text style={tw`flex-row flex-1 border-2 border-gray-300  text-xs p-1 flex-wrap	`}>Birth Year</Text>
                  <Text style={tw`flex-row flex-1 border-2 border-gray-300  text-xs p-1 flex-wrap `}>Gender</Text>
                  <Text style={tw`flex-row flex-1 border-2 border-gray-300  text-xs p-1 flex-wrap	`}>Home World</Text>
                  <Text style={tw`flex-row flex-1 border-2 border-gray-300  text-xs p-1 flex-wrap	`}>Species</Text>
                </View>
              </View>
{/* -----------------------Lists-Content---------------- */}

              <View style={tw`flex-row border-2 border-gray-300`}>
              
                <View style={tw`flex-row flex-6`}>
{/* -----------------------List-HEART---------------- */}
                  <FlatList
                    data={filteredPersons.results}
                    refreshControl={<RefreshControl refreshing={isLoading} onFrefresh={fetchPosts} />}
                    renderItem={({ item }) => (
                      <View style={tw`flex-row flex-6 border-b-2 border-gray-300`}>
                        <TouchableOpacity onPress={() => {
                          if (item.gender === "female") {
                            addItemToFimale({ item });
                            setIsPressed(!isPressed);
                          }

                          if (item.gender === "male") {
                            addItemToMale({ item });
                            setIsPressed(!isPressed);
                          }

                          if (item.gender === 'n/a' && item.gender !== "male" && item.gender !== "female") {
                            addItemToOther({ item });
                            setIsPressed(!isPressed);
                          }
                        }}>
                      <View style={tw`my-auto border-r-2 border-gray-300`}>
                         {
                            female.some(i => (i.name === item.name)) ||
                            male.some(i => (i.name === item.name)) ||
                            other.some(i => (i.name === item.name)) ?
                              (<HeartIcon color="red" style={tw``} fill="red" size="16" />) :
                              (<HeartIcon color="red" style={tw``} size="16" />)
                          }
                          </View>
                        </TouchableOpacity>
{/* -----------------------List-PERSON---------------- */}
                          <Person
                            name={item.name}
                            birth_year={item.birth_year}
                            gender={item.gender}
                            homeworld={item.homeworld}
                            species={item.species[0]}
                            item={item}
                          />

                      </View>
                    )}
                  />

                </View>
              </View>
            
{/* -----------------------Pagination-------------------- */}
             
              <View style={tw`flex-row border-2 gap-2 border-gray-300 p-2 justify-end`}>
                <Text>{arr[page]} of {persons.count}</Text>
                
                <View style={tw`flex-row gap-2`}>
                  <TouchableOpacity onPress={() => {
                    if (page >= 1) {
                      setPage(page - 1)
                      fetchPosts(persons.previous)
                    } else {
                      return;
                    }
                  }}>
                    <Text color={page > 0 ? 'black' : 'gray'}>&lt;</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    if (Math.ceil(persons.count/10) > page + 1) {
                      setPage(page + 1);
                      fetchPosts(persons.next)
                    } else {
                      return;
                   }
                  }}>
                    <Text>&gt;</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;
