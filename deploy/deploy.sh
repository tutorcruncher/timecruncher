#!/usr/bin/env bash
set -e

tmp="/tmp/nginx-pages-build"

if [ ! "$TRAVIS_BRANCH" == "master" ]; then
    echo not on master, not deploying
    exit 0
fi

echo "on master ✓"

ssh-keygen -p -P "$passphrase" -N "" -f deploy/ssh_key
ssh-add ./deploy/ssh_key
commit_msg=$(git log --oneline -1)
git remote add dokku dokku@timecruncher.com:timecruncher

git fetch dokku


if [ -d "${tmp}" ]; then
  rm -rf ${tmp}
fi

mkdir ${tmp}

cp -r _site ${tmp}/site
cp -r deploy/Dockerfile deploy/nginx.conf.sigil deploy/site.conf ${tmp}/

git checkout -b built dokku/master

cp -r ${tmp}/* .

git commit -am "deploying '$commit_msg'"
git push dokku built:master
