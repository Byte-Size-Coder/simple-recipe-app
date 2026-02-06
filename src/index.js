const express = require('express');
const mongoose = require('mongoose');

const recipeRoute = require('./routes/recipeRoutes');

const app = express();

// Model layer 
const dbURI = "mongodb+srv://mattadmin:circuitstream26@cluster0.gkbcynv.mongodb.net/recipeApp?appName=Cluster0";

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log("Error connecting to mongoDB:", error);
    })

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('views/public'))

app.get('/seed', async (req, res) => {
    const Recipe = require('./models/Recipes');

    await Recipe.deleteMany({});

    await Recipe.create([
        {
            name: 'Spaghetti Bolognese',
            description: 'Classic Italian meat sauce.',
            ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onion'],
            instructions: ['Boil pasta', 'Cook meat', 'Mix sauce'],
            prepTime: 15, cookTime: 30,
            image: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=600',
            isFavourite: true
        },
        {
            name: 'Vegetable Stir Fry',
            description: 'Healthy and quick veggies.',
            ingredients: ['Broccoli', 'Carrots', 'Soy Sauce', 'Tofu'],
            instructions: ['Chop veggies', 'Fry tofu', 'Stir fry all'],
            prepTime: 10, cookTime: 15,
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
            isFavourite: false
        }
    ]);

    res.send('Database seeded!');
})

app.use('/', recipeRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})