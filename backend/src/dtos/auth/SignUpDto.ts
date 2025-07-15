import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ERole } from "../../constants/enums/role";

export class SignUpDto {
  @IsString()
  @MinLength(3)
  userName: string;

  @IsString()
  password: string;

  @IsString()
  nickName: string;

  @IsEnum(ERole)
  @IsOptional()
  role: ERole = ERole.USER;
}
