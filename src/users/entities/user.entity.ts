import { UserTypeEnum } from "src/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'text', nullable: false, unique: true })
    public username!: string;

    @Column({ type: 'text', nullable: false })
    public password!: string;

    @Column({ type: 'text', nullable: false, unique: true })
    public email!: string;

    @Column({ type: 'text', nullable: false, default: UserTypeEnum.USER })
    public type!: string;

    @Column({ type: 'timestamptz', nullable: true, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated!: Date;

    @Column({ type: 'timestamptz', nullable: true, default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated!: Date;

};