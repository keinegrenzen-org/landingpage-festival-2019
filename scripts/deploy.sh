#!/usr/bin/env bash

rsync -r --progress --stats -h --delete -a public/build root@159.69.1.143:/var/www/keinegrenzen-org/landingpage-festival-2019/public/
