import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../PaginationDto";

export class BlackListedUserPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q: string = "";
}
