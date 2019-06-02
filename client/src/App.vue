<template>
  <v-app id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Purchase'}" exact>
              Purchase
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Customer'}" exact>
              Customer
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Product'}" exact>
              Product
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'user'}" exact>
              User

            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <router-view/>
    </div>
  </v-app>

</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import 'vuetify/dist/vuetify.min.css';
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';

  body {
    background: linear-gradient(to bottom, #555, #999);
    background-attachment: fixed;

  }
</style>
<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  main {
    padding: 30px;
    background-color: white;
    width: 964px;
    min-height: 300px;
  }

  header {
    background-color: #999;
    width: 1184px;
    margin: 0 auto;
  }

  ul {
    padding: 3px;
    display: flex;
  }

  .nav-item {
    display: inline-block;
    padding: 5px 10px;
    font-size: 22px;
    border-right: 1px solid #bbb;
  }

  .logo {
    vertical-align: middle;
    height: 30px;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
  }

  .router-link-active {
    color: white;
  }

  .container {
    display: flex;
    margin: 10px auto 0 auto;
    justify-content: center;
  }

  .aside {
    padding: 30px;
    background-color: #aaa;
    width: 100px;
    min-height: 300px;
  }

  .cart-items {
    position: absolute;
    top: -5px;
    right: -9px;
    font-size: 18px;
    width: 20px;
    text-align: center;
    display: inline-block;
    border-radius: 100px;
    background-color: mediumseagreen;
  }
</style>
