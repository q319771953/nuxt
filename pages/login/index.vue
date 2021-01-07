<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-if="isLogin" to="/register"
              >need an account?</nuxt-link
            >
          </p>
          <ul class="error-messages" v-if="errors">
            <template v-for="(item, value) in errors">
              <li v-for="(item2, index) in item" :key="index + item2">
                {{ value }}{{ item2 }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "login" : "register" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myget, mypost } from '@/utils/requset.js'
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "noNeedLogin",
  computed: {
    isLogin() {
      return this.$route.name == "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: "",
    };
  },
  methods: {
    async onSubmit() {
      let url = this.isLogin ? "/api/users/login" : "/api/users";
      let data = await mypost(url, { user: this.user });
      if (data.ok) {
        this.$store.commit("SetUser", data.data.user);
        Cookie.set('user',data.data.user)
        this.$router.push("/");
      } else {
        this.errors = data.data;
      }
    },
  },
};
</script>

<style>
</style>