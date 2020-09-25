var root = document.location.origin;
var router = new Navigo(root);

// when no route specified it assumes the base route: "/"
router.on(window.handleHomeRequest).resolve();
router.on("/meals", window.handleMealsRequest).resolve();
router.on("/meal/:id", window.handleMealRequest).resolve();
router.on("/createMeal", window.handleCreateMealRequest).resolve();
router.on("/contact", window.handleContactRequest).resolve();
