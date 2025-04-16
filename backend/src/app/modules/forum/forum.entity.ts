// src/forum/forum.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Forum {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "jsonb", default: [] })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: "" })
  userId: string;
}
