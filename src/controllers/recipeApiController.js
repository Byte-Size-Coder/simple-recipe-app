const Recipe = require('../models/Recipes');

// C -> CREATE operation
exports.createRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// R-> READ Operations
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// U -> UPDATE operation
exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// D -> DELETE operation
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(204).json({ message: 'Recipe deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

