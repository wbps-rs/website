const formatDate = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "long",
});

export default formatDate;
