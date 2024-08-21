import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'user_id ', type: 'int' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id:', this.id);
  }
}