import * as core from "@actions/core";
import v from "voca";

// img: [alt](./assets/[slug]/[image].[format])
function replaceImgSrc(img) {
  const assetName = img.split("(./assets/")[1].slice(0, -1);
  return img.replace(
    `./assets/${assetName}`,
    `https://raw.githubusercontent.com/Nevvulo/blog/main/posts/assets/${assetName}`
  );
}

function forExternal(contents) {
  const hasAssets = contents.indexOf("(./assets/") !== -1
  if (hasAssets) contents = v.replaceAll(contents, /\!\[(.*)\]\(.+\)/gm, replaceImgSrc);
  contents = v.replace(
    contents,
    /\<\!\-\-\[PROPERTIES\](((.*)\n)*)\-\-\>/gm,
    ""
  );
  contents = v.replace(contents, /^\#[^#](.+)/g, "");
  return contents.trim();
}

function forMedium(contents) {
  let [properties] = contents.match(
    /\<\!\-\-\[PROPERTIES\](((.*)\n)*)\-\-\>/gm
  );
  contents = forExternal(contents);
  properties = properties.split("\n");
  properties.pop();
  properties.shift();
  properties = properties.join("\n");
  properties = v.splice(properties, 0, 2, '  ') // remove "- " at the start of first property
  properties = v.insert(properties, "---\n", 0);
  properties += "\n---\n";

  contents = v.insert(contents, properties, 0);

  return contents;
}

function forDevTo(contents) {
  contents = forExternal(contents);
  return contents;
}

function forHashnode(contents) {
  contents = forExternal(contents);
  return contents;
}

async function run() {
  const source = core.getInput("contents");

  const hashnode = forHashnode(source);
  const devto = forDevTo(source);
  const medium = forMedium(source);

  core.setOutput("hashnode", hashnode);
  core.setOutput("devto", devto);
  core.setOutput("medium", medium);
}

run();
