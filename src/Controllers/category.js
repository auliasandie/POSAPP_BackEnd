const formRes = require ("../Helpers/formRes")
const categoryModel = require("../Models/category")

module.exports = {
    getCategory: (req, res) =>{
        categoryModel
        .getCategory(req)
        .then(response => {
            console.log("resoibse", response)
            formRes.getCategoryRes(res, response, 200)})
        .catch(err => console.log(err, 'errorroro'));
    },
    getCategoryById : (req, res) => {
        const id = req.params.id;
        categoryModel
        .getCategoryById(id)
        .then(response => formRes.getCategoryByIdRes(res, response, 200))
        .catch(err => console.log(err));
    },
    addCategory : (req, res) => {
        var date = new Date();
        const body = {
            name: req.body.name,
            created_at: date,
            updated_at: date,
        };
        console.log('test', req.body.name)
        categoryModel
        .addCategory(body)
        .then(response => formRes.addCategoryRes(res, response, 200))
        .catch(err => console.log(err));
    },
    updateCategory : (req, res) => {
    var date = new Date();
    const id = req.params.id;
    const body = {
    name: req.body.name,
    updated_at: date
    };
    console.log(body);
        categoryModel
        .updateCategory(body, id)
        .then(response => formRes.updateCategoryRes(res, response, 200))
        .catch(err => console.log(err));
    },
    deleteCategory : (req, res) => {
        const id = req.params.id;
        categoryModel
        .deleteCategory(id)
        .then(response => formRes.deleteCategoryRes(res, response, 200))
        .catch(err => console.log(err));
    }
}