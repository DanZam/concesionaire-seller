import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Seller,
  Client,
} from '../models';
import {SellerRepository} from '../repositories';

export class SellerClientController {
  constructor(
    @repository(SellerRepository) protected sellerRepository: SellerRepository,
  ) { }

  @get('/sellers/{id}/clients', {
    responses: {
      '200': {
        description: 'Array of Seller has many Client',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.sellerRepository.clients(id).find(filter);
  }

  @post('/sellers/{id}/clients', {
    responses: {
      '200': {
        description: 'Seller model instance',
        content: {'application/json': {schema: getModelSchemaRef(Client)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seller.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClientInSeller',
            exclude: ['id'],
            optional: ['id_seller']
          }),
        },
      },
    }) client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.sellerRepository.clients(id).create(client);
  }

  @patch('/sellers/{id}/clients', {
    responses: {
      '200': {
        description: 'Seller.Client PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Partial<Client>,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.sellerRepository.clients(id).patch(client, where);
  }

  @del('/sellers/{id}/clients', {
    responses: {
      '200': {
        description: 'Seller.Client DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.sellerRepository.clients(id).delete(where);
  }
}
