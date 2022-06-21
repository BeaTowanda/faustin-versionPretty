module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },     
        category_name: {
            type: dataTypes.STRING(100),
            allowNull: true
        }         
        }    
    
    let config = {
        timestamps: false,
        tableName:"user-category"
        
    }
    
    const UserCategory = sequelize.define(alias, cols, config); 
    UserCategory.associate = function(models) {
        UserCategory.hasMany(models.User, {
           as:"categoU",
            foreignKey:"id_category"
       })
    }
    
    return UserCategory
};