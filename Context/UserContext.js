/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getContextFromStorage().then(context => setUserDetails(context || []));
  }, []);

  useEffect(() => {
    saveContext();
  }, [userDetails]);

  const addUser = ({username, mobilenumber, address, profileimage}) => {
    setUserDetails([
      ...userDetails,
      {
        id: new Date().getTime(),
        username,
        mobilenumber,
        address,
        profileimage,
      },
    ]);
  };

  const editUser = ({id, username, mobilenumber, address, profileimage}) => {
    const newUserDetails = userDetails.map(item => {
      if (item.id === id) {
        return {
          ...item,
          username,
          mobilenumber,
          address,
          profileimage,
        };
      } else {
        return item;
      }
    });

    setUserDetails(newUserDetails);
  };

  async function saveContext() {
    return await AsyncStorage.setItem(
      '@user-context',
      JSON.stringify(userDetails),
    );
  }

  async function getContextFromStorage() {
    return JSON.parse(await AsyncStorage.getItem('@user-context'));
  }

  return (
    <UserContext.Provider
      value={{
        data: userDetails,
        addUser,
        editUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
