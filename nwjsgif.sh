#!/bin/bash

# DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
DIR="$(dirname $(readlink -f $0))"
echo $DIR
DIR2="$(readlink -f "$@")"
command nw.exe "$DIR" "$DIR2"
