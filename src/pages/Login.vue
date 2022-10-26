<template>
  <div class="body">
    <div class="container">
      <form @submit.prevent="login">
        <h1>Sign In</h1>
        <hr />
        <label for="email"><b>Email</b></label>
        <input
          type="email"
          v-model="email"
          placeholder="Email..."
          name="email"
          required
        />
        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Password..."
          name="psw"
          v-model="password"
          required
        />
        <div class="clearfix">
          <button type="submit" class="signupbtn">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      er: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          if (res.user) {
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("email", userData.email);
                });
              });
            this.showToast();
            this.$router.push({ name: "Main" });
          }
        })
        .catch((er) => (this.er = er));
    },
    showToast() {
      this.$toast.open({
        message: "Login Successfully!",
        type: "success",
        duration: 5000,
        dismissible: true,
        queue: true,
        position: "top-right",
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
.body {
  /* Remember to use the other versions for IE 10 and older browsers! */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  font-family: "lato", sans-serif;
  color: #fff;
}
h1 {
  color: DodgerBlue;
  text-align: center;
}
input[type="email"],
input[type="password"] {
  width: 300px;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: block;
  border: none;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}
input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
button:hover {
  opacity: 1;
}
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}
.signupbtn {
  float: right;
  width: 100px;
  border-radius: 5px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}
.signinbtn {
  float: left;
  width: 100px;
  border-radius: 5px;
  border: 2px;
  box-shadow: 4px 4px 10px rgba(190, 17, 17, 0.2);
  background-color: #0099ff;
}
.container {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0 1.5px 0 0 rgba(0, 0, 0, 0.1);
  width: 450px;
  display: flex;
  flex-direction: column;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>