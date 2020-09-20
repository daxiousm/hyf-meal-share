const express = require("express");
const knex = require("../database");
const router = express.Router();

const createReservations = async ({ body }) => {
  const {
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = body;
  return await knex("reservation").insert({
    number_of_guests: number_of_guests,
    meal_id: meal_id,
    created_date: created_date,
    contact_phonenumber: contact_phonenumber,
    contact_name: contact_name,
    contact_email: contact_email,
  });
};
router.post("/", async (request, response) => {
  console.log(request);
  createReservations({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

const getAllReservations = async () => {
  try {
    return await knex("reservation").select("*");
  } catch (error) {
    console.log(error);
  }
};

// getting all reservations
router.get("/", async (request, response) => {
  getAllReservations()
    .then((result) => response.json(result))
    .catch((ex) => {
      response.status(400).send("Bad request").end();
      console.log(ex);
    });
});

//getting reservations by id

router.get("/:id", async (req, res) => {
  const reservationId = parseInt(req.params.id);
  if (!reservationId)
    res.status(400).send(`Bad request, id should be a number.`);
  else {
    const reservation = await knex("reservation").where({ id: reservationId });
    if (reservation.length === 0)
      res
        .status(404)
        .send(`Not found, there is no reservation with id: ${reservationId}.`);
    else res.json(reservation);
  }
});

const editReservation = async ({ body, id }) => {
  const {
    title,
    description,
    location,
    created_date,
    max_reservation,
    price,
  } = body;
  const reservation = await knex.from("reservation").select("*").where({
    id: id,
  });
  if (reservation.length === 0) {
    throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
  }
  const updateReservations = {
    title: title,
    description: description,
    price: price,
  };
  if (Object.keys(updateReservations).length !== 0) {
    return await knex("reservation")
      .where({
        id: id,
      })
      .update(updateReservations);
  } else return "Nothing updated!";
};

router.put("/:id", async (req, res) => {
  editReservation({
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
  deleteReservation({
    body: req.body,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

const deleteReservation = async ({ body }) => {
  try {
    if (!body.id) {
      throw new HttpError("Bad request", "Id not found", 400);
    }
    return knex("reservation")
      .where({
        id: body.id,
      })
      .del();
  } catch (err) {
    console.log(err);
    return "something went wrong, try again";
  }
};

module.exports = router;
