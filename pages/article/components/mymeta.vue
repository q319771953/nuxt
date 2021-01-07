<template>
  <div class="article-meta">
    <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
    <div class="info">
      <a href="" class="author">{{article.author}}</a>
      <span class="date">{{article.createdAt|date}}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.author.favorited }"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style>
</style>