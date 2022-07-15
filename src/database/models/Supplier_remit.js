module.exports = (sequelize, dataTypes) => {
    let alias = 'SupplierRemit';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },         
        id_supplier: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
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
        id_deposit: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        }, 
        
        number: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },    
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }, 
        date_reception: {
            type: dataTypes.DATE,
            allowNull: true
        },
        dniReception: {
            type: dataTypes.INTEGER(8),
            allowNull: true
        },
        zona: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        comentaries: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        
    };         
    
    let config = {
        timestamps: false,
        tableName:"supplier-remit"
        
    }

    const SupplierRemit = sequelize.define(alias, cols, config);
    SupplierRemit.associate = function(models) {
        SupplierRemit.belongsTo(models.Deposit, {
           as:"depositSR",
            foreignKey:"id_deposit"
       })
       SupplierRemit.belongsTo(models.Supplier, {
        as:"supplierSR",
         foreignKey:"id_supplier"
        })
        SupplierRemit.belongsTo(models.Product, {
            as:"supplierPROD",
            foreignKey:"id_product"
        });
        SupplierRemit.belongsTo(models.ProductColor, {
            as:"supplierCOLOR",
            foreignKey:"id_color"
        });
    }
    return SupplierRemit
    }   