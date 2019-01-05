const users = {}

function getKeys() {
  return Object.keys(users)
}

function getByKey(key) {
  return users[key]
}

function getBySession(sId) {
  let key = getKeys().reduce((key) => {
    if (users[key].id === sId)
      return users[key]
  })
  return {
    ...users[key],
    key: key
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
