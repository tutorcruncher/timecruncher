#!/usr/bin/env bash
set -e

tmp="/tmp/nginx-pages-build"

git fetch dokku

if [ -d "${tmp}" ]; then
  rm -rf ${tmp}
fi

mkdir ${tmp}

cp -r _site ${tmp}/site
cp -r deploy/Dockerfile deploy/nginx.conf.sigil deploy/site.conf ${tmp}/

git checkout built
echo "switched to built branch   ✓"

cp -r ${tmp}/* .
echo "copied files to new branch ✓"
printf "\
branch:       $TRAVIS_BRANCH
commit:       $TRAVIS_COMMIT
commit msg:   $COMMIT_MSG
build number: $TRAVIS_JOB_NUMBER
time:         $(date +"%Y-%d-%m %T") UTC\n" > site/build.txt
echo "build.txt:"
cat site/build.txt
