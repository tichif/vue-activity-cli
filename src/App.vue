<template>
  <div id="app">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
          <!-- <h1>{{ watchedName }}</h1> -->
        </div>
      </div>
    </nav>
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item is-active" href="#">Newest</a>
            <a class="navbar-item" href="#">In Progress</a>
            <a class="navbar-item" href="#">Finished</a>
          </div>
        </div>
      </div>
    </nav>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate @activityCreated="addActivity" :categories="categories"></ActivityCreate>
        </div>
        <div class="column is-9">
          <div class="box content">
            <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
            <div class="activity-length">Currently {{ activityLength }} activities</div>
            <div class="activity-motivation">{{ activityMotivation }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import ActivityItem from "./components/ActivityItem";
import ActivityCreate from "./components/ActivityCreate";
import { fetchActivities, fetchCategories, fetchUser } from "./api/index";

export default {
  name: "App",
  components: { ActivityItem, ActivityCreate },
  data() {
    return {
      creator: "Dalzon Charles-Hebert",
      appName: "Activity Planner",
      watchedName: "Activity Planner by Dalzon Charles-Hebert",
      user: {},
      activities: {},
      categories: {}
    };
  },
  computed: {
    fullAppName() {
      return this.appName + " by " + this.creator;
    },
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
    }
  },
  created() {
    this.activities = fetchActivities();
    this.categories = fetchCategories();
    this.user = fetchUser();
    // console.log(this.user);
    // console.log(this.categories);
  },
  methods: {
    addActivity: function(newActivity) {
      //this.activities[newActivity.id] = newActivity;
      Vue.set(this.activities, newActivity.id, newActivity);
      console.log(newActivity);
    }
  }
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
