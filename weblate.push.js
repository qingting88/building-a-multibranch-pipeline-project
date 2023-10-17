import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import chalk from "chalk";
import ora from "ora";
import _axios from "axios";
import fsExtra from "fs-extra";
import FormData from "form-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = path.resolve(__dirname, "./public/locale");

const spinner = ora();

const axios = _axios.create({
  baseURL: "http://weblate.legendtrading.com/api/",
  headers: {
    "Content-Disposition": "attachment",
    "Content-Type": "multipart/form-data",
    Authorization: "Token wlu_wUQXHJIP3zP34ABNdvyPyBgLwyHgGhh1vBai",
  },
});

const pushLangFile = async (file, fileName) => {
  let formData = new FormData();
  formData.append("conflicts", "ignore");
  formData.append("file", fsExtra.createReadStream(file));
  formData.append("email", "qingting.wei@flashwire.com");
  const headers = formData.getHeaders();
  const { data } = await axios.post(
    `translations/demo/wqt_test_ctks/en/file/`,
    formData,
    { headers }
  );
  console.log(chalk.green(`en/${fileName}`));
  return data;
};

async function main() {
  try {
    spinner.start("正在从 weblate 同步 ");
    const files = fsExtra.readdirSync(uploadPath);
    for (let file of files) {
      console.log("file", file);
      await pushLangFile(file, "wqt_test_ctks");
    }
    // for (const lang of langs) {
    //   const obj = {};
    //   for (const name of fileNames) {
    //     const data = await buildLangFile(name, lang);
    //     obj[name] = data;
    //   }
    //   await fsExtra.outputFileSync(
    //     `${outputPath}/${lang}.json`,
    //     JSON.stringify(obj, null, 2),
    //     "utf8"
    //   );
    // }
    spinner.succeed("同步成功");
  } catch (error) {
    console.error(error);
    spinner.fail("同步失败");
  }
}

main();
