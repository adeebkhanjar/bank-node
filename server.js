const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverController = require('./serverController')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json(serverController.getAllUsers())
});

app.post("/", (req, res) => {
    const data = serverController.getAllUsers().data
    if (data.find(user => req.body.passportId === user.passportId)) { return res.status(304).send('passportId already exists') }
    serverController.addNewUser(req.body.name, parseInt(req.body.passportId))
    return res.status(201).json({
        user: {
            id: data[data.length - 1].id + 1,
            name: req.body.name,
            passportId: req.body.passportId,
            cash: 0,
            credit: 0,
            transactions: []
        }
    })
})

app.delete('/:id', (req, res) => {
    if (serverController.deleteUserById(req.params.id)) {
        return res.status(201).send('ok baby')
    }
    return res.status(404).send('no no baby')
})
app.put('/credit', (req, res) => {
    serverController.updateCredit(req.body.credit, req.body.id)
    return res.status(201).json({ credit: req.body.credit, id: req.body.id })


})
app.put('/addcash', (req, res) => {
    serverController.addCash(parseInt(req.body.id), parseInt(req.body.cash))
    return res.status(201).json({ id: req.body.id, cash: req.body.cash })


})
app.put('/takecash', (req, res) => {
    serverController.takeCash(parseInt(req.body.id), parseInt(req.body.cash))
    return res.status(201).json({ id: req.body.id, cash: req.body.cash })


})








app.listen(process.env.PORT || 4000);