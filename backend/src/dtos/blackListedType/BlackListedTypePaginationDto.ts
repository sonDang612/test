import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../PaginationDto";

export class BlackListedTypePaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q: string = "";
}
