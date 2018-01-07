export const PROTOCOL_REG = /^[a-z]+:\/\/(.*)$/g;

export function mergeUrl(current: string, next: string, prefix?: string) {
  if (!next.endsWith("/")) next = next + "/";
  const res = next.startsWith("/") ? next : (current += next);
  return prefix ? prefix + res : res;
}
