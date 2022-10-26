<template>
  <div id="header">
    <img class="logoHeader" :src="image" @click="navigateMain" />
    <nav role="navigation">
      <ul>
        <li id="selections">
          <a id="navigate">
            Navegar
            <v-icon name="sort-down" scale="1" color="#e5e5e5" />
          </a>
          <ul class="dropdown">
            <li @click="navigateMain">
              <a>Home</a>
            </li>
            <li>
              <a>Filmes</a>
            </li>
            <li>
              <a>Séries</a>
            </li>
            <li>
              <a>Mais recentes</a>
            </li>
            <li @click="navigateMyList">
              <a>My List</a>
            </li>
          </ul>
        </li>
        <li class="items" @click="navigateMain">Home</li>
        <li class="items">Séries</li>
        <li class="items">Filmes</li>
        <li class="items">Mais recentes</li>
        <li class="items" @click="navigateMyList">My List</li>
        <li></li>
      </ul>
    </nav>
    <div v-if="!user" class="login_logout">
      <button class="login" @click="login">Login</button>
      <button class="signup" @click="signup">Signup</button>
    </div>
    <div v-else class="login_logout" style="color: red">
      <label>{{ user.email }}</label>
      <button @click="logout">Log out</button>
    </div>

    <div id="icons">
      <v-icon name="bell" scale="1.3" color="#e5e5e5" />
    </div>
  </div>
</template>

<script>
import image from "../assets/logo-small.png";
import Icon from "vue-awesome/components/Icon";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Header",
  data() {
    return {
      image,
      user: null,
    };
  },
  methods: {
    navigateMain() {
      this.$router.push({ name: "Main" });
    },
    navigateMyList() {
      this.$router.push({ name: "MyList" });
    },
    signup() {
      this.$router.push({ name: "Signup" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.showToast();
        });
      localStorage.clear();
    },
    showToast() {
      this.$toast.open({
        message: "Logout Successfully!",
        type: "success",
        duration: 5000,
        dismissible: true,
        queue: true,
        position: "top-right",
      });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
    this.$router.push({ name: "Main" });
  },
  components: {
    "v-icon": Icon,
  },
};
</script>

<style scoped>
.label {
  color: blue;
}
.label:hover {
  color: red;
  cursor: pointer;
}

#header {
  width: 100%;
  height: 30%;
  background: #141414;
  display: flex;
  align-items: center;
}
.logoHeader {
  margin-left: 30px;
}
.logoHeader:hover {
  cursor: pointer;
}
nav {
  width: 70vw;
  color: white;
  display: flex;
  align-items: center;
}
ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
}
li {
  color: #fff;
  display: block;
  float: left;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 13.5px;
}
li a {
  color: #fff;
  cursor: default;
}
li:hover {
  cursor: pointer;
}
.items:hover {
  color: #ccc;
}
ul li ul {
  visibility: hidden;
  opacity: 0;
  min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
  left: 0;
  display: none;
}
ul li ul li {
  clear: both;
  width: 100%;
}
.dropdown {
  background: #141414c7;
}
#navigate {
  opacity: 0;
  height: 0;
}
#options {
  font-size: 14px;
  color: #e5e5e5;
  cursor: pointer;
  width: 60%;
}
#eachOptions {
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 50%;
}
input[type="text"] {
  width: 1px;
  border: none;
  color: #e5e5e5;
  border-bottom: 2px solid #ccc;
  font-size: 13px;
  background-color: #141414;
  background-image: url("../assets/search.png");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 7px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
input[type="text"]:focus {
  width: 100%;
}
#textForm {
  width: 15%;
}
#icons {
  width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media only screen and (max-width: 906px) {
  nav {
    width: 80vw;
  }
}
@media only screen and (max-width: 900px) {
  ul li:hover > ul,
  ul li:focus-within > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
    font-size: 15px;
    position: absolute;
    z-index: 9999;
  }
  li :hover {
    color: #ccc;
  }
  #navigate {
    color: white;
    opacity: 10;
    height: auto;
    margin-left: -10px;
  }
  .items {
    opacity: 0;
    height: 0;
    font-size: 0;
  }
  li a {
    cursor: pointer;
  }
  nav {
    width: 30%;
    height: 30px;
    padding-top: 3px;
  }
  #textForm {
    width: 30%;
  }
  #icons {
    width: 20%;
  }
}
@media only screen and (max-width: 626px) {
  #selections {
    padding-top: 30px;
  }
}
@media only screen and (max-width: 541px) {
  #selections {
    padding-top: 50px;
  }
}
@media only screen and (max-width: 500px) {
  .logoHeader {
    width: 80px;
  }
  nav {
    width: 30%;
    padding-top: 40px;
  }
  #selections {
    padding-top: 30px;
  }
}
@media only screen and (max-width: 320px) {
  .logoHeader {
    margin-left: 0px;
  }
  #selections {
    padding-top: 60px;
  }
}
.user-circle:hover {
  cursor: pointer;
}
button {
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 300;
  margin: 0 10px;
  width: 50px;
  padding: 10px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
}

.reg {
  color: white;
  background-color: rgba(104, 85, 224, 1);
}

.log {
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}

button:hover {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}
.login_logout {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>