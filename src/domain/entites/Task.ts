import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, length: 50 })
    name?: string; 

    @Column({nullable:false})
    description?: string;

    @CreateDateColumn()
    created_at?: Date;

    @Column({nullable:true})
    tags?: string;

    @Column({type:'boolean', default: false})
    done?: boolean;
}
