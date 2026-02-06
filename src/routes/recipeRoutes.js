const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');

router.get('/', (req, res) => { recipeController.getAllRecipes(req, res) });
router.get('/recipe/:id', (req, res) => { recipeController.getRecipe(req, res) });

module.exports = router;
