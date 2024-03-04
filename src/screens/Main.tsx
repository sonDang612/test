import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trang thật...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Main;
