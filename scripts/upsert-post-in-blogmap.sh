JSON=$1
echo $JSON

DID=$(echo "$JSON" | jq -r '.[].discussionId | select (.!=null)')
DNO=$(echo "$JSON" | jq -r '.[].discussionNo | select (.!=null)')
MEDIUMURL=$(echo "$JSON" | jq -r '.[].mediumUrl | select (.!=null)')
MEDIUMID=$(echo "$JSON" | jq -r '.[].mediumId | select (.!=null)')
SLUG=$(echo "$JSON" | jq '.[].slug')

jq -M '
  [group_by(.slug)[]
  | add 
  | . += {
    discussionId: "'"$DID"'",
    discussionNo: "'"$DNO"'",
    mediumUrl: "'"$MEDIUMURL"'",
    mediumId: "'"$MEDIUMID"'"
  }]
  | sort_by(.createdAt)
  | reverse' post-properties.json > updated-properties.json

echo $(cat updated-properties.json)
[ -n "$SLUG" ] && echo $SLUG || echo 'Slug not found' && exit 1
BLOGMAP=$(jq --slurpfile post updated-properties.json 'del(.[] | select(.slug == "'"$SLUG"'")) | . += $post[]' blogmap.json -c)
[ -n "$BLOGMAP" ] && echo 'Blogmap set' || exit 1
echo $BLOGMAP > blogmap.json
