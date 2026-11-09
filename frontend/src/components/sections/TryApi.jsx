import ApiWindow from "../hero/ApiWindow";

export default function TryApi() {
  return (
    <section className="grid gap-10 border-t border-border py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center">
      <div className="min-w-0">
        <h2 className="font-display text-4xl font-bold tracking-tight">
          Try my API
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          These are live requests to the small Express backend behind this site.
          Edit the path and press Enter to see how it responds, including a
          proper 404.
        </p>
        <p className="mt-4 text-sm text-muted">
          Prefer a terminal?{" "}
          <code className="font-mono text-text">
            curl api.sarojadhikari.info.np
          </code>
        </p>
      </div>
      <div className="min-w-0">
        <ApiWindow />
      </div>
    </section>
  );
}
