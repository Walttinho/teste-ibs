import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export enum SexEnum {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

export class CreatePersonDto {
  constructor(
    Name: string,
    Sex: SexEnum,
    BirthDate: Date,
    MaritalStatus: string,
  ) {
    this.Name = Name;
    this.Sex = Sex;
    this.BirthDate = BirthDate;
    this.MaritalStatus = MaritalStatus;
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  public Name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SexEnum)
  public Sex: SexEnum;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public BirthDate: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  public MaritalStatus: string;

  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  public Address: CreateAddressDto;
}
