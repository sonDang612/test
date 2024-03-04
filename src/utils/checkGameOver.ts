import { Coordinate } from '../types';

export const checkGameOver = (snakeHead: Coordinate, boundaries: any) => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y > boundaries.yMax ||
    snakeHead.y < boundaries.yMin
  );
};
