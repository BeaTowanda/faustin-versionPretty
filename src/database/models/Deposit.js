module.exports = (sequelize, dataTypes) => {
    let alias = 'Deposit'
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        onCharge: {
            type: dataTypes.STRING(30),
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
        horary: {
            type: dataTypes.STRING(50),
            allowNull: true
        }
                
    };         
    
    let config = {
        timestamps: false,
        tableName:"Deposit"
        
    }
    const Deposit = sequelize.define(alias, cols, config);
    Deposit.associate = function(models) {
        Deposit.hasMany(models.DepositProduct, {
           as:"Pdeposit",
            foreignKey:"id_deposit"
       })
       Deposit.hasMany(models.SupplierRemit, {
        as:"Dremit",
        foreignKey:"id_deposit"
        })
        Deposit.hasMany(models.UserRemit, {
            as:"Uremit",
            foreignKey:"id_deposit"
            })
    }
    return Deposit
};