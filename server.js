const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverController = require('./serverController')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json(serverController.getAllReports())
});

app.post("/:id", (req, res) => {
    serverController.addReport(req.params.id)
    return res.status(201).json({ "isError": false })
})

// app.delete('/:id', (req, res) => {
//     if (serverController.deleteUserById(req.params.id)) {
//         return res.status(201).send('ok baby')
//     }
//     return res.status(404).send('no no baby')
// })
app.put('/update/:id', (req, res) => {
        serverController.updateReportActivity(req.params.id)
        return res.status(201).json({ "isError": false })


    })
    // app.put('/addcash', (req, res) => {
    //     serverController.addCash(parseInt(req.body.id), parseInt(req.body.cash))
    //     return res.status(201).json({ id: req.body.id, cash: req.body.cash })


// })
// app.put('/takecash', (req, res) => {
//     serverController.takeCash(parseInt(req.body.id), parseInt(req.body.cash))
//     return res.status(201).json({ id: req.body.id, cash: req.body.cash })


// })








app.listen(process.env.PORT || 4000);