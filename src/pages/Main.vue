<template>
  <div id="app">
    <next-releases />
    <Movies
      v-for="movie in movies"
      :key="movie.id"
      :type="movie.type"
      :description="movie.description"
    />
    <h4>Vueflix</h4>
  </div>
</template>

<script>
import NextReleases from "@/components/NextReleases.vue";
import Movies from "@/components/Movies.vue";
export default {
  name: "Main",
  components: { NextReleases, Movies },
  computed: {
    movies() {
      return [
        { id: 1, type: "s=avengers", description: "Populares na Vueflix" },
        { id: 2, type: "s=harry", description: "Recomendados" },
        { id: 3, type: "s=fast", description: "Em alta" },
        { id: 4, type: "s=super", description: "Aventura" },
        { id: 5, type: "s=game", description: "Ficção" },
        { id: 6, type: "s=brain", description: "Para todas idades" },
        { id: 7, type: "s=all", description: "Família" },
      ];
    },
  },
};
</script>

<style>
#app h4 {
  color: #e9e9e9;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 30px;
  padding-bottom: 30px;
}
@media only screen and (max-width: 599px) {
  #app h4 {
    font-size: 14px;
  }
}
</style>