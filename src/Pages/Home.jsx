import { NavLink } from "react-router-dom";

const heroStats = [
  { value: "20+", label: "açıq hava oturacağı" },
  { value: "4K", label: "kino ekranı" },
  { value: "24/7", label: "rezervasiya dəstəyi" },
];

const experienceCards = [
  {
    title: "Açıq hava seansları",
    text: "Rahat oturacaqlar, gün batımı seansları və gecə baxışına uyğun ekran quruluşu.",
    icon: "fa-film",
  },
  {
    title: "Gecə kinoteatrı",
    text: "Ulduzların altında film izləmək, rahat atmosfer və seçilmiş yeməklərlə unudulmaz axşam.",
    icon: "fa-moon",
  },
];

const storyPoints = [
  "Yumşaq işıqlandırma və rahat lounge atmosferi ilə xoş qarşılama.",
  "Seçilmiş yemək və içkilər sürətli servis olunur ki, heç nə səhnəni qaçırmasın.",
  "Gün batımı və gecə seansları üçün ideal açıq hava məkanı.",
];

function Home() {
  return (
    <div className="space-y-14 sm:space-y-16 lg:space-y-20 pb-6 sm:pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-[#0c0c10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,158,12,0.28),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(240,51,40,0.25),transparent_30%),linear-gradient(135deg,rgba(16,17,19,0.98),rgba(27,27,33,0.94))]" />
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.26em] text-[#ffcf87]">
              Gala Cinema
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em]">
              Açıq hava
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#FF9E0C] via-[#ffd58a] to-white">
                kino gecələri
              </span>
              üçün yeni məkan.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl leading-8 text-white/75">
              Gala Cinema ulduzların altında film izləmək, rahat oturma zonaları, seçilmiş yeməklər və xüsusi tədbirlər üçün hazırlanmış açıq hava kinoteatrıdır.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <NavLink
                to="/Our-menu"
                className="inline-flex items-center justify-center rounded-[38px] bg-linear-to-r from-[#F03328] to-[#FF9E0C] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_10px_30px_rgba(240,51,40,0.32)] transition-all hover:-translate-y-0.5"
              >
                Menyuya bax
              </NavLink>
              <NavLink
                to="/Contact-Us"
                className="inline-flex items-center justify-center rounded-[38px] border border-white/15 bg-white/6 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:border-[#FF9E0C] hover:bg-white/10"
              >
                Rezervasiya et
              </NavLink>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-[#ffcf87]">{item.value}</div>
                  <div className="mt-1 text-xs sm:text-sm text-white/65">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-[12%_10%_10%_10%] rounded-full bg-[radial-gradient(circle,rgba(255,158,12,0.26)_0%,transparent_68%)] blur-2xl" />
            <div className="relative w-full max-w-md rounded-[28px] border border-white/12 bg-white/8 p-5 sm:p-6 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
              <div className="rounded-[22px] bg-[#101113] p-4 sm:p-5 border border-white/10">
                <div className="rounded-[18px] bg-linear-to-br from-[#fefefe] to-[#efe7dc] p-6 sm:p-7 text-[#101113] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#F03328] font-bold">Bu axşam</p>
                      <h2 className="mt-1 text-2xl font-black">Gün batımı seansı</h2>
                    </div>
                    <div className="rounded-2xl bg-[#0f1014] px-3 py-2 text-right text-white">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">Başlanır</div>
                      <div className="text-lg font-black">21:00</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Böyük ekran", "Aydın və keyfiyyətli görüntü, immersiv səs", "fa-clapperboard"],
                      ["Lounge oturacaq", "Rahat kreslolar və sakit atmosfer", "fa-couch"],
                    ].map(([title, text, icon]) => (
                      <div key={title} className="flex items-start gap-4 rounded-[22px] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,15,20,0.07)]">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#F03328] to-[#FF9E0C] text-base text-white shadow-[0_10px_20px_rgba(240,51,40,0.18)]">
                          <i className={`fa-solid ${icon}`} />
                        </div>
                        <div>
                          <div className="text-[15px] font-black text-[#111217]">{title}</div>
                          <div className="mt-1 text-[15px] leading-6 text-[#5C5F66]">{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/55">Məkan</div>
                  <div className="mt-1 text-sm font-bold text-white">Açıq hava kinoteatrı</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/55">Ab-hava</div>
                  <div className="mt-1 text-sm font-bold text-white">İsti, kinoya uyğun, sosial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {experienceCards.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-[#f0e6de] bg-white p-7 sm:p-8 shadow-[0_10px_40px_rgba(15,15,20,0.07)] transition-all hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(15,15,20,0.11)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#F03328] to-[#FF9E0C] text-xl text-white shadow-[0_10px_24px_rgba(240,51,40,0.26)]">
              <i className={`fa-solid ${item.icon}`} />
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#101113]">{item.title}</h3>
            <p className="mt-4 text-base sm:text-lg leading-8 text-[#5C5F66]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[28px] border border-[#f0e6de] bg-[#fffaf6] p-6 sm:p-8 shadow-[0_12px_40px_rgba(15,15,20,0.05)]">
            <span className="inline-flex rounded-full bg-[#fff1df] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#F03328]">
            Gala Cinema haqqında
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#101113]">
            Kinoya gedən axşamı təcrübəyə çeviririk.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-8 text-[#5C5F66]">
            Saytın bu hissəsi Gala Cinema-nın açıq hava ruhunu göstərmək üçün hazırlanıb: rahatlıq, görüntü keyfiyyəti, dadlı menyu və tədbir idarəetməsi bir yerdədir.
          </p>
          <div className="mt-6 space-y-3">
            {storyPoints.map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_6px_22px_rgba(15,15,20,0.05)]">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FF9E0C]" />
                <p className="text-sm sm:text-base text-[#33363d] leading-7">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-[#111217] p-5 sm:p-6 text-white shadow-[0_18px_50px_rgba(15,15,20,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-2xl sm:text-3xl font-black">Nə ilə fərqlənir</h3>
            <NavLink to="/Contact-Us" className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition-all hover:border-[#FF9E0C]">
              İndi bron et
            </NavLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#ffcf87] font-bold">Ab-hava</div>
              <p className="mt-3 text-sm leading-7 text-white/75">İsti işıq, təmiz xətlər və axşam seansları üçün tünd, zərif palitra.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5 sm:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#ffcf87] font-bold">Çevik istifadə</div>
              <p className="mt-3 text-sm leading-7 text-white/75">Məkan ictimai seanslar, özəl nümayişlər, promo gecələr və brend təqdimatları üçün uyğundur.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;
