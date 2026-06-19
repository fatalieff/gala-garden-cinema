import MapComponent from "../components/mapComponent";

const contactDetails = [
  { icon: "fa-location-dot", text: "Qala əyləncə parkı Mərdəkan" },
  { icon: "fa-phone", text: "+994 (010)-525-04-21" },
  { icon: "fa-envelope", text: "galagardencinema@gmail.com" },
  { icon: "fa-clock", text: "21:00 - 00:00" },
  
];

const socialLinks = [
  { icon: "fa-instagram", href: "https://www.instagram.com/galagardencinema?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { icon: "fa-whatsapp", href: "https://wa.me/994105250421", bg: "from-green-500 to-green-600" },
];

const reservationHighlights = [
  {
    title: "Rezervasiya",
    text: "Açıq hava seansları və qrup sifarişləri üçün əvvəlcədən əlaqə saxlayın.",
  },
  {
    title: "İş Saatları",
    text: "Seans cədvəli mövsümə uyğun yenilənir. Axşam proqramları üçün sosial şəbəkələrdən bizi izləyin.",
  },
  {
    title: "Cavab Müddəti",
    text: "Mesaj və rezervasiya sorğularına mümkün qədər qısa zamanda dönüş etməyə çalışırıq.",
  },
];

const quickActions = [
  {
    title: "Rezervasiya Üçün Zəng",
    text: "Telefon məlumatı əlavə edildikdə birbaşa əlaqə üçün istifadə oluna bilər.",
    buttonText: "+994 (010)-525-04-21",
    href: "tel:+994105250421",
  },
  {
    title: "Email ilə Əlaqə",
    text: "Təklif, əməkdaşlıq və tədbir sorğularınızı email üzərindən göndərə bilərsiniz.",
    buttonText: "galagardencinema@gmail.com",
    href: "mailto:galagardencinema@gmail.com",
  },
];

function ContactUs() {
  return (
    <div className="nunito relative z-[1] py-8 sm:py-10 pb-14 sm:pb-20 min-h-[50vh]">
      <div className="relative overflow-hidden rounded-[32px] border border-[#f0e6de] bg-[#111217] text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,158,12,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(240,51,40,0.16),transparent_24%),linear-gradient(180deg,rgba(16,17,19,0.98),rgba(17,18,23,0.98))]" />
        <div className="relative grid xl:grid-cols-[0.92fr_1.08fr]">
          {/* Left — info card */}
          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10 border-b xl:border-b-0 xl:border-r border-white/10 bg-white/4 backdrop-blur-sm">
            <div>
              <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffcf87]">
                Əlaqə və rezervasiya
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mt-5">
                Gala Cinema ilə əlaqə saxlayın.
              </h1>
              <p className="text-sm sm:text-base leading-7 text-white/70 mt-3 max-w-lg">
                Bu bölmədə ünvan, telefon, iş saatları və rezervasiya məlumatlarını rahatlıqla yeniləyə bilərsiniz.
              </p>
            </div>

            <div className="grid gap-3">
              {contactDetails.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 transition-all hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <div className="w-9 h-9 shrink-0 rounded-[12px] bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white text-[13px] shadow-[0_8px_20px_rgba(240,51,40,0.18)]">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <span className="text-sm sm:text-[15px] font-medium text-white/82 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.icon}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.icon}
                  className={`w-12 h-12 rounded-[14px] border border-white/10 flex items-center justify-center text-white text-xl no-underline transition-all hover:-translate-y-1 shadow-[0_6px_14px_rgba(0,0,0,0.15)] ${
                    item.bg 
                      ? `bg-gradient-to-br ${item.bg} border-transparent hover:scale-105` 
                      : `bg-white/8 hover:bg-gradient-to-br hover:from-[#F03328] hover:to-[#FF9E0C] hover:border-transparent hover:text-white`
                  }`}
                >
                  <i className={`fa-brands ${item.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — map + contact content */}
          <div className="bg-[#fffaf6] text-[#101113] p-5 sm:p-6 lg:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] items-stretch">
              <div className="min-h-[320px] sm:min-h-[400px] rounded-[24px] overflow-hidden border border-[#f0e6de] shadow-[0_10px_34px_rgba(15,15,20,0.08)] relative z-0 isolate [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:rounded-[24px]">
                <MapComponent />
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-3">
                  {reservationHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[22px] border border-[#f0e6de] bg-[linear-gradient(180deg,#fffdfb,#fff6ee)] p-5 shadow-[0_10px_24px_rgba(16,17,19,0.05)]"
                    >
                      <div className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#F03328]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-[#505560]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {quickActions.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="rounded-[22px] border border-[#f0e6de] bg-[#101217] p-5 text-white shadow-[0_14px_30px_rgba(16,17,19,0.12)] flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(16,17,19,0.18)] no-underline"
                    >
                      <h3 className="text-lg font-black leading-snug">{item.title}</h3>
                      <p className="text-sm leading-6 text-white/68">{item.text}</p>
                      <div className="mt-auto inline-flex rounded-full bg-gradient-to-r from-[#F03328] to-[#FF9E0C] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_8px_18px_rgba(240,51,40,0.25)]">
                        {item.buttonText}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
