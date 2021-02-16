// dependencies
const AWS = require('aws-sdk');
const util = require('util');

const moment = require('moment')
const parser = require('xml2json');


// get reference to S3 client
const s3 = new AWS.S3();

/**
 * A Lambda function that converts an XML file to json and writes output to another S3 Bucket
 */
exports.s3XMLToJsonHandler = async (event, context) => {
  
  // Read options from the event parameter.
  console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
  const srcBucket = event.Records[0].s3.bucket.name;
  
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const dstBucket = srcBucket + "-target";

  // Download the xml from the S3 source bucket. 

  try {
      const params = {
          Bucket: srcBucket,
          Key: srcKey
      };
      var metadata_xml = await s3.getObject(params).promise();

  } catch (error) {
      console.log(error);
      return;
  }  


  // create outfile_name with date string
  
  let dt_str = moment().format('YYYYDDMM');
  // const basename = 'Metadata'
  const output_ext = '.json'

  const output_file_name = "".concat(srcKey.slice(0, -4), "_" , dt_str, output_ext)

 
  // Use the xml2json module to convert the file.
  try { 

      var buffer = parser.toJson(metadata_xml.Body);
          
  } catch (error) {
      console.log(error);
      return;
  } 

  // Upload the json to the destination bucket
  try {
      const destparams = {
          Bucket: dstBucket,
          Key: output_file_name,
          Body: buffer,
          ContentType: "json"
      };

      const putResult = await s3.putObject(destparams).promise(); 
      
  } catch (error) {
      console.log(error);
      return;
  } 
      
  console.log('Successfully converted to json ' + srcBucket + '/' + srcKey +
      ' and uploaded to ' + dstBucket + '/' + output_file_name); 
};
