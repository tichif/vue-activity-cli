<template>
  <div>
    <ActivityUpdate
      v-if="isUpdateActive"
      :activity="activity"
      :categories="categories"
      @showUpdateForm="changeUpdateState"
    ></ActivityUpdate>
    <ActivityItemDetail
      v-else
      :activity="activity"
      :categories="categories"
      @toggleUpdateActive="changeUpdateState"
    ></ActivityItemDetail>
  </div>
</template>

<script>
import ActivityItemDetail from "./ActivityItemDetails";
import ActivityUpdate from "./ActivityUpdate";
export default {
  components: { ActivityItemDetail, ActivityUpdate },
  props: {
    activity: {
      required: true,
      type: Object
    },
    categories: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isUpdateActive: false
    };
  },
  methods: {
    changeUpdateState: function(isUpdate) {
      this.isUpdateActive = isUpdate;
    }
  }
};
</script>

<style  scoped>
</style>
