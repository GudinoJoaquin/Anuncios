#!/usr/bin/env sh

#abort on errors
set -e

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:gudinojoaquin/Anuncios.git