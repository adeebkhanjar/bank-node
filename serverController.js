const fs = require('fs')
const getAllReports = () => {
    try {
        const buffer = fs.readFileSync('./reports.json')
        console.log(buffer);
        return JSON.parse(buffer.toString())
    } catch (e) { console.log(e); return [] }
}

const addReport = (reportId) => {
    const data = getAllUsers()
    const addReport = data.data.find(report => report.reportId === parseInt(reportId))
    const newAddReport = {
        reportId: reportId,
        creationDate: "2023-03-10T05:44:22.112Z",
        initDate: addReport.initDate,
        userFullName: addReport.userFullName,
        userPhoneNumber: addReport.userPhoneNumber,
        userEmail: addReport.userEmail,
        carNumber: addReport.carNumber,
        carModel: addReport.carModel,
        status: "complete",
        fullReport: {},
        receipt: {},
        isActive: addReport.isActive,
        history: [addReport],
        isExpand: true
    }
    data.list = data.list.map(report => { return report.reportId === parseInt(reportId) ? newAddReport : report })
    fs.writeFileSync('./reports.json', JSON.stringify(data))
    return true;
}

// const deleteUserById = (id) => {
//     const data = getAllUsers()
//     data.data = data.data.filter(user => user.id !== parseInt(id))
//     if (getAllUsers().data.length === data.data.length) return false;
//     fs.writeFileSync('./users.json', JSON.stringify(data))
//     return true
// }
const updateReportActivity = (reportId) => {
    const data = getAllUsers()
    const upReport = data.data.find(report => report.reportId === parseInt(reportId))
    upReport.isActive = !upReport.isActive
    data.list = data.list.map(report => { return report.reportId === parseInt(reportId) ? upReport : report })
    fs.writeFileSync('./reports.json', JSON.stringify(data))
}

// const addCash = (passportId, cash) => {
//     const data = getAllUsers()
//     const upUser = data.data.find(user => user.passportId === parseInt(passportId))
//     upUser.cash = parseInt(upUser.cash) + parseInt(cash)
//     data.data = data.data.map(user => { return user.passportId === parseInt(passportId) ? upUser : user })
//     fs.writeFileSync('./users.json', JSON.stringify(data))
// }
// const takeCash = (passportId, cash) => {
//     const data = getAllUsers()
//     const upUser = data.data.find(user => user.passportId === parseInt(passportId))
//     upUser.cash = parseInt(upUser.cash) - parseInt(cash)
//     data.data = data.data.map(user => { return user.passportId === parseInt(passportId) ? upUser : user })
//     fs.writeFileSync('./users.json', JSON.stringify(data))
// }
module.exports = { getAllReports, updateReportActivity, addReport }