<template>
  <div class="hello">
    <form id="app" @submit="checkForm" action="/something" method="post">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      </p>

      <p>
        <label for="name">Name<label>
          <input type="text" name="name" id="name" v-model="name">
      </p>

      <p>
        <label for="age">Age<label>
          <input type="number" name="age" id="age" v-model="age" min="0">
      </p>

      <p>
        <label for="movie">Favorite Movie<label>
          <select name="movie" id="movie" v-model="movie">
            <option>Star Wars</option>
            <option>Vanilla Sky</option>
            <option>Atomic Blonde</option>
          </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>

    Resources
  </div>
</template>


<script>
  const app = new Vue({
    el:'#app',
    data:{
      errors:[],
      name:null,
      age:null,
      movie:null
    },
    methods:{
      checkForm:function(e) {
        if(this.name && this.age) return true;
        this.errors = [];
        if(!this.name) this.errors.push("Name required.");
        if(!this.age) this.errors.push("Age required.");
        e.preventDefault();
      }
    }
  })


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Application'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
