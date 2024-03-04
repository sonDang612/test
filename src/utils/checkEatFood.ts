import { Coordinate } from '../types';

export const checkEatFood = (
  head: Coordinate,
  food: Coordinate,
  area: number
) => {
  const distance_between_food_and_snake_x = Math.abs(head.x - food.x);
  const distance_between_food_and_snake_y = Math.abs(head.y - food.y);

  return (
    distance_between_food_and_snake_x < area &&
    distance_between_food_and_snake_y < area
  );
};
