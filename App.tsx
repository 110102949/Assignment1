import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider} from './Context/UserContext';
import MainScreen from './Screens/MainScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerTitle: 'Profile'}}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
