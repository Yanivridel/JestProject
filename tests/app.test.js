const request = require('supertest');
const app = require('../server.js'); // Adjust this path to point to your Express app

describe('GET /api/product/get/:id', () => {
    it('Valid id: product found', async () => {
        const response = await request(app).get('/api/product/get/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(typeof response.body.id).toBe('number');
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBeDefined();
        expect(typeof response.body.title).toBe('string');
    });
    test('Invalid id large number: product not found', async () => {
        const response = await request(app).get('/api/product/get/123468');
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("id not exists");
    });
    test('Invalid id - english chars: product not found', async () => {
        const response = await request(app).get('/api/product/get/asdf');
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("id not exists");
    });
    test('Invalid id negative number: product not found', async () => {
        const response = await request(app).get('/api/product/get/-123');
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("id not exists");
    });
});

describe('POST /api/product/add', () => {
    it('Valid fields: product added', async () => {
        const data = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe("object");
    });
    it('Invalid fields: product added', async () => {
        const data = {
            title: 'test product',
            image: 'https://i.pravatar.cc',
        };
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Missing required fields");
    });
    it('Invalid fields: product added', async () => {
        const data = {};
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Missing required fields");
    });
});