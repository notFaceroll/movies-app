import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'favorites'

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
      return;
    }

    async function storeData() {
      const parsedData = JSON.stringify(myFavorites);
      await AsyncStorage.setItem(storageKey, parsedData);
    }

    storeData();
  }, [myFavorites]);

  async function handleAddMovieToFavorites(movie) {
    // get the old data
    const response = await AsyncStorage.getItem(storageKey);
    const prevData = response ? JSON.parse(response) : [];

    // updated the state
    const updatedData = [...prevData, movie]
    setMyFavorites(updatedData);
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