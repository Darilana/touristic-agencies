import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', {
    default: ''
  })
  description: string;

  @Column('int')
  phoneNumber: number;

  @Column('enum', {
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE']
  })
  status: 'ACTIVE' | 'INACTIVE';
}
