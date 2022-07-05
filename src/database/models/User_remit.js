module.exports = (sequelize, dataTypes) => {
    let alias = 'UserRemit';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },         
        number: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }, 
        dateExpedition: {
            type: dataTypes.DATE,
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
        id_itemInvoice: {
            type: dataTypes.BIGINT(10).UNSIGNED,
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
        
    };         
    
    let config = {
        timestamps: false,
        tableName:"user-remit"
        
    }

    const UserRemit = sequelize.define(alias, cols, config);
    UserRemit.associate = function(models) {
        UserRemit.belongsTo(models.Deposit, {
           as:"depositUR",
            foreignKey:"id_deposit"
       });
       UserRemit.belongsTo(models.Product, {
        as:"uRemitPROD",
         foreignKey:"id_product"
        });
        UserRemit.belongsTo(models.ProductColor, {
            as:"uRemitCOLOR",
             foreignKey:"id_color"
        });
        UserRemit.belongsTo(models.ProductColorProduct, {
            as:"uRemitPDP",
             foreignKey:"id_prod_color_prod"
        });
        UserRemit.belongsTo(models.InvoiceItem, {
            as:"usItem",
             foreignKey:"id_itemInvoice"
        });
    }
    return UserRemit
    }  