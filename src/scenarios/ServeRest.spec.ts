import pactum from 'pactum';
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

test.describe('ServeRest API', async () => {
  let token = '';
  let idUsuario = '';
  let idProduto = '';
  let emailUsuario = '';
  let pass = '';
  const p = pactum;

  const baseUrl = 'https://serverest.dev';

  p.request.setDefaultTimeout(60000);

  test.beforeAll(async () => {
    pass = faker.random.numeric(9);
    idUsuario = await p
      .spec()
      .post(`${baseUrl}/usuarios`)
      .withHeaders('monitor', false)
      .withJson({
        nome: faker.internet.userName(),
        email: faker.internet.email(),
        password: pass,
        administrador: 'true'
      })
      .expectStatus(StatusCodes.CREATED)
      .returns('_id');

    emailUsuario = await p
      .spec()
      .get(`${baseUrl}/usuarios/${idUsuario}`)
      .withHeaders('monitor', false)
      .expectStatus(StatusCodes.OK)
      .returns('email');
  });

  test.beforeEach(async () => {
    token = await p
      .spec()
      .post(`${baseUrl}/login`)
      .withHeaders('monitor', false)
      .withJson({
        email: `${emailUsuario}`,
        password: pass
      })
      .expectStatus(StatusCodes.OK)
      .expectBodyContains('Login realizado com sucesso')
      .expectJsonSchema({
        type: 'object'
      })
      .returns('authorization');
  });

  test.describe('Login validations', () => {
    test('Invalid login', async () => {
      await p
        .spec()
        .post(`${baseUrl}/login`)
        .withHeaders('monitor', false)
        .withJson({
          email: faker.internet.email(),
          password: faker.random.numeric(5)
        })
        .expectStatus(StatusCodes.UNAUTHORIZED)
        .expectBodyContains('Email e/ou senha inválidos');
    });
  });

  test.describe('Products', () => {
    test('Register a new product', async () => {
      idProduto = await p
        .spec()
        .post(`${baseUrl}/produtos`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .withJson({
          nome: faker.commerce.productName(),
          preco: 500,
          descricao: faker.commerce.productDescription(),
          quantidade: 10
        })
        .expectStatus(StatusCodes.CREATED)
        .expectBodyContains('Cadastro realizado com sucesso')
        .expectJsonSchema({
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            _id: {
              type: 'string'
            }
          },
          required: ['message', '_id']
        })
        .returns('_id');
    });
    test('Search for the new registered product', async () => {
      await p
        .spec()
        .get(`${baseUrl}/produtos/${idProduto}`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .expectStatus(StatusCodes.OK);
    });
    test('Update an existing product', async () => {
      await p
        .spec()
        .put(`${baseUrl}/produtos/${idProduto}`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .withJson({
          nome: faker.commerce.productName(),
          preco: 300,
          descricao: faker.commerce.productDescription(),
          quantidade: 20
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('Registro alterado com sucesso');
    });
  });

  test.describe('Carts', () => {
    test('Add a new cart', async () => {
      await p
        .spec()
        .post(`${baseUrl}/carrinhos`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .withJson({
          produtos: [
            {
              idProduto: `${idProduto}`,
              quantidade: 10
            }
          ]
        })
        .expectStatus(StatusCodes.CREATED)
        .expectBodyContains('Cadastro realizado com sucesso');
    });
    test('Invalid cart', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carrinhos/qbMqntef4iTO1wWgg`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains('Carrinho não encontrado');
    });
    test('Complete the purchase and delete the cart', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/carrinhos/concluir-compra`)
        .withHeaders('Authorization', token)
        .withHeaders('monitor', false)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('Registro excluído com sucesso');
    });
  });
});
