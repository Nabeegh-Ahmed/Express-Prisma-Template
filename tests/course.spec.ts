import 'jest'
import request from 'supertest'
import app from '../src/app'

describe('Course integration tests', () => {
    it('should login and create a course', async () => {
        const login = await request(app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send({
                email: 'test@test.com',
                password: 'test'
            })
            .expect(200)
        const token = login.body.token
        await request(app)
            .post('/api/course/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Test course",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "genre": "Tech",
                "price": 400,
                "startingDate": "2022-02-02T15:54:57.226Z",
                "endingDate": "2022-02-02T15:54:57.226Z",
                "cover": "sampleImage.png"
            })
            .expect(201)
    })
    it('should get a course by id', async () => {
        const response = await request(app)
            .get('/api/course/9')
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.course.name).toBe('Test course')
    })
    it('should search courses by name', async() => {
        const response = await request(app)
            .get('/api/course/search?search=test')
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.courses.length).toBeGreaterThan(6)
    })

})