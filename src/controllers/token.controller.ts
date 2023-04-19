import { CreateTokenDto, TransferTokenOwnerDto } from "@/dtos/token.dto";
import { TokenService } from "@/services/token.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class TokenController {
    public tokenService = Container.get(TokenService)
    public async createToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token: CreateTokenDto = req.body;
            await this.tokenService.createToken(token);
            return res.status(200).json({success: true})
        }
        catch (error) {
            next(error);
        }
    }
    public async transferTokenOwner(req: Request, res: Response, next: NextFunction) {
        try {
            const token: TransferTokenOwnerDto = req.body;
            await this.tokenService.transferTokenOwner(token);
            return res.status(200).json({success: true})
        }
        catch (error) {
            next(error);
        }
    }
    public async getTokensCreated(req: Request, res: Response, next: NextFunction) {
        try {
            const walletId: string = req.params.walletId;
            const result = await this.tokenService.getTokensCreated(walletId)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
    public async getMyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const walletId: string = req.params.walletId;
            const result = await this.tokenService.getMyToken(walletId)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
}