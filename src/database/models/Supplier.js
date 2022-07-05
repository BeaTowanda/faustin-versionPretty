module.exports = (sequelize, dataTypes) => {
    let alias = 'Supplier';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },         
        
        name: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        direction: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        zona: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        tax_condition: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        cuit: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        cuil: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        ingresosBrutos: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        retGanancias: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: true
        }          
    };         
    
    let config = {
        timestamps: false,
        tableName:"supllier"
        
    }

    const Supplier = sequelize.define(alias, cols, config);
    
    return Supplier
    }  