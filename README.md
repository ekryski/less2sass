less2sass
=========

[![Build Status](https://travis-ci.org/ekryski/less2sass.svg?branch=master)](https://travis-ci.org/ekryski/less2sass)

A little script to convert less to sass files

> **Note: Due to the nature of less and sass it does not do a completely perfect conversion. You will have to do some manual work :-(**

## Installing

`npm install -g less2sass`

## Running
You can run less2sass on a single file or on entire directory. It will recurse through the directory and convert any less files to scss, preserving the directory structure.

`less2sass <path_to_less_file_or_directory>`

## Caveats

* This does not really convert colour functions, it makes a best attempt but most colour functions will need to be ported over manually
* It does not convert to proper `.sass` yet. Only to `.scss`
* It may be buggy so you have to check your code but hopefully this script will save you some time. If you come across a bug, please create an issue. Better yet, a pull request!
