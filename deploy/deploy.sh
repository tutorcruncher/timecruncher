#!/usr/bin/env bash
set -e

tmp="/tmp/nginx-pages-build"

printf "Host *\n    StrictHostKeyChecking no\n" > ~/.ssh/config
chmod 400 ~/.ssh/config

chmod 600 deploy/ssh_key
ssh-keygen -p -P "$passphrase" -N "" -f deploy/ssh_key
mv deploy/ssh_key ~/.ssh/id_rsa
git remote add dokku dokku@timecruncher.com:timecruncher

git fetch dokku
echo "added dokku remote         ✓"
COMMIT_MSG="$(git log --oneline -1)"

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
commit sha:   $TRAVIS_COMMIT
commit msg:   $COMMIT_MSG
build number: $TRAVIS_JOB_NUMBER
time:         $(TZ=Europe/London date +"%Y-%d-%m %T")0\n" > site/build.txt
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

echo "checking site has been deployed..."
for i in $(seq 15); do
    curl https://timecruncher.com/build.txt 2>/dev/null > /tmp/build.txt
    if grep -q $TRAVIS_COMMIT /tmp/build.txt; then
        echo ""
        echo "$i commit sha found in build.txt, build.txt:"
        cat /tmp/build.txt
        echo "site deployed successfully ✓"
        exit 0
    fi
    printf "$i, "
    sleep 1
done
echo ""
echo "commit sha $TRAVIS_COMMIT not found in build.txt, site has note been deployed"
exit 1
