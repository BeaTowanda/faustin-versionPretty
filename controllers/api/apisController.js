const db = require("../../src/database/models");
const sequelize = db.sequelize;

const apis = {
  usersList: function (req, res) {
    db.User.findAll().then((users) => {
      let newData = users.map((user) => {
        return {
          id: user.id,
          userName: user.userName,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          bornDate: user.bornDate,
          endpoint: "/api/users/" + user.id,
        };
      });
      let respuesta = {
        meta: {
          status: 200,
          total_users: users.length,
          url: "/api/users",
        },
        data: newData,
      };
      res.json(respuesta);
    });
  },
  userDetail: function (req, res) {
    db.User.findByPk(req.params.id).then((resultado) => {
      let jsonProducto = {
        meta: {
          status: 200,
          url: "/api/users/" + req.params.id,
        },
        data: {
          id: resultado.id,
          userName: resultado.name,
          first_name: resultado.first_name,
          last_name: resultado.last_name,
          email: resultado.email,
          bornDate: resultado.bornDate,
        },
      };
      res.json(jsonProducto);
    });
  },
  usersLast: async function (req, res) {
    let lastUser = await db.User.findAll({
      limit: 4,
    });
    lastUser.forEach((user) => {
      user.setDataValue("endpoint", "/api/lastUsers/" + user.id);
    });

    let jsonUsers = {
      meta: {
        status: 200,
        lastUser: lastUser,
        url: "/api/lastUsers",
      },
      data: {
        id: lastUser.id,
        name: lastUser.userName,
        avatar: lastUser.avatar,
      },
    };
    res.json(jsonUsers);
  },
  usersCategorList: async function (req, res) {
    let userCategories = await db.UserCategory.findAll({
      include: ["categoU"],
    });
    //return res.json(subcategories)
    let quantityUsers = userCategories.map((userCategories) => {
      return {
        name: userCategories.category_name,
        count: userCategories.categoU.length,
      };
    });

    let userCategoriesJson = {
      meta: {
        status: 200,
        url: "/api/userCategories",
        quantityUsers,
      },
      data: userCategories,
    };
    res.json(userCategoriesJson);
  },
  productsList: async function (req, res) {
    let products = await db.Product.findAll({
      include: ["pYear", "pColection", "pType", "coloresDB"],
    });

    let lastProducts = await db.Product.findAll({
      limit: 5,
    });

    products.forEach((product) => {
      product.setDataValue("endpoint", "/api/products/" + product.id);
    });

    lastProducts.forEach((product) => {
      product.setDataValue("endpoint", "/api/products/" + product.id);
    });

    let jsonProducts = {
      meta: {
        status: 200,
        total_products: products.length,
        lastProducts: lastProducts,
        url: "/api/products",
      },
      data: products,
    };
    res.json(jsonProducts);
  },
  productDetail: function (req, res) {
    db.Product.findByPk(req.params.id, {
      include: ["pYear", "pColection", "pType", "coloresDB"],
      //["subcategory","colors"]
    }).then((product) => {
      let productJson = {
        data: {
          id: product.id,
          //code: product.code,
          name: product.name,
          price: product.price,
          description: product.description,
          dto: product.dto,
          //data_color:product.coloresDB,
          //data_color: product.colors,
          data_subcategory: product.pType.type_name,
          //data_subcategory: product.subcategory
        },
      };
      res.json(productJson);
    });
  },
  amountOrder: function (req, res) {
    //db.Order.findAll({
    db.Invoice.findAll({
      // include: ["items"]
    }).then((resultado) => {
      let jsonOrders = {
        meta: {
          status: 200,
          url: "/api/orders",
          total_orders: resultado.length,
        },
        data: resultado,
      };

      res.json(jsonOrders);
    });
  },
  categoriesList: async function (req, res) {
    let categories = await db.ProductType.findAll({
    });
    let categoriesJson = {
      meta: {
        status: 200,
        url: "/api/categories",
      },
      data: categories,
    };
    res.json(categoriesJson);
  },
  subcategoryList: async function (req, res) {
    let subcategories = await db.ProductType.findAll({
      include: ["typesP"],
    });
    let quantityProducts = subcategories.map((subcategories) => {
      return {
        name: subcategories.type_name,
        count: subcategories.typesP.length,
      };
    });

    let subcategoriesJson = {
      meta: {
        status: 200,
        url: "/api/subcategories",
        quantityProducts,
      },
      data: subcategories,
    };
    res.json(subcategoriesJson);
  },
  colectionList: async function (req, res) {
    let colectionCategories = await db.ProductColection.findAll({
      include: ["colectionP"],
    });
    let quantityProducts = colectionCategories.map((colectionCategories) => {
      return {
        name: colectionCategories.colection_name,
        count: colectionCategories.colectionP.length,
      };
    });

    let colectionCategoriesJson = {
      meta: {
        status: 200,
        url: "/api/colectionCategories",
        quantityProducts,
      },
      data: colectionCategories,
    };
    res.json(colectionCategoriesJson);
  },
  yearList: async function (req, res) {
    let yearCategories = await db.ProductYear.findAll({
      include: ["yearsP"],
    });
    let quantityProducts = yearCategories.map((yearCategories) => {
      return {
        name: yearCategories.year_name,
        count: yearCategories.yearsP.length,
      };
    });

    let yearCategoriesJson = {
      meta: {
        status: 200,
        url: "/api/yearCategories",
        quantityProducts,
      },
      data: yearCategories,
    };
    res.json(yearCategoriesJson);
  },
  updateCart: async function (req, res) {
    await db.Item.update(
      {
        subtotal: Number(req.body.quantity) * Number(req.body.unit_price),
        quantity: Number(req.body.quantity),
      },
      {
        where: {
          user_id: req.session.usuarioLogueado.id,
          order_id: null,
          product_name: req.body.product_name,
        },
      }
    );
    let item = await db.Item.findOne({
      where: {
        user_id: req.session.usuarioLogueado.id,
        order_id: null,
        product_name: req.body.product_name,
      },
    });

    res.json(item);
  },
  productSee: async function (req, res) {
    let productSeeP = await db.Product.findAll({
      limit: 1,
      order: [["id", "DESC"]],
      include: ["pYear", "pColection", "coloresDB", "pType"],
    });
    
   //return res.json(productSeeP)
   
    let productSeePJson = {
      meta: {
        status: 200,
        productSeeP: productSeeP,
        url: "/api/productUltimo",
      },
      data: {productSeeP}
      //  name:productSeeP.name,
      //  description:productSeeP.description,
      //  description2:productSeeP.description2,
      //  price:productSeeP.price,
       // dto:productSeeP.dto,
       // pType:productSeeP.pType,
      //  pColection:productSeeP.pColection,
      //  pYear:productSeeP.pYear
      //},
     
    };
    
     return res.json(productSeePJson);
  },
  ultimaCompra: async function (req, res) {
    let products = await db.Product.findAll({
      limit: 1,
      order: [["id", "DESC"]],
      include: ["pYear", "pColection", "coloresDB", "pType"],
    });
    console.log(products[0].id)
   //return res.json(products)
   
   let producto= products[0].id
   console.log("producto= "+ producto)
   let compras = await db.InvoiceItem.findAll({
     where:{
       id_product : producto
     }
   })
   compras.forEach((compra) => {
    compra.setDataValue("endpoint", "/api/compraUltima/" + compra.id);
  });
   //res.json(compras)
    let jsonCompras = {
      meta: {
        status: 200,
        total_compras:compras.length,
        url: "/api/compraUltima"
      },
      data: {compras}
      //  name:productSeeP.name,
      //  description:productSeeP.description,
      //  description2:productSeeP.description2,
      //  price:productSeeP.price,
       // dto:productSeeP.dto,
       // pType:productSeeP.pType,
      //  pColection:productSeeP.pColection,
      //  pYear:productSeeP.pYear
      //},
     
    };
    
     return res.json(jsonCompras);
  }
};

module.exports = apis;
