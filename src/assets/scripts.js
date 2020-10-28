function getCSSCustomPropertyValue(name) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--" + name)
    .trim();
}

function setTheme(name) {
  document.documentElement.dataset.theme = name;
  $metaThemeColor.content = getCSSCustomPropertyValue("background-color");
  window.localStorage.setItem("theme", name);
}

const $metaThemeColor = document.querySelector('meta[name="theme-color"]');
const $themeSelect = document.querySelector("[data-theme-select]");
$themeSelect.addEventListener("input", (event) => setTheme(event.target.value));

const $defaultCheckedInput = document.querySelector("[name=theme][checked]");
const defaultTheme =
  document.documentElement.dataset.theme || $defaultCheckedInput.value;

$defaultCheckedInput.checked = false;
$themeSelect.querySelector(
  `[name=theme][value="${defaultTheme}"]`
).checked = true;
setTheme(defaultTheme);
