const express = require("express");
const router = express.Router();

const {
    home,
    validator
} = require("../controllers/controller");

router.get('/', home);
router.post('/validate-rule', validator);

module.exports = router;