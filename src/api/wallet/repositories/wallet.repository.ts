import { Inject, Injectable } from "@nestjs/common";
import { PostgresProviderConstant } from "src/orm/postgres-provider.constant";
import { DataSource, Repository } from "typeorm";
import { WalletEntity } from "../entities/wallet.entity";

@Injectable()
export class WalletRepository extends Repository<WalletEntity>{
  constructor(@Inject(PostgresProviderConstant) private postgresDataSource:DataSource) {
    super(WalletEntity,postgresDataSource.createEntityManager());
  }

  public async createWallet():Promise<WalletEntity>
  {
    const walletInstance=this.create()
    return await this.save(walletInstance)
  }
}