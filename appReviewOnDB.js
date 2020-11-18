const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 4000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());

const recensioni = [{
    content: 'Ecco una recensione memorizzata su db'
},
{
    content: `Ecco un'altra recensione memorizzata su db`
}];

app.get('/', (req, res) => {
    res.render("product", { reviews: recensioni });
});

app.post('/reviews', (req, res) => {
    const reviewContent = req.body;
    console.log(`Memorizzo su db la recensione dell'utente`, reviewContent);
    recensioni.push(reviewContent);
    res.send("Ok");
});

app.listen(port, () => {
    console.log(`Sito Review on DB listening at http://localhost:${port}`)
})