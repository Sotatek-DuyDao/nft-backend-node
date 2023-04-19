import { UserEntity } from "@/entities/users.entity";

export interface IToken{
    id: string;
    tokenURI: string;
    creatorId: UserEntity;
    ownerId: UserEntity;
    price: string;
}