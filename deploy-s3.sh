#!/bin/sh

aws2 s3 rm s3://s3-sy-jikankanri.work/ --recursive
aws2 s3 cp build s3://s3-sy-jikankanri.work/ --recursive