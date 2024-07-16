"use server";
import { S3 } from "@aws-sdk/client-s3";

export default async function ContentStore(value) {
  const val = await value;
  if (val === true) {
    const s3 = new S3({
      region: "us-east-1",
    });

    const input = {
      Bucket: "digipass-main",
    };

    function createNewBucket() {
      s3.createBucket(input, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          PublicAccessBlock();
          addBucketPolicy();
          console.log("bucket created")
        } // successful response
      });
    }

    function addBucketPolicy() {
      const params = {
        Bucket: input.Bucket,
        Policy: `{\"Version\": \"2012-10-17\", \"Statement\": [{ \"Sid\": \"id-1\",\"Effect\": \"Allow\",\"Principal\": \"*\", \"Action\":  \"s3:*\", \"Resource\": [\"arn:aws:s3:::${input.Bucket}/*\" ] } ]}`,
      };
      s3.putBucketPolicy(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });
    }

    function PublicAccessBlock() {
      const data = {
        Bucket: input.Bucket,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: false,
          IgnorePublicAcls: false,
          BlockPublicPolicy: false,
          RestrictPublicBuckets: false,
        },
      };

      s3.putPublicAccessBlock(data);
    }

    try {
      const list = await s3.headBucket({ Bucket: input.Bucket });
      if (list["$metadata"].httpStatusCode === 200) {
        console.log("bucket already exist");
      }
    } catch (error) {
      if (error) {
        /* createNewBucket(); */ //comment added to prevent unnesesary bucket creation. Uncomment when ready for implementation
      }
    }
  }
}
