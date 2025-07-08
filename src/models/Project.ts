import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Client, { nullable: false })
  client!: Client;
} 