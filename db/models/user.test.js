'use strict'

const db = require('../db')
    , {User} = db
    , {expect} = require('chai')

/* global describe it before afterEach beforeEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)

  var user
  var user2
  beforeEach(function() {
    user = User.build({
      name: 'Bob Builder',
      email: 'bb@gmail.com',
      isAdmin: true,
      password: 'ok'
    })
  })
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      user => user.authenticate('ok')
        .then(result => expect(result).to.be.true))
  })

  describe('Can confirm if the password is NOT correct', () => {
    it("resolves false if the password doesn't match", () =>
      user => user.authenticate('not ok')
        .then(result => expect(result).to.be.false))
  })

  describe('user equals what we created', () => {
    it('returns true for expected outcome', () => {
      expect(user.name).to.equal('Bob Builder')
      expect(user.email).to.equal('bb@gmail.com')
      expect(user.isAdmin).to.be.true
    })
  })
})
