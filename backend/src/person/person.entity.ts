import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Address } from '../address/address.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  sex: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ length: 500 })
  maritalStatus: string;

  @OneToMany(() => Address, (address) => address.person)
  addresses: Address[];
}
