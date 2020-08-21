#!/bin/sh

# Define functions related to dev/prod servers
start_dev_server(){
    pm2 delete sporit-website-dev
    cd /var/www/prod-website.git/dev-website/
    yarn install

    NODE_ENV=production PORT=9001 \
    ENV=dev \
    pm2 start npm --name "sporit-website-dev" -- "run" "start:prod" &>/dev/null &
}

start_test_server(){
    pm2 delete sporit-website-test
    cd /var/www/prod-website.git/test-website/
    yarn install

    NODE_ENV=production PORT=9002 \
    ENV=test \
    pm2 start npm --name "sporit-website-test" -- "run" "start:prod" &>/dev/null &
}

start_prod_server(){
    pm2 delete sporit-website-prod
    cd /var/www/prod-website.git/prod-website/
    yarn install

    NODE_ENV=production PORT=9000 \
    ENV=prod \
    DEV_API_URL=https://dev.api.isporit.com \
    TEST_API_URL=https://test.api.isporit.com \
    PROD_API_URL=https://prod.api.isporit.com \
    LOGIN_REDIRECT_URL=https://app.isporit.com \
    pm2 start npm --name "sporit-website-prod" -- "run" "start:prod" &>/dev/null &
}

while read oldrev newrev ref
do
  branch=`echo $ref | cut -d/ -f3`

  echo "You pushed the $branch branch"

  if [ "master" == "$branch" ]; then
    git --work-tree=/var/www/prod-website.git/prod-website --git-dir=/var/www/prod-website.git checkout -f $branch
    echo 'Changes in the PROD branch. Restarting PROD'
    start_prod_server
  fi

  if [ "dev" == "$branch" ]; then
    git --work-tree=/var/www/prod-website.git/dev-website --git-dir=/var/www/prod-website.git checkout -f $branch
    echo 'Changes in the DEV branch. Restarting DEV'
    start_dev_server
  fi

  if [ "test" == "$branch" ]; then
    git --work-tree=/var/www/prod-website.git/test-website --git-dir=/var/www/prod-website.git checkout -f $branch
    echo 'Changes in the TEST branch. Restarting TEST'
    start_test_server
  fi

done