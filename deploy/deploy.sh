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
COMMIT_MSG="deploying '$(git log --oneline -1)'"

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
printf "\
branch:       $TRAVIS_BRANCH
commit:       $TRAVIS_COMMIT
commit msg:   $COMMIT_MSG
build number: $TRAVIS_JOB_NUMBER
time:         $(date +"%Y-%d-%m %T") UTC\n" > site/build.txt
echo "build.txt:"
cat site/build.txt
git add site/

git config user.name travis
git config user.email travis@timecruncher.com
echo "git status:"
git status

git commit -am "$COMMIT_MSG"
echo "deploying..."
git push dokku built:master
echo "done                       ✓"
