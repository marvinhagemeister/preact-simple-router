export function isExternal(url: string) {
  if (url.startsWith("/")) {
    url = window.location.protocol + "://" + window.location.hostname + url;
  }
  return new URL(url).hostname !== window.location.hostname;
}
