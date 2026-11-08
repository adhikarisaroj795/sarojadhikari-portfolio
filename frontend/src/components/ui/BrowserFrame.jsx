// A screenshot inside a simple browser window.
export default function BrowserFrame({
  src,
  alt,
  position = "left top",
  className = "",
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-bg ${className}`}
    >
      <div
        className="flex gap-1.5 border-b border-border px-3 py-2"
        aria-hidden="true"
      >
        <span className="size-2 rounded-full bg-[#ff5f57]/70" />
        <span className="size-2 rounded-full bg-[#febc2e]/70" />
        <span className="size-2 rounded-full bg-[#28c840]/70" />
      </div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
        className="aspect-[16/10] w-full object-cover"
      />
    </div>
  );
}
