import { NavLink } from "react-router-dom";

const footerSections = [
  {
    title: "Təcrübə",
    links: [
      ["/home", "Ana səhifə"],
      ["/Our-menu", "Menyu"],
      ["/Contact-Us", "Əlaqə"],
    ],
  },
  {
    title: "Gala Cinema",
    links: [
      ["#", "Açıq hava seansları"],
      ["#", "Gün batımı kinoteatrı"],
      ["#", "Menyu"],
      ["#", "Rezervasiya bölməsi"],
    ],
  },
  {
    title: "Əlaqə",
    links: [
      ["mailto:galagardencinema@gmail.com", "galagardencinema@gmail.com"],
      ["tel:+994105250421", "+994 (010)-525-04-21"],
      ["#", "Gün batımı seansları"],
      ["#", "Seans rezervasiyaları"],
    ],
  },
  {
    title: "Sosial",
    links: [
      ["https://www.instagram.com/galagardencinema?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "Instagram"],
    ],
  },
];

function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-[10%] rounded-t-[32px] px-4 sm:px-8 lg:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10 -mx-4 sm:-mx-6 lg:-mx-8 bg-[#101113] text-white border-t border-white/10">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
        <div className="max-w-md text-center lg:text-left">
          <span className="nunito text-2xl sm:text-3xl lg:text-[32px] font-black">
            Gala <span className="text-[#FF9E0C]">Cinema</span>
          </span>
          <p className="nunito font-medium text-sm sm:text-base leading-7 text-white/68 mt-3 max-w-md mx-auto lg:mx-0">
            Açıq hava seansları, seçilmiş yeməklər və ulduzların altında kinoya uyğun axşam ab-havası.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/78">
            galagardencinema@gmail.com
          </div>
        </div>
      </div>

      <hr className="border-white/10 mt-8 sm:mt-10" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 mt-8 sm:mt-10">
        {footerSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4 sm:gap-[26px]">
            <span className="nunito font-bold tracking-[1px] sm:tracking-[2px] text-xs sm:text-sm uppercase text-white/80">
              {section.title}
            </span>
            {section.links.map(([to, label]) =>
              to.startsWith("/") ? (
                <NavLink key={to} to={to} className="group">
                  <span className="nunito text-sm sm:text-base text-white/60 transition-colors group-hover:text-[#FF9E0C]">
                    {label}
                  </span>
                </NavLink>
              ) : (
                <a key={`${section.title}-${label}`} href={to} target="_blank" rel="noopener noreferrer" className="nunito text-sm sm:text-base text-white/60 transition-colors hover:text-[#FF9E0C]">
                  {label}
                </a>
              )
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
