import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, { nullable: false })
  project!: Project;

  @Column()
  content!: string;

  @Column({ type: "int" })
  x!: number;

  @Column({ type: "int" })
  y!: number;
  
  @Column()
  type!: string;

  @ManyToMany(() => Node, (node) => node.childNodes)
  @JoinTable({ name: "NodeParentRelations", joinColumn: { name: "childNodeId", referencedColumnName: "id" }, inverseJoinColumn: { name: "parentNodeId", referencedColumnName: "id" } })
  parentNodes!: Node[];

  @ManyToMany(() => Node, (node) => node.parentNodes)
  childNodes!: Node[];
} 