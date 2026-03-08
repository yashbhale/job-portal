export const getCourses = (scores) => {
  const courses = [];

  if (scores.webdev < 5) {
    courses.push("Full Stack Web Development - Udemy");
  }

  if (scores.aiml < 5) {
    courses.push("Machine Learning - Coursera");
  }

  if (scores.dsa < 5) {
    courses.push("Data Structures - Leetcode");
  }

  if (scores.appdev < 5) {
    courses.push("Android Development - Google");
  }

  return courses;
};
