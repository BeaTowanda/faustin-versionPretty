module.exports = (sequelize, dataTypes) => {
    let alias = 'UserRemitTotal';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },         
        number: {
            type: dataTypes.INTEGER(30),
            allowNull: true
        },  
        date_expedition: {
            type: dataTypes.DATE,
            allowNull: true
        }, 
        date_reception:{
            type: dataTypes.DATE,
            allowNull: true
        }, 
        dni_recepction:{
            type: dataTypes.DATE,
            allowNull: true 
        },
        zona: {
            type: dataTypes.INTEGER(10),
            allowNull: true  
        },
        comentaries: {
            type: dataTypes.STRING(200),
            allowNull: true  
        }
        
    };         
    
    let config = {
        timestamps: false,
        tableName:"user-remit-total"
        
    }

    const UserRemitTotal = sequelize.define(alias, cols, config);
    UserRemitTotal.associate = function(models) {
        UserRemitTotal.belongsTo(models.Invoice, {
           as:"remitInvoice",
            foreignKey:"id_invoice"
       });
       
    }
    return UserRemitTotal
    }  