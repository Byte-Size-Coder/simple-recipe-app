console.log("hello");

fetch('/recipes')
    .then(responses => responses.json())
    .then(data => {
        console.log(data);
    });