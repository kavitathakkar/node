//package import
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//local imports
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');
const router = require('./routes/router');

//mongo connection
const mongoURI = 'mongodb://localhost:27017/LoanHub';
mongoose
	.connect(mongoURI, {
		useNewUrlParser:true,
		useUnifiedTopology:true,
})
.then(() => {
	console.log('connected to mongoDB successfully');
})
.catch((error) => {
	console.error('Error connecting to mongoDB', error);
});

//APIs
app.use(express.json()); //this is for parsing json from req.body
app.use(express.urlencoded({ extended:true}));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);


const port =5000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});