const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static('public'));

const albumsPath = "albums.json";
const gallaryPath = "gallary.json";

app.get("/api/albums", function(req, res){
       
    const content = fs.readFileSync(albumsPath, "utf8");
    const albums = JSON.parse(content);
    res.send(albums);
});

app.get("/api/gallary", function(req, res){
       
    const content = fs.readFileSync(gallaryPath, "utf8");
    const gallary = JSON.parse(content);
    res.send(gallary);
});

app.get("/api/albums/:id", function(req, res){
       
    const albumId = req.params.id; 
    const contentAlbums = fs.readFileSync(albumsPath, "utf8");
    const contentGallary = fs.readFileSync(gallaryPath, "utf8");

    const Albums = JSON.parse(contentAlbums);
    const Gallary = JSON.parse(contentGallary);
    let name = "";
    let imgs = [];

    for(var i=0; i<Albums.length; i++){
        if(Albums[i].id==albumId){
            name = Albums[i].albumName;
            break;
        }
    }

    for(var i=0; i<Gallary.length; i++){
        if(Gallary[i].album==name){
            imgs.push(Gallary[i]);
        }
    }

    if(imgs){
        let data = JSON.stringify(imgs);
        res.send(data);
    }
    else{
        res.status(404).send();
    }
});

app.listen(80);