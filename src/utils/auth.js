export const isAuth = function () {
  if (!localStorage.getItem("isAuth")) return false;
  const isUserLoggedIn = JSON.parse(localStorage.getItem("isAuth"));
  if (!isUserLoggedIn) return false;
  return true;
};

export const setAuth = function (value) {
  if (value === true) localStorage.setItem("isAuth", true);
  else localStorage.clear("isAuth");
};
