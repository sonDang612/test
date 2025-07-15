import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBlackListedUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  nickName: string;

  @IsString()
  @IsOptional()
  ipAddress: string;

  @IsArray()
  @IsNumber({}, { each: true })
  blackListedTypeIds: number[];

  @IsString()
  @IsOptional()
  bankName: string;

  @IsString()
  @IsOptional()
  bankAccount: string;

  @IsString()
  @IsOptional()
  bankOwner: string;
}
