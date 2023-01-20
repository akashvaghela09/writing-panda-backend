

const {
  doc,
  query,
  collection,
  where,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
} = require("firebase/firestore")

const { db } = require("../configs/firebase-config");
const { undefinedFilter } = require("../utils/utils");

const getAllUsers = async (req, res) => {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  let users = [];

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });

  res.json({ data: users });
};

const getSingeUser = async (req, res) => {
  const docRef = doc(db, "users", req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    res.json({ data: docSnap.data() });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    res.json({ data: "No such document!" });
  }
};

const addUser = async (req, res) => {
  const {
    email,
    name = "",
  } = req.body;

  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let error = false;
  querySnapshot.forEach((doc) => {
    let userEmail = doc.data().email;

    if (userEmail === email) {
      error = true;
      return;
    }
  });

  if (error) {
    res.json({ message: "User already exists!" });
    return;
  }

  const docRef = await addDoc(collection(db, "users"), {
    email,
    name
  });

  res.status(201).json({ message: 'Success' });
  return;
};

const updateUser = async (req, res) => {
  let userId = req.params.id;
  let docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    let newObject = undefinedFilter(req.body);

    await updateDoc(docRef, newObject);
    console.log("User updated!")

    res.status(201).json({ message: 'Success' });
    return;

  } else {
    console.log("No such document!");

    res.json({ message: "User does not exist!" });
    return;
  }
};

const deleteUser = async (req, res) => {
  let userId = req.params.id;
  let docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    await deleteDoc(docRef);
    res.status(201).json({ message: 'Deleted!' });
    return;

  } else {
    console.log("No such document!");

    res.json({ message: "User does not exist!" });
    return;
  }
};

module.exports = {
  getAllUsers,
  getSingeUser,
  addUser,
  updateUser,
  deleteUser
};