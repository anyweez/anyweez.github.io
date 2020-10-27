#!/bin/sh

hugo

rm -rf docs
mv public docs