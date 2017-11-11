export function isExternal(url: string) {
  if (url.startsWith("/")) {
    url = window.location.origin + url;
  }
  return new URL(url).hostname !== window.location.hostname;
}

export function getUrl() {
  return window.location.href.replace(window.location.origin, "");
}
