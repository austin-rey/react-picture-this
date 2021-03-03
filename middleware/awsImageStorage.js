const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const aws = require('aws-sdk');
const path = require('path')
const fs = require('fs')

exports.awsImageUpload = asyncHandler(async (req, res, next) => {

  const s3 = new aws.S3();

  const S3_BUCKET = process.env.S3_BUCKET;
  // Define region of bucket
  aws.config.region = 'us-east-2';

  // File uploaded type
  let fileType = path.extname(req.file.path);

  // File name
  let fileName = req.file.filename;

  // File data
  let body = fs.readFileSync(req.file.path)

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: body,
    ACL: 'public-read'
  };

  await s3.upload (s3Params, function (err, data) {
    if (err) {
      return next(
        new ErrorResponse('Could not store image correctly', 500)
      );
    } if (data) {
      req.imageLocation = data.Location;
      next();
    }
  });
});