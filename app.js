const express = require('express')
const bodyParser  = require('body-parser')
const date = require(__dirname + '/date.js')




const app = express();
const port = 3000;


app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

const items = []
const  workItems =[]
const day = date.getDate();

app.get('/', (req,res)=> {
    res.render('list', {listTitle : day , items:items})
})
app.post('/', (req,res)=> {
    const item =  req.body.item

    if(req.body.list == "Work List"){
        workItems.push(item)
        res.redirect('/work')
    }   else{
     items.push(item);
    }
    res.redirect('/')

})

app.get('/work', (req,res)=> {
    res.render('list', {listTitle: "Work List", items: workItems})
})

app.post('/work', (req,res)=> {
    const item = req.body.item
    workItems.push(item)

    res.redirect('/work')
})
app.get('/about', (req,res)=> {
    res.render("about")
})

app.listen(port, ()=> {
    console.log('Server has started on port 3000')
})