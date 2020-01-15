const db = require("../Config/db");

exports.pagination = req => {
  const limit = Number(req.query.perpage) || 20;
  const page = Number(req.query.page) || 1;
  const offset = limit * (page - 1);

  return {
    limit,
    offset,
    page
  };
};

exports.getMaxPage = (page, keyword, table) => {
  return new Promise((resolve, reject) => {
    if (keyword != null) table += " WHERE name_product LIKE ?";
    db.query(`SELECT COUNT(*) as total FROM ${table}`,  ['%' + keyword + '%'], (err, result) => {
      if (!err) {
        const maxPage = Math.ceil(result[0].total / page.limit);
        console.log(page.page, 'ini page')

        if (maxPage >= page.page) {
          resolve({
            totalProduct: result[0].total,
            maxPage
          });
        } else {
          reject(`Im sorry only until page ${maxPage}`);
        }
      } else reject(err);
    });
  });
};
