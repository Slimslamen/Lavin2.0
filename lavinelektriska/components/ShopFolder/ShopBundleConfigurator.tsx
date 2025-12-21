import { useEffect, useMemo, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import ShopForm from "./ShopForm";
import { RequestQuotePayload, ShopBundleConfiguratorProps } from "./shopInterface";

type ShopFormSuccessData = Omit<RequestQuotePayload, "bundle">;

export default function ShopBundleConfigurator({ bundle, onClose, onRequestQuote }: ShopBundleConfiguratorProps) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set<string>());
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const total = useMemo(() => {
    let sum = bundle.basePrice;
    for (const id of selected) {
      const item = bundle.items.find((i) => i.id === id);
      if (item) sum += item.price;
    }
    return sum;
  }, [bundle, selected]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < bundle.maxItems) next.add(id);
      return next;
    });
  };

  const atLimit = selected.size >= bundle.maxItems;

  return (
    <div
      className="fixed inset-0 z-1000"
      role="dialog"
      aria-modal="true"
      aria-label={`${bundle.name} – konfigurator`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative top-20 sm:top-auto mx-auto mt-10 mb-6 w-23rem sm:w-auto max-w-3xl bg-white rounded-2xl shadow-2xl sm:h-auto h-[40rem] overflow-auto sm:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b bg-li-to-r from-gray-50 to-blue-50">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{bundle.name}</h3>
            <p className="text-sm text-gray-600">Välj upp till {bundle.maxItems} tillval</p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="cursor-pointer ShopClose w-9 h-9 rounded-full bg-[#66BEF0] hover:scale-95 flex items-center justify-center focus:outline-none"
            aria-label="Stäng"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </header>

        <div className="px-6 py-5 grid md:grid-cols-2 gap-6">
          <section>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Tillgängliga tillval</h4>
            <ul className="space-y-2">
              {bundle.items.map((it) => {
                const checked = selected.has(it.id);
                const disabled = !checked && atLimit;
                return (
                  <li key={it.id} className="flex items-center justify-between gap-3 text bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggle(it.id)}
                        disabled={disabled}
                        className={`cursor-pointer ShopSpecific w-6 h-6 rounded border flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#66BEF0] ${
                          checked ? "bg-[#66BEF0] border-[#66BEF0]" : "bg-white border-gray-300"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-pressed={checked}
                        aria-label={`${checked ? "Avmarkera" : "Välj"} ${it.name}`}
                      >
                        {checked && <Check className="w-4 h-4 text-white" />}
                      </button>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{it.name}</div>
                        <div className="text-xs text-gray-500">{it.price} kr</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{checked ? "Vald" : ""}</div>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-gray-500 mt-2">Du kan välja {bundle.maxItems} tillval i detta paket.</p>
          </section>

          <aside className="bg-gray-50 rounded-xl p-4 h-fit">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sammanfattning</h4>
            <ul className="space-y-2 mb-3">
              <li className="flex items-center justify-between text-sm">
                <span>Grundpris</span>
                <span className="font-medium">{bundle.basePrice} kr</span>
              </li>
              {[...selected].map((id) => {
                const it = bundle.items.find((i) => i.id === id);
                if (!it) return null;
                return (
                  <li key={id} className="flex items-center justify-between text-sm">
                    <span>{it.name}</span>
                    <span className="font-medium">{it.price} kr</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between py-2 border-t">
              <span className="text-sm font-semibold text-gray-900">Uppskattat totalpris</span>
              <span className="text-lg font-bold text-gray-900">{total} kr</span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSelected(new Set<string>())}
                className="flex items-center justify-center gap-2 py-2 mb-2 rounded-lg text-white bg-white border hover:bg-gray-100 transition-all transform duration-300 hover:scale-95"
                aria-label="Rensa val"
              >
                 Rensa
              </button>
            </div>

            <ShopForm
              bundle={bundle}
              selectedIds={Array.from(selected)}
              total={total}
              onSuccess={({ name, phone, email, selected, total: t }: ShopFormSuccessData) => {
                onRequestQuote?.({ name, phone, email, selected, total: t, bundle: bundle.name });
                onClose?.();
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
