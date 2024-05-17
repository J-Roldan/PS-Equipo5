const app = require('../server');
jest.useFakeTimers();
const fastify = app();
describe('/api/users', () => {
  test('GET /', async () => {

    fastify.inject({
      method: 'GET',
      url: '/api/users/',
      /*headers: {
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDY5Y2JkMmRlNmJkNjM2ZWI5OGVmNCIsImlhdCI6MTcxNTkyMTA3NSwiZXhwIjoxNzE1OTIxMDc1fQ.8IbCEKErPDKK53nMiUZmYM5I1UkaltBnBBD6hZMs1uY'
      }*/
    }, (err, response) => {
      expect(response.status).toBe(200);
    })
    
  });

  test('GET /:id', () => {
    fastify.inject({
        method: 'GET',
        url: '/api/users/66469cbd2de6bd636eb98ef4'
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });
  
  test('POST /', () => {
    fastify.inject({
        method: 'POST',
        url: '/api/users/',
        payload: {
            'name': 'Pablo',
            'email': 'pablo@admin.cl',
            'password': '1234',
            'age': '20',
            'gender': 'male'
        }
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

  test('Again POST /', () => {
    fastify.inject({
        method: 'POST',
        url: '/api/users/',
        payload: {
            'name': 'Pablo',
            'email': 'pablo@admin.cl',
            'password': '1234',
            'age': '20',
            'gender': 'male'
        }
    }, (err, response) => {
        expect(response.status).toBe(400);
      })
  });

  test('PUT /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/users/66469cbd2de6bd636eb98ef5',
        payload: {
            'name': 'Pablo',
            'email': 'pablo@admin.cl',
            'password': '1234',
            'age': '20',
            'gender': 'male'
        }
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

  test('PUT with a typo in a field. Example: email as ema /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/users/66469cbd2de6bd636eb98ef5',
        payload: {
            'name': 'Pablo',
            'ema': 'pablo@admin.cl',
            'password': '1234',
            'age': '20',
            'gender': 'male'
        }
    }, (err, response) => {
        expect(response.status).toBe(400);
      })
  });

  test('DELETE /:id', () => {
    fastify.inject({
        method: 'PUT',
        url: '/api/users/66469cbd2de6bd636eb98ef5'
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
        url: '/api/users/66469cbd2de6bd636eb98ef5',
        payload: {
            'name': 'Pablo',
            'email': 'pablo@admin.cl',
            'password': '1234',
            'age': '20',
            'gender': 'male'
        }
    }, (err, response) => {
        expect(response.status).toBe(404);
      })
  });

  test('GET /search/:name', () => {
    fastify.inject({
        method: 'GET',
        url: '/api/users/search/Pablo'
    }, (err, response) => {
        expect(response.status).toBe(200);
      })
  });

});
fastify.close()