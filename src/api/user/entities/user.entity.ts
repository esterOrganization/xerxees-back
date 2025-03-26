import { AbstractEntity } from "src/common/abstract/abstract.entity"
import { Entity, Column, BeforeInsert, Unique, JoinColumn, OneToOne } from "typeorm"
import { sha256 } from 'js-sha256';
import { WalletEntity } from "src/api/wallet/entities/wallet.entity";

@Entity()
export class UserEntity extends AbstractEntity{
  @Column({nullable:true})
  userName:string

  @Column({nullable:true})
  firstName:string
  
  @Column({nullable:true})
  lastName:string

  @Column({unique:true})
  email:string

  @Column({nullable:true})
  birthDate:Date

  @Column({nullable:true})
  password:string

  @Column({nullable:true})
  lastLogin:Date

  @OneToOne(() => WalletEntity)
  @JoinColumn()
  Wallet: WalletEntity

  @BeforeInsert()
  public hashPassword():void
  {
    if(this.password)
    {
        this.password=sha256(this.password)
    }
  }
}