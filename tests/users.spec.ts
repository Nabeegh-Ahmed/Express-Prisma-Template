import 'jest'
import request from 'supertest'
import app from '../src/app'

describe('User integration tests', () => {
    it('should create a user and return id and jwt', async () => {
        await request(app)
            .post('/api/user/register')
            .set('Accept', 'application/json')
            .send({
                email: 'tessadsssadtas1asda1@test.com',
                password: 'tasest',
                firstName: 'tsadest',
                lastName: 'tesadst'
            })
            .expect(201)
    })
    it('should return error for duplicate email', async () => {
        await request(app)
            .post('/api/user/register')
            .set('Accept', 'application/json')
            .send({
                email: 'test@test.com',
                password: 'test',
                firstName: 'test',
                lastName: 'test'
            })
            .expect(400)
    })
        
    it('should login and get JWT', async () => {
        await request(app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send({
                email: 'test@test.com',
                password: 'test'
            })
            .expect(200)
    })

    it('should fail because of wrong password', async () => {
        await request(app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send({
                email: 'test@test.com',
                password: 'wrong password'
            })
            .expect(401)
    })
})