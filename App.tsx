import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Astroid from './src/screens/Astroid';
import {NavigationContainer} from '@react-navigation/native';
import AsteroidDetails from './src/screens/AstroidDetails';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Astroid}
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
