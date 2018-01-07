export const PROTOCOL_REG = /^[a-z]+:\/\/(.*)$/g;

export function mergeUrl(current: string, next: string, prefix?: string) {
  if (!next.endsWith("/")) next = next + "/";
  if (prefix) current = current.replace(prefix, "");
  if (next.startsWith("/")) {
    if (prefix) next = next.replace(prefix, "");
  } else {
    next = current + next;
  }

  return next;
}
