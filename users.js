const users = {}

function getKeys() {
  return Object.keys(users)
}

function getByKey(key) {
  return users[key]
}

function getBySession(sId) {
  let key = getKeys().filter(key => {
    return users[key].sessionId === sId
  })
  return {
    ...users[key],
    key: key[0]
  }
}

function getAll() {
  return users
}

function add(key, user) {
  users[key] = {
    ...user
  }
}

function remove(id) {
  delete users[id]
}

function update(key, user) {
  users[key] = {
    ...users[key],
    ...user
  }
}

module.exports = {
  get,
  getKeys,
  getByKey,
  getBySession,
  add,
  remove,
  update
}
