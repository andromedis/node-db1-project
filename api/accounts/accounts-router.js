// Imports
const router = require('express').Router()
const Accounts = require('./accounts-model')
const mw = require('./accounts-middleware')


// Endpoints
router.get('/', async (req, res, next) => {
    // `[GET] /api/accounts` returns an array of accounts (or an empty array if there aren't any).
    try {
        const accounts = await Accounts.getAll()
        res.status(200).json(accounts)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
    // `[GET] /api/accounts/:id` returns an account by the given id.
    try {
        const account = await Accounts.getById(req.params.id)
        res.status(200).json(account)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', 
    mw.checkAccountPayload, 
    mw.checkAccountNameUnique, async (req, res, next) => {
    // `[POST] /api/accounts` returns the created account. Leading or trailing 
    // whitespace on budget `name` should be trimmed before saving to db.
        try {
            const newAccount = await Accounts.create(req.body)
            res.status(201).json(newAccount)
        }
        catch (err) {
            next(err)
        }
})

router.put('/:id', 
    mw.checkAccountId, 
    mw.checkAccountPayload, 
    mw.checkAccountNameUnique, async (req, res, next) => {
    // `[PUT] /api/accounts/:id` returns the updated account. Leading or trailing 
    // whitespace on budget `name` should be trimmed before saving to db.
        const { id } = req.params
        try {
            const updatedAccount = await Accounts.updateById(id, req.body)
            res.status(200).json(updatedAccount)
        }
        catch (err) {
            next(err)
        }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
    // `[DELETE] /api/accounts/:id` returns the deleted account.
    try {
        const deletedAccount = await Accounts.deleteById(req.params.id)
        res.status(200).json(deletedAccount)
    }
    catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    // Error handling and response
    res.status(500).json({ message: err.message, stack: err.stack })
})


// Exports
module.exports = router;
