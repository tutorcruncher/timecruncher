#!/usr/bin/env bash
set -e

tmp="/tmp/nginx-pages-build"

if [ ! "$TRAVIS_BRANCH" == "master" ]; then
    echo not on master, not deploying
    exit 0
fi

echo "on master                  ✓"

printf "Host *\n    StrictHostKeyChecking no\n" > ~/.ssh/config
chmod 400 ~/.ssh/config

chmod 600 deploy/ssh_key
ssh-keygen -p -P "$passphrase" -N "" -f deploy/ssh_key
mv deploy/ssh_key ~/.ssh/id_rsa
git remote add dokku dokku@timecruncher.com:timecruncher

git fetch dokku
echo "added dokku remote         ✓"
commit_msg="deploying '$(git log --oneline -1)'"


if [ -d "${tmp}" ]; then
  rm -rf ${tmp}
fi

mkdir ${tmp}

cp -r _site ${tmp}/site
cp -r deploy/Dockerfile deploy/nginx.conf.sigil deploy/site.conf ${tmp}/

git checkout -b built dokku/master
echo "switched to built branch   ✓"

cp -r ${tmp}/* .
echo "copied files to new branch ✓"

echo "git status:"
git status

echo "committing \"$commit_msg\""
git commit -am "$commit_msg"
echo "deploying..."
git push dokku built:master
echo "done                       ✓"
