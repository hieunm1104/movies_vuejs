<template>
  <div id="newMovies">
    <div id="slide">
      <h1>{{ description }}</h1>
      <div v-show="showLoading" id="loadingMovie">
        <Spinner />
      </div>
      <carousel
        :per-page="4"
        :navigate-to="0"
        :mouse-drag="true"
        :paginationEnabled="false"
        :navigationEnabled="true"
        :navigationClickTargetSize="9"
      >
        <slide
          id="movieDiv"
          :key="movie.imdbID + Math.random()"
          v-for="movie in movies"
        >
          <div @click="showDetail(movie.imdbID)">
            <img :src="movie.Poster" id="imagemPosterSlide" loading="lazy" />
          </div>
          <div class="btn">
            <button @click="like" class="heart">Like</button>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Spinner from "../components/Spinner";
import { Movies } from "../services/api.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      showLoading: true,
      paginationButtons: false,
      user: null,
    };
  },
  props: {
    type: String,
    description: String,
  },
  components: {
    Carousel,
    Slide,
    Spinner,
  },
  mounted() {
    this.getMovieDetail();
  },
  methods: {
    async getMovieDetail() {
      this.showLoading = true;
      try {
        const {
          data: { Search },
        } = await Movies(this.type).get();

        this.movies = Search;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    showDetail(_id) {
      this.$router.push({ name: "Detail", params: { id: _id } });
    },
    like() {
      if (this.user === null) {
        this.$router.push({ name: "Login" });
      }
      this.showToast();
    },
    showToast() {
      this.$toast.open({
        message: "Add to my like successfully!",
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
  },
};
</script>
<style>
#slide {
  width: 90%;
  height: 100%;
  text-align: center;
  margin: auto;
}
#newMovies {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
}
#buttonNexts {
  color: #f1f;
}
#newMovies h1 {
  color: #cacaca;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#loadingMovie {
  display: flex;
  justify-content: center;
  align-items: center;
}
#movieDiv {
  margin-top: 23px;
  padding-left: 20px;
  flex: 1;
}
#imagemPosterSlide {
  border-radius: 15px;
  transition: 0.5s;
  height: 300px;
  margin-bottom: 20px;
  width: 200px;
}
#imagemPosterSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.VueCarousel-navigation-button[data-v-453ad8cd] {
  color: #e9e9e9 !important;
  outline: none !important;
}
@media only screen and (max-width: 599px) {
  #imagemPosterSlide {
    height: 150px;
    width: 100px;
  }
  #newMovies h1 {
    font-size: 15px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
.btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.heart {
  color: red;
  background: transparent;
  border: transparent;
  cursor: pointer;
}
.heart:before {
  content: "♥ ";

  color: Blue;
}
</style>