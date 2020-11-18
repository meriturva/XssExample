const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 4000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());

app.get('/', (req, res) => {
    let name = req.query.name;
    res.render("login", { name: name });
});

app.listen(port, () => {
    console.log(`Sito Review on DB listening at http://localhost:${port}`)
})

// Utilizzare come link per test xss:
//<script>console.log("diego")</script>
// http://localhost:4000/?name=diego+%3Cscript%3Econsole.log(%22diego%22)%3C/script%3E

//<script>document.onkeypress = function(e) { console.log(e)}</script>
// http://localhost:4000/?name=diego+%3Cscript%3Edocument.onkeypress%20%3D%20function%28e%29%20%7B%20console.log%28e%29%7D%3C%2Fscript%3E

//<script>document.onkeypress = function(e) { console.log(e)}</script>
// http://localhost:4000/?name=diego+%3Cscript%3Edocument.onkeypress%20%3D%20function%28e%29%20%7B%20console.log%28e%29%7D%3C%2Fscript%3E

// <script>eval(atob("ZG9jdW1lbnQub25rZXlwcmVzcyA9IGZ1bmN0aW9uKGUpIHsgY29uc29sZS5sb2coZSl9"))</script>
// http://localhost:4000/?name=diego+%3Cscript%3Eeval(atob(%22ZG9jdW1lbnQub25rZXlwcmVzcyA9IGZ1bmN0aW9uKGUpIHsgY29uc29sZS5sb2coZSl9%22))%3C/script%3E
