#!/usr/bin/env bash
set -e

# Set base directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$DIR"
if [[ $BASE_DIR == *"/deploy"* ]]; then
	BASE_DIR="$( dirname "$DIR" )"
fi
echo "BASE_DIR set to $BASE_DIR"

BUCKET="$1"
echo "$BUCKET"
echo "Sending build to S3..."
# Deploy to S3
aws s3 sync "$BASE_DIR/build/" "s3://$BUCKET"  --delete --acl public-read --cache-control max-age=0,public,must-revalidate
