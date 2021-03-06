const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const aws = require('aws-sdk');
const path = require('path')
const fs = require('fs')

const Set = require('../models/Set');

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
        new ErrorResponse('Could not store image correctly.', 500)
      );
    } else if (data) {
      req.imageLocation = data.Location;
      next();
    }
  });
});

exports.awsImageDelete = asyncHandler(async (req, res, next) => {

  const s3 = new aws.S3();

  const S3_BUCKET = process.env.S3_BUCKET;
  // Define region of bucket
  aws.config.region = 'us-east-2';

  const set = await Set.findOne({_id: req.params.id});

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: set.imageName
  };
  await s3.deleteObject(s3Params, function(err, data) {
    if (err) {
      console.log(err)
      return next(
        new ErrorResponse('Could not delete image.', 500)
      );
    } else {
      next();
    }
  });
});