<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/edit"
                ><i class="ion-compose"></i>&nbsp;New Post</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/setting"
                ><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/proFile/1">
                <img height="30"
                  src="https://himg.bdimg.com/sys/portraitn/item/2857d2e2b9e1f1b7d3ee7d90"
                />
                <span v-if="user">{{ user.username }}</span>
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">login</nuxt-link>
              <!-- <a class="nav-link" href="">Sign up</a> -->
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register" exact
                >register</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>