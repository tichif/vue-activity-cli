<template>
  <div v-if="isDataLoaded" id="app">
    <TheNavbar></TheNavbar>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate :categories="categories"></ActivityCreate>
        </div>
        <div class="column is-9">
          <div class="box content" :class="{ fetching: isFetchingData, 'has-error':error }">
            <div v-if="error">{{ error }}</div>
            <div v-else>
              <div v-if="isFetchingData">Loading....</div>
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :categories="categories"
              />
            </div>
            <div v-if="!isFetchingData">
              <div class="activity-length">Currently {{ activityLength }} activities</div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store/index";
import ActivityItem from "./components/ActivityItem";
import ActivityCreate from "./components/ActivityCreate";
import TheNavbar from "./components/TheNavbar";
// import {
//   fetchActivities,
//   fetchCategories,
//   fetchUser,
//   deleteActivityApi
// } from "./api/index";

export default {
  name: "App",
  components: { ActivityItem, ActivityCreate, TheNavbar },
  data() {
    return {
      user: {},
      activities: store.state.activities,
      categories: store.state.categories,
      isFetchingData: false,
      error: null
    };
  },
  computed: {
    activityLength() {
      // Transform a object to an array
      const activitiesKeysArray = Object.keys(this.activities);
      //Obtain the length of the array
      const activitylength = activitiesKeysArray.length;
      return activitylength;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return " Nice to see some activities 😀😀😀";
      } else if (this.activityLength >= 5) {
        return "So many activities!!!! Good job 😊😊";
      } else {
        return " No activities !! So sad😥😥";
      }
    },
    isDataLoaded: function() {
      return this.categories && this.categories;
    }
  },
  created() {
    this.isFetchingData = true;
    store
      .fetchActivities()
      .then(data => {
        // this.activities = data;
        this.isFetchingData = false;
      })
      .catch(err => {
        this.error = err;
        this.isFetchingData = false;
      });
    store.fetchCategories().then(categories => {
      // this.categories = categories;
    });
    this.user = store.fetchUser();
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}

.fetching {
  border: 2px solid orange;
}

.has-error {
  border: 2px solid red;
}
footer {
  background-color: #f2f6fa !important;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.activity-motivation {
  float: right;
}

.activity-length {
  display: inline-block;
}
</style>
