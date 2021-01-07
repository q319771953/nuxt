<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div>
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <template v-for="item in tags">
                <nuxt-link
                  v-if="item"
                  :to="{
                    name: 'home',
                    query: {
                      tag: item,
                      tab: 'tag',
                    },
                  }"
                  class="tag-pill tag-default"
                  >{{ item }}</nuxt-link
                >
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="$store.state.user">
                  <nuxt-link
                    :class="{
                      active: tab == 'your_feed',
                    }"
                    exact
                    class="nav-link"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'your_feed',
                      },
                    }"
                    >Your Feed</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="{
                      active: tab == 'global_feed' || !tab,
                    }"
                    exact
                    class="nav-link"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'global_feed',
                      },
                    }"
                    >Global Feed</nuxt-link
                  >
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    :class="{
                      active: tab == 'tag',
                    }"
                    exact
                    class="nav-link"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'tag',
                        tag: tag,
                      },
                    }"
                    >#{{ tag }}</nuxt-link
                  >
                </li>
              </ul>
            </div>

            <div
              v-for="item in articles"
              :key="item.slug"
              class="article-preview"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'userProfile',
                    params: {
                      username: item.author.username,
                    },
                  }"
                >
                  <img :src="item.author.image"
                /></nuxt-link>
                <div class="info">
                  <a href="" class="author">{{ item.author.username }}</a>
                  <span class="date">{{
                    item.createdAt | date("MMM DD YYYY")
                  }}</span>
                </div>
                <button
                  :class="{ active: item.favorited }"
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  @click="onFavorite(item)"
                  :disabled="item.disabled"
                >
                  <i class="ion-heart"></i> {{ item.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{
                  name: 'articleCom',
                  params: {
                    slug: item.slug,
                  },
                }"
                class="preview-link"
              >
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <nav class="article-preview">
              <ul class="pagination">
                <li
                  class="page-item"
                  v-for="item in totalPage"
                  :key="item"
                  :class="{ active: page == item }"
                >
                  <nuxt-link
                    :to="{
                      name: 'home',
                      query: {
                        page: item,
                        tag: $route.query.tag,
                      },
                    }"
                    class="page-link"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  async asyncData({ query, store, $get }) {
    let page = Number.parseInt(query.page || 1);
    let pageSize = 10;
    let { tag } = query;
    let tab = query.tab || "gobal_tab";
    let queryUrl = "/api/articles";
    queryUrl =
      store.state.user && tab == "your_feed"
        ? "/api/articles/feed"
        : "/api/articles";
    let queryPm = {
      page,
      pageSize: (page - 1) * pageSize,
      tag: tag,
    };
    let [articlesRes, tagdataRes] = await Promise.all([
      $get(queryUrl, queryPm),
      $get("/api/tags"),
    ]);
    
    if (articlesRes.ok) {
      articlesRes.data.articles.forEach((element) => {
        element.disabled = false;
      });
    }
    return {
      articles: articlesRes.ok ? articlesRes.data.articles : [],
      articlesCount: articlesRes.ok ? articlesRes.data.articlesCount : 0,
      page,
      pageSize,
      tags: tagdataRes.ok ? tagdataRes.data.tags : [],
      tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
  },
  methods: {
    async onFavorite(item) {
      let url = `/api/articles/${item.slug}/favorite`;
      item.disabled = true;
      if (item.favorited) {
        await this.$Delete(url);
        item.favorited = false;
        item.favoritesCount += -1;
        item.disabled = false;
      } else {
        await this.$post(url);
        item.favorited = true;
        item.favoritesCount += 1;
        item.disabled = false;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>