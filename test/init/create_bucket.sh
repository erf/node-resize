#!/bin/sh
aws configure set aws_access_key_id foobar
aws configure set aws_secret_access_key foobar
aws --endpoint-url=http://localhost:4566 s3 mb s3://images
