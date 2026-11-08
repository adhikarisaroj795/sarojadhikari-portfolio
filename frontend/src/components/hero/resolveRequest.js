import { API_BASE, ENDPOINTS } from "../../data/api";

// Turns whatever the visitor typed into a clean path:
// "stack", "/STACK/", "https://api.sarojadhikari.info.np/stack?x=1" -> "/stack"
export function normalizePath(input) {
  let path = input.trim().toLowerCase();
  path = path.replace(/^https?:\/\//, "");
  if (path.startsWith(API_BASE)) path = path.slice(API_BASE.length);
  path = path.split(/[?#]/)[0];
  path = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.slice(0, 60);
}

export function resolveRequest(path) {
  if (path === "/") {
    return {
      status: 200,
      statusText: "OK",
      ms: 9,
      body: {
        message: "Saroj Adhikari — portfolio API",
        endpoints: ENDPOINTS.map((e) => e.path),
      },
    };
  }

  const endpoint = ENDPOINTS.find((e) => e.path === path);
  if (endpoint) {
    return {
      status: 200,
      statusText: "OK",
      ms: endpoint.ms,
      body: endpoint.body,
    };
  }

  return {
    status: 404,
    statusText: "Not Found",
    ms: 6,
    body: {
      success: false,
      error: "Not Found",
      message: `Cannot GET ${path}`,
      try: ENDPOINTS.map((e) => e.path),
    },
  };
}
