import {
  IsString,
  IsDate,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SexEnum } from './create-person.dto';

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  Name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SexEnum)
  Sex?: SexEnum;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  BirthDate?: Date;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  MaritalStatus?: string;
}
