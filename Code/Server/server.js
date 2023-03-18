require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server's up on PORT ${port}...`);
});

app.use(cors());
app.use(express.json());

// Get a user (as admin)
app.get("/api/v1/gymSquid", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM customer");
    console.log("Doing a get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        customer: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a hasTrainerValue (as admin)
  app.get("/api/v1/gymSquid/hastrainer/:id", async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM hastrainer WHERE membershipid = $1", [req.params.id]);
      console.log("Doing a get HASTRAINER request...\n");
      res.status(200).json({
        status: "Success",
        results: results.rowCount.length,
        data: {
          hastrainer: results.rows[0],
        },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/gymSquid/employee", async (req, res) => {
  try {
    console.log("Attempting Employee GET");
    const results = await db.query(
      "SELECT ismanager FROM employee WHERE employeefname = $1 AND employeelname = $2 AND employeeid = $3",
      [req.query.employeefname, req.query.employeelname, req.query.employeeid]
    );
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        employee: results,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get ALL Employees.
app.get("/api/v1/gymSquid/employees/", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM employee");
    console.log("Doing Employee * GET request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        employee: results.rows
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a SPECIFIC user

app.get("/api/v1/gymSquid/:id", async (req, res) => {
  try {
    // Safely formatted against SQL attacks
    const results = await db.query(
      "SELECT * FROM customer WHERE membershipid = $1",
      [req.params.id]
    );
    console.log("Doing a SPECIFIC get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        customer: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a SPECIFIC equipment

app.get("/api/v1/gymSquid/equipment/:id/:two/:three", async (req, res) => {
  try {
    // Safely formatted against SQL attacks
    const results = await db.query(
      "SELECT * FROM amenities WHERE equipid = $1 AND subscriptiontype = $2 AND hasequipment = $3",
      [req.params.id, req.params.two, req.params.three]
    );
    console.log("Doing a SPECIFIC get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        amenities: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a new member

app.post("/api/v1/gymSquid", async (req, res) => {
  try {
    console.log(req.body);
    console.log("TESTINGGG");
    const results = await db.query(
      "INSERT INTO customer ( customerfname, customerlname,  username, password, memberat,  birthdate, subscriptionplan, membershipid) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [
        req.body.customerfname,
        req.body.customerlname,
        req.body.username,
        req.body.password,
        req.body.memberat,
        req.body.birthdate,
        req.body.subscriptionplan,
        req.body.membershipid,
      ]
    );
    console.log("\n\nRESULTS: ---> \n ");
    console.log(results);
    console.log("Doing a POST request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        customer: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a new member

app.post("/api/v1/gymSquid/employee", async (req, res) => {
  try {
    console.log(req.body);
    console.log("EMPLOYEE TESTING");
    const results = await db.query(
      "INSERT INTO employee ( employeefname, employeelname, istrainer, ismanager, worksat, employeeid) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        req.body.employeefname,
        req.body.employeelname,
        false,
        req.body.ismanager,
        req.body.worksat,
        req.body.employeeid,
      ]
    );
    console.log("\n\nRESULTS: ---> \n ");
    console.log(results);
    console.log("Doing a POST request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        employee: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a member

app.put("/api/v1/gymSquid/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE customer SET customerfname = $1, customerlname = $2, username = $3, password = $4, memberat = $5, subscriptionplan = $6 where membershipid = $7 returning *",
      [
        req.body.customerfname,
        req.body.customerlname,
        req.body.username,
        req.body.password,
        req.body.memberat,
        req.body.subscriptionplan,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "success",
      data: {
        membershipid: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a Member

app.delete("/api/v1/gymSquid/:id", async (req, res) => {
  console.log("Doing a delete request...\n");
  try {
    const results = await db.query(
      "DELETE FROM customer WHERE membershipid = $1",
      [req.params.id]
    );
    res.status(204).json({
      status: "success",
      data: {
        membershipid: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//  LOCATION LOCATION LOCATION
app.get("/api/v1/gymSquid/location/select", async (req, res) => {
  try {
    // Safely formatted against SQL attacks
    const results = await db.query("SELECT * FROM amenities");
    console.log("Doing a ALL LOCATION get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        amenities: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/gymSquid/location/choose/:id", async (req, res) => {
  try {
    // Safely formatted against SQL attacks
    const results = await db.query(
      "SELECT * FROM amenities where hasequipment = $1 returning *",
      [req.params.id]
    );
    console.log(req.params);
    console.log("Doing a LOCATION LOCATION SPECIFIC get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        amenities: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// LOCATION WITH FILTER

app.get("/api/v1/gymSquid/location/filter/:id/:filter", async (req, res) => {
  try {
    // Safely formatted against SQL attacks
    const results = await db.query(
      "SELECT * FROM amenities where hasequipment = $1 AND subscriptiontype = $2",
      [req.params.id, req.params.filter]
    );
    console.log(req.params);
    console.log("Doing a REALLY SPECIFIC get request...\n");
    res.status(200).json({
      status: "Success",
      results: results.rowCount.length,
      data: {
        amenities: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
