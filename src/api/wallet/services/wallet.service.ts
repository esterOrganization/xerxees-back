import { Injectable } from "@nestjs/common";
import { WalletRepository } from "../repositories/wallet.repository";
import { WalletEntity } from "../entities/wallet.entity";

@Injectable()
export class WalletService{
    public constructor(private  readonly walletRepository:WalletRepository){}

    public async createWallet():Promise<WalletEntity>
    {
     return await this.walletRepository.createWallet()
    }
}