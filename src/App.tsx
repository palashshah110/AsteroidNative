import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Asteroid from './screens/Asteroid.tsx';
import {NavigationContainer} from '@react-navigation/native';
import AsteroidDetails from './screens/AsteroidDetails.tsx';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Asteroid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AsteroidDetails"
          component={AsteroidDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
