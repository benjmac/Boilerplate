'use strict'

const db = require('../db/db')
const User = db.model('user')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    //
    // will address this later by having the session ID get the admin info
    forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll({})
        .then(users => res.send(users))
        .catch(next))
  .post('/',
    (req, res, next) => {
      User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(next)
    })
  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => {
        if (!user) res.status(404).send('no user found')
        else res.json(user)
      })
      .catch(next))
  .put('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
        plainText: true
      })
      .then(user => res.json(user[1]))
      .catch(next))
  .delete('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(deletedUser => res.send('user deleted'))
      .catch(next))
