<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>
        <mymeta v-if="article&&article.author" :article="article"></mymeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{ article.title }}</p>
          <h2 id="introducing-ionic">{{ article.description }}</h2>
          <p v-html="article.body"></p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"
            ><img src="http://i.imgur.com/Qr71crq.jpg"
          /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>
      <comment v-if="slug" :slug="slug"></comment>
    </div>
  </div>
</template>

<script>
import markdown from "markdown-it";
import mymeta from "./components/mymeta.vue";
import Comment from "./components/comment.vue";
export default {
  name: "articleCom",
  async asyncData({ params, $get }) {
    let data = await $get(`/api/articles/${params.slug}`);
    const md = new markdown();
    let article = data.ok ? data.data.article : {};
    if (article.body) {
      // article.body = md.render(article.body);
    }
    return {
      article,
      slug:params.slug
    };
  },
  components: { mymeta, Comment },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description",
        },
      ],
    };
  },
};
</script>

<style>
</style>