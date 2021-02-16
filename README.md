# aws-lambda-xml-json
A lambda function that converts XML to Json


# mjar-reso-xml
This is an AWS SAM project to deploy a lambda functions that reads an XML file from S3 Bucket and write to another S3 bucket in JSON format.

### To Create a SAM Build

* sam build

### To Deploy SAM

* sam deploy --guided


***note*** you need to provide the name of source bucket and target bucket


### Important note on S3 Bucket names

 provide target bucket name as : <source_bucket_name>-target

 e.g.
  * source_bucket: metadata_source
  * target_bucket: metadata_source-target



# Short Summary
Lambda Function Should
1. Grab the XML "Metadata.xml" file from S3 bucket1.
2. Parse the Metadata and convert it to json
3. Store the .Json file in bucket2 with the original file name + the date at the end.
4. Save the Metadata items in DynamoDB with the "b__" values being the primary key


# Commentary

Deliverable will be:
- An AWS Lambda Function built with NodeJS
- I will provide you a Repo on GitHub that you will deploy the Lambda Function to.
- You will develop the Lambda function using your AWS account and we should be able to deploy to our AWS account from the Github repo using "Aws SAM" commands.

Lambda Function Should
1. Grab the XML "Metadata.xml" file from S3 bucket1.
2. Parse the Metadata and convert it to json
3. Store the .Json file in bucket2 with the original file name + the date at the end.
4. Save the Metadata items in DynamoDB with the "b__" values being the primary key

We use an RESO based WebAPI to fetch Real Estate property listings. The API we use is http://sparkplatform.com/docs/reso/overview .

We're making Calls to the API to fetch information about Real Estate Listings. The REST API allows us to fetch json responses for the property information, but in the JSON response, some of the fields are encoded and showup as random values (b__2382903829832) as an example.

To get the value of the encoded "b__" value, the Spark RESO API provides an Odata Metadata file. This Metadata file is https://sparkapi.com/Reso/OData/$metadata and only provides a response in XML. It's a static XML file only updated weekly and it doesn't support any filter parameters or anything else.

The XML file will change weekly and may include very different values where the "b" values currently are. The lambda function should be able to accept files similar to this and process them as defined above.

Files Attached:
-MetadataResponse.xml is the $metadata file that you would normally find in the S3 "bucket1"