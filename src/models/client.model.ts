import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Seller} from './seller.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_client_id_seller: {
          name: 'fk_client_id_seller',
          entity: 'Seller',
          entityKey: 'id',
          foreignKey: 'id_seller',
        },
      },
    },
  }
)
export class Client extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  cellphone: string;

  @belongsTo(() => Seller, {name: 'madeitbyaseller'})
  id_seller: number;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
