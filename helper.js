const convert = require('xml-js');
const fs = require('fs');
const path = require('path')

const metadata_xml = './MetadataResponse.xml'
const basename = path.basename(metadata_xml, path.extname(metadata_xml))

fs.readFile(metadata_xml, function (err, data) {
    var json_data = convert.xml2json(data, {compact: false, spaces: 4});

    // console.log(json_data)

    fs.writeFile(basename + "_xml-js.json", json_data, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    })
});
