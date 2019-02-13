const parseString = require('xml2js').parseString
const fs = require('fs')

var arguments = process.argv.splice(2);

// 把xml字段转化为json
let xml2Json = (xml) => {
	return new Promise((resolve, reject) => {
		parseString(xml, {
			explicitArray: false
		}, function (error, result) {
			if (error) {
				reject(error)
			} else {
				resolve(result)
			}
		})
	})
}

for (let path of arguments) {
	xml2Json(fs.readFileSync(path)).then(result => {
		fs.appendFileSync('./' + path + '_result.json', JSON.stringify(result))
	})
	console.log(path + " Done!")
}

