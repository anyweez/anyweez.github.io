#!/bin/sh

hugo

rm -rf docs
mv public docs

echo "lukesegars.com" > docs/CNAME