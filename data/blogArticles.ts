export type Tag = 'ndt' | 'welding' | 'standards' | 'safety';

export interface TechnicalSpec {
  label: { sl: string; en: string };
  value: string;
}

export interface Article {
  id: string;
  title: { sl: string; en: string };
  excerpt: { sl: string; en: string };
  content: { sl: string; en: string };
  readTime: number;
  date: string;
  tag: Tag;
  featured?: boolean;
  metaLabel: string;
  specs: TechnicalSpec[];
}

export const articles: Article[] = [
  {
    id: 'ut-phased-array',
    title: {
      sl: 'PAUT: Zakaj je fazno zaredno ultrazvočno testiranje standard za kritično infrastrukturo',
      en: 'PAUT: Why Phased Array Ultrasonic Testing is the Standard for Critical Infrastructure'
    },
    excerpt: {
      sl: 'Fazno zaredno ultrazvočno testiranje (PAUT) je revolucioniralo zaznavanje napak v debelih varih in kompleksnih geometrijah. Razlagamo, kako deluje, kdaj je nujno in zakaj tradicionalni UT pogosto ni dovolj.',
      en: 'Phased array ultrasonic testing (PAUT) has revolutionized defect detection in thick welds and complex geometries. We explain how it works, when it\'s mandatory, and why traditional UT often isn\'t sufficient.'
    },
    readTime: 8,
    date: '2024-03-15',
    tag: 'ndt',
    featured: true,
    metaLabel: '[ART: NDT_PAUT_001]',
    specs: [
      { label: { sl: 'Metoda', en: 'Method' }, value: 'PAUT (Phased Array Ultrasonic Testing)' },
      { label: { sl: 'Primarni standard', en: 'Primary Standard' }, value: 'EN ISO 13588 / ASME Sec. V Art. 4' },
      { label: { sl: 'Uporaba', en: 'Application' }, value: 'Tlačne posode, kritični zvarni spoji, cevovodi' },
      { label: { sl: 'Omejitev zaznave', en: 'Detection Limit' }, value: 'Minimalna velikost napak ~ 0.5 mm' }
    ],
    content: {
      sl: `### Uvod v PAUT tehnologijo

Fazno zaredno ultrazvočno testiranje (PAUT - **Phased Array Ultrasonic Testing**) predstavlja enega najpomembnejših tehnoloških preskokov na področju neporušnih preiskav (NDT) v zadnjih desetletjih. Medtem ko tradicionalna ultrazvočna defektoskopija uporablja en sam piezoelektrični kristal, ki oddaja zvočni snop pod fiksnim kotom, PAUT uporablja napredne sonde z večkratnimi drobnimi elementi (običajno od 16 do 128 elementov), ki jih je mogoče elektronsko krmiliti neodvisno drug od drugega.

Z ustreznim zamikom proženja posameznih elementov (t.i. *focal laws*) lahko krmilimo kot zvočnega snopa, njegovo gorišče in globino fokusiranja, ne da bi fizično premikali sondo. To omogoča izvajanje sektorskega skeniranja (S-scan) in ustvarjanje natančne vizualne slike prečnega prereza materiala v realnem času.

---

### Kako deluje elektronsko krmiljenje snopa?

Pri klasičnem UT pregledu mora inšpektor ročno menjati sonde z različnimi koti (npr. 45°, 60°, 70°), da bi zanesljivo zaznal napake različnih orientacij v zvaru. PAUT ta proces popolnoma avtomatizira in nadgradi:

1. **Sektorsko skeniranje (S-Scan)**: Snop zvoka elektronsko potuje skozi celoten razpon kotov (npr. od 40° do 75°) v delčku sekunde. To omogoča popolno pokritost zvara iz ene same fiksne pozicije sonde.
2. **Linearno skeniranje (E-Scan)**: Snop potuje linearno vzdolž sonde brez spreminjanja kota, kar je izjemno uporabno za merjenje debelin ali odkrivanje korozijskih poškodb.
3. **Dinamično fokusiranje (DF)**: Energijo zvoka lahko fokusiramo na specifične globine, kar bistveno izboljša razmerje med signalom in šumom ter omogoča zaznavo izjemno drobnih napak (npr. mikroskopskih razpok ob korenini zvara).

---

### Prednosti pred klasičnim ultrazvokom (UT) in radiografijo (RT)

V industriji kritične infrastrukture (npr. nuklearne elektrarne, plinovodi, rafinerije) PAUT hitro nadomešča starejše metode:

* **Hitrost in pokritost**: Namesto mukotrpnega premikanja sonde naprej in nazaj, PAUT sonda z enkratnim prehodom vzdolž zvara pokrije celoten volumen.
* **Trajni digitalni zapis (A-scan, B-scan, C-scan, S-scan)**: Vsi rezultati so shranjeni v digitalni obliki. To omogoča naknadne analize s strani Level III strokovnjakov, revizije s strani naročnika in dolgoročno primerjavo stanja skozi leta (analiza rasti razpok).
* **Varnostni vidik**: Za razliko od radiografskega testiranja (RT), ki uporablja vire ionizirajočega sevanja (rentgenske cevi ali izotope), PAUT ne predstavlja nobene nevarnosti za zdravje osebja. Med preiskavo lahko ostala montažna dela na objektu potekajo nemoteno, kar drastično zmanjša izpade proizvodnje.

---

### Zaključek

Uporaba PAUT tehnologije je danes postala zlati standard pri prevzemu novih varjenih struktur in periodičnih pregledih kritične opreme pod tlakom. Natančnost, hitrost ter možnost popolne sledljivosti meritev zagotavljajo, da so kritične napake zaznane pravočasno – preden pride do katastrofalne odpovedi materiala. V podjetju MEGAMA izvajamo PAUT preiskave z vrhunsko kalibrirano opremo in inšpektorji z najvišjimi EN ISO 9712 certifikati.`,
      en: `### Introduction to PAUT Technology

Phased Array Ultrasonic Testing (**PAUT**) represents one of the most significant technological leaps in the field of Non-Destructive Testing (NDT) in recent decades. While traditional ultrasonic flaw detection utilizes a single piezoelectric crystal emitting a sound beam at a fixed angle, PAUT utilizes advanced probes containing multiple small elements (typically 16 to 128 elements) that can be electronically pulsed and steered independently.

By applying precise time delays to individual elements (known as *focal laws*), the sound beam\'s angle, focal distance, and depth can be dynamically manipulated without physically moving the probe. This enables sectorial scanning (S-scan) and the generation of highly accurate real-time visual cross-sections of the examined component.

---

### How Electronic Beam Steering Works

In conventional UT inspections, technicians must manually switch between different wedge angles (e.g., 45°, 60°, 70°) to reliably detect defects with varying orientations. PAUT completely automates and refines this methodology:

1. **Sectorial Scanning (S-Scan)**: The acoustic beam electronically sweeps through a user-defined angular range (typically 40° to 75°) within milliseconds. This guarantees complete weld coverage from a single probe position.
2. **Linear Scanning (E-Scan)**: The beam moves linearly along the length of the probe array at a constant angle, which is highly effective for composite mapping or corrosion profiling.
3. **Dynamic Depth Focusing (DDF)**: Sound energy is concentrated at specific depths, drastically enhancing the signal-to-noise ratio and enabling the detection of minute defects (e.g., micro-cracks at the weld root).

---

### Advantages Over Conventional UT and Radiography (RT)

In critical infrastructure industries (e.g., nuclear power plants, pipelines, refineries), PAUT is rapidly replacing legacy methods:

* **Speed and Volumetric Coverage**: Rather than painstakingly scanning back and forth, a single linear sweep of a PAUT probe along the weld path captures the entire weld volume.
* **Permanent Digital Records (A, B, C, and S-scans)**: Raw inspection data is stored digitally. This enables post-test analysis by Level III specialists, independent client audits, and long-term crack propagation monitoring over the facility\'s lifespan.
* **Operational Safety**: Unlike radiographic testing (RT), which relies on hazardous ionizing radiation (X-ray tubes or isotopes), PAUT is entirely safe. Surrounding assembly works can proceed uninterrupted, eliminating costly plant shutdowns.

---

### Conclusion

PAUT has officially become the gold standard for weld inspection and periodic pressure equipment evaluation worldwide. Its precision, velocity, and comprehensive traceability ensure critical defects are pinpointed early — preventing catastrophic structural failures. At MEGAMA, we deliver top-tier PAUT inspections using state-of-the-art equipment managed by EN ISO 9712 Level II and III certified professionals.`
    }
  },
  {
    id: 'iso-9712-nivoji',
    title: {
      sl: 'EN ISO 9712: Kaj pomenijo Nivo I, II in III v NDT certifikaciji',
      en: 'EN ISO 9712: What Do Levels I, II, and III Mean in NDT Certification'
    },
    excerpt: {
      sl: 'Razlika med NDT tehniki ni zgolj v izkušnjah — je v formalnih, preverljivih certifikatih. Razlagamo hierarhijo nivojev po standardu EN ISO 9712 in zakaj je certifikacija naročniku bistvena.',
      en: 'The difference between NDT technicians isn\'t just experience — it\'s in formal, verifiable certifications. We explain the level hierarchy under EN ISO 9712 and why certification is critical to clients.'
    },
    readTime: 6,
    date: '2024-02-01',
    tag: 'standards',
    metaLabel: '[ART: STD_9712_002]',
    specs: [
      { label: { sl: 'Standard', en: 'Standard' }, value: 'EN ISO 9712 / ISO 9712' },
      { label: { sl: 'Področje', en: 'Domain' }, value: 'Kvalifikacija in certifikacija NDT osebja' },
      { label: { sl: 'Nivoji', en: 'Levels' }, value: 'Nivo I, Nivo II, Nivo III (Level 1, 2, 3)' },
      { label: { sl: 'Veljavnost', en: 'Validity' }, value: '5 let do recertifikacije' }
    ],
    content: {
      sl: `### Pomembnost formalne certifikacije v NDT

Neporušno porušne preiskave (NDT) so visoko specializirano področje, kjer so napake v zvarih ali materialih pogosto očem popolnoma nevidne. Zato so varnost, kakovost in zanesljivost objektov neposredno odvisne od usposobljenosti in poštenosti osebja, ki te preiskave izvaja.

V Evropi in večjem delu sveta je temeljni standard za to področje **EN ISO 9712**. Ta standard natančno določa pogoje za usposabljanje, industrijske izkušnje, zdravstveno sposobnost (predvsem bližnji vid in razlikovanje barv) ter opravljanje strogih izpitov. Standard definira tri stopnje kompetenc: Nivo I, II in III.

---

### Hierarhija kompetenc po EN ISO 9712

#### 1. Nivo I (Level I) — Operater
Oseba, certificirana za Nivo I, ima dovoljenje za izvajanje NDT preiskav izključno v skladu s pisnimi navodili in pod nadzorom osebja Nivoja II ali III.
* **Kaj lahko dela**: Nastavi opremo, izvede preiskavo, zabeleži odčitke in pripravi osnovno poročilo o meritvah.
* **Česa NE sme delati**: Ne sme samostojno izbirati testne metode ali opreme ter ne sme ocenjevati in interpretirati rezultatov (ne sme odločati o skladnosti ali neskladnosti zvara).

#### 2. Nivo II (Level II) — Tehnik inšpektor
To je najbolj razširjen nivo usposobljenosti na terenu. Inšpektor Nivoja II ima tehnično in praktično znanje za samostojno izvedbo celotnega cikla preiskave.
* **Kaj lahko dela**: Izbira ustrezne tehnike znotraj izbrane NDT metode, določa omejitve testiranja, nastavlja in kalibrira opremo, interpretira in ocenjuje rezultate v skladu z veljavnimi standardi ali kodeksi ter podpisuje uradna poročila o preiskavah.
* **Dodatne naloge**: Lahko vodi in usmerja osebje Nivoja I ter pripravlja pisna navodila za delo.

#### 3. Nivo III (Level III) — Strokovnjak vodja
To je najvišja stopnja kvalifikacije v NDT. Zahteva obsežno teoretično in praktično znanje, ki presega zgolj posamezne metode.
* **Kaj lahko dela**: Prevzema popolno odgovornost za NDT laboratorij in procese, odobrava in piše uradne NDT postopke (procedures), interpretira zapletene standarde, usklajuje zahteve z naročniki in regulatorji ter usmerja preiskave ob kompleksnih napakah.
* **Vloga pri izobraževanju**: Lahko deluje kot izpitni ocenjevalec in mentor za nižje nivoje.

---

### Zakaj je to pomembno za naročnika?

Ko industrijsko podjetje naroči NDT preiskavo (npr. preiskavo cevovodov v toplarni ali zvarov na nosilni jekleni konstrukciji), so izdana poročila pravno-formalni dokumenti. 
Če preiskavo izvede in podpiše oseba brez ustreznega certifikata Nivoja II ali III po EN ISO 9712:
1. **Poročilo je neveljavno**: Nadzorni inšpektorji ali zavarovalnice bodo poročilo zavrnili.
2. **Varnostno tveganje**: Obstaja velika verjetnost, da so kritične napake ostale spregledane zaradi pomanjkanja tehničnega znanja operaterja.

V podjetju **MEGAMA** so vsi terenski inšpektorji certificirani minimalno na stopnji **Nivo II**, celoten sistem pa je podprt in nadzorovan s strani naših lastnih inženirjev z najvišjo certifikacijo **Nivo III (Level III)**, kar zagotavlja absolutno tehnično verodostojnost naših poročil.`,
      en: `### The Importance of Formal Certification in NDT

Non-Destructive Testing (NDT) is a highly specialized engineering field where material defects are frequently invisible to the naked eye. Consequently, the safety, quality, and structural integrity of assets depend completely on the technical competence and ethical integrity of the personnel conducting the inspections.

In Europe and globally, the foundational framework governing this field is the **EN ISO 9712** standard. It establishes rigorous requirements for vocational training, industrial experience, physical health (specifically near-vision acuity and color differentiation), and strict examination protocols. The standard defines three distinct tier levels: Level I, II, and III.

---

### Hierarchy of Competencies Under EN ISO 9712

#### 1. Level I (Level 1) — Operator
A Level I certified individual is authorized to perform NDT operations solely according to written work instructions and under the direct supervision of Level II or Level III personnel.
* **Authorized Duties**: Set up inspection equipment, perform the physical test, record the raw instrument readings, and compile basic measurement reports.
* **Limitations**: They CANNOT independently select the testing methodology or equipment, and are not authorized to evaluate, interpret, or accept/reject test results.

#### 2. Level II (Level 2) — Technical Inspector
This is the most common operational tier in the industrial sector. A Level II inspector possesses the technical knowledge and practical capability to manage the entire testing sequence independently.
* **Authorized Duties**: Select the precise testing techniques within their certified NDT method, define the scope and limits of the test, calibrate and configure equipment, interpret and evaluate indications against codes or standards, and sign formal inspection reports.
* **Additional Roles**: Supervise and mentor Level I operators, and draft written NDT work instructions (instructions).

#### 3. Level III (Level 3) — Expert Consultant
This is the highest level of certification achievable in NDT. It demands comprehensive theoretical and practical knowledge that spans multiple methods and materials.
* **Authorized Duties**: Take full responsibility for NDT facilities and procedures, draft and approve official NDT procedures, interpret complex international codes, liaise with regulatory bodies, and troubleshoot complex defect situations.
* **Educational Role**: Serve as examiners, training coordinators, and mentors for lower-tier personnel.

---

### Why It Matters to the Client

When an industrial client commissions an NDT inspection (e.g., pipelines in a power plant or structural steel welds), the resulting reports are legally binding verification documents.
If an inspection is performed and signed by an uncertified individual or someone holding only a Level I status:
1. **Invalid Documentation**: Insurance underwriters and regulatory safety inspectors will immediately reject the reports.
2. **Catastrophic Risk**: There is a high probability that severe material defects went undetected due to the inspector\'s lack of formal qualifications.

At **MEGAMA**, all field inspections are executed by technicians certified to at least **Level II**, under the direct supervision of our in-house engineers holding the elite **Level III** credentials, ensuring impeccable technical validity and peace of mind for every project.`
    }
  },
  {
    id: 'vizualni-pregled',
    title: {
      sl: 'Vizualno testiranje (VT): Zakaj je najpomembnejša NDT metoda, ki jo industrija premalo ceni',
      en: 'Visual Testing (VT): Why It\'s the Most Important NDT Method Industry Underestimates'
    },
    excerpt: {
      sl: 'VT je prva in najpogostejša NDT metoda. Kljub temu ga mnogi naročniki zanemarjajo ali zaupajo nekvalificiranim delavcem. Razlagamo, kaj kompetentni VT inšpektor dejansko vidi.',
      en: 'VT is the first and most frequent NDT method. Yet many clients neglect it or assign it to unqualified workers. We explain what a competent VT inspector actually sees.'
    },
    readTime: 5,
    date: '2024-01-10',
    tag: 'ndt',
    metaLabel: '[ART: NDT_VT_003]',
    specs: [
      { label: { sl: 'Metoda', en: 'Method' }, value: 'VT (Visual Testing / Vizualni pregled)' },
      { label: { sl: 'Standard', en: 'Standard' }, value: 'EN ISO 17637 / ASME Sec. V Art. 9' },
      { label: { sl: 'Orodja', en: 'Tools' }, value: 'Kalibri za zvare, boroskopi, lupe, luksometri' },
      { label: { sl: 'Zahteva za svetlobo', en: 'Lighting Req.' }, value: 'Minimum 500 lux (priporočeno 1000 lux)' }
    ],
    content: {
      sl: `### Temelj vsake NDT kontrole

Vizualno testiranje (VT - **Visual Testing**) je najstarejša, najbolj neposredna in stroškovno najbolj učinkovita metoda neporušnih preiskav. Kljub temu jo industrija prepogosto zanemarja. Mnogi zmotno verjamejo, da "lahko vsak, ki ima oči, opravi vizualni pregled zvara." 

To je nevarna zmota. VT ni le "gledanje" zvara – je visoko sistematičen postopek, ki zahteva globoko poznavanje metalurgije, varilnih napak, geometrije spojev in merilnih instrumentov. Pravilen vizualni pregled, izveden pred, med in po varjenju, lahko prepreči do 80 % vseh napak, ki bi jih kasneje drago odkrivali z naprednejšimi metodami (npr. z ultrazvokom ali radiografijo).

---

### Faze strokovnega VT pregleda

Strokoven inšpektor vizualnega pregleda ne izvaja šele takrat, ko je izdelek končan. Njegovo delo je razdeljeno na tri kritične faze:

1. **Pred varjenjem**:
   - Preverjanje geometrije priprave robov (kot poševitve, korenina zvara).
   - Kontrola čistosti spoja (odsotnost rje, vlage, maščob).
   - Preverjanje sestave in spenjanja elementov.
2. **Med varjenjem**:
   - Nadzor čistosti med prehodi (odstranjevanje žlindre).
   - Kontrola temperature med prehodi (interpass temperature).
   - Zaznava vidnih razpok ali zajed pred naslednjim prehodom.
3. **Po varjenju**:
   - Preverjanje celotnega profila zvara (prekomerna ojačitev, premalo izpolnjen zvar).
   - Meritve velikosti zvara z namenskimi varilskimi kalibri.
   - Zaznavanje površinskih napak: zajede (undercuts), pore, površinske razpoke, brizgi.

---

### Tehnični pogoji za VT pregled

Standard **EN ISO 17637** natančno predpisuje fizikalne pogoje, ki morajo biti izpolnjeni za veljaven pregled:
* **Osvetljenost**: Površina mora biti osvetljena z najmanj 500 luksi (lux), pri čemer se priporoča 1000 luksov za natančno delo. Inšpektorji MEGAMA uporabljajo umerjene luksometre za potrditev teh pogojev.
* **Vidni kot in razdalja**: Oko inšpektorja mora biti od preiskovane površine oddaljeno največ 600 mm, vidni kot pa ne sme biti manjši od 30° glede na površino.
* **Pripomočki**: Kjer neposredno gledanje ni mogoče (npr. notranjost cevi), uporabljamo napredne industrijske boroskope in endoskope z vgrajeno LED osvetlitvijo in HD kamerami.

---

### Zaključek

Brez trdne osnove v kakovostnem vizualnem pregledu so vse nadaljnje preiskave manj učinkovite. Če VT inšpektor spregleda globoko površinsko zajedeno, se lahko ta pod vplivom dinamičnih obremenitev razvije v kritično utrujenostno razpoko. Zaupajte vizualni nadzor vaših projektov certificiranemu osebju MEGAMA, ki vsak spoj oceni z inženirsko natančnostjo in umerjenimi merili.`,
      en: `### The Foundation of Every NDT Program

Visual Testing (**VT**) is the oldest, most direct, and most cost-effective method in the Non-Destructive Testing arsenal. Yet, it is also the most frequently underestimated. Many project managers mistakenly assume that "anyone with a pair of working eyes can perform a visual weld inspection."

This is a dangerous misconception. Professional VT is not mere looking — it is a highly systematic engineering discipline requiring deep knowledge of metallurgy, welding metallurgy, joint geometry, and calibrated measurement instruments. When executed correctly before, during, and after welding operations, VT can eliminate up to 80% of all defects before they are sealed in and become expensive to detect via radiography or ultrasonic methods.

---

### Phases of a Professional VT Inspection

A certified visual inspector does not wait for a component to be completed. Their operational workflow is divided into three critical phases:

1. **Before Welding**:
   - Inspecting the joint preparation geometry (bevel angles, root face, root gap).
   - Verifying joint cleanliness (absence of rust, moisture, oil, or mill scale).
   - Checking alignment, fit-up, and tack-weld quality.
2. **During Welding**:
   - Monitoring interpass cleanliness (adequate slag removal).
   - Verifying interpass temperatures.
   - Detecting visible cracks or undercuts before subsequent weld passes are deposited.
3. **After Welding**:
   - Assessing the completed weld profile (excess reinforcement, underfill).
   - Taking exact dimensional measurements using specialized weld gauges.
   - Checking for surface discontinuities: undercuts, surface porosity, surface cracks, arc strikes, and weld spatter.

---

### Technical Conditions Required for Valid VT

The **EN ISO 17637** standard defines strict physical parameters that must be met to ensure a valid visual inspection:
* **Illumination**: The surface must be illuminated to a minimum of 500 lux, with 1000 lux highly recommended for fine detail verification. MEGAMA inspectors utilize calibrated digital light meters (luxmeters) to verify compliance on-site.
* **Access Angle and Distance**: The inspector\'s eyes must be within 600 mm of the test surface, at an angle of no less than 30° relative to the surface plane.
* **Optical Aids**: Where direct line-of-sight is obstructed (e.g., inside narrow pipelines), we utilize high-definition industrial videoscopes and boroscopes equipped with adjustable LED rings and motorized articulating tips.

---

### Conclusion

Without a robust visual testing foundation, sophisticated volumetric inspections lose their effectiveness. If a VT inspector overlooks a sharp surface undercut, that discontinuity can quickly develop into a fatigue crack under dynamic operating loads. Entrust your visual inspections to MEGAMA\'s certified technicians, who evaluate every weld with engineering precision and calibrated instrumentation.`
    }
  },
  {
    id: 'wpqr-wps',
    title: {
      sl: 'WPS, PQR, WPQR: Kaj so varilni postopki in zakaj brez njih ne smeš variti',
      en: 'WPS, PQR, WPQR: What Are Welding Procedures and Why You Cannot Weld Without Them'
    },
    excerpt: {
      sl: 'Preden varilec dotakne elektrode jeklene konstrukcije, mora obstajati WPS. Razlagamo celoten dokumentacijski cikel — od preskusnega zvara do atestiranega potrdila — in zakaj so te dokumente zahtevane po zakonu.',
      en: 'Before a welder touches an arc to structural steel, a WPS must exist. We explain the full documentation cycle — from the test weld to the certified certificate — and why these documents are legally required.'
    },
    readTime: 7,
    date: '2023-12-05',
    tag: 'welding',
    metaLabel: '[ART: WELD_WPS_004]',
    specs: [
      { label: { sl: 'Standardi', en: 'Standards' }, value: 'EN ISO 15614 / ASME Sec. IX / EN 1090' },
      { label: { sl: 'Ključni dokumenti', en: 'Key Documents' }, value: 'WPS, PQR / WPQR (atest varilnega postopka)' },
      { label: { sl: 'Varilec atest', en: 'Welder Cert.' }, value: 'EN ISO 9606-1 / ASME Sec. IX' },
      { label: { sl: 'Namen', en: 'Objective' }, value: 'Zagotovitev mehanskih lastnosti zvara' }
    ],
    content: {
      sl: `### Zakonsko ozadje varilske dokumentacije

V sodobni gradbeni in tlačni tehnologiji (npr. jeklene konstrukcije po **EN 1090**, tlačne posode po **EN 13445**) varjenje velja za t.i. *poseben proces*. To pomeni, da kakovosti končnega zvara ni mogoče v celoti preveriti zgolj z naknadnim NDT preizkušanjem. Zato je treba celoten proces varjenja načrtovati, nadzorovati in dokumentirati že pred začetkom del.

To dosegamo s preverjenim varilskim dokumentacijskim ciklom, ki ga sestavljajo trije akronimi: **WPS**, **PQR** (ali WPQR po EN standardih) in **WPQR/WQT** (atest varilca). Brez teh dokumentov je varjenje na kakršnem koli resnem industrijskem objektu zakonsko prepovedano.

---

### Razumevanje dokumentacijske hierarhije

#### 1. PQR (Procedure Qualification Record) — Zgodovina in laboratorijski testi
PQR je rojstni list varilnega postopka. Je zapis o tem, kako je bil izveden preskusni zvar in kakšni so bili rezultati njegovih laboratorijskih testov.
* **Kako nastane**: Pod nadzorom neodvisnega priglašenega organa (npr. TÜV, Bureau Veritas ali pooblaščeni varilni inženir IWE/EWE) se izvede preskusni zvar pod specifičnimi parametri (tok, napetost, hitrost, materiali, dodajni material).
* **Destruktivni testi**: Ta zvar se nato razreže in pošlje v akreditiran laboratorij na uničujoče preiskave: natezni preizkus, upogibni preizkus, preizkus udarne žilavosti (Charpy) in makro/mikro analizo.
* **Rezultat**: Če zvar prenese vse teste in dokaže zahtevane mehanske lastnosti, se izda potrjen PQR dokument, ki velja trajno za točno določeno območje debelin in materialov.

#### 2. WPS (Welding Procedure Specification) — Recept za varilca
WPS je operativni dokument, ki ga varilni inženir pripravi na podlagi odobrenega PQR-a. To je dobesedno "recept za varilce" na delovnem mestu.
* **Vsebina**: WPS vsebuje natančna navodila: katero metodo uporabiti (npr. TIG, MIG/MAG, REO), kateri plin, kateri dodajni material, kakšen premer elektrode, natančen razpon tokov in napetosti ter vrstni red varjenja posameznih prehodov.
* **Namen**: Zagotoviti, da bo varilec na terenu ponovil natanko tiste pogoje, ki so bili dokazani in stestirani z laboratorijskim PQR-om.

#### 3. WPQR / WQT (Welder Performance Qualification Record) — Atest varilca
Dokaz, da je določen varilec ročno sposoben izvesti zvar brez napak v skladu z določeno WPS.
* **Kako nastane**: Varilec pred inšpektorjem zavari preizkusno ploščo ali cev po določeni WPS. Ta zvar se nato pregleda z NDT metodami (VT, UT ali RT) in včasih z upogibnimi testi.
* **Veljavnost**: Atest se izdaja za določen čas (običajno 2 do 3 leta) in zahteva potrditev delovodje vsakih 6 mesecev, da varilec neprekinjeno opravlja tovrstno delo.

---

### Zakaj brez teh dokumentov ne smete variti?

Če na projektu nimate odobrenih varilnih postopkov (WPS/PQR) in certificiranih varilcev:
1. **Pravna odgovornost**: V primeru zrušitve konstrukcije ali eksplozije tlačne posode je odgovornost izvajalca kazenska, zavarovalnica pa ne bo krila škode.
2. **Nepoznane mehanske lastnosti**: Brez uničujočih testov PQR ne morete vedeti, ali ima zvar zadostno žilavost pri nizkih temperaturah ali pa bo prišlo do krhkega loma.

V podjetju **MEGAMA** nudimo celovito pripravo in vodenje varilskih postopkov. Naši varilni inženirji (IWE) vam pomagajo od načrtovanja preskusnih zvarov, koordinacije z laboratoriji in priglašenimi organi do končne izdelave tehničnih WPS dokumentov.`,
      en: `### The Legal Framework of Weld Quality Assurance

In modern structural engineering and pressure equipment manufacturing (such as structural steel per **EN 1090** or pressure vessels per **EN 13445**), welding is classified as a *special process*. This means that the ultimate quality of the completed weld cannot be fully validated through post-weld NDT alone. Therefore, the entire welding operation must be calculated, standardized, and documented before any production arc is struck.

This is managed through a rigorous quality assurance cycle made up of three standard documents: **WPS**, **PQR** (or WPQR in European standards), and **WPQR / WQT** (Welder Atestation). Operating without these active documents on any regulated industrial site is a severe violation of safety laws.

---

### Deciphering the Documentation Hierarchy

#### 1. PQR (Procedure Qualification Record) — The Scientific Foundation
The PQR is the birth certificate of a welding process. It represents the historical record of a physical test weld and the subsequent laboratory mechanical test results.
* **How It Is Established**: Under the supervision of an independent Notified Body (e.g., TÜV, Bureau Veritas, or a designated European Welding Inspector), a test coupon is welded using highly specific parameters (amperage, voltage, travel speed, base materials, filler metals).
* **Destructive Testing**: This physical weld is sliced into test specimens and sent to an accredited materials laboratory for destructive analysis: transverse tensile tests, bend tests, Charpy V-notch impact testing (to assess low-temperature toughness), and macro-etch examinations.
* **Outcome**: If the specimen passes all code criteria, a permanent PQR is certified, validating a specific qualified range of material thickness and steel grades.

#### 2. WPS (Welding Procedure Specification) — The Welder\'s Recipe
The WPS is an operational instruction sheet drafted by a Welding Engineer (IWE) using the qualified data from a certified PQR. It is literally the "recipe book" for welders on the shop floor.
* **Contents**: The WPS details critical parameters: welding process (e.g., GTAW/TIG, GMAW/MIG, SMAW/Stick), shielding gas composition, filler metal classification, preheat requirements, specific electrical parameters (amps/volts ranges), and weld pass sequence.
* **Objective**: To ensure that the field welder replicates exactly the identical thermodynamic and chemical conditions that were verified in the laboratory under the PQR.

#### 3. WPQR / WQT (Welder Performance Qualification Record) — Welder Certification
The legal proof that a specific individual possesses the manual skill to deposit a defect-free weld following a qualified WPS.
* **How It Is Established**: The welder executes a test plate or pipe coupon under the direct supervision of an inspector. The weld is evaluated via volumetric NDT (radiography or ultrasound) and/or physical bend tests.
* **Validity**: Standard welder certifications are valid for 2 to 3 years, provided their employer confirms every 6 months that the welder has been continuously active in that specific welding process.

---

### Why Welding Without Procedures is Unacceptable

Executing structural or pressure welding without approved WPS/PQR documents leads to:
1. **Severe Liability**: In the event of a structural collapse or high-pressure rupture, the welding contractor faces severe criminal prosecution, and insurance coverages are rendered null and void.
2. **Unverified Mechanical Properties**: Without PQR impact and tensile testing, there is zero guarantee that the weld joint will not fail due to low-temperature brittle fracture or inadequate yield strength.

At **MEGAMA**, we provide turnkey welding engineering services. Our International Welding Engineers (IWE) manage your entire procedure qualification campaign: from test coupon design and laboratory coordination to drafting legally compliant WPS sheets.`
    }
  },
  {
    id: 'korozija-rezervoarji',
    title: {
      sl: 'Merjenje debelin in korozijska analiza: Koliko sten je ostalo v vašem rezervoarju?',
      en: 'Wall Thickness Measurement and Corrosion Analysis: How Much Wall Is Left in Your Tank?'
    },
    excerpt: {
      sl: 'Jekleni rezervoarji in cevovodi z leti tanjšajo. Ultrazvočno merjenje debelin (UTT) je neinvaziven način, da ugotovite stanje brez zaustavitve celotnega sistema.',
      en: 'Steel tanks and pipelines thin over time. Ultrasonic thickness measurement (UTT) is a non-invasive way to assess condition without shutting down your entire system.'
    },
    readTime: 5,
    date: '2023-11-18',
    tag: 'safety',
    metaLabel: '[ART: SAF_UTT_005]',
    specs: [
      { label: { sl: 'Metoda', en: 'Method' }, value: 'UTT (Ultrasonic Thickness Testing)' },
      { label: { sl: 'Standard', en: 'Standard' }, value: 'EN ISO 16809 / API 570 / API 653' },
      { label: { sl: 'Natančnost', en: 'Accuracy' }, value: '±0.01 mm' },
      { label: { sl: 'Merilno območje', en: 'Measuring Range' }, value: '0.5 mm – 500 mm (v jeklu)' }
    ],
    content: {
      sl: `### Tiha grožnja industrijske korozije

Korozija je naravni sovražnik vsake jeklene infrastrukture. Industrijski rezervoarji za goriva, tlačni cevovodi, uparjalniki in silosi so neprestano izpostavljeni kemičnim vplivom medijev ter zunanjim atmosferskim vplivom. Ker se korozija pogosto pojavi na notranji strani sten ali pod plastmi toplotne izolacije, lahko poteka popolnoma neopaženo – vse do trenutka, ko pride do preboja stene, izlitja nevarnih snovi ali katastrofalne eksplozije.

Da bi preprečili takšne scenarije in ocenili življenjsko dobo opreme, se uporablja neporušna metoda **ultrazvočnega merjenja debeline stene (UTT - Ultrasonic Thickness Testing)**.

---

### Princip delovanja UTT preiskave

Merjenje debeline stene z ultrazvokom temelji na natančnem merjenju časa potovanja zvočnega vala skozi material:

1. **Oddajanje**: UTT sonda (običajno z dvojnim piezoelektričnim elementom - *dual element*) odda visokofrekvenčni zvočni impulz v jekleno steno.
2. **Potovanje zvoka**: Zvočni val potuje skozi debelino jekla do nasprotne (notranje) stene, kjer se odbije nazaj kot odmev (echo).
3. **Zaznava**: Sonda zazna odmev, merilna naprava pa izmeri čas potovanja z ločljivostjo v nanosekundah.
4. **Izračun**: Na podlagi znane hitrosti zvoka v jeklu (približno 5920 m/s) naprava izračuna natančno debelino stene:
   
   $$\\text{Debelina } (d) = \\frac{\\text{hitrost zvoka } (v) \\times \\text{čas potovanja } (t)}{2}$$

---

### Napredni A-scan in B-scan načini

Sodobne naprave, ki jih uporabljamo v podjetju MEGAMA, ne prikazujejo zgolj suhe digitalne številke na zaslonu (kar lahko vodi do napačnih meritev ob notranjih vključkih), temveč omogočajo napredne vizualizacije:

* **A-Scan prikaz**: Prikazuje dejanski RF signal zvočnega vala. Inšpektor lahko takoj prepozna, ali je odmev prišel od dejanske zadnje stene ali pa gre za motnjo zaradi plasti rje ali luščenja.
* **B-Scan prikaz**: Ustvari prečni prerez profila stene med vlečenjem sonde vzdolž rezervoarja. To omogoča neposreden vizualni prikaz korozijskega profiliranja in odkrivanje točkaste korozije (pitting).

---

### Zaključek

Periodično merjenje debelin je zakonska in varnostna dolžnost vsakega upravljavca rezervoarjev in tlačnih sistemov. Na podlagi naših umerjenih meritev lahko inženirji izračunajo preostalo trdnost stene ter določijo naslednji varni termin pregleda ali predlagajo sanacijo. Zanesite se na izkušeno ekipo MEGAMA, ki bo z uporabo napredne UTT opreme natančno izmerila stanje vaše opreme – hitro, neinvazivno in brez motenj v proizvodnem procesu.`,
      en: `### The Silent Threat of Industrial Corrosion

Corrosion is the relentless thermodynamic enemy of steel infrastructure. Heavy industrial fuel tanks, process pipelines, heat exchangers, and storage silos are continuously subjected to internal chemical degradation and external atmospheric factors. Because corrosion frequently propagates on the wet internal side of tank walls or beneath dense thermal insulation (CUI - Corrosion Under Insulation), it can progress completely undetected — until a sudden catastrophic wall breach, toxic spill, or explosive failure occurs.

To identify these failure modes and calculate the safe remaining lifespan of industrial equipment, engineers rely on the non-destructive method of **Ultrasonic Thickness Testing (UTT)**.

---

### Physical Operating Principle of UTT

Ultrasonic thickness testing operates by measuring the precise flight time of a high-frequency acoustic wave propagating through a solid medium:

1. **Pulse Initiation**: A specialized UTT transducer (typically a dual-element probe designed for corroded surfaces) transmits a high-frequency longitudinal acoustic pulse into the steel.
2. **Wave Propagation**: The acoustic energy travels through the steel thickness to the back-wall boundary (internal surface), where the acoustic impedance mismatch causes it to reflect back as an echo.
3. **Echo Capture**: The transducer captures the returning echo, and the digital instrument calculates the elapsed time-of-flight with nanosecond resolution.
4. **Thickness Calculation**: Utilizing the known velocity of sound in carbon steel (typically 5,920 meters per second), the instrument computes the exact wall thickness using the physical formula:
   
   $$\\text{Thickness } (d) = \\frac{\\text{Sound Velocity } (v) \\times \\text{Time of Flight } (t)}{2}$$

---

### Advanced A-scan and B-scan Data Formats

The highly calibrated instruments utilized by MEGAMA do not merely present static digital numbers on a screen (which can easily lead to catastrophic false readings on mid-wall laminations). Instead, they output rich data visualizations:

* **Live A-Scan Verification**: Displays the actual radio-frequency (RF) wave waveform. A certified inspector evaluates the signal envelope immediately to determine if the echo returned from the true back-wall, or if it represents signal scattering from heavy scale or pitting.
* **B-Scan Cross-Sectioning**: Generates a continuous graphical profile of the wall while sweeping the transducer across the surface. This allows real-time visual representation of wall thinning and localized corrosion pockets.

---

### Conclusion

Periodic wall thickness evaluation is a legal and operational mandate for plant managers of pressure vessels and bulk storage facilities. Based on our highly precise thickness profiles, structural engineers can calculate the remaining wall thickness limits (per API 653 or API 570) to schedule maintenance or repairs. Trust MEGAMA\'s qualified NDT technicians to deliver precise UTT corrosion mapping – executed quickly, non-destructively, and without disrupting your plant operations.`
    }
  },
  {
    id: 'asme-asnt',
    title: {
      sl: 'ASME vs. EN standardi: Kateri velja za vaš projekt?',
      en: 'ASME vs. EN Standards: Which One Applies to Your Project?'
    },
    excerpt: {
      sl: 'Projekti za americke naročnike zahtevajo ASME, evropski projekti EN. A kaj ko so naročniki mešani? Razlagamo ključne razlike med standardnima sistemoma in kako jih uskladiti.',
      en: 'US clients require ASME; European projects require EN. But what when clients are mixed? We explain the key differences between the two standard systems and how to reconcile them.'
    },
    readTime: 9,
    date: '2023-10-22',
    tag: 'standards',
    metaLabel: '[ART: STD_ASME_006]',
    specs: [
      { label: { sl: 'Standardi', en: 'Codes' }, value: 'ASME Sec. V, VIII, IX vs. EN 13445, EN 13480, ISO 15614' },
      { label: { sl: 'Področje', en: 'Scope' }, value: 'Tlačna oprema, varjenje, NDT metodologije' },
      { label: { sl: 'NDT osebje', en: 'NDT Staff' }, value: 'ASNT SNT-TC-1A vs. EN ISO 9712' },
      { label: { sl: 'Pristop', en: 'Philosophy' }, value: 'Preskriptiven (ASME) vs. Ciljni / Harmoniziran (EN)' }
    ],
    content: {
      sl: `### Globalna dilema industrijskih standardov

Ko se inženirsko podjetje loti projektiranja ali izdelave tlačne opreme, se takoj sreča z odločitvijo: **kateri standardni sistem uporabiti?** 

Na svetovnem trgu prevladujeta dva velika standardna svetova:
1. **Ameriški sistem (ASME)**: Koda Ameriškega združenja strojnih inženirjev (American Society of Mechanical Engineers). Je preskriptiven in razširjen po vsem svetu, zlasti v naftni in plinski industriji ter energetiki.
2. **Evropski sistem (EN/ISO)**: Harmonizirani evropski standardi, tesno povezani z Evropsko direktivo o tlačni opremi (PED 2014/68/EU). Temelji na ciljnih varnostnih zahtevah in je obvezen za opremo na evropskem trgu.

Čeprav sta oba sistema namenjena zagotavljanju varnosti, se njuni pristopi k projektiranju, izbiri materialov, varjenju in NDT preiskavam bistveno razlikujejo.

---

### Ključne razlike med ASME in EN sistemoma

#### 1. Pristop k certifikaciji NDT osebja
* **ASME (ASNT SNT-TC-1A / ACCP)**: Ameriški sistem temelji na t.i. *employer-based* certifikaciji. Podjetje (delodajalec) samo izda pisno prakso (Written Practice) in certificira svoje zaposlene za NDT na podlagi priporočil ASNT. Level III strokovnjak podjetja ima ključno vlogo pri izpitih.
* **EN/ISO (EN ISO 9712)**: Evropski sistem zahteva strogo *neodvisno* certifikacijo s strani akreditiranih zunanjih certifikacijskih organov. Delodajalec ne more sam izdati certifikata; tehnik mora opraviti izpit pred neodvisno komisijo.

#### 2. Metodologija in kriteriji sprejemljivosti za NDT
* **ASME Sec. V & Sec. VIII**: NDT metode so podrobno predpisane. ASME npr. pri ultrazvočnih preiskavah še vedno pogosto zahteva uporabo DAC (Distance Amplitude Curve) krivulj, umerjenih na referenčne izvrtine.
* **EN ISO standardi (npr. EN ISO 17640 za UT)**: Evropski standardi dajejo večji poudarek sodobnim tehnikam in ponujajo več alternativnih metod umerjanja (npr. DGS/AVG metoda s ploščatimi dnovi lukenj). Kriteriji sprejemljivosti napak so določeni v ločenih standardih (npr. EN ISO 11666 za UT nivoje sprejemljivosti).

#### 3. Kvalifikacija varilnih postopkov
* **ASME Sec. IX**: Izjemno obsežen kodeks, ki natančno definira bistvene spremenljivke (Essential Variables). Če spremenite eno izmed njih, morate postopek kvalificirati znova.
* **EN ISO 15614-1**: Evropski standard za kvalifikacijo postopkov ima nekoliko drugačna območja veljavnosti debelin in materialov ter pogosto zahteva strožje preizkuse udarne žilavosti in trdote.

---

### Kako uskladiti oba sistema na istem projektu?

V praksi se pogosto zgodi, da evropsko podjetje izdeluje tlačno posodo za ameriškega naročnika, vendar mora hkrati zadostiti evropski zakonodaji (PED) za namestitev v Evropi. To zahteva t.i. **navzkrižno usklajevanje (reconciliation)**:
1. **Materiali**: Uporaba ASME materialov (npr. SA-516 Gr. 70) zahteva preverjanje skladnosti z bistvenimi varnostnimi zahtevami PED (običajno preko PMA - *Particular Material Appraisal*).
2. **NDT osebje**: Za evropske projekte po PED morajo biti NDT preiskovalci za trajne spoje potrjeni s strani priglašenega organa (Notified Body) po EN ISO 9712 – zgolj interna ASNT certifikacija delodajalca ne zadošča.

---

### Zaključek

Poznavanje razlik in prehodov med ASME in EN standardi je ključno za uspešno izvedbo mednarodnih inženirskih projektov. Napačna izbira standarda ali nepoznavanje zahtev osebja lahko vodi do zavrnitve celotne opreme med končnim prevzemom. V podjetju **MEGAMA** imamo bogate izkušnje z delom po obeh standardnih sistemih. Naša ekipa vključuje strokovnjake, certificirane tako po **EN ISO 9712** kot po **ASNT Level III**, kar nam omogoča nemoteno premostitev razlik in zagotavljanje popolne tehnične skladnosti vaših projektov.`,
      en: `### The Global Landscape of Engineering Codes

When an engineering manufacturer initiates the design, fabrication, or quality inspection of heavy industrial pressure equipment, they face a primary administrative hurdle: **which standard system takes precedence?**

The international industrial sector is dominated by two competing code systems:
1. **The American System (ASME)**: Developed by the American Society of Mechanical Engineers. It is a highly prescriptive code system used globally, particularly in the oil, gas, petrochemical, and power generation sectors.
2. **The European System (EN/ISO)**: Harmonized European standards linked explicitly to the European Pressure Equipment Directive (PED 2014/68/EU). It is safety-performance-oriented and legally mandatory for any pressure assets installed within the European Economic Area.

While both codes exist to guarantee structural safety, their underlying engineering philosophies, materials cataloging, welding qualifications, and NDT requirements differ significantly.

---

### Crucial Divergences Between ASME and EN Systems

#### 1. NDT Personnel Qualification Philosophies
* **ASME (ASNT SNT-TC-1A / ACCP)**: The US system utilizes an *employer-based* certification structure. The operating company drafts its own internal procedural document (Written Practice) and qualifies its own staff based on ASNT recommendations. The company\'s in-house Level III is the ultimate authority for exam scoring and certificate issuance.
* **EN/ISO (EN ISO 9712)**: The European system mandates a strict, *independent third-party* qualification. An employer cannot legally issue a certificate. The technician must undergo training at an accredited facility and pass an examination supervised by an independent central certification body.

#### 2. NDT Methodology and Defect Acceptance Criteria
* **ASME Section V & Section VIII**: These are highly prescriptive. For instance, in ultrasonic testing (UT), ASME historically favors calibration using physical side-drilled holes to construct a Distance Amplitude Curve (DAC).
* **EN ISO Standards (e.g., EN ISO 17640 for UT)**: The European standards place higher emphasis on modern techniques and support diverse calibration methodologies, such as the DGS/AVG flat-bottom hole mathematical modeling. Defect evaluation levels are separated into standalone standards (e.g., EN ISO 11666 for UT acceptance levels).

#### 3. Welding Procedure Qualifications
* **ASME Section IX**: A massive code defining precise boundary limits (Essential, Non-essential, and Supplementary Essential variables). Any shift outside these specified thresholds invalidates the WPS, requiring a new physical PQR test.
* **EN ISO 15614-1**: The European welding procedure standard features different thickness and steel group ranges, frequently demanding mandatory hardness surveys and Charpy impact testing even under circumstances where ASME Sec. IX would permit an exemption.

---

### Reconciling Both Systems on a Single Project

It is common for a European manufacturer to construct a pressure vessel destined for a US multinational, requiring compliance with the ASME Stamp while simultaneously satisfying the local European PED law for site installation. This requires a meticulous **Code Reconciliation Protocol**:
1. **Materials Alignment**: Utilizing ASME raw materials (e.g., SA-516 Gr. 70 plate) under the PED mandates a rigorous Particular Material Appraisal (PMA) to verify chemical and physical properties meet European safety margins.
2. **NDT Inspector Validation**: For European installations, the technicians performing NDT on permanent joints must be certified to EN ISO 9712 and approved by a recognized third-party organization (RTPO). A standard employer-based ASNT certification alone is legally insufficient.

---

### Conclusion

A deep, fluent understanding of the interface between ASME and EN codes is vital to prevent catastrophic contract rejections. A single misqualified welding procedure or unapproved NDT certificate can cause an inspector to halt a million-euro project. At **MEGAMA**, we operate natively in both standard systems. Our engineering staff includes professionals certified to both **EN ISO 9712** and **ASNT Level III**, enabling us to bridge code gaps seamlessly and guarantee your project\'s complete global compliance.`
    }
  }
];
