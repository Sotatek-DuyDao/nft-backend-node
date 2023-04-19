import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AppBaseEntity extends BaseEntity {
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
