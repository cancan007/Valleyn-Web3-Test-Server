import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  //@PrimaryGeneratedColumn()
  //id: number;
  @Column()
  username: string;

  @PrimaryColumn()
  email: string;

  /*@Column()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;*/
}
