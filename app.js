const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

let items = ["Eat", "Code", "Sleep"]
let workItems = []

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.get('/', function (req, res) {
    let day = date.getDate()
    res.render('index', {
        listTitle: day,
        newListItems: items
    })
})

app.post('/', function (req, res) {
    let item = req.body.newItem
    if (req.body.listName === "Work List") {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }
})

app.get('/work', function (req, res) {
    res.render('index', {
        listTitle: "Work List",
        newListItems: workItems
    })
})

app.post('/work', function (req, res) {
    let item = req.body.newItem
    workItems.push(item)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('Server running successfully on port 3000');
})