const xml2js = require('xml2js')

const builder = new xml2js.Builder({
	headless: true
})

let o = {
  gender: "male",
  type: "AD",
  lang: "ZH",
  name: "曹操",
  docType: "PP",
  docNO: "EC8592014",
  DocTypeDetail: "P"
}

let temp = {
  traveler: {
    "$": {
      "Gender": o.gender, // "MALE"
      "PassengerTypeCode": o.type, // "CHD"
    },
    "PersonName": {
      "$": {
        "LanguageType": o.lang ? o.lang : 'ZH', // "ZH"
      },
      "Surname": o.name, // "张小孩"
    },
    "Document": {
      "$": {
        "DocType": o.docType, // "NI",
        "DocID": o.docNO, // "120221197001011150"
        "DocTypeDetail": o.DocTypeDetail
      }
    },
    "Comment": 'N/A'
  }
}

let xmlobj = builder.buildObject(temp)

console.log(JSON.stringify(xmlobj))

