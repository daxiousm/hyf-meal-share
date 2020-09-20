/* function renderMeals(meals) {
  const ul = document.createElement("ul");
  meals.forEach((meal) => {
    const li = document.createElement("li");
    li.innerHtml = meal.name;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
} */

window.handleMealsRequest = async () => {
  document.body.innerHTML = `
  <h1>Meals</h1>`;

  /* const mealsResponse = await fetch("/api/meals");
  const meals = await mealsResponse.json();
  console.log(meals);

  const ul = document.createElement("ul");
  meals.forEach((meal) => {
    const li = document.createElement("li");
    li.innerHtml = meal.title;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);

  // make sure the backend api works before working with it here
  fetch("/api/meals")
    .then((res) => res.json())
    .then((meals) => console.log(meals)); */
};
