import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UserSeller, UserSellerRelations} from '../models';

export class UserSellerRepository extends DefaultCrudRepository<
  UserSeller,
  typeof UserSeller.prototype.id,
  UserSellerRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UserSeller, dataSource);
  }
}
