const db = require("../Config/db")
const { getMaxPage } = require("./page")

const sortBy = (req, sql) => {
    const sortBy = req.query.sortby;
    const orderBy = req.query.orderby;
  
    if (sortBy == "name") {
      sql += ` ORDER BY product.name_product `;
    } else if (sortBy == "category") {
      sql += ` ORDER BY category.name `;
    } else if (sortBy == "updated") {
      sql += ` ORDER BY product.updated_at `;
    } else if (sortBy == "id") {
      sql += ` ORDER BY product.id `;
    } else {
      sql += ` ORDER BY product.name_product `;
    }
  
    if (sortBy != null) {
      if (orderBy == "asc" || orderBy == null) {
        sql += "ASC";
      } else if ("desc") {
        sql += "DESC";
      }
    }else {
      if (orderBy == "asc" || orderBy == null) {
        sql += "ASC";
      } else if ("desc") {
        sql += "DESC";
      }
    } 
  
    return sql;
  };

  const searchProduct = (req, sql) => {
    const keyword = req.query.value;
  
    if (keyword != null) {
      sql += ` WHERE product.name_product LIKE ? `;
    }
  
    return {
      sql,
      keyword
    };
  };

  exports.getProduct = (req, page) => {
    let name = "product"
    let sql = `SELECT * FROM \`${name}\``;
    console.log(req.query, 'query');

    const query = searchProduct(req, sql);
    sql = sortBy(req, query.sql);
    console.log(sql);
    console.log(query)
  
    return new Promise((resolve, reject) => {
      getMaxPage(page, query.keyword, "product")
        .then(maxPage => {
          const infoPage = {
            currentPage: page.page,
            totalAllProduct: maxPage.totalProduct,
            maxPage: maxPage.maxPage
          };
  
          db.query(
            `${sql} LIMIT ? OFFSET ? `,
            query.keyword == null
              ? [page.limit, page.offset]
              : ["%" + query.keyword + "%", page.limit, page.offset],
            (err, data) => {
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

  exports.getProductById = (req, orderProductId) => {
    return new Promise((resolve, reject) => {
      const productId = req.params.product_id || orderProductId || req.body.product_id;
      const sql = `SELECT * FROM product WHERE id=? `;
  
      db.query(sql, [productId], (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      });
    });
  };

  exports.getProductByName = req => {
    return new Promise((resolve, reject) => {
      const prodName = req.body.name_product || req.params.name_product;
  
      db.query(
        `SELECT * FROM product WHERE name_product=? `,
        [prodName],
        (err, result) => {
          if (!err) resolve(result);
          else reject(err);
        }
      );
    });
  };
  exports.getProductByCategory = req => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM product WHERE category_name=? `), [req.body.category_name],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        }
    })
}

exports.newProduct = req => {
    const body = req.body;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO product SET name_product=?, image_product=?, category_name=?, price_product=? `,
        [
          body.name_product,
          body.image_product,
          body.category_name,
          body.price_product,
        ],
        (err, result) => {
          if (!err) resolve(result);
          else reject(err);
        }
      );
    });
  };

  exports.updateProduct = req => {
    const body = req.body;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE product SET name_product = ?, image_product = ?, category_name = ?, price_product = ? WHERE id = ? `,
        [
          body.name_product,
          body.image_product,
          body.category_name,
          body.price_product,
          req.params.product_id
        ],
        (err, result) => {
          if (!err) resolve(result);
          else reject(err);
        }
      );
    });
  };
  
  exports.deleteProduct = req => {
    return new Promise((resolve, reject) => {
      const productId = req.params.product_id;

      db.query(
        `DELETE FROM product WHERE id = ? `,
        [productId],
        (err, result) => {
          if (!err) resolve(result);
          else reject(err);
        }
      );
    });
  };
