chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;

  if (!changeInfo.url.includes("medium.com")) return;
  
  const url = new URL(changeInfo.url);

  if (!isMediumStory(url)) return;

  const freedium = buildFreediumUrl(url);
  chrome.tabs.update(tabId, { url: freedium });
});

function isMediumStory(url) {
  const isMedium =
    url.hostname === "medium.com" ||
    url.hostname.endsWith(".medium.com");

  if (!isMedium) return false;

  return /-[a-f0-9]{10,}$/.test(url.pathname);
}


function buildFreediumUrl(url) {
  let publication = null;

  if (url.hostname === "medium.com") {
    const parts = url.pathname.split("/");
    if (parts.length > 2) publication = parts[1];
  } else {
    const h = url.hostname.split(".");
    if (h[0] === "blogs" && h.length >= 3) publication = h[1];
  }

  const slug = url.pathname.split("/").pop();
  const mediumUrl = publication
    ? `https://medium.com/${publication}/${slug}`
    : `https://medium.com/${slug}`;

  return "https://freedium-mirror.cfd/" + mediumUrl;
}
