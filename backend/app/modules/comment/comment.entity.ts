// src/comment/comment.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Forum } from "../forum/forum.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column()
  userId: string;

  @Column({default: "John Doe"})
  userName: string;

  @Column()
  forumId: string;

  @ManyToOne(() => Forum, { onDelete: "CASCADE" })
  @JoinColumn({ name: "forumId" })
  forum: Forum;
}
