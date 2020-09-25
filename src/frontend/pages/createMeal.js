window.handleCreateMealRequest = () => {
  document.body.innerHTML = `
  <div class = "box">
    <ul type = "none">
      <li><a href="/" data-navigo>Home</a>
      <li><a href="/meals" data-navigo>meals</a>
      <li><a href="/meal/1" data-navigo>Reserve</a>
      <li><a href="Contact" data-navigo>Contact</a>
    </ul>
  </div>
<br />
<h1 class= "title">Create Meal </h1>
<div class = "meal"
<form action="/api/meals"   id="addMeal">
  <div class = "reserve-info>
     <label for="title">Title*</label>
    
    <input type="text" id="title" name="title" class ="userinput" value="" required /></br>
  
    <label for="description">Description*</label>
    <input type="text" id="description" class =" userinput"value="" name="description"   required/><br>

    <label for="location">Location*</label>
    <input type="text" id="location" name="location" class ="userinput" value="" required/><br>
  
    <label for="when">When*</label>
    <input type="datetime" id="when" name="when" class ="userinput"value=""  required/><br>

    <label for="max_reservation">Max_reservation*</label>
    <input type="number" id="max_reservation" name="max_reservation" class ="userinput" value="" required/><br>

    <label for="price">Price*</label>
    <input type="number" id="price" name="price" class ="userinput"value=""  required/><br>

    <label for="created_date">Created-date*</label>
    <input type="datetime" id="created_date" name="created_date" class ="userinput" value="" required/><br>

  
  <button id = "enter">Add Meal</button>
</form>
</div>

`;

  //const input = document.querySelector(".userinput");
  const button = document.querySelector("button");

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const location = document.getElementById("location");
  const when = document.getElementById("when");
  const max_reservation = document.getElementById("max_reservation");
  const price = document.getElementById("price");
  const created_date = document.getElementById("created_date");

  const newMeal = {
    title: title.value,
    description: description.value,
    location: location.value,
    when: when.value,
    max_reservation: max_reservation.value,
    price: price.value,
    created_date: created_date.value,
  };
  console.log(newMeal);

  function addMealForm() {
    if (Object.keys(newMeal).length !== 0) {
      createMeal();
    } else {
      alert("please make sure you have filled the form correctly");
    }
  }
  function createMeal() {
    fetch(`/api/meals`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newMeal),
    })
      .then((response) =>
        response.json().then((result) => {
          console.log(result);
          alert(
            "Thank you for suggesting New meal, we will get back to you as soon as possible"
          );
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  button.addEventListener("click", addMealForm);
};
