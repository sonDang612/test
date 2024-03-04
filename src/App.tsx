import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import FakeGame from './screens/FakeGame';
import Main from './screens/Main';
import { firebase } from '../config';

const Stack = createNativeStackNavigator();

const App = () => {
  const [load, setLoad] = React.useState(false);
  const statusRef = firebase.firestore().collection('status');
  React.useEffect(() => {
    statusRef?.onSnapshot((querySnapshot) => {
      const result: any = [];
      querySnapshot.forEach((doc) => {
        const { isApproved } = doc.data();
        result.push(isApproved);
      });

      setLoad(result[0]);
    });
  }, [statusRef]);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!load ? (
              <Stack.Screen name="FakeGame" component={FakeGame} />
            ) : (
              <Stack.Screen name="Main" component={Main} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
