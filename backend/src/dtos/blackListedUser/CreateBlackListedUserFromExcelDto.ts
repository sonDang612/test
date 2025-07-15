import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBlackListedUserFromExcelDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  bankAccount: string;

  @IsString()
  @IsOptional()
  ipAddress: string;

  @IsString()
  @IsNotEmpty()
  bankOwner: string;
}

export class CreateBlackListUsersFromExcelDto {
  @IsArray()
  data: CreateBlackListedUserFromExcelDto[];
}
