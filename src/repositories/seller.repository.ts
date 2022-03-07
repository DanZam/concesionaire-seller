import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Seller, SellerRelations, Client, UserSeller} from '../models';
import {ClientRepository} from './client.repository';
import {UserSellerRepository} from './user-seller.repository';

export class SellerRepository extends DefaultCrudRepository<
  Seller,
  typeof Seller.prototype.id,
  SellerRelations
> {

  public readonly clients: HasManyRepositoryFactory<Client, typeof Seller.prototype.id>;

  public readonly hasoneuserseller: HasOneRepositoryFactory<UserSeller, typeof Seller.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('UserSellerRepository') protected userSellerRepositoryGetter: Getter<UserSellerRepository>,
  ) {
    super(Seller, dataSource);
    this.hasoneuserseller = this.createHasOneRepositoryFactoryFor('hasoneuserseller', userSellerRepositoryGetter);
    this.registerInclusionResolver('hasoneuserseller', this.hasoneuserseller.inclusionResolver);
    this.clients = this.createHasManyRepositoryFactoryFor('clients', clientRepositoryGetter,);
    this.registerInclusionResolver('clients', this.clients.inclusionResolver);
  }
}
