import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Person } from '../person/person.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 500 })
  Street: string;

  @Column({ length: 500 })
  City: string;

  @Column({ length: 500 })
  State: string;

  @Column({ length: 10 })
  ZipCode: string;

  @Column({ length: 500 })
  Country: string;

  @ManyToOne(() => Person, (person) => person.Addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  Person: Person;
}
