const updateUserEmailForAuth = async (oldEmail, newEmail) => {
    try {
      const userRecord = await admin.auth().getUserByEmail(oldEmail);
      let firebaseAuthId = userRecord.uid;
  
      // update user email in auth
      await admin.auth().updateUser(firebaseAuthId, {
        email: newEmail,
      });
      console.log("Successfully updated user in auth");
  
      // update user email in firestore db
      const userDataRef = doc(db, "users", `${firebaseAuthId}`);
      await updateDoc(userDataRef, {
        email: newEmail
      });
      console.log("Successfully updated user in firestore db");
    } catch (error) {
      console.log("Error updating user:", error);
    }
  }

module.exports = {
    updateUserEmailForAuth
}