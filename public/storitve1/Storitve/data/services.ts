import { ServiceCategory } from '../types';

export const servicesData: ServiceCategory[] = [
  {
    id: 'ndt',
    title: 'NDT Preiskave / Kontrola',
    shortTitle: 'NDT',
    description: 'Neporušitvene preiskave materialov in zvarov za zagotavljanje najvišje varnosti in kakovosti brez poškodb.',
    color: 'text-blue-500',
    icon: 'ScanEye',
    items: [
      { 
        id: 'vt', 
        label: 'Vizualna preiskava (VT)',
        description: 'Osnovna in najpomembnejša neporušitvena preiskava. Z njo odkrivamo površinske napake, razpoke, poroznost in nepravilnosti v obliki zvara ali materiala.',
        details: ['Pregled pred, med in po varjenju', 'Uporaba endoskopov za težko dostopna mesta', 'Merjenje dimenzij zvarov z merili', 'Skladnost z EN ISO 17637'],
        icon: 'Eye'
      },
      { 
        id: 'pt', 
        label: 'Penetrantska preiskava (PT)',
        description: 'Metoda za odkrivanje površinskih napak (razpok, poroznosti) na neporoznih materialih s pomočjo kapilarnega učinka barvnih ali fluorescentnih tekočin.',
        details: ['Primerno za vse neporozne materiale (jeklo, aluminij, plastika)', 'Visoka občutljivost za mikroskopske razpoke', 'Hitra in stroškovno učinkovita metoda', 'Skladnost z EN ISO 3452'],
        icon: 'Droplet'
      },
      { 
        id: 'mt', 
        label: 'Magnetna preiskava (MT)',
        description: 'Uporablja se za odkrivanje površinskih in tik podpovršinskih napak v feromagnetnih materialih z ustvarjanjem magnetnega polja in nanosom magnetnih delcev.',
        details: ['Zelo zanesljiva metoda za jeklene konstrukcije', 'Odkriva tudi napake tik pod površino', 'Uporaba barvnih ali fluorescentnih delcev', 'Skladnost z EN ISO 17638'],
        icon: 'Magnet'
      },
      { 
        id: 'ut', 
        label: 'Ultrazvočna preiskava (UT)',
        description: 'Globinska preiskava materialov z uporabo visokofrekvenčnih zvočnih valov. Odlična za odkrivanje notranjih napak, kot so razpoke, žlindra in neprevarjenosti.',
        details: ['Zaznavanje napak v celotnem volumnu materiala', 'Določanje točne globine in velikosti napake', 'Primerno za debelejše materiale in zvare', 'Skladnost z EN ISO 17640'],
        icon: 'Activity'
      },
      { id: 'utt', label: 'Merjenje debelin (UTT)', icon: 'Ruler' },
      { id: 'lt', label: 'Preiskava tesnosti (LT)', icon: 'Wind' },
      { id: 'rt', label: 'Radiografska preiskava (RT)*', icon: 'Radiation' },
      { id: 'rt-eval', label: 'Evaluacija radiografskih filmov', icon: 'FileSearch' },
      { id: 'uci', label: 'Trdota materiala (UCI)', icon: 'Hammer' },
      { id: 'leeb', label: 'Trdota materiala (Leeb)', icon: 'Hammer' },
    ]
  },
  {
    id: 'nadzori',
    title: 'Nadzori',
    shortTitle: 'Nadzori',
    description: 'Strokovni nadzor nad varilnimi procesi in prevzemi izdelkov za zagotavljanje skladnosti s standardi.',
    color: 'text-orange-500',
    icon: 'ShieldCheck',
    items: [
      { 
        id: 'varilni', 
        label: 'Storitve varilnega nadzora',
        description: 'Strokovni nadzor nad varilnimi procesi v skladu z mednarodnimi standardi (EN ISO 3834, EN 1090).',
        details: ['Pregled varilne dokumentacije (WPS, WPQR)', 'Nadzor nad usposobljenostjo varilcev', 'Kontrola priprave zvarnih robov', 'Spremljanje varilnih parametrov med varjenjem'],
        icon: 'Shield'
      },
      { 
        id: 'prevzemi', 
        label: 'Prevzemi izdelkov za kupce',
        description: 'Neodvisni prevzemi in inšpekcije tlačne in druge procesne opreme pri proizvajalcih ali na terenu.',
        details: ['Pregled tehnične dokumentacije', 'Vizualna in dimenzijska kontrola', 'Nadzor nad tlačnimi preizkusi', 'Izdaja poročil o prevzemu'],
        icon: 'CheckSquare'
      },
      { id: 'third-party', label: 'Tretja stranka (Third-party)', icon: 'Users' },
      { id: 'vhodna', label: 'Vhodna kontrola materialov', icon: 'PackageCheck' },
      { id: 'koordinacija', label: 'Pogodbena varilna koordinacija', icon: 'Network' },
    ]
  },
  {
    id: 'qa',
    title: 'Kontrola in Kakovost',
    shortTitle: 'Kakovost',
    description: 'Celovito upravljanje kakovosti, od priprave dokumentacije do spremljanja proizvodnje in montaže.',
    color: 'text-emerald-500',
    icon: 'ClipboardCheck',
    items: [
      { 
        id: 'izvedbena', 
        label: 'Priprava izvedbene dokumentacije',
        description: 'Strokovna priprava in pregled tehnične, varilne in kakovostne dokumentacije za projekte.',
        details: ['Izdelava varilnih planov', 'Priprava navodil za NDT', 'Zbiranje certifikatov materialov', 'Kompletiranje končne mape (As-built)'],
        icon: 'FileText'
      },
      { id: 'proizvodnja', label: 'Spremljanje proizvodnje/montaže', icon: 'Factory' },
      { id: 'varilna-dok', label: 'Priprava varilne dokumentacije', icon: 'FileSignature' },
      { id: 'koncna-dok', label: 'Priprava končne dokumentacije', icon: 'BookOpen' },
    ]
  },
  {
    id: 'svetovanje',
    title: 'Svetovanje',
    shortTitle: 'Svetovanje',
    description: 'Strokovno svetovanje pri tehnologijah varjenja, atestiranju in uvajanju osebja v NDT postopke.',
    color: 'text-purple-500',
    icon: 'Lightbulb',
    items: [
      { id: 'tehnologija', label: 'Tehnologija varjenja in plani', icon: 'Settings' },
      { id: 'atest', label: 'Organizacija atestiranja (WPQR, WPS)', icon: 'Award' },
      { id: 'ndt-svet', label: 'Svetovanje pri NDT preskušanju', icon: 'Lightbulb' },
      { id: 'navodila', label: 'Priprava navodil (EN/ISO, ASME...)', icon: 'Book' },
      { id: 'uvajanje', label: 'Praktično uvajanje osebja v NDT', icon: 'GraduationCap' },
    ]
  },
];
