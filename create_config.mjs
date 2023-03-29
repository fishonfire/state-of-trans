import fs from 'node:fs'
import path from 'node:path'

export const createConfig = (jsonInDir, dir, defaultLang) => {
  const config = {
    languages: [],
  }

  jsonInDir.forEach((file) => {
    const filePath = path.join(dir, file)
    const code = path.basename(file, '.json')
    const fileData = fs.readFileSync(filePath)
    const json = JSON.parse(fileData.toString())
    if (code === defaultLang) {
      config.default = {
        code,
        translations: json,
      }
    } else {
      const language = {
        code,
        translations: json,
      }
      config.languages.push(language)
    }
  })
  return config
}