import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabaseClient';

const TELEGRAM_BOT_TOKEN = '8950709517:AAFwRL-Ecnxc1YZA0bzC4s0N9gQ8W4g0h4k';
const TELEGRAM_CHAT_ID = '-1003969742388';

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
  const [basketItems, setBasketItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderSending, setOrderSending] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const [orderError, setOrderError] = useState('');

  const basketTotal = useMemo(
    () => basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [basketItems]
  );

  useEffect(() => {
    let alive = true;

    const loadMeals = async () => {
      setLoading(true);
      setError('');

      const { data, error: supabaseError } = await supabase
        .from('meals')
        .select('id,name,price,image_url,category')
        .order('id', { ascending: false });

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

  const addToBasket = (meal) => {
    setOrderMessage('');
    setOrderError('');
    setBasketItems((current) => {
      const existing = current.find((item) => item.id === meal.id);
      if (existing) {
        return current.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { id: meal.id, name: meal.name, price: meal.price, quantity: 1 }];
    });
  };

  const removeFromBasket = (id) => {
    setBasketItems((current) => current.filter((item) => item.id !== id));
  };

  const changeBasketQuantity = (id, delta) => {
    setBasketItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const buildOrderText = () => {
    const header = `👤 *Müştəri:* ${customerName}\n📞 *Telefon:* ${customerPhone}\n----------------------------------\n🛒 *Yeni Sifariş:*\n`;
    const lines = basketItems.map((item) => `- ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`);
    const footer = `\n----------------------------------\n💰 *Toplam Məbləğ:* ${formatPrice(basketTotal)}`;

    return `${header}${lines.join('\n')}${footer}`;
  };

  const handleSubmitOrder = async () => {
    if (orderSending) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setOrderError('Zəhmət olmasa, sifarişi tamamlamaq üçün adınızı və telefon nömrənizi qeyd edin!');
      return;
    }

    if (basketItems.length === 0) {
      setOrderError('Səbətiniz boşdur. Əvvəlcə yemək əlavə edin.');
      return;
    }

    setOrderSending(true);
    setOrderError('');
    setOrderMessage('');

    try {
      const text = buildOrderText();
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      });

      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(result.description || 'Telegram API error');
      }

      setBasketItems([]);
      setCustomerName('');
      setCustomerPhone('');
      setOrderMessage('Sifarişiniz uğurla alındı! Tezlkliklə sizinlə əlaqə saxlanılacaq.');
    } catch (err) {
      console.error('Telegram göndərmə xətası:', err);
      setOrderError('Sifariş göndərilmədi. Yenidən cəhd edin.');
    } finally {
      setOrderSending(false);
    }
  };

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

        <div className="mt-8 grid gap-3 md:gap-4 lg:gap-4 lg:grid-cols-[1.1fr_0.85fr]">
          <div>
            <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-6">
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
                      <button
                        type="button"
                        onClick={() => addToBasket(meal)}
                        className="mt-5 inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-[#F03328] px-4 py-3 text-sm font-bold text-white transition-all duration-150 hover:bg-[#ff7b47]"
                      >
                        Səbətə əlavə et
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <aside className="space-y-3 md:space-y-4 lg:sticky lg:top-8 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
            <div className="rounded-[28px] border border-white/10 bg-[#111217] p-4 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#ffcf87]">Səbət</p>
                  <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-white">Sifariş xülasəsi</h2>
                </div>
                <span className="rounded-full bg-white/10 px-2 sm:px-3 py-1 text-xs sm:text-sm text-white/70 whitespace-nowrap">
                  {basketItems.length}
                </span>
              </div>

              {basketItems.length === 0 ? (
                <div className="mt-4 sm:mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 p-3 sm:p-6 text-xs sm:text-sm leading-6 sm:leading-7 text-white/70">
                  Səbətiniz hələ boşdur. Yeməklərdən birini seçib əlavə edin.
                </div>
              ) : (
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4 max-h-[200px] sm:max-h-[300px] overflow-y-auto pr-1 sm:pr-2">
                  {basketItems.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm sm:text-base font-bold text-white">{item.name}</h3>
                          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/65">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromBasket(item.id)}
                          className="rounded-full border border-white/15 bg-white/5 px-2 sm:px-3 py-1 sm:py-2 text-xs font-bold text-white/80 transition-all hover:bg-white/10 whitespace-nowrap"
                        >
                          Sil
                        </button>
                      </div>

                      <div className="mt-2 sm:mt-4 flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-white/5 p-0.5 sm:p-1">
                          <button
                            type="button"
                            onClick={() => changeBasketQuantity(item.id, -1)}
                            className="inline-flex h-7 sm:h-9 w-7 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white text-sm sm:text-base transition-colors hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="min-w-[24px] sm:min-w-[38px] text-center text-xs sm:text-sm font-bold text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => changeBasketQuantity(item.id, 1)}
                            className="inline-flex h-7 sm:h-9 w-7 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white text-sm sm:text-base transition-colors hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 sm:mt-6 rounded-3xl bg-[#ffffff08] p-3 sm:p-5">
                <div className="space-y-2 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white/80">Adınız</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Ad və Soyad"
                      className="mt-1 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0f131c] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white outline-none transition focus:border-[#F03328] focus:ring-2 focus:ring-[#F03328]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white/80">Telefon</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      placeholder="050 XXX XX XX"
                      className="mt-1 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0f131c] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white outline-none transition focus:border-[#F03328] focus:ring-2 focus:ring-[#F03328]/20"
                    />
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex items-center justify-between gap-2 text-xs sm:text-sm text-white/70">
                  <span>Ümumi</span>
                  <span className="font-bold text-white text-sm sm:text-base">{formatPrice(basketTotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={basketItems.length === 0 || orderSending || !customerName.trim() || !customerPhone.trim()}
                  className="mt-4 sm:mt-6 inline-flex w-full items-center justify-center rounded-2xl sm:rounded-3xl bg-[#F03328] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-150 disabled:cursor-not-allowed disabled:bg-[#b15c4d]"
                >
                  {orderSending ? 'Göndərilir...' : 'Tamamla'}
                </button>
              </div>

              {orderMessage ? (
                <div className="mt-3 sm:mt-4 rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-3 sm:p-4 text-xs sm:text-sm text-emerald-100">
                  {orderMessage}
                </div>
              ) : null}

              {orderError ? (
                <div className="mt-3 sm:mt-4 rounded-2xl sm:rounded-3xl border border-red-500/20 bg-red-500/10 p-3 sm:p-4 text-xs sm:text-sm text-red-100">
                  {orderError}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default OurMenu;
