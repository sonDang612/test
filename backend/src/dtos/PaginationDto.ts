import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export abstract class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsEnum(SortOrder)
  sort?: SortOrder = SortOrder.DESC;
}
