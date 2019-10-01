import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Release extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  stock: number;
}
