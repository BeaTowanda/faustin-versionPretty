
const { urlencoded } = require("express");
const mainController = {
    home: (req, res) => {

        res.render("homeDB")
    },
};

module.exports=mainController;