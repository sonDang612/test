import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteBlackListedUserDto {
  @IsNumber()
  @IsNotEmpty()
  blackListedUserId: number;

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  @IsString()
  ipAddress: string = "";
}
