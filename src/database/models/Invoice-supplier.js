module.exports = (sequelize, dataTypes) => {
    let alias = 'InvoiceSupplier';
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
        number: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        total: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        totalBruto: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        iva: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }         
       
    };         
    
    let config = {
        timestamps: false,
        tableName:"invoice-supplier"
        
    }

    const InvoiceSupplier = sequelize.define(alias, cols, config);

    return InvoiceSupplier
};