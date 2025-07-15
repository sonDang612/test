import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @MinLength(3)
  userName: string;

  @IsString()
  password: string;
}
