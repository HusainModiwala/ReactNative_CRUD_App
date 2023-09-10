import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetUsers from './components/GetUsers';
import SearchUser from './components/SearchUser';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStore from './components/AsyncStore';
import CreateUser from './components/CreateUser';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Get Users" component={GetUsers} />
          <Stack.Screen name="Create User" component={CreateUser} />
          <Stack.Screen name="Search User" component={SearchUser} />
          <Stack.Screen name="Async" component={AsyncStore} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
