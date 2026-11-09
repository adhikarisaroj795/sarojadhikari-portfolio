export function normalizePath(input) {
  let path = input.trim().toLowerCase();
  path = path
    .replace(/^https?:\/\//, "")
    .replace(/^api\.sarojadhikari\.info\.np/, "");
  path = path.split(/[?#]/)[0];
  path = path.replace(/^\/+/, "").replace(/^api(\/|$)/, "");
  path = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.slice(0, 60);
}
