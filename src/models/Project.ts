import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, { nullable: false })
  user!: User;
} 