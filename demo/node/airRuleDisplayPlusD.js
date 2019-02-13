/* 
data structure
+ flightNO
+ class
    + P
    + F 
        + IN
        + CH
        + AD
            + fareBasis
            + ticketUseType
            + journeyType
            + DepartureTimeType
            + FirstDepartureTime
            + LastDepartureTime
            + DepartureTimeUnit
            + RefundAmount or ReIssueAmount
            + RefundDiscription or ReissueDiscription
*/

module.exports = (airRuleDisplayPlusD, flightNO) => {
    let RefundDisplay = airRuleDisplayPlusD.RuleDisplayRS.RuleDisplayResult.RefundDisplays.RefundDisplay
    let ReissueDisplay = airRuleDisplayPlusD.RuleDisplayRS.RuleDisplayResult.ReissueDisplays.ReissueDisplay
    let RuleID = airRuleDisplayPlusD.RuleDisplayRS.RuleDisplayResult.RuleID
    let RuleIdNo = airRuleDisplayPlusD.RuleDisplayRS.RuleDisplayResult.RuleIdNo
    let ruleSet = {
        "flightNO": flightNO,
        "ruleID": RuleID,
        "ruleIdNO": RuleIdNo,
        "class": {}
    }

    data_list = [RefundDisplay, ReissueDisplay]
    traversing(data_list, ruleSet)
    return ruleSet
}

const traversing = (data_list, ruleSet) => {
    for (i of data_list) {
        for (let ruleInfo of i) {
            let class_temp = ruleInfo.BookingClass
            for (let single_class of class_temp) {
                if (!(single_class in ruleSet.class)) {
                    // 如果还没有该舱位信息,初始化
                    ruleSet.class[single_class] = {}
                }
                insertRule(ruleInfo, ruleSet, single_class)
            }
        }
    }
}

const insertRule = (ruleInfo, ruleSetTemp, classCode) => {
    if (ruleInfo.PassengerType === "") {
        passenger_type = "AD"
    } else {
        passenger_type = ruleInfo.PassengerType
    }
    if (!(passenger_type in ruleSetTemp.class[classCode])) {
        ruleSetTemp.class[classCode][passenger_type] = []
    }

    insert_data = {
        "ticketUseType": ruleInfo.TicketUseType,
        "journeyType": ruleInfo.JourneyType,
        "departureTimeType": ruleInfo.DepartureTimeType,
        "firstDepartureTime": ruleInfo.FirstDepartureTime,
        "lastDepartureTime": ruleInfo.LastDepartureTime,
        "departureTimeUnit": ruleInfo.DepartureTimeUnit
    }
    if ("RefundAmount" in ruleInfo) {
        insert_data.refundAmount = ruleInfo.RefundAmount,
            insert_data.refundDiscription = ruleInfo.RefundDiscription
    }

    if ("ReissueAmount" in ruleInfo) {
        insert_data.reissueAmount = ruleInfo.ReissueAmount,
            insert_data.reissueDiscription = ruleInfo.ReissueDiscription
    }

    ruleSetTemp.class[classCode][passenger_type].push(insert_data)
}
