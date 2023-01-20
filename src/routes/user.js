const { Router } = require("express");
const router = Router();

const { getAllUsers, getSingeUser, addUser, updateUser, deleteUser } = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getSingeUser);
router.post("/", addUser);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

