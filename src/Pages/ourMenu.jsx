import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MenuItemSkeleton } from '../components/Skeletons';

const CATEGORY_TABS = [
  { value: 'All', label: 'Hamısı' },
  { value: 'fastfood', label: 'Fast Food' },
  { value: 'doner', label: 'Dönər' },
  { value: 'Tantuni&Tost', label: 'Tantuni & Tost' },
  { value: 'Lahmacun&Pide', label: 'Lahmacun & Pide' },
];

const normalizeCategory = (value) => String(value || '').trim().toLowerCase();

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111113"/><stop offset="1" stop-color="#2a1b12"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="640" cy="120" r="110" fill="#ff9e0c" opacity="0.18"/><circle cx="190" cy="470" r="150" fill="#f03328" opacity="0.14"/><text x="50%" y="50%" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" text-anchor="middle">Gala Cinema</text></svg>`
  );

const normalizeMeal = (meal) => ({
  id: meal.id,
  name: meal.name || 'Unnamed meal',
  category: meal.category || 'fastfood',
  image_url: meal.image_url || '',
  price: Number(meal.price ?? 0),
});

const formatPrice = (priceInCents) => `${(Number(priceInCents || 0) / 100).toFixed(2)} AZN`;

function MenuCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#121214] shadow-[0_12px_40px_rgba(0,0,0,0.18)] animate-pulse">
      <div className="aspect-4/3 bg-white/8" />
      <div className="p-5 sm:p-6 space-y-4">
        <div className="h-4 w-24 rounded-full bg-white/8" />
        <div className="flex items-center justify-between gap-4">
          <div className="h-7 w-2/3 rounded-xl bg-white/8" />
          <div className="h-8 w-24 rounded-full bg-white/8" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/8" />
          <div className="h-3 w-5/6 rounded bg-white/8" />
        </div>
      </div>
    </div>
  );
}

const OurMenu = () => {
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    const loadMeals = async () => {
      setLoading(true);
      setError('');

      const { data, error: supabaseError } = await supabase.from('meals').select('id,name,price,image_url,category').order('id', { ascending: false });

      if (!alive) return;

      if (supabaseError) {
        setError(supabaseError.message);
        setMeals([]);
        setLoading(false);
        return;
      }

      setMeals((data || []).map(normalizeMeal));
      setLoading(false);
    };

    loadMeals();

    return () => {
      alive = false;
    };
  }, []);

  const filteredMeals = useMemo(() => {
    if (activeTab === 'All') return meals;

    const normalizedActiveTab = normalizeCategory(activeTab);

    return meals.filter(
      (meal) => normalizeCategory(meal.category) === normalizedActiveTab
    );
  }, [activeTab, meals]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,158,12,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(240,51,40,0.18),transparent_28%),linear-gradient(135deg,#0b0c10,#111217_55%,#181316)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffcf87]">
              Açıq Hava Sineması Menyusu
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-7xl leading-[0.95]">
              Kino gecəsi üçün
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#FF9E0C] via-[#ffd58a] to-white">
                rahat və ləzzətli seçimlər.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Filmi yarımçıq qoymadan seçimini asanlaşdır.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === tab.value
                  ? 'bg-[#F03328] text-white shadow-[0_12px_30px_rgba(240,51,40,0.32)]'
                  : 'border border-white/10 bg-white text-[#121214] hover:border-[#FF9E0C] hover:text-[#F03328]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error ? (
          <div className="mt-8 rounded-[28px] border border-red-500/30 bg-red-500/10 p-6 sm:p-8 text-center">
            <div className="text-3xl sm:text-4xl mb-4">⚠️</div>
            <h3 className="text-lg sm:text-xl font-black text-red-100 mb-3">Menyu yüklənərkən xəta baş verdi</h3>
            <p className="text-xs sm:text-sm text-red-200 max-w-md mx-auto">
              Zəhmət olmasa bir az sonra yenidən yoxlayın. Əgər problem davam edirsə, bizimlə əlaqə saxlayın.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:gap-5 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => <MenuCardSkeleton key={index} />)
          ) : filteredMeals.length === 0 ? (
            <div className="col-span-full rounded-[28px] border border-dashed border-white/15 bg-white/6 p-10 text-center text-white/70">
              Bu filtr üçün hələ yemək yoxdur.
            </div>
          ) : (
            filteredMeals.map((meal) => (
              <article key={meal.id} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111217] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-1">
                <div className="relative aspect-4/3 overflow-hidden bg-[#191a1f]">
                  <img
                    src={meal.image_url || FALLBACK_IMAGE}
                    alt={meal.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffcf87]">{meal.category}</p>
                      <h2 className="mt-1 truncate text-xl font-black text-white">{meal.name}</h2>
                    </div>
                    <div className="shrink-0 rounded-full bg-[#fff6ea] px-3 py-1.5 text-sm font-black text-[#1f7a34] shadow-[0_10px_20px_rgba(31,122,52,0.16)]">
                      {formatPrice(meal.price)}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-white/68">
                    Seçilmiş menyu elementi, açıq hava kino atmosferinə uyğun rahat təqdimatla göstərilir.
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default OurMenu;
