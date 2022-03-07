import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_user_seller_id_seller: {
        name: 'fk_user_seller_id_seller',
        entity: 'Seller',
        entityKey: 'id',
        foreignKey: 'id_seller',
      },
    },
  },
})
export class UserSeller extends Entity {
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
  user: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
  })
  id_seller?: number;

  constructor(data?: Partial<UserSeller>) {
    super(data);
  }
}

export interface UserSellerRelations {
  // describe navigational properties here
}

export type UserSellerWithRelations = UserSeller & UserSellerRelations;
