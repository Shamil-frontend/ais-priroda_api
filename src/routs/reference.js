const express = require('express')
const passport = require('passport')

//======Hunting Farm=========//
const getHuntingFarm = require('../controllers/referenceBooks/huntingFarm/getHuntingFarm.js')
const postHuntingFarm = require('../controllers/referenceBooks/huntingFarm/postHuntingFarm.js')
const putHuntingFarm = require('../controllers/referenceBooks/huntingFarm/putHuntingFarm.js')
const deleteHuntingFarm = require('../controllers/referenceBooks/huntingFarm/deleteHuntingFarm.js')
//======Hunting Farm Type=========//
const getHuntingFarmType = require('../controllers/referenceBooks/huntingFarmType/getHuntingFarmType.js')
//======Legal Person=========//
const getLegalPerson = require('../controllers/referenceBooks/legalPerson/getLegalPerson.js')


const router = express.Router()
//======Hunting Farm=========//
router.get('/huntingFarm', passport.authenticate('jwt', { session: false }), getHuntingFarm)
router.post('/huntingFarm', passport.authenticate('jwt', { session: false }), postHuntingFarm)
router.put('/huntingFarm', passport.authenticate('jwt', { session: false }), putHuntingFarm)
router.delete('/huntingFarm', passport.authenticate('jwt', { session: false }), deleteHuntingFarm)
//======Hunting Farm Type=========//
router.get('/huntingFarmType', passport.authenticate('jwt', { session: false }), getHuntingFarmType)
//======Legal Person=========//
router.get('/legalPerson', passport.authenticate('jwt', { session: false }), getLegalPerson)

module.exports = router;