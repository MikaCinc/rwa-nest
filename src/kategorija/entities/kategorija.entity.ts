import { Pitanje } from "src/pitanje/entities/pitanje.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'kategorija' })
export class Kategorija {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'timestamptz', nullable: false, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated!: Date;

    @Column({ type: 'text', nullable: false })
    public name!: string;

    // vise kategorija idu na vise Pitanja
    @ManyToMany(() => Pitanje, (pitanje: Pitanje) => pitanje.categories, { onDelete: "CASCADE" })
    public pitanja: Pitanje[];
};