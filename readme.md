# state-of-trans

Compare translation json files and find missing keys

## Installation

```bash
# using npm
npm install state-of-trans

# using yarn
yarn add state-of-trans
```

## Usage

You can run state of trans from de command line:
```bash
state-of-trans <path> <default language>
```

Example
```bash
state-of-trans ./lang/translations en
```

## NPM script

Add to package.json
```
{
  "scripts": {
    "translations": "state-of-trans ./lang/translations en"
  }
}
```
