import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.createPerson(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':personId')
  findOne(@Param('personId', ParseIntPipe) personId: number) {
    return this.personService.findById(personId);
  }

  @Post(':personId')
  addAddress(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.personService.addAddress(personId, createAddressDto);
  }

  @Put(':personId')
  async update(
    @Param('personId', ParseIntPipe) personId: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.updatePerson(personId, updatePersonDto);
  }

  @Put(':personId/:addressId')
  async updateAddress(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.personService.updateAddress(
      personId,
      addressId,
      updateAddressDto,
    );
  }

  @Delete(':personId')
  delete(@Param('personId', ParseIntPipe) personId: number) {
    return this.personService.deletePerson(personId);
  }

  @Delete(':personId/:addressId')
  async deleteAddress(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return this.personService.deleteAddress(personId, addressId);
  }
}
