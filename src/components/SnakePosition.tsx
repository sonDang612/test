import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../styles/colors';
import { Coordinate } from '../types';
type Props = {
  snakePositions: Coordinate[];
};
const SnakePosition = (props: Props) => {
  const { snakePositions } = props;
  return (
    <Fragment>
      {snakePositions.map((position: Coordinate, index: number) => {
        const positionStyle = {
          left: position.x * 10,
          top: position.y * 10,
        };
        return (
          <View key={index} style={[styles.snakePosition, positionStyle]} />
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  snakePosition: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
  },
});

export default SnakePosition;
