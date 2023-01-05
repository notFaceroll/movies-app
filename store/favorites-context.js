import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'favorites'

async function getStorageValue() {

  const response = await AsyncStorage.getItem('favorites');
  const data = response ? JSON.parse(response) : [];
  return data;
  // return response;

  // } catch (catchError) {
  //   console.log({ catchError });
  // }
}

const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(storageKey, jsonValue)
  } catch(e) {
    // save error
  }

  console.log('Done.')
}

// setObjectValue([]);

export const FavoritesContext = createContext([]);
let firstRender = true;
export const FavoritesProvider = ({ children }) => {
  const [myFavorites, setMyFavorites] = useState([]);
  

  // get the initial store data
  useEffect(() => {
    async function fetchData() {
      const storedValues = await AsyncStorage.getItem(storageKey);
      const initialData = storedValues ? JSON.parse(storedValues) : [];
      setMyFavorites(initialData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      console.log('First render')
      return;
    }

    async function storeData() {
      const parsedData = JSON.stringify(myFavorites);
      await AsyncStorage.setItem(storageKey, parsedData);
    }
    console.log('2nd+ render')

    storeData();
  }, [myFavorites]);

  async function handleAddMovieToFavorites(movie) {
    // get the old data
    const response = await AsyncStorage.getItem(storageKey);
    const prevData = response ? JSON.parse(response) : [];

    // updated the state
    const updatedData = [...prevData, movie]
    setMyFavorites(updatedData);

    // parse the updated data e store it
    // const parsedData = JSON.stringify(myFavorites);
    // await AsyncStorage.setItem('favorites', parsedData);
  }



  async function removeMovieFromFavorites(id) {
    const response = await AsyncStorage.getItem(storageKey);

    if (!response) {
      return;
    }

    const prevData = JSON.parse(response);
    const updatedData = prevData.filter((movie) => movie.id !== id);

    setMyFavorites(updatedData);
  }

  const favCtx = {
    favorites: myFavorites,
    addMovieToFavorites: handleAddMovieToFavorites,
    removeMovieFromFavorites,
  }

  return (
    <FavoritesContext.Provider value={favCtx}>
      {children}
    </FavoritesContext.Provider>
  )
}