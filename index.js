require('dotenv').config()
const { main_handler: v2Free } = require('./src/v2FreeAutoCheckIn')
const { main_handler: GlaDOS } = require('./src/GlaDOSCheckIn')
const { main_handler: iKuuu } = require('./src/iKuuuCheckIn')
const { main_handler: aliyp } = require('./src/aliy_yunpan_sign')
const main_handler = async () => {
  await aliyp()
  await v2Free()
  await GlaDOS()
  //await iKuuu()
}
main_handler();
