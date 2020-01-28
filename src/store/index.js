import fakeApi from "../lib/fakeApi";

import Vue from "vue";

const store = {
  state: {
    activities: {},
    categories: {}
  },
  generateUniqueId() {
    return Math.floor(new Date() * Math.random());
  },

  fetchActivities() {
    return fakeApi.get("activities", { force: 1 }).then(activities => {
      Object.keys(activities).forEach(key => {
        this.setItem("activities", key, activities[key]);
      });
      return activities;
    });
  },

  fetchCategories() {
    return fakeApi.get("categories", { force: 1 }).then(categories => {
      Object.keys(categories).forEach(key => {
        this.setItem("categories", key, categories[key]);
      });
      return categories;
    });
  },

  fetchUser() {
    return {
      user: "Dalzon Charles-Hebert",
      id: "-Aj34jknvncx98812"
    };
  },

  createActivity(activity) {
    activity.id = this.generateUniqueId();
    activity.progress = 0;
    activity.createdAt = new Date();
    activity.updateAt = new Date();

    return fakeApi.post("activities", activity).then(createdActivity => {
      this.setItem("activities", createdActivity.id, createdActivity);
      return createdActivity;
    });
  },

  updateActivity(activity) {
    activity.updateAt = new Date();

    return fakeApi.post("activities", activity).then(updatedActivity => {
      this.setItem("activities", updatedActivity.id, updatedActivity);
      return updatedActivity;
    });
  },

  deleteActivity(activity) {
    return fakeApi.delete("activities", activity).then(deletedActivity => {
      Vue.delete(this.state.activities, activity.id);
      return deletedActivity;
    });
  },

  setItem(resource, id, item) {
    Vue.set(this.state[resource], id, item);
  }
};

export default store;
