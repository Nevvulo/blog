import { it, expect } from '@jest/globals'
import * as cp from 'child_process'
import * as path from 'path'
import * as process from 'process'
import * as fs from 'fs'
import { fileURLToPath } from 'url';

const posts = [
  'code-review',
  'git-rebase'
]

const platforms = [
  'medium',
  'devto',
  'hashnode'
]

const { execPath } = process

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, '..', 'index.js')

describe.each(posts)('%s', (name) => {
  it.each(platforms)('should output valid %s content', (platform) => {
    const exampleFile = fs.readFileSync(
      path.join(__dirname, '..', '..', '..', '..', 'posts', `${name}.mdx`)
    ).toString()
    const expectedContent = fs.readFileSync(
      path.join(__dirname, 'posts', name, `${platform}.md`)
    ).toString()
    
    const options = { env: { INPUT_CONTENTS: exampleFile } }
    const output = cp.execFileSync(execPath, [indexPath], options).toString()
    let platformOutput = output.split(`${platform}::`)[1]

    // the first platform outputted doesn't have trailing whitepsace
    if (platforms[0] !== platform) 
      platformOutput = platformOutput.split('\n\n')[0]

    expect(
      platformOutput
        .replace(/\%0A/g, '\n')
        .trimEnd() 
        + '\n'
    )
      .toStrictEqual(expectedContent)
  })
})
