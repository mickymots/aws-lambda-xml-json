
const path = require('path')
const moment = require('moment')
const parser = require('xml2json');
const fs = require('fs');

const metadata_xml = './MetadataResponse.xml'
const basename = path.basename(metadata_xml, path.extname(metadata_xml))

let dt_str = moment().format('YYYYDDMM');

const output_ext = '.json'
const output_file_name = "".concat(basename, dt_str, output_ext)

fs.readFile(metadata_xml, function (err, data) {
    var json = parser.toJson(data);
    
    fs.writeFile(output_file_name, json, function (err) {
        if (err) return console.log(err);
        console.log(`json written to ${output_file_name}`);
    })
});