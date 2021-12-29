import(/* webpackChunkName: "library" */ "./library").then((Library) => {
  console.log("dynamically loaded library: ", new Library.default());
});
