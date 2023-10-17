import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import chalk from 'chalk'
import ora from 'ora'
import _axios from 'axios'
import fsExtra from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outputPath = path.resolve(__dirname, '../src/locales')
const fileNames = ['card', 'common', 'dashboard', 'exception', 'guide', 'kyc', 'menu', 'token2049', 'user', 'wallet']
const langs = ['en', 'zh_Hans']

const spinner = ora()

const axios = _axios.create({
  baseURL: 'http://weblate.legendtrading.com/api/',
  headers: {
    Authorization: 'Token wlu_wUQXHJIP3zP34ABNdvyPyBgLwyHgGhh1vBai',
  },
})

const buildLangFile = async (name, lang) => {
  const { data } = await axios(`translations/stellapay_foreground/${name}/${lang}/file/`, {
    'Content-Disposition': 'attachment',
    'Content-Type': 'multipart/form-data',
  })
  console.log(chalk.green(`${lang}/${name}`))
  return data
}

async function main() {
  try {
    spinner.start('正在从 weblate 同步 ')
    for (const lang of langs) {
      const obj = {}
      for (const name of fileNames) {
        const data = await buildLangFile(name, lang)
        obj[name] = data
      }
      await fsExtra.outputFileSync(`${outputPath}/${lang}.json`, JSON.stringify(obj, null, 2), 'utf8')
    }
    spinner.succeed('同步成功')
  } catch (error) {
    console.error(error)
    spinner.fail('同步失败')
  }
}

main()
