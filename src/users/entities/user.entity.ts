import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'text', nullable: false })
    public username!: string;

    @Column({ type: 'text', nullable: false })
    public password!: string;

    @Column({ type: 'text', nullable: false })
    public email!: string;

    @Column({ type: 'timestamptz', nullable: true, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated!: Date;

    @Column({ type: 'timestamptz', nullable: true, default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated!: Date;

};