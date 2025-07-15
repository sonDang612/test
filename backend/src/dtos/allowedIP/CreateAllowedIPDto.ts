import { IsString } from "class-validator";

export class CreateAllowedIPDto {
  @IsString()
  ipAddress: string;
}
