#!/usr/bin/env bash
set -e

if [ ! "env:$TRAVIS_BRANCH" == "env:master" ]; then
    echo not on master, not deploying
    exit 0
fi

echo "on master ✓"

ssh-add ./deploy/ssh_key
commit_msg=$(git log --oneline -1)
git remote add dokku dokku@timecruncher.com:timecruncher

./deploy/switch-branch.sh

git commit -am "deploying '$commit_msg'"
git push dokku built:master
