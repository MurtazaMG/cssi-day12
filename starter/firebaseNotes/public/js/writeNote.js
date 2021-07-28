let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
    const noteTitle = document.querySelector("#noteTitle");
    const noteText = document.querySelector("#noteText");
    // 2. Format the data
    const note = {
        title: noteTitle.value,
        text: noteText.value
    }
    // 3. Clear the form so that we can write a new note
    noteTitle.value = "";
    noteText.value = "";
    // 4. write it to our database
    console.log(googleUser)
    console.log(note);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`)
    dbRef.push(note);
}
