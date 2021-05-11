import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Direction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
