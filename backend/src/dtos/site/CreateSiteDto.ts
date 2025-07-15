import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../PaginationDto";

export class CreateSiteDto extends PaginationDto {
  @IsString()
  ipAddress: string;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsString()
  name: string;
}
