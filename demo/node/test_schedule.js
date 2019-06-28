const schedule = require('node-schedule')
const moment = require('moment')

schedule.scheduleJob('0 */10 * * * *', () => {
  console.log(moment().toString())
  console.log('print stars **********')
})

