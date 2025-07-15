import { IsNotEmpty, IsNumber } from "class-validator";

export class DetailsBlackListedUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
