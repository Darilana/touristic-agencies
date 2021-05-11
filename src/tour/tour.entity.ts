import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Agency } from '../agency/agency.entity';
import { Direction } from '../direction/direction.entity';
import { Category } from '../category/category.entity';

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

  @ManyToMany(() => Direction, {
    eager: true,
    cascade: true
  })
  @JoinTable()
  directions: Direction[];

  @ManyToMany(() => Category, {
    eager: true,
    cascade: true
  })
  @JoinTable()
  categories: Category[];
}
