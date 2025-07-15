import { IsString } from "class-validator";

export class ValidateMasterPasswordDto {
  @IsString()
  password: string;
}
