// meal-planner.js

let ingredients = [];

document.getElementById('ingredient-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredientInput = document.getElementById('ingredient');
    const expiryDateInput = document.getElementById('expiry-date');
    
    const ingredient = ingredientInput.value.trim();
    const expiryDate = expiryDateInput.value;

    if (ingredient && expiryDate) {
        ingredients.push({ ingredient, expiryDate });
        ingredientInput.value = ''; // Clear input field
        expiryDateInput.value = ''; // Clear date input field
        updateIngredientList();
        checkExpiryDates();
    }
});

function updateIngredientList() {
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';
    ingredients.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.ingredient} (Expires: ${item.expiryDate})`;
        ingredientList.appendChild(li);
    });
}

document.getElementById('get-suggestions').addEventListener('click', function() {
    const suggestionList = document.getElementById('suggestion-list');
    suggestionList.innerHTML = ''; // Clear previous suggestions

    // Simple meal suggestions based on the ingredients
    const mealSuggestions = [
        "Pasta with " + ingredients.map(i => i.ingredient).join(", "),
        "Salad with " + ingredients.map(i => i.ingredient).join(", "),
        "Stir-fry with " + ingredients.map(i => i.ingredient).join(", "),
        "Soup with " + ingredients.map(i => i.ingredient).join(", "),
    ];

    mealSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionList.appendChild(li);
    });
});

function checkExpiryDates() {
    const today = new Date();
    const alertThreshold = 3; // days before expiry to alert
    ingredients.forEach(item => {
        const expiry = new Date(item.expiryDate);
        const timeDiff = (expiry - today) / (1000 * 3600 * 24); // difference in days
        
        if (timeDiff >= 0 && timeDiff <= alertThreshold) {
            alert(`Alert: ${item.ingredient} is expiring in ${Math.ceil(timeDiff)} days!`);
        }
    });
}
