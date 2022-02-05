#!/bin/bash

# Gets the line number where "<!--[PROPERTIES]" appears, reads $file from
# that line number and removes the first and last line from selection
# (because we don't want the opening and closing HTML tag in our YAML)

# If an error occurs retrieving the line number for the [PROPERTIES] tag
# (ie. it doesn't exist) - the step fails. Otherwise, we write the
# selection to post-properties.yml
file=$1
echo "$file"
export PROPERTIES=$(tail -n `grep -e "<\!--\[PROPERTIES\]" -n $file | awk -F ":" '{print "+"$1}'` $file | tail -n +2 | sed '$d' || exit 1)
[ "$PROPERTIES" ] || (echo "Error occurred while processing blog properties for $file: ensure that the properties exist at the bottom of the blog file and are in the correct format." && exit 1)
echo -e "$PROPERTIES" >> post-properties.yml
