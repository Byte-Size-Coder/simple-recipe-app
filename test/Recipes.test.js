const {expect} = require('chai');

const Recipe = require('../src/models/Recipes');

describe('Recipe Model Validation', () => {

    it('Should be invalid if name is missing', () => {

        const recipe = new Recipe({
            description: 'Test description',
        });

        const error = recipe.validateSync();

        expect(error.errors.name).to.exist;
    })

    it('Should be invalid if prepTime is negative', () => {
        const newRecipe = new Recipe({
            name: 'Test Recipe',
            prepTime: -5
        });

        const error = newRecipe.validateSync();

        expect(error.errors.prepTime).to.exist;
    })
});

