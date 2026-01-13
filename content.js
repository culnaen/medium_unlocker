document.addEventListener(
  "click",
  (e) => {
    const a = e.target.closest("a");
    if (!a || !a.href) return;

    const url = new URL(a.href);

    if (!isMediumStory(url)) return;

    e.preventDefault();
    e.stopPropagation();

    const freedium = buildFreediumUrl(url);
    e.preventDefault();
    e.stopPropagation();
    window.open(freedium, "_blank");
    return false;
  },
  true
);

function isMediumStory(url) {
  return /-[a-f0-9]{10,}$/.test(url.pathname);
}

function buildFreediumUrl(url) {
  let publication = null;

  if (url.hostname === "medium.com") {
    const parts = url.pathname.split("/");
    if (parts.length > 2) publication = parts[1];
  }

  const slug = url.pathname.split("/").pop();
  const mediumUrl = publication
    ? `https://medium.com/${publication}/${slug}`
    : `https://medium.com/${slug}`;

  return "https://freedium-mirror.cfd/" + mediumUrl;
}
