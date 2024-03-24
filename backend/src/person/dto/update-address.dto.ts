import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  City?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  State?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ZipCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Country?: string;
}
