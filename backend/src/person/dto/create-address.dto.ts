import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  Street: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  City: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  State: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  ZipCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  Country: string;
}
