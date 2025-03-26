import { AbstractEntity } from "src/common/abstract/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class WalletEntity extends AbstractEntity{
  @Column({default:"0"})
  balance:string

  @Column({default:"0"})
  token:string
}