module.exports = (sequelize, dataTypes) => {
    let alias = 'SupplierRemitItem';
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
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },   
        id_color: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        number: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }, 
        id_supplier: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        id_deposit: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        }           
       
        
    };         
    
    let config = {
        timestamps: false,
        tableName:"supplier-remit-item"
        
    }

    const SupplierRemitItem = sequelize.define(alias, cols, config);
    SupplierRemitItem.associate = function(models) {
        SupplierRemitItem.belongsTo(models.ProductColorProduct, {
           as:"itemPCP",
           foreignKey:"id_prod_color_prod"
        })
        SupplierRemitItem.belongsTo(models.Product, {
           as:"itemProd",
           foreignKey:"id_product"
        })
        SupplierRemitItem.belongsTo(models.ProductColor, {
            as:"itemColor",
            foreignKey:"id_color"
        })
        SupplierRemitItem.belongsTo(models.Supplier, {
            as:"itemSupplier",
            foreignKey:"id_supplier"
        })
        SupplierRemitItem.belongsTo(models.Deposit, {
            as:"itemDeposit",
            foreignKey:"id_deposit"
        })
        
    }
    return SupplierRemitItem;
    }