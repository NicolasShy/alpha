const fs = require('fs')

let jsonfile = require('./../xml_no_booking_class.xml_result.json')

// let jsonfile = require('./../2019_01_11_response.json')
const formatjson = require('./airRuleDisplayPlusD')

let result = formatjson(jsonfile, "CA1589")
// console.log(JSON.stringify(result, null, ' '))
console.log(result)

fs.appendFileSync('./result.json', JSON.stringify(result))

