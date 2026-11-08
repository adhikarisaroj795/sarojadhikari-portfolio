const punct = (t) => ({ t, c: "text-muted" });

function value(v) {
  if (typeof v === "string") return { t: `"${v}"`, c: "text-accent" };
  if (typeof v === "number" || typeof v === "boolean" || v === null) {
    return { t: String(v), c: "text-amber-300" };
  }
  return { t: JSON.stringify(v), c: "text-text" };
}

export function jsonLines(obj) {
  const entries = Object.entries(obj);
  const lines = [[punct("{")]];

  entries.forEach(([key, v], i) => {
    const line = [
      { t: "  " },
      { t: `"${key}"`, c: "text-sky-300" },
      punct(": "),
    ];
    if (Array.isArray(v)) {
      line.push(punct("["));
      v.forEach((item, j) => {
        line.push(value(item));
        if (j < v.length - 1) line.push(punct(", "));
      });
      line.push(punct("]"));
    } else {
      line.push(value(v));
    }
    if (i < entries.length - 1) line.push(punct(","));
    lines.push(line);
  });

  lines.push([punct("}")]);
  return lines;
}
