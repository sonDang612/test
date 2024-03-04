import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Coordinate } from '../types';
type Props = {
  position: Coordinate;
};
const Food = (props: Props) => {
  const { position } = props;
  return (
    <View
      style={[{ top: position.y * 10, left: position.x * 10 }, styles.food]}
    />
  );
};

const styles = StyleSheet.create({
  food: {
    width: 15,
    height: 15,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: '#2196F3',
  },
});

export default React.memo(Food);
