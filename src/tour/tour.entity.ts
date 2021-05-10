import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Agency } from '../agency/agency.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', {
    default: ''
  })
  description: string;

  @Column('int')
  price: number;

  @Column('text')
  duration: string;

  @Column('text', {
    default: null
  })
  season: string;

  @ManyToOne(() => Agency, agency => agency.offices, {
    nullable: false
  })
  agency: Agency
}
