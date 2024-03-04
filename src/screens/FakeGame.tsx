import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { INITIAL_DATA } from '../constants';
import { COLORS } from '../styles/colors';
import { Coordinate, Direction, GestureEventType } from '../types';
import SnakePosition from '../components/SnakePosition';
import { checkGameOver } from '../utils/checkGameOver';
import Food from '../components/Food';
import { checkEatFood } from '../utils/checkEatFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Header from '../components/Header';
import Toast from 'react-native-toast-message';

const FakeGame = () => {
  const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
  const [snakePositions, setSnakePositions] = React.useState<Coordinate[]>(
    INITIAL_DATA.SNAKE_POSITIONS
  );
  const [food, setFood] = React.useState<Coordinate>(
    INITIAL_DATA.FOOD_POSITION
  );
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.RIGHT);
      } else {
        setDirection(Direction.LEFT);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.DOWN);
      } else {
        setDirection(Direction.UP);
      }
    }
  };

  const moveSnake = React.useCallback(() => {
    setSnakePositions((prev) => {
      const snakePositionHead = prev[0];
      const newHead = { ...snakePositionHead };
      if (checkGameOver(snakePositionHead, INITIAL_DATA.GAME_BOUNDS)) {
        setIsGameOver((isOver) => !isOver);
        return prev;
      }
      switch (direction) {
        case Direction.UP:
          newHead.y -= 1;
          break;
        case Direction.DOWN:
          newHead.y += 1;
          break;
        case Direction.LEFT:
          newHead.x -= 1;
          break;
        case Direction.RIGHT:
          newHead.x += 1;
          break;
        default:
          break;
      }

      if (checkEatFood(newHead, food, 2)) {
        setScore((prevScore) => prevScore + INITIAL_DATA.SCORE_INCREMENT);
        setFood(
          randomFoodPosition(
            INITIAL_DATA.GAME_BOUNDS.xMax,
            INITIAL_DATA.GAME_BOUNDS.yMax
          )
        );
        return [newHead, ...prev];
      }

      return [newHead, ...prev.slice(0, -1)];
    });
  }, [direction, food]);

  const resetAll = React.useCallback(() => {
    setDirection(Direction.RIGHT);
    setSnakePositions(INITIAL_DATA.SNAKE_POSITIONS);
    setFood(INITIAL_DATA.FOOD_POSITION);
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
  }, []);
  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        if (!isPaused) {
          moveSnake();
        }
      }, INITIAL_DATA.MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    } else {
      Toast.show({
        type: 'info',
        text1: 'Bạn đã thua!!!',
        text2: `Tổng số điểm: ${score}`,
        visibilityTime: 3000,
        position: 'top',
      });
    }
  }, [snakePositions, isGameOver, isPaused, score, moveSnake]);

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          score={score}
          isGameOver={isGameOver}
          resetAll={resetAll}
        />
        <View style={styles.boundaries}>
          <SnakePosition snakePositions={snakePositions} />
          <Food position={food} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  boundaries: {
    flex: 1,
    borderColor: COLORS.PRIMARY,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: COLORS.BACKGROUND,
  },
});

export default FakeGame;
