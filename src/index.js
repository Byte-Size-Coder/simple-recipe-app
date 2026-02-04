const express = require('express');
const recipes = require('./models/Recipes');

const recipeController = require('./controllers/recipe');

const app = express();

// Model layer 


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('views/public'))

app.get('/', (req, res)=> {
    res.render('pages/home', {title: 'Recipe Picker App', recipes: recipes});
})

app.get('/recipe/:name', (req, res)=> {
    const recipeName = req.params.name;
    const recipe = recipes.find(r => r.name === recipeName);

    if (!recipe) {
        res.send('Recipe not found');
    }

    res.render('pages/recipe', {recipe: recipe});
});

app.use('/recipes', recipeController);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})