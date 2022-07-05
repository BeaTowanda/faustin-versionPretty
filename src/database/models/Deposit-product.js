module.exports = (sequelize, dataTypes) => {
    let alias = 'DepositProduct';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },          
        id_prod_color_prod: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        }, 
        id_deposit: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        }, 
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }, 
        date_new: {
            type: dataTypes.DATE,
            allowNull: true
        }
        
    };         
    
    let config = {
        timestamps: false,
        tableName:"deposit-product"
        
    }

    const DepositProduct = sequelize.define(alias, cols, config);
    DepositProduct.associate = function (models) {
        DepositProduct.belongsTo(models.Deposit, {    
          as: "depositD",
          foreignKey: "id_deposit",
        });
        DepositProduct.belongsTo(models.ProductColorProduct, {    
            as: "prodColorDep",
            foreignKey: "id_prod_color_prod",
          });
    }
    return DepositProduct
    }  