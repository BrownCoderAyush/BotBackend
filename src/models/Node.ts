import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Node {
  @PrimaryColumn()
  nodeId!: number; 

  @PrimaryColumn()
  projectId!: number;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @Column()
  content!: string;

  @Column()
  type!: string;

  @Column({ nullable: false })
  x!: number;

  @Column({ nullable: false })
  y!: number;

  @ManyToMany(() => Node, (node) => node.childNodes)
  @JoinTable({
    name: "NodeParentRelations",
    joinColumns: [
      { name: "childNodeId", referencedColumnName: "nodeId" },
      { name: "childProjectId", referencedColumnName: "projectId" }
    ],
    inverseJoinColumns: [
      { name: "parentNodeId", referencedColumnName: "nodeId" },
      { name: "parentProjectId", referencedColumnName: "projectId" }
    ]
  })
  parentNodes!: Node[];

  @ManyToMany(() => Node, (node) => node.parentNodes)
  childNodes!: Node[];
} 