import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/states";
import { useScore } from "@/lib/use-score";
import { toCard } from "@/pages/util";

export function SubidasPage() {
  const { tallest } = useScore();
  const items = tallest.slice(0, 24);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Lo que más subió" }]} />
      <div className="mt-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">Lo que más subió</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-slate-600">
          Los mayores incrementos de precio registrados recientemente en las góndolas de supermercados.
        </p>
      </div>
      {items.length ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((e) => (
            <ProductCard key={e.slug} product={toCard(e)} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState title="Aún no hay incrementos registrados en Costa Rica" />
        </div>
      )}
    </div>
  );
}
