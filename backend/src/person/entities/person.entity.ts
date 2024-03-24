import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 500 })
  Name: string;

  @Column({ length: 500 })
  Sex: string;

  @Column({ type: 'date' })
  BirthDate: Date;

  @Column({ length: 500 })
  MaritalStatus: string;

  @OneToMany(() => Address, (address) => address.Person, { eager: true })
  @JoinColumn()
  Addresses: Address[];
}
