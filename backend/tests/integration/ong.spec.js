const requeste = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

  beforeEach( async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll( async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await requeste(app)
      .post('/ongs')
      .send({
        name: "APAD 4",
        email: "apad@apad.com",
        whatsapp: "(84) 98888-2222",
        city: "Natal",
        uf: "RN"
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});