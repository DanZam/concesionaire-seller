import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Client} from './client.model';
import {UserSeller} from './user-seller.model';

@model()
export class Seller extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  document: string;

  @property({
    type: 'string',
    required: true,
  })
  cellphone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Client, {keyTo: 'id_seller'})
  clients: Client[];

  @hasOne(() => UserSeller, {keyTo: 'id_seller'})
  hasoneuserseller: UserSeller;

  constructor(data?: Partial<Seller>) {
    super(data);
  }
}

export interface SellerRelations {
  // describe navigational properties here
}

export type SellerWithRelations = Seller & SellerRelations;
