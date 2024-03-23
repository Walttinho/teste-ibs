import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from '../person/person.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  street: string;

  @Column({ length: 500 })
  city: string;

  @Column({ length: 500 })
  state: string;

  @Column({ length: 10 })
  zipCode: string;

  @Column({ length: 500 })
  country: string;

  @ManyToOne(() => Person, (person) => person.addresses)
  person: Person;
}
