const express = require('express');

const router = express.Router();

router.get('/products',function(req,res){
    res.redirect('/products');
});

module.exports =router;