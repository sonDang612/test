import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../PaginationDto";

export class AllowedIPPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q: string = "";
}
