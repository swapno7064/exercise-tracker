var express = require('express');
var router = express.Router();

var exerciseRouter = require('./exercises');
var userRouter = require('./users');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Hello');
});

router.use('/exercises',exerciseRouter);
router.use('/users',userRouter);

module.exports = router;  
