import express from 'express';

import {fileUpload } from '../controllers/uploadController';
//import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// trips Routes
// router.get('/trips', verifyAuth, getAllTrips);
//router.post('/trips', verifyAuth, createTrip);

//router.patch('/trips/:tripId', verifyAuth, cancelTrip);
//router.get('/trips/origin', verifyAuth, filterTripByOrigin);
//router.get('/trips/destinatiovan', verifyAuth, filterTripByDestination);

router.get('/', function(req, res) {
    var page = {title:'Transferencia de Arquivos'}
    res.render('pages/fileUpload',{page:page});
  });

router.post('/', fileUpload);  


export default router;