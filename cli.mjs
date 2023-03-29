#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

import { createConfig } from './create_config.mjs'
import { findMissingKeys } from './find_missing_keys.mjs'

const [, , ...args] = process.argv

const [dir, defaultLang] = args

if (dir && defaultLang) {
  try {
    const jsonInDir = fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === '.json')

    if (jsonInDir.length > 1) {
      const config = createConfig(jsonInDir, dir, defaultLang)
      const missing = findMissingKeys(config)

      if (missing.length > 0) {
        console.table(missing)
        process.exitCode = 1
      } else {
        process.exitCode = 0
      }
    }
  } catch (error) {
    console.log(`Invalid path`)
  }
} else {
  `Invalid params!!!
  state-of-trans <path> <default language code>`
}
