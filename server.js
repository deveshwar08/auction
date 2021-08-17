const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const auctionRoutes = require('./routes/auctionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const searchRoutes = require('./routes/searchRoutes');

const port = 8000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017';
mongoose.connect(dbURI, {dbName: "auction", useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

// routes
app.get('*',checkUser);
app.get('/',(req, res) => {res.redirect('/dashboard')});
app.use(authRoutes);
app.use(auctionRoutes);
app.use(dashboardRoutes);
app.use(searchRoutes);



app.listen(port, function(){
	console.log("App is listening to port " + port);
});

