module.exports.openBody = function(tituloDaPaginaHtml){
    
    var txt = "";
    
    txt += '<!DOCTYPE html>'
    txt += '<html lang="en">'
    txt += '<head>'
    txt += '<meta charset="utf-8">'
    txt += '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
    txt += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    
    txt += '<meta name="description" content="">'
    txt += '<meta name="author" content="">'
    txt += '<link rel="icon" href="../../favicon.ico">'
    
    txt += '<title>' + tituloDaPaginaHtml + '</title>'
    
    txt += '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">'
    
    txt += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>'
    
    '<link href="/public/css/styles.css" rel="stylesheet">'
    
    txt += '</head>'
    txt += '<body>'
 
    return txt;
}

module.exports.closeBody = function(){
    
    var txt = "";
    
   
    
    txt += '</body>'
    txt += '</html>'
    
    

    
    
    return txt;
}