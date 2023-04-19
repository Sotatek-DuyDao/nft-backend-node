import { CreateTokenDto, TransferTokenOwnerDto } from "@/dtos/token.dto";
import { TokenEntity } from "@/entities/token.entity";
import { UserEntity } from "@/entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

@Service()
@EntityRepository()
export class TokenService extends Repository<TokenEntity>{
    public async createToken(token: CreateTokenDto) {
        const currentToken = await TokenEntity.findOne({
            where: { id: token.id }
        })
        if (!currentToken) {
            const currentCreator = await UserEntity.findOne({
                where: { walletAddress: token.creatorId }
            })
            const newToken = new TokenEntity()
            newToken.id = token.id;
            newToken.price = token.price;
            newToken.tokenURI = token.tokenURI;
            newToken.creatorId = currentCreator;
            newToken.ownerId = currentCreator;
            await newToken.save()
        }
    }
    public async getTokensCreated(walletId: string) {
        return TokenEntity.find({
            where: {
                creatorId: walletId
            }
        })
    }
    public async getMyToken(walletId: string) {
        return TokenEntity.find({
            where: {
                ownerId: walletId
            }
        })
    }
    public async transferTokenOwner(token: TransferTokenOwnerDto) {
        const currentToken = await TokenEntity.findOne({
            where: { id: token.id }
        })
        if (!currentToken) {
            throw new HttpException(404, "Token not found")
        }
        const newOwner = await UserEntity.findOne({
            where: {
                id: token.ownerId
            }
        })
        await TokenEntity.update({ id: currentToken.id }, { ownerId: newOwner })
        return { success: true }
    }
}