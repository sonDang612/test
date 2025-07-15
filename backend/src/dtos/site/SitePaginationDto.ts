import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../PaginationDto";
import { ERole } from "../../constants/enums/role";

export class SitePaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q: string = "";

  @IsOptional()
  role: ERole = ERole.USER;
}
