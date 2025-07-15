import { IsString } from "class-validator";

export class ValidateSettingsMasterCodeDto {
  @IsString()
  code: string;
}
