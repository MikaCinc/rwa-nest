
import { QuestionTypeEnum } from 'src/enums';
import { Kategorija } from 'src/kategorija/entities/kategorija.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Pitanje {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'timestamptz', nullable: false, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated!: Date;

    @Column({ type: 'timestamptz', nullable: false, default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated!: Date;

    @Column({ type: 'text', nullable: false })
    public text!: string;

    @Column({ type: 'text', nullable: false, default: QuestionTypeEnum.BOOL })
    public type!: QuestionTypeEnum;

    @Column({ type: 'text', nullable: false, default: '' })
    public answer!: string;

    @Column({ type: 'boolean', default: true, nullable: false })
    isCorrect: boolean;

    @Column({ type: 'boolean', default: false, nullable: false })
    isFeatured: boolean;

    // vise pitanja mogu imati vise kategorija
    @ManyToMany(() => Kategorija, (kategorija: Kategorija) => kategorija.pitanja)
    @JoinTable({ name: 'pitanjeKategorije' })
    public categories: Kategorija[];

    // vise pitanja mogu imati vise kategorija
    @ManyToMany(() => User, (user: User) => user.favourites)
    @JoinTable({ name: 'pitanjaFavoriti' })
    public users: User[];
}