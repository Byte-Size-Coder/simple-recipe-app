const Recipe = require('../models/Recipes');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.render('pages/home', { title: 'Recipe Picker App', recipes: recipes });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.render('pages/recipe', { recipe: recipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

