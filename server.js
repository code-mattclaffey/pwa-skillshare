const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

const registeredUsers = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  // extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/save', (req, res) => {
	registeredUsers.push({
		firstName: req.body.first_name,
		lastName: req.body.last_name
	});

	res.send(`We got ${req.body.first_name} and ${req.body.last_name} you rock!`);
});


app.get('/', (req, res) => {
	res.send(`${registeredUsers.map(user => `${user.firstName} ${user.lastName}<br/>`).join('')}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
