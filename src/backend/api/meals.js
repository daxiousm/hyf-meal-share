const express = require("express");
const knex = require("../database");
const router = express.Router();

const createMeals = async ({ body }) => {
  const {
    title,
    description,
    location,
    created_date,
    max_reservation,
    price,
  } = body;
  return await knex("meal").insert({
    title: title,
    description: description,
    location: location,
    created_date: created_date,
    max_reservation: max_reservation,
    price: price,
  });
};
router.post("/", async (request, response) => {
  console.log(request);
  createMeals({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

const getAllMeals = async () => {
  try {
    return await knex("meal").select("*");
  } catch (error) {
    console.log(error);
  }
};

// getting all meals
router.get("/", async (request, response) => {
  getAllMeals()
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

//getting meals by id

router.get("/:id", async (req, res) => {
  const mealId = parseInt(req.params.id);
  if (!mealId) {
    res.status(400).send(`Bad request, id should be a number.`);
  } else {
    const meal = await knex("meal").where({ id: mealId });
    if (meal.length) {
      res.json(meal);
    } else {
      res.status(404).send(`Not found, there is no meal with id: ${mealId}.`);
    }
  }
});

const editMeal = async ({ body, id }) => {
  const {
    title,
    description,
    location,
    created_date,
    max_reservation,
    price,
  } = body;
  const meal = await knex.from("meal").select("*").where({
    id: id,
  });
  if (meal.length === 0) {
    throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
  }
  const updateMeals = {
    title: title,
    description: description,
    price: price,
  };
  if (Object.keys(updateMeals).length !== 0) {
    return await knex("meal")
      .where({
        id: id,
      })
      .update(updateMeals);
  } else return "Nothing updated!";
};

router.put("/:id", async (req, res) => {
  editMeal({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

router.delete("/", async (req, res) => {
  deleteMeal({
    body: req.body,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

const deleteMeal = async ({ body }) => {
  try {
    if (!body.id) {
      throw new HttpError("Bad request", "Id not found", 400);
    }
    return knex("meal")
      .where({
        id: body.id,
      })
      .del();
  } catch (err) {
    console.log(err);
    return "something went wrong, try again";
  }
};

//GET api/meals/ query parameters

const getByLimit = async (limit) => {
  try {
    return await knex("meal").select("*").orderBy("id", "DESC").limit(limit);
  } catch (error) {
    console.log(error);
  }
};

const getByMaxPrice = async () => {
  try {
    return await knex("meal")
      .select("*")
      .from("meal")
      .where("price", "<", "maxPrice");
  } catch (error) {
    console.log(error);
  }
};

const getByCreatedAfter = async () => {
  try {
    return await knex("meal")
      .select("*")
      .from("meal")
      .where("created_date", ">", "createdAfter");
  } catch (error) {
    console.log(error);
  }
};

const title = async () => {
  try {
    return await knex("meal")
      .select("*")
      .from("meal")
      .where("title", "like", "`%${title}%`");
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (request, response) => {
  const limit = parseInt(request.query.limit);
  getByLimit(limit)
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

router.get("/", async (request, response) => {
  const maxPrice = parseInt(request.query.maxPrice);
  getByMaxPrice(maxPrice)
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

router.get("/", async (request, response) => {
  const createdAfter = parseInt(request.query.createdAfter);
  getByCreatedAfter(createdAfter)
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

router.get("/", async (request, response) => {
  const title2 = parseInt(request.query.title);
  title(title2)
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

module.exports = router;
