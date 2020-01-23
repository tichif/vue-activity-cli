import fakeApi from "../lib/fakeApi";

const generateUniqueId = () => Math.floor(new Date() * Math.random());

export const fetchActivities = function() {
  return fakeApi.get("activities", { force: 1 });
};

export const fetchCategories = () => {
  return fakeApi.get("categories", { force: 1 });
};

export const fetchUser = () => {
  return {
    user: "Dalzon Charles-Hebert",
    id: "-Aj34jknvncx98812"
  };
};

export const createActivityAPI = activity => {
  activity.id = generateUniqueId();
  activity.progress = 0;
  activity.createdAt = new Date();
  activity.updateAt = new Date();

  return fakeApi.post("activities", activity);
};

export const deleteActivityApi = activity => {
  return fakeApi.delete("activities", activity);
};
