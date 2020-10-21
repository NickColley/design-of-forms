function setTheme(name) {
  document.documentElement.dataset.theme = name;
  window.localStorage.setItem("theme", name);
}

const $themeSelect = document.querySelector("[data-theme-select]");
$themeSelect.addEventListener("input", (event) => setTheme(event.target.value));

const $defaultCheckedInput = document.querySelector("[name=theme][checked]");
const defaultTheme =
  window.localStorage.getItem("theme") || $defaultCheckedInput.value;

$defaultCheckedInput.checked = false;
$themeSelect.querySelector(`[name=theme][value="${defaultTheme}"]`).checked = true;
setTheme(defaultTheme);
