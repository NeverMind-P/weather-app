import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  data: any;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  part: string;
}
