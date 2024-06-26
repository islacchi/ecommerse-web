const  http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => { 
    try{
    const rawData = await fsPromises.readFile(
        filePath, 
        !contentType.includes('image') ? 'utf8':''
    ); 
    const data = contentType === 'application.json' ? JSON.parse(rawData) : rawData; 
    response.writeHead (
        //404 not found need to modify
        filePath.includes('blog.html') ? 404 : 200, 
        { 'Content-Type': contentType });
    response.end(
        contentType === 'application.json' ? JSON.stringify(data): data
    );
    
    }catch (err) {
    console.log(err);
    response.statusCode = 500; 
    response.end();
    }
}

const server = http.createServer((req,res)=>{
        console.log(req.url, req.method);
    const extension = path.extname(req.url);

    let contentType;
    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';    
    }

let filePath =
    contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html') 
            : contentType === 'text/html' && req.url.slice(-1) ==='/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);


// makes .html extension not required in the browser 
if (!extension && req.url.slice(-1) !== '/') filePath +='.html';
    const fileExists = fs.existsSync(filePath);
        if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {

        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'location':'/index.html'
                });
                res.end();
                break;
            default:
                //serve a 404 response
                serveFile(path.join(__dirname,'views','blog.html'), 'text/html', res);
        }
}

});

server.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));