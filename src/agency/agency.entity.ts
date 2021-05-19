import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Office } from '../office/office.entity';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', {
    default: '',
  })
  description: string;

  @Column('varchar', { length: 15 })
  phoneNumber: string;

  @Column('enum', {
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: 'ACTIVE' | 'INACTIVE';

  @OneToMany(() => Office, (office) => office.agency, {
    eager: true,
  })
  offices: Office[];
}
