const { S3 } = require("@aws-sdk/client-s3");


const s3 = new S3({
  region: "us-east-1"
});

const input = {
  ACL: "public-read-write",
  Bucket: "Digital_pass_AGTL",
};

s3.createBucket(input, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
