import get from 'lodash/get.js'

const MESSAGES = {
  missingKey: 'missing key',
  emptyValue: 'empty value'
}

const compareObjects = (obj1, obj2, callback, path) => {
  Object.keys(obj1).forEach((key) => {
    const keyPath = path ? `${path}.${key}` : key

    if (get(obj2, keyPath) === undefined) {
      callback(keyPath, MESSAGES.missingKey)
    }

    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      compareObjects(obj1[key], obj2, callback, keyPath)
    }

    if (obj1[key] === '') {
      callback(keyPath, MESSAGES.emptyValue)
    }
  })
}

const compareTwoLanguages = (lang1, lang2, missing) => {
  compareObjects(lang1.translations, lang2.translations, (keyPath, message) => {
    switch (message) {

    case MESSAGES.missingKey:
      missing.push({lang: lang2.code, key: keyPath, message})
      break

    case MESSAGES.emptyValue:
      missing.push({lang: lang1.code, key: keyPath, message})
      break

    default:
      break
    }
  })
}

export const findMissingKeys = (config) => {
  const missing = []

  config.languages.forEach(language => {
    compareTwoLanguages(config.default, language, missing)
    compareTwoLanguages(language, config.default, missing)
  })

  return missing
}
