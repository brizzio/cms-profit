import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
//import usersRoute from './app/routes/usersRoute';
import uploadRoute from './app/routes/uploadRoute';
//import adminRoute from './app/routes/adminRoute';
//import tripRoute from './app/routes/tripRoute';
//import busRoute from './app/routes/busRoute';
//import bookingRoute from './app/routes/bookingRoute';
//import familyRoute from './app/routes/familyRoute';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
  var page = {title:'HOME'}
  res.render('pages/index', {page:page});
});

// about page 
app.get('/about', function(req, res) {
  var page = {title:'ABOUT'}
  res.render('pages/about',{page:page});
});

//ROTAS DO APLICATIVO



//ROTAS DA API

app.use('/api/v1/files/upload', uploadRoute);
//app.use('/api/v1', seedRoute);
//app.use('/api/v1', adminRoute);
//app.use('/api/v1', tripRoute);
//app.use('/api/v1', busRoute);
//app.use('/api/v1', bookingRoute);


app.listen('5566').on('listening', () => {
  console.log(`🚀 are live on port 5566`);
});


export default app;