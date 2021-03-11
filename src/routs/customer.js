const express = require('express')
const passport = require('passport')

//======Customer=========//
const getCustomersSearch = require('../controllers/dictionary/getCustomersSearch.js')
const getCustomerData = require('../controllers/dictionary/getCustomerData.js')
const postCustomer = require('../controllers/dictionary/postCustomer.js')
const deleteCustomer = require('../controllers/dictionary/deleteCustomer.js')
const putCustomer = require('../controllers/dictionary/putCustomer.js')
//======Hunting License=========//
const getHuntingLicense = require('../controllers/dictionary/getHuntingLicense.js')
const postHuntingLicense = require('../controllers/dictionary/postHuntingLicense.js')
const putHuntingLicense = require('../controllers/dictionary/putHuntingLicense.js')
const deleteHuntingLicense = require('../controllers/dictionary/deleteHuntingLicense.js')
//======Hunting Permission=========//
const getHuntingPermission = require('../controllers/dictionary/getHuntingPermission.js')
// const postHuntingPermission = require('../controllers/dictionary/postHuntingPermission.js')
// const putHuntingPermission = require('../controllers/dictionary/putHuntingPermission.js')
// const deleteHuntingPermission = require('../controllers/dictionary/deleteHuntingPermission.js')


const router = express.Router()
//======Customer=========//
router.get('/customers/search', passport.authenticate('jwt', { session: false }), getCustomersSearch)
router.get('/customer', passport.authenticate('jwt', { session: false }), getCustomerData)
router.post('/customer', passport.authenticate('jwt', { session: false }), postCustomer)
router.delete('/customer', passport.authenticate('jwt', { session: false }), deleteCustomer)
router.put('/customer', passport.authenticate('jwt', { session: false }), putCustomer)
//======Hunting License=========//
router.get('/customer/huntingLicense', passport.authenticate('jwt', { session: false }), getHuntingLicense)
router.post('/customer/huntingLicense', passport.authenticate('jwt', { session: false }), postHuntingLicense)
router.put('/customer/huntingLicense', passport.authenticate('jwt', { session: false }), putHuntingLicense)
router.delete('/customer/huntingLicense', passport.authenticate('jwt', { session: false }), deleteHuntingLicense)
//======Hunting Permission=========//
router.get('/customer/huntingPermission', passport.authenticate('jwt', { session: false }), getHuntingPermission)
// router.post('/customer/huntingPermission', passport.authenticate('jwt', { session: false }), postHuntingPermission)
// router.put('/customer/huntingPermission', passport.authenticate('jwt', { session: false }), putHuntingPermission)
// router.delete('/customer/huntingPermission', passport.authenticate('jwt', { session: false }), deleteHuntingPermission)


module.exports = router;