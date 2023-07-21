const HttpError = require('../helpers/http-error');
const Customer = require('../models/customer');

const postpaidList = async (req, res, next) => {
    let filterableParams = {
        category_id: '64b9042881686039e4ac29cc'
    };

    for (const [key, value] of Object.entries(req.body)) {
        if (value && key !== 'search') {
            filterableParams[key] = value;
        }
        else if (key === 'search' && req.body.search && req.body.search !== '') {
            filterableParams.fullname = { $regex: `${value}`, $options: 'i' };
        }
    }

    let prepaidData;
    try {
        prepaidData = await Customer.find(filterableParams).sort({ account: -1 });
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error finding data', 500));
    }

    res.json({
        success: true,
        message: "Customers found successfully.",
        data: prepaidData
    })
};

exports.postpaidList = postpaidList;