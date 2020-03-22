import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
const path = require('path');
var IterateObject = require('iterate-object');
var xlsfile = require('../../utils/xlsModule');
var status = require('../helpers/status')



const fileUpload = async (req, res) => {
    console.log(path.join(__dirname))
    try {
      xlsfile.upload(req, res);
      console.log('deu certo a transferencia')
      //return res.status(status.success).send(uploadSuccessMessage);
    } catch (error) {
      console.log('erro na transferencia de arquivo')
      console.log(error)  
      errorMessage.error = 'Houve um problema na transferencia do arquivo';
      //return res.status(status.error).send(errorMessage);
    }
  };


export {
    fileUpload
};