const productModel = require('../Models/product');
const formRes = require ("../Helpers/formRes");
const {pagination} = require('../Models/page');



module.exports = {
    getProduct : (req, res) => {
        const page = pagination(req);
        productModel
        .getProduct(req, page)
        .then(result => {
            formRes.success(res, result);
            // console.log(formRes, 'ini resullllt')
        })
        .catch(err => {
            formRes.error(res, err);
        })
    },
 
    getProductById : (req, res) => {
        productModel
        .getProductById(req)
        .then(result => {
            if (result.length == 0) response.error(res, "Product id not found");
            else formRes.success(res, result);
        })
        .catch(err => {
            formRes.error(res, err)
        })
    },
    newProduct : (req, res) => {
        if(req.body.name_product == null || req.body.name_product === "")
            return formRes.error(res, "Product can't be empty");
        if(req.body.image_product == null || req.body.image_product === "")
            return formRes.error(res, "Image can't be empty");
        if(req.body.category_name == null || req.body.category_name === "")
            // req.body.category_name = Food;
            return formRes.error(res, "Category name can't be empty");
        if (req.body.price_product <= 0)
            return formRes.error(res, "Price cannot be below 0");
        productModel
        .getProductByName(req)
        .then(resultName => {
            if (resultName.length !==0)
            return formRes.error (res, "Product already exist");
            productModel
            .newProduct(req)
            .then(resultInsert => {
                productModel
                .getProductById(req, resultInsert.insertId)
                .then(result => formRes.success(res, result))
                .catch(err => formRes.error(res, err));
            })
            .catch(err => formRes.error(res, err));
        })
        .catch(err => formRes.error(res, err))
    },

    updateProduct : (req, res) => {
        if(req.body.name_product == null || req.body.name_product === "")
            return formRes.error(res, "Product can't be empty");
        if(req.body.image_product == null || req.body.image_product === "")
            return formRes.error(res, "Image can't be empty");
        if(req.body.category_name == null || req.body.category_name === "")
            req.body.category_name = Food;
        if (req.body.price_product <= 0)
            return formRes.error(res, "Price cannot be below 0");
            productModel
            .getProductById(req)
            .then(resultId => {
                if (resultId.length === 0)
                return formRes.error(res, "Product not found")
                productModel
                .getProductByName(req)
                .then(resultName => {
                    if (resultName.length !== 0 &&
                        resultName[0].id !== Number(req.params.product_id)
                ) 
                return formRes.error(res, "Product name already exist");
                    productModel
                    .updateProduct(req)
                    .then(result => {
                        productModel
                        .getProductById(req)
                        .then(result => formRes.success(res, result))
                        .catch(err => formRes.error(res, err))
                    })
                    .catch(err => formRes.error(res, err));
                })
                .catch(err => formRes.error(res, err));
                })
                .catch(err => formRes.error(res, err));
    },

    deleteProduct : (req, res) => {
        productModel.getProductById(req).then(result => {
            if (result.length !=0) {
                productModel
                .deleteProduct(req)
                .then(result => {
                    formRes.success(res, {message: "Product deleted successfully", id: req.params.product_id});    
                })
                .catch(err => {
                    formRes.error(res, err);
                })
            } else {
                formRes.error(res, {message: "Product Id not found", id: req.params.product_id})
            }
        })
    }

}