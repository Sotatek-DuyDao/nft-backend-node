import { IToken } from "@/interfaces/token.interface";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDto implements Omit<IToken, "ownerId" | "creatorId">{
    @IsNotEmpty()
    @IsString()
    tokenURI: string;
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsString()
    creatorId: string;
    @IsNotEmpty()
    @IsString()
    price: string;
}
export class TransferTokenOwnerDto {
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsString()
    ownerId: string;
}
export class GetTokensDto{
    walletId: string
}