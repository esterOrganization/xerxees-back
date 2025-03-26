import { PrimaryGeneratedColumn } from 'typeorm';
import { UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}