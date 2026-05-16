import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
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
    role: 'Direktor',
    initials: 'RT',
    image: '/images/Osebja/Rok-Topolnik-slika.jpeg',
    certifications: ['ASNT Level III · VT, UT', 'EN ISO 9712 Nivo III', 'PDI-UT · ASME Sec. XI', 'IWE · IIW/EWF'],
    email: 'rok.topolnik@megama.si',
    phone: '+386 31 694 806',
  },
  {
    id: '2',
    name: 'Boris Plešac',
    role: 'Vodja kakovosti',
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

  const col1 = members.filter((_, i) => i % 2 === 0);
  const col2 = members.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16 w-full max-w-4xl py-8 select-none">

      {/* ── Left: photo grid ── */}
      <div className="flex gap-3 flex-shrink-0">
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[150px] h-[190px] md:w-[180px] md:h-[224px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-10">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[160px] h-[204px] md:w-[190px] md:h-[240px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member rows ── */}
      <div className="flex flex-col gap-8 pt-0 md:pt-4 flex-1">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Photo card ── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'rounded-2xl cursor-pointer flex-shrink-0 overflow-hidden border border-white/[0.07] transition-opacity duration-300',
        className,
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-[filter] duration-500"
          style={{
            filter: isActive
              ? 'grayscale(0) brightness(1)'
              : 'grayscale(1) brightness(0.6)',
          }}
        />
      ) : (
        /* Monogram fallback */
        <div
          className={cn(
            'w-full h-full flex flex-col items-center justify-center gap-4 p-6 transition-colors duration-300',
            isActive ? 'bg-[#0071e3]/[0.07]' : 'bg-white/[0.03]',
          )}
        >
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300',
              isActive ? 'bg-[#0071e3]/15 border-[#0071e3]/40' : 'bg-white/[0.05] border-white/[0.10]',
            )}
          >
            <span className={cn('font-mono text-xl font-bold', isActive ? 'text-[#0071e3]' : 'text-white/30')}>
              {member.initials}
            </span>
          </div>
          <span className={cn('font-mono text-[9px] tracking-[0.18em] uppercase', isActive ? 'text-white/55' : 'text-white/20')}>
            {member.name.split(' ')[0]}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Member row ── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-default transition-opacity duration-300',
        isDimmed ? 'opacity-30' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'h-2 rounded-full flex-shrink-0 bg-[#0071e3] transition-all duration-300',
            isActive ? 'w-5 opacity-100' : 'w-2.5 opacity-25',
          )}
        />
        <span
          className={cn(
            'font-heading text-xl md:text-2xl font-bold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-white' : 'text-white/65',
          )}
        >
          {member.name}
        </span>
      </div>

      {/* Role */}
      <p className="mt-2 pl-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        {member.role}
      </p>

      {/* Certifications */}
      <div
        className={cn(
          'mt-3 pl-8 flex flex-wrap gap-1.5 transition-all duration-300 overflow-hidden',
          isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0',
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
          'mt-3 pl-8 flex flex-col gap-1.5 transition-all duration-300 overflow-hidden',
          isActive ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 font-mono text-[10px] text-white/35 hover:text-[#0071e3] transition-colors duration-200"
        >
          <Mail className="w-3 h-3 flex-shrink-0" />
          {member.email}
        </a>
        <a
          href={`tel:${member.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 font-mono text-[10px] text-white/35 hover:text-[#0071e3] transition-colors duration-200"
        >
          <Phone className="w-3 h-3 flex-shrink-0" />
          {member.phone}
        </a>
      </div>
    </div>
  );
}
