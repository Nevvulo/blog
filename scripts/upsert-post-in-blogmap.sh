JSON=$1
DID=$(echo "$JSON" | jq -r '.[].discussionId')
DNO=$(echo "$JSON" | jq -r '.[].discussionNo')
MEDIUMURL=$(echo "$JSON" | jq -r '.[].mediumUrl')
MEDIUMID=$(echo "$JSON" | jq -r '.[].mediumId')
SLUG=$(echo "$JSON" | jq -r '.[].slug')

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
BLOGMAP=$(jq --slurpfile post updated-properties.json 'del(.[] | select(.slug == "'"$SLUG"'")) | . += $post[]' blogmap.json -c)
[ -n "$BLOGMAP" ] && echo 'Blogmap set' || exit 1
echo $BLOGMAP > blogmap.json
