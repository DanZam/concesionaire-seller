import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Client,
  Seller,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientSellerController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/seller', {
    responses: {
      '200': {
        description: 'Seller belonging to Client',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seller)},
          },
        },
      },
    },
  })
  async getSeller(
    @param.path.number('id') id: typeof Client.prototype.id,
  ): Promise<Seller> {
    return this.clientRepository.madeitbyaseller(id);
  }
}
