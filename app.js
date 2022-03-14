const express = require("express");
const fs = require("fs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/db.json`));
const app = express();
const router = express.Router();
app.use(express.json());
app.use("/", router);
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};
const getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  //console.log("this is tour", tour);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
const addUser = (req, res) => {
  console.log(req.body);
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        users,
      },
    });
  });
};
const updateUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);

  const newUser = Object.assign(user, req.body);

  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        users,
      },
    });
  });
};
const deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  users.splice(id - 1, 1);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "success",
      data: null,
    });
  });
};

//app.get("/get/users", getAllUsers);
router.route("/users").get(getAllUsers).post(addUser);
router.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
