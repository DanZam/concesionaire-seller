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
  UserSeller,
} from '../models';
import {SellerRepository} from '../repositories';

export class SellerUserSellerController {
  constructor(
    @repository(SellerRepository) protected sellerRepository: SellerRepository,
  ) { }

  @get('/sellers/{id}/user-seller', {
    responses: {
      '200': {
        description: 'Seller has one UserSeller',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserSeller),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserSeller>,
  ): Promise<UserSeller> {
    return this.sellerRepository.hasoneuserseller(id).get(filter);
  }

  @post('/sellers/{id}/user-seller', {
    responses: {
      '200': {
        description: 'Seller model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSeller)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seller.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSeller, {
            title: 'NewUserSellerInSeller',
            exclude: ['id'],
            optional: ['id_seller']
          }),
        },
      },
    }) userSeller: Omit<UserSeller, 'id'>,
  ): Promise<UserSeller> {
    return this.sellerRepository.hasoneuserseller(id).create(userSeller);
  }

  @patch('/sellers/{id}/user-seller', {
    responses: {
      '200': {
        description: 'Seller.UserSeller PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSeller, {partial: true}),
        },
      },
    })
    userSeller: Partial<UserSeller>,
    @param.query.object('where', getWhereSchemaFor(UserSeller)) where?: Where<UserSeller>,
  ): Promise<Count> {
    return this.sellerRepository.hasoneuserseller(id).patch(userSeller, where);
  }

  @del('/sellers/{id}/user-seller', {
    responses: {
      '200': {
        description: 'Seller.UserSeller DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserSeller)) where?: Where<UserSeller>,
  ): Promise<Count> {
    return this.sellerRepository.hasoneuserseller(id).delete(where);
  }
}
