window.handleHomeRequest = () => {
  document.body.innerHTML = `
  <html>
  <head>
  </head>
  <body>
  <div class = "box">
     <ul type = "none">
       <li><a href="/" data-navigo>Home</a>
       <li><a href="/meals" data-navigo>Meals</a>
        
       <li><a href="/createMeal" data-navigo>Create-Meal</a>
       <li><a href="/contact" data-navigo>Contact</a>
    <ul>
  </div>

    <div class="wd">
        <h1> Welcome!</h1> 
        <h4>Everyone wants In. Make a Reservation Below</h4>
        <h2> Reservation</h2>
        <div class="opt">
           <form action="" method="post">
             <input type="button" value="Start Now" <a href="/meal/1" data-navigo></a>
           </form>
        </div>
    </div>
    
        <footer>
            <p>Contact</p>
            <p>Phone : +4554645345</p>
            <p> Email : hyf-mealshare@gmail.com <p>
            <p>© 2020 Copenhagen</p>
            
        </footer>
    <div>

    </body>
    </html>
  `;

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
