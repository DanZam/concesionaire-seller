import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Client, ClientRelations, Seller} from '../models';
import {SellerRepository} from './seller.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly madeitbyaseller: BelongsToAccessor<Seller, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SellerRepository') protected sellerRepositoryGetter: Getter<SellerRepository>,
  ) {
    super(Client, dataSource);
    this.madeitbyaseller = this.createBelongsToAccessorFor('madeitbyaseller', sellerRepositoryGetter,);
    this.registerInclusionResolver('madeitbyaseller', this.madeitbyaseller.inclusionResolver);
  }
}
