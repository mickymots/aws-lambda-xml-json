
const path = require('path')
const xml2js = require('xml2js')
const parser = require('xml2json');
const fs = require('fs');

const metadata_xml = './MetadataResponse.xml'
const basename = path.basename(metadata_xml, path.extname(metadata_xml))




fs.readFile(metadata_xml, function (err, data) {
    var json = parser.toJson(data);
    fs.writeFile(basename + ".json", json, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    })
});


fs.readFile(metadata_xml, function (err, data) {
    var json = parser.toJson(data);
    fs.writeFile(basename + ".json", json, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    })
});