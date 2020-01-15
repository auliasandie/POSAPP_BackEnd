const db = require("../Config/db");
const { getMaxPage } = require("./page");

exports.getOrder = (req, page) => {
  let sql = "SELECT * FROM `order` ";
  return new Promise((resolve, reject) => {
    getMaxPage(page, null, "order")
      .then(maxPage => {
        console.log(maxPage, "inimaxpage");
        const infoPage = {
          currentPage: page.page,
          totalAllOrder: maxPage.totalProduct,
          maxPage: maxPage.maxPage
        };

        db.query(
          `${sql} LIMIT ? OFFSET ?`,
          [page.limit, page.offset],
          (err, data) => {
            console.log(err, "iniiiiii");
            if (!err)
              resolve({
                infoPage,
                data
              });
            else reject(err);
          }
        );
      })
      .catch(err => reject(err));
  });
};

exports.newOrder = (body) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO order_detail SET ? `, [body], (err, response) => {
      if(!err) {
        resolve(response);
    } else {
        reject(err);
    }
});
});
}
exports.getOrderDetail = (req) => {
  console.log(req.query, 'QUERYYY')
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM order_detail `,(err, response) => {
      if(!err) {
        resolve(response);
    } else {
        reject(err);
    }
});
});
}
exports.updateStatusOrder = req => {
  const body = req.body;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE order SET status = ?, WHERE order_id = ? ",
      [body.status, req.params, order_id],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.updateQtyProduct = (product, status) => {
  let sql = "";
  const operator = (status = "success" ? "-" : "+");
  console.log(product);

  product.forEach((item, index) => {
    sql +=
      "UPDATE product SET quantity = quantity ${operator} ${item.quantity} WHERE id = ${item.product_id};";
  });
  return new Promise((resolve, reject) => {
    db.query(sql, product, (err, result) => {
      if (!err) resolve(result);
      else reject(err);
    });
  });
};

exports.reduceQtyProduct = product => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE product SET quantity_product = quantity_product - ? WHERE id = ? ",
      [product.quantity_product, product.product_id],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

