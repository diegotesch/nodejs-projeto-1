import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agendamentos')
export default class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}
