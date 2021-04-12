const db = require('../../data/db-config')

const getAll = () => {
  // `getAll` resolves to an array of accounts (or an empty array)
  return db('accounts')
}

const getById = (id) => {
  // `getById` resolves to an account by the given id
  return db('accounts').where({ id }).first()
}

const create = async (account) => {
  // `create` resolves to the newly created account
  const [ id ] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // `updateById` resolves to the updated account
  await db('accounts').where({ id }).update(account)
  return getById(id)
}

const deleteById = async (id) => {
  // `deleteById` resolves to the deleted account
  const deletedAccount = await getById(id)
  await db('accounts').where({ id }).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
