import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './entities/person.entity';
import { Address } from 'src/person/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Address])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
