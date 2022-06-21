module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductColorProduct';
    let cols = {
      
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        id_color: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        dispach: {
            type: dataTypes.STRING(100),
            allowNull: true
        }
             
    }; 
    let config = {
        timestamps: false,
        tableName:"product-color-product"
        
    }
    const ProductColorProduct = sequelize.define(alias, cols, config); 
    
    

    return ProductColorProduct;
};