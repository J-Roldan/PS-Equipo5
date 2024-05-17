const app = require('../server');
jest.useFakeTimers();
const fastify = app();
describe('GET /', () => {
  test('without body', async () => {
    
    // At the end of your tests it is highly recommended to call `.close()`
    // to ensure that all connections to external services get closed.

    fastify.inject({
      method: 'GET',
      url: '/'
    }, (err, response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Welcome to the backend.');
    })
    
  });

  test('with body', async () => {
    fastify.inject({
      method: 'GET',
      url: '/',
      payload: { 
        'user': {
          'name': 'admin',
          'email': 'admin@admin.cl'
        }
      }
    }, (err, response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Welcome to the backend admin & admin@admin.cl. admin');
    })
  })
});
fastify.close()