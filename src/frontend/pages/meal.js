window.handleMealRequest = async (params) => {
  document.body.innerHTML = `
  <div class = "box">
    <ul type = "none">
      <li><a href="/" data-navigo>Home</a>
      <li><a href="/meals" data-navigo>meals</a>
      <li><a href="/createMeal" data-navigo>Create-Meal</a>
      <li><a href="/contact" data-navigo>Contact</a>
    </ul>
  </div>
<br />
<div class = "meal"
<form   id="addMeal">
  <div class = "reserve-info>
     <label for="name">Name*</label>
    
    <input type="text" id="name"  class ="userinput" value="" required name="name" /></br>
  
    <label for="phone">Phone*</label>
    <input type="number" id="phone" class =" userinput" value=""  minlength="8"  required name="phone"/><br>
  
  
    <label for="email">Email*</label>
    <input type="email" id="email"  class =" userinput" value="" placeholder="Email:" required name="email"/><br>
  
  <button id = "enter">Add Reservation</button>
</form>
</div>

<h1 class= "title">Reserve Meal </h1>
<ul class="attach"></ul>`;
  const ul = document.querySelector(".meal");
  const mealsWithId = await fetch(`/api/meals/${params.id}`);
  const meals = await mealsWithId.json();
  console.log(meals[0].max_reservation);
  meals.forEach((meal) => {
    const mealType = document.createElement("p");
    mealType.innerHTML = `<h2>Title - ${meal.title}<h2></br> Description:${meal.description}</br> Location:${meal.location}</br> When:${meal.when}</br> max_reservation:${meal.max_reservation} </br> Price:${meal.price}`;
    ul.appendChild(mealType);
  });
  document.body.appendChild(ul);

  const input = document.querySelector(".userinput");
  const button = document.querySelector("button");

  function inputlength() {
    return input.value.length;
  }

  function createReservation() {
    /* const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email "); */

    const newReservation = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      //meal_ID: id,
    };
    console.log(newReservation);

    fetch(`/api/reservations/`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newReservation),
    })
      .then((response) =>
        response.json().then((result) => {
          console.log(result);
          alert("Your booking is submited succesfully");
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
  function addReservationForm() {
    if (inputlength() > 0) {
      createReservation();
    } else {
      alert("please make sure you have filled the form correctly");
    }
  }
  button.addEventListener("click", addReservationForm);
};
