<template>
  <div class="activityCreateForm">
    <a
      v-if="!isFormDisplayed"
      class="button is-primary is-block is-alt is-large"
      href="#"
      @click="toggleFormDisplayed"
    >New Activity</a>
    <div v-if="isFormDisplayed" class="create-form">
      <h2>Create activity</h2>
      <form>
        <div class="field">
          <label for="title" class="label">Title</label>
          <div class="control">
            <input v-model="newActivity.title" type="text" class="input" placeholder="Read a book" />
          </div>
        </div>
        <div class="field">
          <label for="note" class="label">Notes</label>
          <div class="control">
            <textarea v-model="newActivity.notes" placeholder="Notes" class="textarea" />
          </div>
        </div>
        <div class="field">
          <label for="note" class="label">Categories</label>
          <div class="control">
            <select v-model="newActivity.category" class="select">
              <option disabled value>Please select one</option>
              <option v-for="category in categories" :key="category.id">
                {{
                category.text
                }}
              </option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              :disabled="!isFormValid"
              @click.prevent="createActivity"
            >Create a activity</button>
          </div>
          <div class="control">
            <button class="button is-text" @click.prevent="toggleFormDisplayed">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createActivityAPI } from "../api/index";
export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFormDisplayed: false,
      newActivity: {
        title: "",
        notes: "",
        category: ""
      }
    };
  },
  computed: {
    isFormValid() {
      return this.newActivity.title && this.newActivity.notes;
    }
  },
  methods: {
    toggleFormDisplayed: function() {
      this.isFormDisplayed = !this.isFormDisplayed;
    },
    createActivity: function() {
      createActivityAPI(this.newActivity).then(activity => {
        this.$emit("activityCreated", { ...activity });
      });
    }
  }
};
</script>

<style scoped></style>
