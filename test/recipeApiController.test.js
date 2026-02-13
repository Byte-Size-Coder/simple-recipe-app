const { expect }  = require("chai")
const sinon = require("sinon");

const recipeApiController = require("../src/controllers/recipeApiController");
const Recipes = require("../src/models/Recipes");


describe("Recipe API Controller - getAllRecipes", () => {

    afterEach(() => {
        sinon.restore();
    })

    it("should return all recipes with status 200", async() => {

        const fakeRecipes = [
            {
                name: 'Spaghetti Bolognese',
                description: 'Classic Italian meat sauce.'
            },
            {
                name: 'Vegetable Stir Fry',
                description: 'Healthy and quick veggies.'
            }
         ];

        sinon.stub(Recipes, "find").resolves(fakeRecipes);

        const req = {};

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        await recipeApiController.getAllRecipes(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(fakeRecipes)).to.be.true;
    })

    it("should return status 500 if database fails", async () => {
        sinon.stub(Recipes, "find").throws(new Error("DB Error"));

        const req = {};

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        await recipeApiController.getAllRecipes(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ error: "DB Error" })).to.be.true;

    })

})

describe("Recipe API Controller - createRecipe", () => {
    afterEach(() => {
        sinon.restore();
    })

    it("should create a recipe and return 201", async () => {

        const fakeRecipe = {
            name: 'Tomato Soup',
            description: 'Warm and comforting.'
        };

        sinon.stub(Recipes, "create").resolves(fakeRecipe);

        const req = {
            body: fakeRecipe
        }

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        }

        await recipeApiController.createRecipe(req, res);


        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(fakeRecipe)).to.be.true;
    });
})