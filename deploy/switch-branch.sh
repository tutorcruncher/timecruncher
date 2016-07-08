#!/usr/bin/env bash
set -e

tmp="/tmp/nginx-pages-build"

if [ -d "${tmp}" ]; then
  rm -rf ${tmp}
fi

mkdir ${tmp}

cp -r _site ${tmp}/site
cp -r deploy/Dockerfile ${tmp}/
cp -r deploy/*.conf ${tmp}/

git checkout built

cp -r ${tmp}/* .