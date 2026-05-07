import { ServiceCategory } from '../types';

export const servicesData: ServiceCategory[] = [
  {
    id: 'ndt',
    title: 'NDT Preiskave in Kontrola Materialov',
    subtitle: 'Certificirana zanesljivost brez poškodb materiala.',
    shortTitle: 'NDT',
    ctaText: 'Preveri tehnične specifikacije',
    description: 'Izvajamo vrhunske neporušitvene preiskave zvarov in osnovnih materialov. Z ekipo, certificirano po ISO 9712 (nivo II in III), zagotavljamo 100 % varnost vaše opreme in skladnost z mednarodnimi standardi.',
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
      { 
        id: 'utt', 
        label: 'Merjenje debelin (UTT)',
        description: 'Natančno merjenje debeline stene materialov (cevi, tlačnih posod, rezervoarjev) z ultrazvokom za spremljanje korozije in obrabe.',
        details: ['Merjenje debeline brez uničenja materiala', 'Zaznavanje stanjšanja sten zaradi korozije/erozije', 'Sledenje življenjski dobi tlačne opreme', 'Digitalni prikaz in beleženje rezultatov'],
        icon: 'Ruler' 
      },
      { 
        id: 'lt', 
        label: 'Preiskava tesnosti (LT)',
        description: 'Preverjanje tesnosti sistemov pod tlakom ali vakuuma za zagotavljanje varnega obratovanja cevovodov in posod brez puščanja.',
        details: ['Mehurčkasta metoda (Vacuum box)', 'Preizkus s povišanim hidravličnim ali pnevmatskim tlakom', 'Odkrivanje mikroskopskih netesnosti', 'Ključno za tlačno opremo in rezervoarje'],
        icon: 'Wind' 
      },
      { 
        id: 'rt', 
        label: 'Radiografska preiskava (RT)*',
        description: 'Zunanja izvedba preiskave, kjer z rentgenskimi ali gama žarki ožarimo material in posnamemo "sliko" (radiogram) notranjosti zvara ali odlitka.',
        details: ['Nudenje podizvajalskih storitev slikanja z izotopi/X-ray', 'Daje trajen arhivski posnetek zvara', 'Odkrivanje volumskih napak (pore, vključki)', 'Zahteva varnostne ukrepe zaradi sevanja'],
        icon: 'Radiation' 
      },
      { 
        id: 'rt-eval', 
        label: 'Evaluacija radiografskih filmov',
        description: 'Strokovno odčitavanje in ovrednotenje obstoječih radiografskih filmov glede na zahtevane mednarodne in evropske standarde.',
        details: ['Preverjanje kakovosti samega posnetka in IQI', 'Določanje stopnje sprejemljivosti napak po EN ISO 10675', 'Izdaja uradnega poročila in digitalizacija', 'Drugo mnenje in arbitraža pri spornih zvarih'],
        icon: 'FileSearch' 
      },
      { 
        id: 'uci', 
        label: 'Trdota materiala (UCI)',
        description: 'Metoda ultrazvočne trdote (Ultrasonic Contact Impedance) omogoča merjenje trdote s pomočjo majhne obremenitve diamantne konice, primerno za tanke in površinsko utrjene materiale.',
        details: ['Zelo majhna vizualna poškodba površine', 'Hitre in prenosne meritve na terenu', 'Primerno za območja toplotnega vpliva pri zvarih (HAZ)', 'Pretvorbe v različne skale (HV, HB, HRC)'],
        icon: 'Hammer' 
      },
      { 
        id: 'leeb', 
        label: 'Trdota materiala (Leeb)',
        description: 'Dinamična metoda merjenja odboja, pri kateri se merilno telo izstreli ob testno površino. Primerno za masivne kose in hitro pregledovanje večjih komponent.',
        details: ['Hitro testiranje grobih odlitkov in odkovkov', 'Enostavna uporaba na terenu (prijemljivo z roko)', 'Cenovno učinkovito pri večjih presekih', 'Samodejni izračun odboja v obratovalno trdoto'],
        icon: 'Hammer' 
      },
    ]
  },
  {
    id: 'nadzori',
    title: 'Inženirski Nadzor in Prevzemi',
    subtitle: 'Neodvisna presoja za brezhibno izvedbo.',
    shortTitle: 'Nadzori',
    ctaText: 'Zahtevaj ponudbo za nadzor',
    description: 'Zagotavljamo strokovni nadzor nad varilnimi procesi in prevzemi komponent. Kot neodvisna tretja stranka (Third-party) preprečujemo drage napake pri montaži in zagotavljamo, da so vsi izdelki pripravljeni na varno obratovanje.',
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
      { 
        id: 'third-party', 
        label: 'Tretja stranka (Third-party)',
        description: 'Delujemo kot neodvisna tretja stranka z inšpekcijami za zagotovitev, da strojna oprema dosega projektne in normativne specifikacije.',
        details: ['Objektivno in neodvisno ocenjevanje', 'Preverjanje sledljivosti izdanih dokumentov in certifikatov', 'Prisotnost na testiranjih opreme', 'Poraba časa samo po potrebi brez stalnih stroškov'],
        icon: 'Users' 
      },
      { 
        id: 'vhodna', 
        label: 'Vhodna kontrola materialov',
        description: 'Sistematičen pregled polizdelkov in materialov pred vstopom v proizvodnjo proti pripadajočim atestom (EN 10204 3.1, 3.2).',
        details: ['Preventivno iskanje napak pred strojno obdelavo', 'Vizualni in dimenzijski pregled trdih mer ali toleranc', 'Potrditev ustreznosti z dokumentacijo', 'Sistematično označevanje in sledenje kosov'],
        icon: 'PackageCheck' 
      },
      { 
        id: 'koordinacija', 
        label: 'Pogodbena varilna koordinacija',
        description: 'Prevzem vloge glavnega varilnega koordinatorja v posameznem podjetju skladno s standardom SIST EN ISO 14731.',
        details: ['Nadzor nad strokovnostjo in nalogami v varilni proizvodnji', 'Optimizacija proizvodnega procesa obdržanja EN ISO 3834', 'Zunanja ekspertska ekspertiza v lokalno podjetje', 'Pristnost pri presojah certifikacijskih hiš'],
        icon: 'Network' 
      },
    ]
  },
  {
    id: 'qa',
    title: 'Celovito Upravljanje Kakovosti (QC/QA)',
    subtitle: 'Dokumentacija, ki prestane vsako revizijo.',
    shortTitle: 'Kakovost',
    ctaText: 'Preglej QA/QC storitve',
    description: 'Vodimo celotno kakovost vašega projekta – od priprave izvedbenih načrtov do končne dokumentacije. Naši sistemi spremljanja proizvodnje zagotavljajo, da so vsi procesi v skladu s projektno specifikacijo in regulativo.',
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
      { 
        id: 'proizvodnja', 
        label: 'Spremljanje proizvodnje/montaže',
        description: 'Nadzor nad operativnim postopkom med proizvodnjo za zgodnje odkrivanje odstopanj in vzdrževanje plana kakovosti (ITP).',
        details: ['In-process pregledi varjenja/montiranja', 'Označevanje postavk in sklopov', 'Kontrola pred oddajo naslednji delovni postaji', 'Sledenje neujemanjih (Non-conformance reports NCR)'],
        icon: 'Factory' 
      },
      { 
        id: 'varilna-dok', 
        label: 'Priprava varilne dokumentacije',
        description: 'Oblikovanje vseh potrebnih specifikacij postopkov varjenja (WPS), navodil za toplotno obdelavo (PWHT) in delovnih nalogov varilcem.',
        details: ['Pretvorba WPQR atestov v obratovalne WPS', 'Popis vseh varjenih spojev in parametrov', 'Usmerjevanje optimalnih varilnih dodajnih materialov', 'Skrb za pravilno toplotno obdelavo'],
        icon: 'FileSignature' 
      },
      { 
        id: 'koncna-dok', 
        label: 'Priprava končne dokumentacije',
        description: 'Strukturirano zbiranje vseh reportov, testnih listin, materialnih certifikatov v zaključno As-Built dokumentacijo, zahtevane za primopredajo objekta.',
        details: ['Organizirano pošiljanje Manufacturing Data Book', 'Jasna poravnana z zahtevami po PED direktivi', 'Skeniranje in digitalizacija vseh posnetkov', 'Sledenje celotne verige izdelave produkta'],
        icon: 'BookOpen' 
      },
    ]
  },
  {
    id: 'svetovanje',
    title: 'Tehnično Svetovanje in Razvoj',
    subtitle: 'Vaša ekspertiza za najzahtevnejše izzive.',
    shortTitle: 'Svetovanje',
    ctaText: 'Stopi v stik s strokovnjaki',
    description: 'Nudimo strokovno podporo pri pripravi varilnih planov (WPS/WPQR) in NDT navodil po EN/ISO in ASME standardih. Uvajamo vaše osebje v najsodobnejše postopke preskušanja in pomagamo optimizirati vašo proizvodnjo.',
    color: 'text-purple-500',
    icon: 'Lightbulb',
    items: [
      { 
        id: 'tehnologija', 
        label: 'Tehnologija varjenja in plani',
        description: 'Svetovanje pri razvoju in izbiri najboljše tehnologije obločnega varjenja, izbiri žice in strategiji spajanja, da preprečite zvarne napake.',
        details: ['Optimizacija oblike zvarnega roba', 'Izbira TIG, MIG/MAG ali E-PP postopkov', 'Reševanje težav s pornostmi in napakami pri varjenju', 'Projektno svetovanje pred začetkom obsega del'],
        icon: 'Settings' 
      },
      { 
        id: 'atest', 
        label: 'Organizacija atestiranja (WPQR, WPS)',
        description: 'Vodenje in priprava probnih kusov zvarov za izvajanje certificiranja postopkov s priglašenimi organi (TÜV, Bureau Veritas ipd.).',
        details: ['Določitev zahtevanih preizkusov za pokritje področij delovanja podjetja', 'Nabava ustreznega materiala po certifikatih', 'Nadzor pri sami izdelavi specimena (priča standardne inšpekcije)', 'Skrb za analize in preizkuse v laboratorijih'],
        icon: 'Award' 
      },
      { 
        id: 'ndt-svet', 
        label: 'Svetovanje pri NDT preskušanju',
        description: 'Pomoč pri izbiri najustreznejše metode neporušne preiskave glede na tip, lokacijo the geometrijo detajla kjer iščete razpoke.',
        details: ['Analiza, zakaj je ultrazvok boljši kot radiografija v določanem tipu spajanja', 'Tolmačenje rezultatov slabe kakovosti', 'Implementacije novih, naprednih metod v vaš delovni proces', 'Optimizacija in stroškovno učinkoviti inšpekcijski plani'],
        icon: 'Lightbulb' 
      },
      { 
        id: 'navodila', 
        label: 'Priprava navodil (EN/ISO, ASME...)',
        description: 'Prevajanje zahtevnih strokovnih standardov v enostavna praktična navodila, prilagojena konkretnemu obratu brez generičnega balasta.',
        details: ['Pisani postopki glede EN ISO industrije', 'Stroge specifikacije ASME zahtev za prekomorje in rafinerije', 'Priročniki in obratovalne ročne prakse', 'Navodila za izvedbo vizualnih pregledov in čiščenj'],
        icon: 'Book' 
      },
      { 
        id: 'uvajanje', 
        label: 'Praktično uvajanje osebja v NDT',
        description: 'Trening neceritficiranega ali novo zaposlenega kadra s praktičnim vpogledom in »hands-on« tehnikami prepoznavanja vzorcev v realnem delovnem okolišu.',
        details: ['Mentorstvo v delavnici nad defektnimi zvarnimi rebri', 'Učenje razumevanja odčitkov aparatov in zaslonov', 'Razlaga tipičnih lažnih indikacij', 'Utrjevanje baze pred pošiljanjem sodelavcev na uradne NDT tečaje'],
        icon: 'GraduationCap' 
      },
    ]
  },
];
