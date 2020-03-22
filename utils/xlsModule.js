// Dependencies

var Datastore = require('nedb')
var XLSX = require('xlsx');

var formidable = require('formidable');
var fs = require('fs');
var IterateObject = require("iterate-object");
var path = require('path');


var xlsFolder = path.resolve() + "/uploads/xls/";
var nedbFolder = path.resolve() + "/nedb";

module.exports.upload = function(req, res){
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      console.log(oldpath);

        
      var newpath  = xlsFolder + files.filetoupload.name;
      
      //cria o novo arquivo para o novo db
      var newdbpath = nedbFolder + '/' + files.filetoupload.name.replace(/\.[^/.]+$/,'.db') 
      console.log('Destination file') 
      console.log(newdbpath)    
      fs.closeSync(fs.openSync(newdbpath, 'w'));

      
      var db = new Datastore({filename: newdbpath, autoload: true });
      console.log('Banco ' + newdbpath + ' pronto para uso')
      
      //le a planilha e salva no novo banco
      fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            console.log('File uploaded and moved!');
            //se nao deu erro processa o arquivo
   
             
            
          console.log('newpath: '+ newpath);
             var workbook = XLSX.readFile(newpath);  
             var sheet_name_list = workbook.SheetNames; 
          console.log(sheet_name_list)
             sheet_name_list.forEach(function(y) {
               var worksheet = workbook.Sheets[y];
                console.log(worksheet);
                    var headers = {};
                    var data = [];

                for(var z in worksheet) {
                    if(z[0] === '!') continue;
                    //parse out the column, row, and value
                    var col = z.substring(0,1);
                    var row = parseInt(z.substring(1));
                    var value = worksheet[z].v;

                    //store header names
                    if(row == 1) {
                        headers[col] = value;
                        continue;
                    }

                    if(!data[row]) data[row]={};
                    data[row][headers[col]] = value;
                }
                    //drop those first two rows which are empty
                    data.shift();
                    data.shift();
                    console.log(data); 

                //escreve as linhas   
                IterateObject(data, function (linha) {

                //grava linha no banco de dados
                db.insert(linha, function(err, adocument) {
                    if(err) return console.log(err);
                    console.log('Adicionado com sucesso: ' + adocument._id);
                    
                })
            })

      }); 
          
          
  });
//deleta o arquivo que foi adicionado para nao sobrecarregar o sistema 
//    fs.stat(newpath, function (err, stats) {
//    console.log(stats);//here we got all information of file in stats variable

//    if (err) {
//        return console.error(err);
//    }

//    fs.unlink(newpath,function(err){
//         if(err) return console.log(err);
//         console.log('O arquivo ' + newpath + ' foi removido com sucesso!');
//    });  
// });
    
 });

}

module.exports.listaFiles = function(callback){
    
    //list = ['a','b','c']
     return fs.readdir(xlsFolder, function(err, list) { 
            if (err) throw err;
            console.log(list);
            callback(list);
    });
    
    
    
}

module.exports.collectionToTable = function(obj, callback){
    let planilha = {};
    
    let cabecalhos = ['linha'];
    let rows = [];
    console.log(obj.length);
    
    //recupera os cabecalhos
     console.log(obj[0]);
       IterateObject(obj[0], function (value, name) {
            console.log(name);
            cabecalhos.push(name);
            
        });   
    //recupera as linhas da tabela
        obj.forEach(function(item,index){
            let row = [index + 1];   
            IterateObject(item, function (value, name) {
            row.push(value);
            }); 
            rows.push(row)
        });

    
   //prepara o html da tabela
    
    let html = '<table class="table table-striped">'
   //cabecalhos 
   var titulos = '<tr>'
   for (var j = 0; j < cabecalhos.length; j++){
       titulos += '<th>' + cabecalhos[j] + '</th>';
   }
    titulos += '</tr>'
    html += titulos
    //linhas 
   var linha=''
   for (var j = 0; j < rows.length; j++){
       linha += '<tr>'
       for (var i = 0; i < rows[j].length; i++){
           linha += '<td>'+ rows[j][i] + '</td>'
       }
       linha += '</tr>'
   }
     html += linha
     html += '</table>'
    
//     obj.forEach(myFunction);
//
//function myFunction (item, index) {
//
//  for( var key in item ) {
//    console.log(item[key])
//  }
//}
    
//                console.log(titulos);
//                console.log('=====================================================');
//                console.log('=====================================================');
//                console.log(linha);

    //console.log(rows);
    
    planilha = {
        headers:cabecalhos,
        rows: rows,
        htmlTable:html
    }
    
            callback(null,planilha);
  
}




module.exports.loadHtmlUploadForm = function(){
    
var txt = "";
txt +='<!DOCTYPE html>'
txt +='    <html>'
txt +='    <head>'
txt +='        <title>Upload a Photo</title>'
txt +='        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">'
txt +='        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">'
txt +='        <!--[if lt IE 9]>'
txt +='            <script src="//oss.maxcdn.com/libs/html5shiv/r29/html5.min.js"></script>'
txt +='            <script src="//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>'
txt +='       <![endif]-->'
txt +='    </head>'
txt +='    <body>'

txt +='        <div class="container">'
txt +='            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Open Modal</button>'

txt +='            <div class="modal fade" id="myModal">'
txt +='                <div class="modal-dialog">'
txt +='                    <div class="modal-content">'
txt +='                        <form id="form" enctype="multipart/form-data" role="form">'
txt +='                            <div class="modal-header">'
txt +='                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
txt +='                                <h4 class="modal-title">Importa Arquivo em Excel</h4>'
txt +='                            </div>'
txt +='                            <div class="modal-body">'
txt +='                                <div id="messages"></div>'
txt +='                                <input type="file" name="file" id="file">'
txt +='                            </div>'
txt +='                            <div class="modal-footer">'
txt +='                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
txt +='                                <button type="submit" class="btn btn-primary">Save</button>'
txt +='                            </div>'
txt +='                        </form>'
txt +='                    </div>'
txt +='                </div>'
txt +='            </div>'

txt +='        </div>'

txt +='        <script src="http://code.jquery.com/jquery.js"></script>'
txt +='        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>'
txt +=' </body>'
txt +='</html>'
console.log(txt);
    return txt;
}







//function(err,list){
//    console.log('lista arquivos na pasta: ' + xlsFolder);
//    list = fs.readdir(xlsFolder, function(err, list) { 
//            if (err) throw err;
//            
//            return list;
//    });

// aux functions

function leAquivosNaPasta (error, file) {
   if (error) return console.error('Uhoh, there was an error', error)
   // otherwise, continue on and use `file` in your code
 }