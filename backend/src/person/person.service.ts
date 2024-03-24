import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { Address } from 'src/person/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto);
    const savedPerson = await this.personRepository.save(person);

    const address = this.addressRepository.create({
      ...createPersonDto.Address,
      Person: savedPerson,
    });
    await this.addressRepository.save(address);

    const today = new Date();
    const birthDate = new Date(savedPerson.BirthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthsDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthsDifference < 0 ||
      (monthsDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    if (today > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const differenceInMilliseconds = nextBirthday.getTime() - today.getTime();
    const daysUntilNextBirthdayClean = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24),
    );

    let message = `The person was successfully registered. Age: ${age} years.`;
    if (daysUntilNextBirthdayClean === 0) {
      message += ' Happy birthday!';
    } else {
      message += ` There are ${daysUntilNextBirthdayClean} days until the next birthday.`;
    }

    const newPerson = {
      ...savedPerson,
      Message: message,
    } as Person & { Message: string };

    return newPerson;
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({ relations: ['Addresses'] });
  }

  async findById(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: id },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async addAddress(
    id: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: id },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      Person: person,
    });
    await this.addressRepository.save(address);

    return person;
  }
}
