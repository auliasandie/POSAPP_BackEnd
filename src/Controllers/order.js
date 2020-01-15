const orderModel = require('../Models/order');
const formRes = require('../Helpers/formRes');
const {pagination} = require('../Models/page');
const {getProductById} = require('../Models/product');

exports.getOrder = (req, res) => {
    const page = pagination(req);
    orderModel
    .getOrder(req, page)
    .then(result => {
        formRes.success(res, result);
    })
    .catch(err => {
        formRes.error(res, err);
    })
};


exports.newOrder = (req, res) => {
    const body = {
        order_id: req.body.order_id,
        name_product: req.body.name_product,
        quantity_product: req.body.quantity_product,
        sub_total: req.body.sub_total
    };
    orderModel
    .newOrder(body)
    .then(response => formRes.newOrderRes(res, response, 200))
    .catch(err => console.log(err))
},
exports.getOrderDetail = (req, res) => {
    // const page = pagination(req);
    orderModel
    .getOrderDetail(req)
    .then(result => {
        formRes.success(res, result);
    })
    .catch(err => {
        formRes.error(res, err);
    })
};


exports.updateStatusOrder = (req, res) => {
    if (req.body.status == null)
    return formRes.error(res, "Status can't be empty");


orderModel
.updateStatusOrder(req)
.then(result => {
    orderModel
    .getDetailOrder(req.params.order_id)
    .then(result => {
        const data = result.map(item => ({
            product_id: item.product_id,
            quantity_product: item.quantity_product
        }));
        orderModel
        .updateQtyProduct(data, req.body.status)
        .then(result => {
            formRes.success(res, "Order updated to '${req.body.status}'");
        })
        .catch(err => {
            Response.error(res, err);
        })
    })
    .catch(err => {
        formRes.error(res, err.sqlMessage);
    })
})
.catch(err => {
    formRes.error(res, err.sqlMessage);
});
}

const orderGenerator = () => {
    return Math.floor(Math.random() * 990000) + 10000;
};


