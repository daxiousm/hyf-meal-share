window.handleContactRequest = () => {
  document.body.innerHTML = `
  <html>
  <head>
  </head>
  <body>
     <div class = "box">
     <ul type = "none">
       <li><a href="/" data-navigo>Home</a>
       <li><a href="/meals" data-navigo>Meals</a>
       <li><a href="/meal/1" data-navigo>Reserve</a>
       <li><a href="/createMeal" data-navigo>Create-Meal</a>
       
    <ul>
    </div>

    <div class="wd">
        <h1>Contact us</h1> 
        <p> Email: hyf-mealShare@meals.com</p>
        <p>phone:+4565743436</p>
        <div class="opt">
           
        </div>
    </div>

    </body>
    </html>
  `;
};
