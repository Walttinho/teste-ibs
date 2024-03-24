import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { Address } from 'src/person/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
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

  async findById(personId: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }
    return person;
  }

  async addAddress(
    personId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      Person: person,
    });
    await this.addressRepository.save(address);

    return person;
  }

  async updatePerson(
    personId: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    if (updatePersonDto.Name) {
      person.Name = updatePersonDto.Name;
    }
    if (updatePersonDto.Sex) {
      person.Sex = updatePersonDto.Sex;
    }
    if (updatePersonDto.BirthDate) {
      person.BirthDate = updatePersonDto.BirthDate;
    }
    if (updatePersonDto.MaritalStatus) {
      person.MaritalStatus = updatePersonDto.MaritalStatus;
    }

    await this.personRepository.save(person);
    return person;
  }

  async updateAddress(
    personId: number,
    addressId: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const address = person.Addresses.find(
      (address) => address.Id === addressId,
    );
    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    if (updateAddressDto.Street) {
      address.Street = updateAddressDto.Street;
    }
    if (updateAddressDto.City) {
      address.City = updateAddressDto.City;
    }
    if (updateAddressDto.State) {
      address.State = updateAddressDto.State;
    }
    if (updateAddressDto.ZipCode) {
      address.ZipCode = updateAddressDto.ZipCode;
    }
    if (updateAddressDto.Country) {
      address.Country = updateAddressDto.Country;
    }

    await this.addressRepository.save(address);
    return person;
  }

  async deletePerson(personId: number): Promise<void> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }
    await this.personRepository.remove(person);
  }

  async deleteAddress(personId: number, addressId: number): Promise<void> {
    const person = await this.personRepository.findOne({
      where: { Id: personId },
      relations: ['Addresses'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const address = person.Addresses.find(
      (address) => address.Id === addressId,
    );
    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    await this.addressRepository.remove(address);
  }
}
