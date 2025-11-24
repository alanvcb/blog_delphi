if (!window.location.pathname.startsWith("/en") &&
    !window.location.pathname.startsWith("/pt")) {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("en")) {
    window.location.href = "/en/";
  } else {
    window.location.href = "/pt/";
  }
}
