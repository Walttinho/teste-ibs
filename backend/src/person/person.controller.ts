import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personService.findById(id);
  }

  @Post(':id/address')
  addAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.personService.addAddress(id, createAddressDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.updatePerson(id, updatePersonDto);
  }
}
