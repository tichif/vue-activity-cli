<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i class="fas fa-cog activity-settings" @click="toggleIsDisplayed"></i>
    </div>
    <p>{{ categories[activity.category].text }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Dalzon Charles-Hébert</a>
            updated
            {{ activity.updateAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>
          Progress:
          <span :style="{ color: activityProgress }">{{ activity.progress }}%</span>
        </span>
      </div>
    </div>
    <div class="activity-controll" v-if="isDisplayed">
      <a href class="button is-warning" @click.prevent="$emit('toggleUpdateActive', true)">Edit</a>
      <a href class="button is-danger" @click.prevent="deleteActivity">Delete</a>
    </div>
  </article>
</template>

<script>
import textUtility from "../mixins/textUtility";
import store from "../store/index";

export default {
  mixins: [textUtility],
  props: {
    categories: {
      type: Object,
      required: true
    },
    activity: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDisplayed: false
    };
  },
  computed: {
    activityProgress() {
      const progress = this.activity.progress;
      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    }
  },
  methods: {
    toggleIsDisplayed: function() {
      this.isDisplayed = !this.isDisplayed;
    },
    deleteActivity: function() {
      store.deleteActivity(this.activity);
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}
.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}
.activityTitle {
  margin-bottom: 5px;
}
</style>
