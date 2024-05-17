const app = require('../server');
jest.useFakeTimers();
const fastify = app();
describe('/api/products', () => {
  test('GET /', async () => {

    fastify.inject({
      method: 'GET',
      url: '/api/products/',
    }, (err, response) => {
      expect(response.status).toBe(200);
    })
    
  });

  test('GET /:id', () => {
    fastify.inject({
        method: 'GET',
        url: '/api/products/66469cbd2de6bd636eb98ef4'
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });
  
  test('POST /', () => {
    fastify.inject({
        method: 'POST',
        url: '/api/products/',
        payload: {
            'name': 'Pantalon',
            'description': 's',
            'type': 'pantalon',
            'size': '40',
            'material': 'mezclilla',
            'gender': 'women',
            'color': 'blue',
            'brand': 'Levi',
            'quantity': 5,
            'costPrice': 50,
            'salePrice': 75,
        }
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

  test('Again POST /', () => {
    fastify.inject({
        method: 'POST',
        url: '/api/products/',
        payload: {
            'name': 'Pantalon',
            'description': 's',
            'type': 'pantalon',
            'size': '40',
            'material': 'mezclilla',
            'gender': 'women',
            'color': 'blue',
            'brand': 'Levi',
            'quantity': 5,
            'costPrice': 50,
            'salePrice': 75,
        }
    }, (err, response) => {
        expect(response.status).toBe(400);
      })
  });

  test('PUT /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/products/66469cbd2de6bd636eb98ef5',
        payload: {
            'name': 'Pantalon',
            'description': 's',
            'type': 'pantalon',
            'size': '40',
            'material': 'mezclilla',
            'gender': 'women',
            'color': 'blue',
            'brand': 'Levi',
            'quantity': 5,
            'costPrice': 50,
            'salePrice': 75,
        }
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

  test('PUT with a typo in a field. Example: name as nema /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/products/66469cbd2de6bd636eb98ef5',
        payload: {
            'nema': 'Pantalon',
            'description': 's',
            'type': 'pantalon',
            'size': '40',
            'material': 'mezclilla',
            'gender': 'women',
            'color': 'blue',
            'brand': 'Levi',
            'quantity': 5,
            'costPrice': 50,
            'salePrice': 75,
        }
    }, (err, response) => {
        expect(response.status).toBe(400);
      })
  });

  test('DELETE /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/products/66469cbd2de6bd636eb98ef5'
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

  test('DELETE after DELETE /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/users/66469cbd2de6bd636eb98ef5'
    }, (err, response) => {
        expect(response.status).toBe(404);
      })
  });

  test('PUT after DELETE /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/products/66469cbd2de6bd636eb98ef5',
        payload: {
            'name': 'Pantalon',
            'description': 's',
            'type': 'pantalon',
            'size': '40',
            'material': 'mezclilla',
            'gender': 'women',
            'color': 'blue',
            'brand': 'Levi',
            'quantity': 5,
            'costPrice': 50,
            'salePrice': 75,
        }
    }, (err, response) => {
        expect(response.status).toBe(404);
      })
  });

  test('GET /search/:name', () => {
    fastify.inject({
        method: 'GET',
        url: '/api/users/search/Pantalon'
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

});
fastify.close()