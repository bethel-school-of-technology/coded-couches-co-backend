var express = require("express");
var router = express.Router();
const { User } = require("../models");
var bcrypt = require("bcrypt");
var auth = require("../services/auth");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/", function (req, res, next) {
  User.findAll({}).then((result) => {
    res.json(result);
  });
});

// Post, Register User
router.post("/", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Username and password is required");
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.create({
    username: req.body.username,
    password: hashedPassword,
  })
    .then((newUser) => {
      res.json({
        id: newUser.id,
        username: newUser.username,
      });
    })
    .catch(() => {
      res.status(400).send();
    });
});

// POST SignIn
router.post("/login", async (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(async (user) => {
    if (!user) {
      res.status(404).send("Username does not exist");
      return;
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      const jwt = auth.createJWT(user);
      res.status(200).send({ jwt });
    } else {
      res.status(401).send("Invalid password");
    }
  });
});

// DELETE: delete a user (double check this route)
router.delete("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);

  // if (!userId || !user.admin) {
  //   //changed userId <= 0 to admin
  //   res.status(400).send("Invalid ID");
  //   return;
  // }

  User.destroy({
    where: {
      id: userId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

// PUT , update a user
router.put("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (!userId || userId <= 0) {
    res.status(400).send("Invalid ID");
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.update(
    {
      username: req.body.username,
      password: hashedPassword,
    },
    {
      where: {
        id: userId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

//GET: /:id get individual inventory
router.get("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  // const user = req.user;

  User.findOne({
    where: {
      id: userId,
    },
  }).then(
    (theUser) => {
      if (theUser) {
        res.json(theUser);
      } else {
        res.status(404).send(err);
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});



module.exports = router;
