// A screenshot with a thin frame.
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
