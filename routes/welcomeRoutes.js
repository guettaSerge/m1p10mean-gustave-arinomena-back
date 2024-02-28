const express=require("express");
const router= express.Router();
router.route("/").get(function(req, res, next) {
    res.send('le serveur fonctionne');
  })


module.exports=router;