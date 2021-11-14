const fs = require('fs')
const getAllUsers = () => {
    try {
        const buffer = fs.readFileSync('./users.json')
        console.log(buffer);
        return JSON.parse(buffer.toString())
    } catch (e) { console.log(e); return [] }
}

const addNewUser = (name, passportId, ) => {
    const data = getAllUsers()
    if (data.data.find(user => user.passportId === passportId)) return false;
    data.data.push({
        id: data.data[data.data.length - 1].id + 1,
        name,
        passportId,
        cash: 0,
        credit: 0,
        transactions: []
    })
    fs.writeFileSync('./users.json', JSON.stringify(data))
    return true;
}

const deleteUserById = (id) => {
    const data = getAllUsers()
    data.data = data.data.filter(user => user.id !== parseInt(id))
    if (getAllUsers().data.length === data.data.length) return false;
    fs.writeFileSync('./users.json', JSON.stringify(data))
    return true
}
const updateCredit = (credit, passportId) => {
    const data = getAllUsers()
    const upUser = data.data.find(user => user.passportId === parseInt(passportId))
    upUser.credit = parseInt(credit)
    data.data = data.data.map(user => { return user.passportId === parseInt(passportId) ? upUser : user })
    fs.writeFileSync('./users.json', JSON.stringify(data))
}

const addCash = (passportId, cash) => {
    const data = getAllUsers()
    const upUser = data.data.find(user => user.passportId === parseInt(passportId))
    upUser.cash = parseInt(upUser.cash) + parseInt(cash)
    data.data = data.data.map(user => { return user.passportId === parseInt(passportId) ? upUser : user })
    fs.writeFileSync('./users.json', JSON.stringify(data))
}
const takeCash = (passportId, cash) => {
    const data = getAllUsers()
    const upUser = data.data.find(user => user.passportId === parseInt(passportId))
    upUser.cash = parseInt(upUser.cash) - parseInt(cash)
    data.data = data.data.map(user => { return user.passportId === parseInt(passportId) ? upUser : user })
    fs.writeFileSync('./users.json', JSON.stringify(data))
}
module.exports = { getAllUsers, addNewUser, deleteUserById, updateCredit, addCash, takeCash }