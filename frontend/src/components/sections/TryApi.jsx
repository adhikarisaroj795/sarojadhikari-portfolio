import ApiWindow from "../hero/ApiWindow";

export default function TryApi() {
  return (
    <section className="grid gap-10 border-t border-border py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center">
      <div className="min-w-0">
        <h2 className="font-display text-4xl font-bold tracking-tight">
          Try my API
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          This site has a small Express backend at{" "}
          <span className="text-text">api.sarojadhikari.info.np</span>. Edit the
          path and press Enter to see how it responds, including a proper 404.
        </p>
      </div>
      <div className="min-w-0">
        <ApiWindow />
      </div>
    </section>
  );
}
