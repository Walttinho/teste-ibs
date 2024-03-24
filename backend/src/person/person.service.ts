import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { Address } from 'src/address/address.entity';
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
    return savedPerson;
  }
}
