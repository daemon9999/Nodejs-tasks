import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;
}
