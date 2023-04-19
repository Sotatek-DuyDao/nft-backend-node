import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AppBaseEntity } from '@entities/base.entity';
import { IToken } from '@/interfaces/token.interface';
import { UserEntity } from './users.entity';

@Entity({ name: 'token' })
export class TokenEntity extends AppBaseEntity implements IToken {
    @PrimaryColumn({name: "token_id", nullable: false})
    id: string;
    @Column({ name: "price", nullable: false })
    price: string;
    @Column({ name: "token_uri", nullable: false })
    tokenURI: string;
    @OneToOne(() => UserEntity, {eager: true})
    @JoinColumn({name: "creator_id"})
    creatorId: UserEntity;
    @OneToOne(() => UserEntity, {eager: true})
    @JoinColumn({name: "owner_id"})
    ownerId: UserEntity;
}
