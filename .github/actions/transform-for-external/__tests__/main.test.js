import {it, expect} from '@jest/globals'
import * as cp from 'child_process'
import * as path from 'path'
import * as process from 'process'
import * as fs from 'fs'
import {fileURLToPath} from 'url';


const np = process.execPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ip = path.join(__dirname, '..', 'index.js')

it('should output medium valid content', () => {
  const exampleFile = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'posts', 'git-rebase.mdx')).toString()
  const expectedContent = fs.readFileSync(path.join(__dirname, 'medium.md')).toString()
  process.env['INPUT_CONTENTS'] = exampleFile
  const options = {env: process.env}
  const output = cp.execFileSync(np, [ip], options).toString()
  const mediumOutput = output.split('medium::')[1]
  expect(mediumOutput.replace(/\%0A/g, '\n').trimEnd() + '\n').toStrictEqual(expectedContent)
})

it('should output devto valid content', () => {
  const exampleFile = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'posts', 'git-rebase.mdx')).toString()
  const expectedContent = fs.readFileSync(path.join(__dirname, 'devto.md')).toString()
  process.env['INPUT_CONTENTS'] = exampleFile
  const options = {env: process.env}
  const output = cp.execFileSync(np, [ip], options).toString()
  let devToOutput = output.split('devto::')[1]
  devToOutput = devToOutput.split('\n\n')[0]
  expect(devToOutput.replace(/\%0A/g, '\n').trimEnd() + '\n').toStrictEqual(expectedContent)
})

it('should output hashnode valid content', () => {
  const exampleFile = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'posts', 'git-rebase.mdx')).toString()
  const expectedContent = fs.readFileSync(path.join(__dirname, 'hashnode.md')).toString()
  process.env['INPUT_CONTENTS'] = exampleFile
  const options = {env: process.env}
  const output = cp.execFileSync(np, [ip], options).toString()
  let hashnodeOutput = output.split('hashnode::')[1]
  hashnodeOutput = hashnodeOutput.split('\n\n')[0]
  expect(hashnodeOutput.replace(/\%0A/g, '\n').trimEnd() + '\n').toStrictEqual(expectedContent)
})
