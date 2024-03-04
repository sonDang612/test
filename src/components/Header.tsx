import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../styles/colors';
type Props = {
  score: number;
  isPaused: boolean;
  isGameOver: boolean;
  resetAll: () => void;
  setIsPaused: (value: boolean) => void;
};
const Header = (props: Props) => {
  const { isPaused, isGameOver, score, setIsPaused, resetAll } = props;
  const handleClick = () => {
    if (isGameOver) {
      resetAll();
    } else {
      setIsPaused(!isPaused);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleClick}>
        <View style={styles.btn}>
          <Text style={styles.text}>
            {isGameOver ? 'Chơi lại' : isPaused ? 'Tiếp tục' : 'Dừng'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.storeContainer}>
        <Text>Điểm số</Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.PRIMARY,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: COLORS.BACKGROUND,
  },
  btn: {
    backgroundColor: COLORS.PRIMARY,
    padding: 5,
    borderRadius: 2,
  },
  text: {
    color: '#fff',
  },
  storeContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default React.memo(Header);
