const ReportModal = require("../models/ReportModal");


exports.getAggregateReport = async (req, res) => {
    const { reportID } = req.query;
    try{
        if (!reportID) {
            res.status(400).json({ status: "failed", message: "Please provide reportID" });
        }
        else {
            const report = await ReportModal.findById(reportID).lean().exec();
            if (!report) {
                res.status(404).json({ status: "failed", message: "No such report exists" });
            }
            else {
                const data = report;
                delete data.prices;
                delete data.marketType;
                const t = data.meanprice;
                delete data.meanprice;
                data.price = t;
                res.json(data);
            }
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({ status: "failed", message: e.message });
    }
}

exports.createReport = async (req, res) => {

    const { userID, marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit, convFctr, price } = req.body.reportDetails;
    console.log(req.body);

    const errors = [];
    //check if the values provided are valid or if some are missing
    if (!userID) {
        errors.push("userID is required");
    }
    if (!marketID) {
        errors.push("marketID is required");
    }
    if (!marketName) {
        errors.push("Please add the name of market")
    }
    if (!cmdtyID) {
        errors.push("cmdtyID is required");
    }
    if (!priceUnit) {
        errors.push("priceUnit is required");
    }
    if (!convFctr) {
        errors.push("convFctr is required");
    }
    if (!cmdtyName) {
        errors.push("Commedity name is required")
    }
    if (!marketType) {
        errors.push("please specify marketType")
    }
    if (!price) {
        errors.push("Price is required")
    }
    if (isNaN(price) || isNaN(convFctr)) {
        errors.push("Price or convertion factor must be an integer")
    }
    if (price <= 0) {
        errors.push("Price must have value greater than 0")
    }
    if (convFctr <= 0) {
        errors.push("convFactor must have value greater than 0");
    }

    //check if there is no error
    try {
        if (errors.length == 0) {
            //since no error..so first check if the report exists
            const reportExists = await ReportModal.findOne({ cmdtyID, marketID });
            if (reportExists) {
                let convprice = price / convFctr;//convert the price into unit kg
                const no_of_users = reportExists.users.length;
                let totalprice = reportExists.meanprice * no_of_users;
                const index = reportExists.users.indexOf(userID);
                if (index > -1) {
                    //if the user already exists,then remove that user first
                    totalprice = totalprice - reportExists.prices[index];
                    reportExists.users.splice(index, 1);
                    reportExists.prices.splice(index, 1);
                }
                reportExists.users.push(userID);
                reportExists.prices.push(convprice);
                //add the current price to total price
                totalprice = totalprice + convprice;
                //update mean price
                reportExists.meanprice = (totalprice) / (reportExists.users.length);

                await reportExists.save();
                res.json({ status: "success", reportID: reportExists._id })

            }
            else {
                const report = await ReportModal.create({ users: [userID], marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit: "kg", prices: [price / convFctr], meanprice: price / convFctr });
                res.json({ status: "success", reportID: report._id })
            }
        }
        else {
            //if there is error ..then pass those errors in response
            res.json({ status: "failed", errors: errors })
        }
    }
    catch (e) {
        console.log(e);
        res.json({ status: "failed", errors: [e.message] })
    }
}