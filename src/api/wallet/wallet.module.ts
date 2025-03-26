import { Module } from "@nestjs/common";
import { WalletService } from "./services/wallet.service";
import { WalletRepository } from "./repositories/wallet.repository";

@Module({
    providers:[WalletService,WalletRepository],
     exports:[WalletService]
})
export class WalletModule{}