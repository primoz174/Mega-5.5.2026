import React from 'react';
import { Linkedin, Facebook, MapPin, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const LOGO_URL = "https://megama.si/wp-content/uploads/2021/01/cropped-cropped-website_logo_transparent_background-1-1.png";

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/' && id !== 'home') {
      navigate('/#' + id);
      return;
    }

    if (location.pathname !== '/' && id === 'home') {
      navigate('/');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* High-Tech Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,113,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,113,227,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
        
        {/* Radial Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.05),transparent_70%)]" />
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0071e3]/20 to-transparent" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          {/* Company Bio Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col gap-6">
              <img
                src={LOGO_URL}
                alt="MEGAMA"
                className="h-10 w-auto object-contain self-start transition-all hover:scale-[1.02]"
              />
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {t.footer.company_desc}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://si.linkedin.com/company/megama-d-o-o" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0071e3]/20 hover:border-[#0071e3]/50 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/www.megama.si/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0071e3]/20 hover:border-[#0071e3]/50 transition-all duration-300">
                <Facebook size={20} />
              </a>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/20">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-green-500/80 uppercase">{language === 'sl' ? 'Vsi sistemi aktivni' : 'All Systems Nominal'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links with Tech Counters */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full" />
                <h4 className="text-white font-bold font-mono text-[10px] uppercase tracking-[0.3em]">{t.footer.sections_services}</h4>
              </div>
              <ul className="space-y-1">
                {[t.contact.form_ndt, t.contact.form_supervision, language === 'sl' ? 'Zagotavljanje kakovosti QA/QC' : 'Quality Assurance QA/QC'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection('services')} 
                      className="text-slate-400 text-xs hover:text-[#0071e3] transition-colors flex items-center gap-2 group py-2"
                    >
                      <ExternalLink size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full" />
                <h4 className="text-white font-bold font-mono text-[10px] uppercase tracking-[0.3em]">{t.footer.sections_company}</h4>
              </div>
              <ul className="space-y-1">
                <li><button onClick={() => scrollToSection('why-megama')} className="text-slate-400 text-xs hover:text-[#0071e3] transition-colors flex items-center gap-2 group text-left py-2">
                  <ExternalLink size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {t.nav.about}
                </button></li>
                <li><button onClick={() => scrollToSection('ekipa')} className="text-slate-400 text-xs hover:text-[#0071e3] transition-colors flex items-center gap-2 group text-left py-2">
                  <ExternalLink size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {t.personnel.hero_title}
                </button></li>
                <li><button onClick={() => scrollToSection('certifikati')} className="text-slate-400 text-xs hover:text-[#0071e3] transition-colors flex items-center gap-2 group text-left py-2">
                  <ExternalLink size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {t.about.certs_title}
                </button></li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full" />
                <h4 className="text-white font-bold font-mono text-[10px] uppercase tracking-[0.3em]">{t.footer.sections_contact}</h4>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-[#0071e3]/5 border border-white/5 flex items-center justify-center group-hover:border-[#0071e3]/30 transition-colors">
                    <MapPin size={14} className="text-[#0071e3]" />
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    Cesta krških žrtev 44<br />8270 Krško, {language === 'sl' ? 'Slovenija' : 'Slovenia'}
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-[#0071e3]/5 border border-white/5 flex items-center justify-center group-hover:border-[#0071e3]/30 transition-colors">
                    <Mail size={14} className="text-[#0071e3]" />
                  </div>
                  <a href="mailto:info@megama.si" className="text-slate-400 text-xs hover:text-white transition-colors">info@megama.si</a>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-[#0071e3]/5 border border-white/5 flex items-center justify-center group-hover:border-[#0071e3]/30 transition-colors">
                    <Phone size={14} className="text-[#0071e3]" />
                  </div>
                  <a href="tel:+38631694806" className="text-slate-400 text-xs hover:text-white transition-colors">+386 31 694 806</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical / Legal Details Grid */}
        <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative group mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0071e3]/0 via-[#0071e3]/5 to-[#0071e3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="space-y-4">
               <div className="font-mono text-[10px] text-[#0071e3] tracking-widest uppercase flex items-center gap-2">
                 <ShieldCheck size={14} /> {language === 'sl' ? 'Registriran subjekt' : 'Registered Entity'}
               </div>
               <p className="text-white font-bold text-xs uppercase leading-tight font-mono">MEGAMA, NDT PREISKAVE D.O.O.</p>
               <p className="text-slate-500 text-[10px] leading-relaxed">
                 {language === 'sl' ? 'Sedež: ' : 'Reg. office: '}Cesta krških žrtev 44, 8270 Krško<br />
                 {language === 'sl' ? 'MŠ' : 'Reg. No'}: 8789622000 | {language === 'sl' ? 'Davčna' : 'VAT'}: SI 69500177
               </p>
            </div>
            
            <div className="lg:col-span-2 space-y-4 md:border-l md:border-white/5 md:pl-8">
               <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">{t.footer.payment_info}</div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                   <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">IBAN (UNICREDIT BANK)</p>
                   <p className="text-white font-mono text-xs">SI56 2900 0015 3266 065</p>
                 </div>
                 <div>
                   <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">SWIFT / BIC</p>
                   <p className="text-white font-mono text-xs">BACXSI22</p>
                 </div>
               </div>
            </div>

            <div className="flex flex-col justify-end items-end space-y-2">
              <div className="flex items-center gap-4 filter grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                 {/* Certificates Logos or Icons would go here */}
                 <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center font-mono text-[8px] text-white/50">ISO 9001</div>
                 <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center font-mono text-[8px] text-white/50">ISO 9712</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} MEGAMA CENTER &bull; {t.footer.rights}</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <p>{t.footer.designed}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;