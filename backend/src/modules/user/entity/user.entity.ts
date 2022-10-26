import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  //@PrimaryGeneratedColumn()
  //id: number;
  @Column({ unique: true })
  username: string;

  @PrimaryColumn()
  email: string;

  @Column({ unique: true })
  id: string;

  @Column()
  password: string;
  /*@Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;*/
}
