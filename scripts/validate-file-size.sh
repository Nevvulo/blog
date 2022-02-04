#!/bin/bash

minimumsize=100
actualsize=$(wc -c <$1)
if [ $actualsize -ge $minimumsize ]; then
    echo file size is over $minimumsize bytes
else
    echo file size is under $minimumsize bytes
    exit 1
fi
