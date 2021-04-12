const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
    const generateMessage = ({ name, budget }) => {
        if (!name || !budget)
            return 'name and budget are required'
        else if (typeof name !== 'string')
            return 'name of account must be a string'
        else if (name.trim().length < 3 || name.trim().length > 100)
            return 'name of account must be between 3 and 100'
        else if (typeof budget !== 'number')
            return 'budget of account must be a number'
        else if (budget < 0 || budget > 1000000)
            return 'budget of account is too large or too small'
    }  
    const message = generateMessage(req.body)
    if (message)
        res.status(400).json({ message: message })
    else
        next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
    try {
        const accounts = await Accounts.getAll()
        const nameMatches = accounts.filter(account => 
            account.name === req.body.name.trim()).length
        if (nameMatches)
            res.status(400).json({ message: 'that name is taken' })
        else
            next()
    }
    catch (err) {
        next(err)
    }
}

exports.checkAccountId = async (req, res, next) => {
    try {
        const account = await Accounts.getById(req.params.id)
        if (account) {
            req.account = account
            next()
        }
        else
            res.status(404).json({ message: 'account not found' })
    }
    catch (err) {
        next(err)
    }
}
