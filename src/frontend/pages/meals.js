window.handleMealsRequest = async () => {
  document.body.innerHTML = `
  <div class = "box">
  <ul type ="none">
  
  <li><a href="/" data-navigo>Home</a>
  <li><a href="/meals" data-navigo>Meals</a>
  <li><a href="/meal/1" data-navigo>Reserve</a>
  <li><a href="/createMeal" data-navigo>Create-Meal</a>
  <li><a href="/Contact" data-navigo>Contact</a>
  </ul>
  </div>
  <br/>
  <h1>Meals</h1>
  <ul id = "mealtype"></ul>`;

  //make sure the backend api works before working with it here
  const mealsResponse = await fetch("/api/meals");
  const meals = await mealsResponse.json();
  console.log(meals);

  const ul = document.getElementById("mealtype");
  meals.forEach((meal) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${meal.title}"data-navigo>${meal.title}</a>
    <p>Id: ${meal.id}</P>
    <p>Price : ${meal.price}</p>
    <p>Description: ${meal.description}</p>
    <p>Max_reservation: ${meal.max_reservation}</p>`;
    console.log(ul.appendChild(li));
  });
  document.body.appendChild(ul);
};
