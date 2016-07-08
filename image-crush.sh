#!/usr/bin/env bash

BASE="$(pwd)/pub/src/images/portfolio"

cd $BASE

echo $BASE

for d in */ ; do
    cd "$BASE/$d"
    #check if a src version of the image exists. If it doesn't create from the current version
    if [ ! -f thumb-src.jpg ]; then
        echo "The file does not exist"
        cp thumb.jpg thumb-src.jpg
    fi
    # Resize and crush the thumbnails from src
    convert -strip -interlace Plane -quality 100% -resize 278x thumb-src.jpg thumb.jpg

    cd gallery

    for entry in *.jpg
    do
        rm -rf low-res
        if [ ! -d src ]; then
            mkdir src
        fi

        if [ ! -f src/"$entry" ]; then
            echo "The file does not exist"
            cp "$entry" src/"$entry"
        fi
        convert -strip -interlace Plane -quality 95% -resize 780x src/"$entry" "$entry"
    done



    echo "$d"
done



