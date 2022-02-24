JSON=$1
echo $JSON

jq -M '
  [group_by(.slug)[]
  | add 
  | . += {
    discussionId: "'"$DISCUSSION_ID"'",
    discussionNo: "'"$DISCUSSION_NO"'",
    mediumUrl: "'"$MEDIUM_URL"'",
    mediumId: "'"$MEDIUM_ID"'",
    devToId: "'"$DEVTO_ID"'",
    devToUrl: "'"$DEVTO_URL"'",
    hashnodeId: "'"$HASHNODE_ID"'",
    hashnodeUrl: "'"$HASHNODE_URL"'",
  }]
  | sort_by(.createdAt)
  | reverse' post-properties.json > updated-properties.json

echo $(cat updated-properties.json)
[ -n "$SLUG" ] && echo $SLUG || (echo 'Slug not found' && exit 1)
BLOGMAP=$(jq --slurpfile post updated-properties.json 'del(.[] | select(.slug == "'"$SLUG"'")) | . += $post[]' blogmap.json -c)
[ -n "$BLOGMAP" ] && echo 'Blogmap set' || exit 1
echo $BLOGMAP > blogmap.json
