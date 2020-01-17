const activities = {
  "1546968934": {
    id: "1546968934",
    title: "Learn Vue.js",
    notes: "I started today and it was no too good.",
    progress: 100,
    category: "1546969049",
    createdAt: 1546969144391,
    updateAt: 1546969144391
  },
  "1546969212": {
    id: "1546969212",
    title: "Read Witcher Book",
    notes: "These books are super nice.",
    progress: 50,
    category: "1546969049",
    createdAt: 1546969144391,
    updateAt: 1546969144391
  }
};

const canContinue = () => {
  const randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber > 5) {
    return true;
  }
  return false;
};

export const fetchActivities = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (canContinue()) {
        resolve(activities);
      } else {
        reject("Cannot fetch some data !!!");
      }
    }, 2000);
  });
};

const generateUniqueId = () => Math.floor(new Date() * Math.random());

export const createActivityAPI = activity => {
  activity.id = generateUniqueId();
  activity.progress = 0;
  activity.createdAt = new Date();
  activity.updateAt = new Date();

  return new Promise((resolve, reject) => {
    resolve(activity);
  });
};

export const fetchCategories = () => {
  return {
    "1546969049": {
      text: "books",
      id: "1546969049"
    },
    "1546969225": {
      text: "movies",
      id: "1546969225"
    }
  };
};

export const fetchUser = () => {
  return {
    user: "Dalzon Charles-Hebert",
    id: "-Aj34jknvncx98812"
  };
};
