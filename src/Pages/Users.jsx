import React from 'react';
import { NavLink } from 'react-router-dom';

const Users = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon / Illustration Placeholder */}
      <div className="relative mb-8">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center text-[#F03328] shadow-xl shadow-red-100/50 bg-[linear-gradient(135deg,#fff5ee_0%,#ffe8d6_100%)]">
          <i className="fa-solid fa-users-rectangle text-5xl sm:text-6xl animate-pulse"></i>
        </div>
        <div className="absolute -top-2 -right-2 bg-[#FF9E0C] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
          New
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold nunito mb-6 text-[#2D2D2D]">
        İcma <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#F03328_0%,#FF9E0C_100%)]">Tezliklə</span>
      </h1>
      
      <p className="text-[#666666] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10 nunito">
        Yaxın vaxtlarda yeməksevərlər üçün canlı sosial məkan yaradacağıq. O zaman sevimli reseptlərinizi paylaşa, yemək fotoları əlavə edə və icmamızdakı insanlarla əlaqə qura biləcəksiniz.
      </p>

      {/* Features Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
        <div className="p-4 rounded-2xl border border-[#f0e6de] bg-white/50">
          <i className="fa-solid fa-camera-retro text-[#F03328] mb-3 block text-xl"></i>
          <span className="text-sm font-bold text-[#2D2D2D] nunito">Şəkil paylaşın</span>
        </div>
        <div className="p-4 rounded-2xl border border-[#f0e6de] bg-white/50">
          <i className="fa-solid fa-utensils text-[#FF9E0C] mb-3 block text-xl"></i>
          <span className="text-sm font-bold text-[#2D2D2D] nunito">Resept paylaşın</span>
        </div>
        <div className="p-4 rounded-2xl border border-[#f0e6de] bg-white/50">
          <i className="fa-solid fa-comments text-[#F03328] mb-3 block text-xl"></i>
          <span className="text-sm font-bold text-[#2D2D2D] nunito">Şərh və bəyənmə</span>
        </div>
      </div>

      <NavLink 
        to="/home" 
        className="bg-[linear-gradient(90deg,#F03328_0%,#FF9E0C_100%)] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-red-200 hover:scale-105 transition-transform duration-300"
      >
        Ana səhifəyə qayıt
      </NavLink>
    </div>
  );
};

export default Users;
