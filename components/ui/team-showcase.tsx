import { useState, useEffect, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface TeamMember {
  id: string;
  name: string;
  role: { sl: string; en: string };
  initials: string;
  image?: string;
  certifications: string[];
  email: string;
  phone: string;
}

const MEGAMA_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Rok Topolnik',
    role: { sl: 'Direktor', en: 'Director' },
    initials: 'RT',
    image: '/images/Osebja/Rok-Topolnik-slika.jpeg',
    certifications: ['ASNT Level III · VT, UT', 'EN ISO 9712 Nivo III', 'PDI-UT · ASME Sec. XI', 'IWE · IIW/EWF'],
    email: 'rok.topolnik@megama.si',
    phone: '+386 31 694 806',
  },
  {
    id: '2',
    name: 'Boris Plešac',
    role: { sl: 'Vodja kakovosti', en: 'Quality Manager' },
    initials: 'BP',
    image: '/images/Osebja/Boris-Plesac_SLIKA.png',
    certifications: ['QC/QA · ISO 9001:2015', 'ASME Dokumentacija', 'IWI-C · Varilni inšpektor', 'Tehnično svetovanje'],
    email: 'boris.plesac@megama.si',
    phone: '+386 31 520 749',
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = MEGAMA_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);
  const [activatedIds, setActivatedIds] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleScrollActivate = (id: string) => {
    setMobileActiveId(id);
    setActivatedIds(prev => new Set(prev).add(id));
  };

  const effectiveActiveId = isMobile ? mobileActiveId : hoveredId;

  return (
    <div className="flex flex-col gap-10 w-full">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          activeId={effectiveActiveId}
          activatedIds={activatedIds}
          onHover={setHoveredId}
          onScrollActivate={handleScrollActivate}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

function MemberCard({
  member,
  activeId,
  activatedIds,
  onHover,
  onScrollActivate,
  isMobile,
}: {
  member: TeamMember;
  activeId: string | null;
  activatedIds: Set<string>;
  onHover: (id: string | null) => void;
  onScrollActivate: (id: string) => void;
  isMobile: boolean;
}) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Trigger when card enters the middle band of the screen
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!isMobile) return;
        if (entry.isIntersecting) onScrollActivate(member.id);
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile, member.id, onScrollActivate]);

  const isActive = activeId === member.id;
  const hasBeenActivated = activatedIds.has(member.id);
  const isDimmed = activeId !== null && !isActive && !hasBeenActivated;
  const showDetails = isActive || isOpen || hasBeenActivated;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative flex flex-col sm:flex-row items-start gap-5 sm:gap-6 transition-all duration-500 rounded-2xl p-3 -mx-3 cursor-pointer [touch-action:pan-y]',
        isDimmed ? 'opacity-35' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => setIsOpen((o) => !o)}
    >
      {/* Hover glow */}
      {isActive && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at 30% 50%, rgba(0,113,227,0.10) 0%, transparent 70%)',
            boxShadow: 'inset 0 0 0 1px rgba(0,113,227,0.10)',
          }}
        />
      )}
      {/* Photo */}
      <div className="relative shrink-0 w-[140px] h-[176px] md:w-[140px] md:h-[176px] rounded-2xl overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center scale-105 transition-[filter] duration-500"
            style={{
              filter: isActive
                ? 'grayscale(0) brightness(1)'
                : 'grayscale(0.4) brightness(0.85)',
            }}
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex flex-col items-center justify-center gap-3 transition-colors duration-300',
              isActive ? 'bg-[#0071e3]/[0.08]' : 'bg-white/[0.03]',
            )}
          >
            <div
              className={cn(
                'w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300',
                isActive ? 'bg-[#0071e3]/15 border-[#0071e3]/40' : 'bg-white/[0.05] border-white/[0.10]',
              )}
            >
              <span className={cn('font-mono text-lg font-bold', isActive ? 'text-[#0071e3]' : 'text-white/40')}>
                {member.initials}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'h-2 rounded-full shrink-0 bg-[#0071e3] transition-all duration-300',
              isActive ? 'w-5 opacity-100' : 'w-2.5 opacity-30',
            )}
          />
          <h3
            className={cn(
              'font-heading text-xl md:text-2xl font-semibold leading-none tracking-tight transition-colors duration-300',
              isActive ? 'text-white' : 'text-white/85',
            )}
          >
            {member.name}
          </h3>
        </div>

        <p className="mt-2.5 pl-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {member.role[language as 'sl' | 'en']}
        </p>

        {/* Certifications */}
        <div
          className={cn(
            'mt-4 pl-8 flex flex-wrap gap-1.5 transition-all duration-300 [overflow:clip]',
            showDetails ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          {member.certifications.map((cert) => (
            <span
              key={cert}
              className="font-mono text-[9px] tracking-wide text-[#0071e3] border border-[#0071e3]/20 bg-[#0071e3]/[0.06] px-2 py-1 rounded"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div
          className={cn(
            'mt-3 pl-8 flex flex-col gap-1.5 transition-all duration-300 [overflow:clip]',
            showDetails ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-white/45 hover:text-[#0071e3] transition-colors duration-200 w-fit"
          >
            <Mail className="w-3 h-3 shrink-0" />
            {member.email}
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-white/45 hover:text-[#0071e3] transition-colors duration-200 w-fit"
          >
            <Phone className="w-3 h-3 shrink-0" />
            {member.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
