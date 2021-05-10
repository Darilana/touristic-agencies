import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Agency } from '../agency/agency.entity';

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address: string;

  @Column('int')
  phoneNumber: number;

  @Column('text')
  workingHours: string;

  @ManyToOne(() => Agency, agency => agency.offices, {
    nullable: false
  })
  agency: Agency
}
