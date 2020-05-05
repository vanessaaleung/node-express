const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); // development version
app.use(bodyParser.json());

app.get('/dishes/:dishId', (req, res, next) => {
	res.end('Will send details of the dish: '
		+ req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes/'
		+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
	res.write('Updating the dish: '
		+ req.params.dishId + '\n') // add a line to the reply message
	res.end('Will update the dish: '
		+ req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
	res.end('Deleting dish: ' + req.params.dishId);
});

// any request coming to this endpoint will be handled by dishRouter
app.use('/dishes', dishRouter);

// serve up static HTML files in the root foleder/public
app.use(express.static(__dirname + '/public'));

// next: need to invoke addtional middleware
app.use((req, res, next) => {
	res.statusCode  = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
