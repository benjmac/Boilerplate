// const request = require('supertest')
//     , {expect} = require('chai')
//     , db = require('../db/db')
//     , app = require('./start')

// /* global describe it before afterEach */

// describe('/api/users', () => {
//   before('Await database sync', () => db.didSync)
//   afterEach('Clear the tables', () => db.truncate({ cascade: true }))

//   describe('GET /:id', () =>
//     describe('when not logged in', () =>
//       it('fails with a 401 (Unauthorized)', () =>
//         request(app)
//           .get(`/api/users/1`)
//           .expect(401)
//       )))

//   describe('POST', () =>
//     describe('when not logged in', () => {
//       it('creates a user', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             name: 'Beth Secret',
//             email: 'beth@secrets.org',
//             password: '12345',
//             address: [],
//             isAdmin: false
//           })
//           .expect(201))

//       it('redirects to the user it just made', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             name: 'Eve Interloper',
//             email: 'eve@interloper.com',
//             password: '23456',
//             address: ['Happy Town, New York 12345'],
//             isAdmin: false
//           })
//           .redirects(1)
//           .then(res => expect(res.body).to.contain({
//             email: 'eve@interloper.com'
//           })))
//     }))
// })
