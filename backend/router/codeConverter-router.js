const express=require("express");
const router=express.Router();
const codeConverterController=require("../controllers/codeConverter-controller");

router.route("/codeconverter").get(codeConverterController);

module.exports = router;