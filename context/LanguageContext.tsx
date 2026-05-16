import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sl' | 'en';

interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    certificates: string;
    industries: string;
    equipment: string;
    blog: string;
  };
  hero: {
    precision: string;
    safety: string;
    trust: string;
    desc: string;
    cta_services: string;
    cta_contact: string;
    weld_control: string;
    weld_desc: string;
    system_active: string;
  };
  stats: {
    years: string;
    projects: string;
    reliability: string;
  };
  services: {
    title: string;
    subtitle: string;
    cta_inquiry: string;
  };
  about: {
    title: string;
    precision_title: string;
    precision_desc: string;
    integrity_title: string;
    integrity_desc: string;
    excellence_title: string;
    excellence_desc: string;
    certs_badge: string;
    certs_title: string;
    certs_desc: string;
    cert_qms: string;
    cert_iqnet: string;
    cert_iqnet_desc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    response_time: string;
    step_services: string;
    step_project: string;
    step_contact: string;
    label_interest: string;
    label_describe: string;
    placeholder_describe: string;
    label_details: string;
    placeholder_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    btn_next: string;
    btn_back: string;
    btn_submit: string;
    success_title: string;
    success_desc: string;
    success_btn: string;
    form_ndt: string;
    form_supervision: string;
    form_consulting: string;
    form_other: string;
  };
  footer: {
    company_desc: string;
    sections_services: string;
    sections_company: string;
    sections_contact: string;
    payment_info: string;
    rights: string;
    designed: string;
    legal_reg: string;
    legal_vat: string;
  };
  personnel: {
    hero_title: string;
    hero_subtitle: string;
    narrative_title: string;
    narrative_text: string;
    matrix_title: string;
    matrix_col_standard: string;
    matrix_col_methods: string;
    matrix_col_specialized: string;
    matrix_row1_standard: string;
    matrix_row1_methods: string;
    matrix_row1_specialized: string;
    matrix_row2_standard: string;
    matrix_row2_methods: string;
    matrix_row2_specialized: string;
    matrix_row3_standard: string;
    matrix_row3_methods: string;
    matrix_row3_specialized: string;
    matrix_row4_standard: string;
    matrix_row4_methods: string;
    matrix_row4_specialized: string;
    narrative_item1: string;
    narrative_item2: string;
    narrative_item3: string;
    narrative_item4: string;
    badge_title: string;
    badge_desc: string;
    cta_ready: string;
    cta_btn: string;
  };
  aboutPage: {
    hero_title: string;
    mission_title: string;
    mission_text: string;
    vision_title: string;
    vision_text: string;
    history_title: string;
    history_text: string;
    trust_title: string;
    indicator1_title: string;
    indicator1_desc: string;
    indicator2_title: string;
    indicator2_desc: string;
    indicator3_title: string;
    indicator3_desc: string;
    cta_ready: string;
    cta_btn: string;
  };
  referencePage: {
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    filter_all: string;
    filter_energy: string;
    filter_industrial: string;
    filter_construction: string;
    cta_title: string;
    cta_btn: string;
  };
  blogPage: {
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    read_more: string;
    cta_title: string;
    cta_btn: string;
    tag_ndt: string;
    tag_welding: string;
    tag_standards: string;
    tag_safety: string;
    min_read: string;
  };
  integrity: {
    title: string;
    subtitle: string;
    precision_title: string;
    precision_label_tol: string;
    precision_val_tol: string;
    precision_label_acc: string;
    precision_val_acc: string;
    precision_desc: string;
    integrity_title: string;
    integrity_desc: string;
    excellence_title: string;
    excellence_ghost_seq: string[];
  };
  certificatesPage: {
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    list_iso: string;
    list_ndt: string;
    desc_iso: string;
    desc_ndt: string;
  };
  industriesPage: {
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    title_nuclear: string;
    desc_nuclear: string;
    title_pharma: string;
    desc_pharma: string;
    title_power: string;
    desc_power: string;
    title_steel: string;
    desc_steel: string;
    title_foundry: string;
    desc_foundry: string;
    title_engineering: string;
    desc_engineering: string;
    title_construction: string;
    desc_construction: string;
    title_oil: string;
    desc_oil: string;
  };
  equipmentPage: {
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    title_ut: string;
    desc_ut: string;
    title_mpi: string;
    desc_mpi: string;
  };
}

const translations: Record<Language, Translations> = {
  sl: {
    nav: { home: 'Domov', services: 'Storitve', about: 'O nas', contact: 'Kontakt', certificates: 'Certifikati', industries: 'Panoge', equipment: 'Oprema', blog: 'Baza znanja' },
    hero: {
      precision: 'Natančnost.',
      safety: 'Varnost.',
      trust: 'Zaupanje.',
      desc: 'Standard v neporušnih preiskavah in tehničnem nadzoru. Inženirska odličnost za kritično infrastrukturo.',
      cta_services: 'Razišči Storitve',
      cta_contact: 'Kontakt',
      weld_control: 'Nadzori',
      weld_desc: 'Celovit nadzor varilskih in montažnih del. Zagotavljamo, da je vsak zvar in vsak spoj v skladu z najstrožjimi standardi.',
      system_active: 'Status: Aktiven'
    },
    stats: { years: 'Let Izkušenj', projects: 'Projektov', reliability: 'Zanesljivost' },
    services: {
      title: 'Naše Storitve',
      subtitle: 'Celovite tehnične rešitve. Izberite področje za več podrobnosti.',
      cta_inquiry: 'Pošlji povpraševanje'
    },
    about: {
      title: 'Zakaj MEGAMA?',
      precision_title: 'Natančnost',
      precision_desc: 'Kalibrirana oprema. Brez odstopanj.',
      integrity_title: 'Integriteta',
      integrity_desc: 'Strogo upoštevanje standardov.',
      excellence_title: 'Odličnost',
      excellence_desc: 'Certificirano osebje.',
      certs_badge: 'Potrjena Kakovost',
      certs_title: 'Certifikati & Akreditacije',
      certs_desc: 'Naše poslovanje in procesi so redno preverjani in certificirani s strani vodilnih mednarodnih institucij.',
      cert_qms: 'Sistem vodenja kakovosti',
      cert_iqnet: 'IQNet Certified',
      cert_iqnet_desc: 'Mednarodna mreža certificiranja'
    },
    contact: {
      title: 'Kontaktirajte nas',
      subtitle: 'Za strokovna vprašanja ali ponudbo smo vam vedno na voljo.',
      response_time: 'Odzivni čas: < 24 ur',
      step_services: 'Storitve',
      step_project: 'Projekt',
      step_contact: 'Kontakt',
      label_interest: 'Kaj vas zanima?',
      label_describe: 'Opišite vaše potrebe',
      placeholder_describe: 'Kratek opis projekta, lokacija, roki...',
      label_details: 'Vaši Podatki',
      placeholder_name: 'Ime in Priimek',
      placeholder_email: 'E-poštni naslov',
      placeholder_phone: 'Telefonska številka (neobvezno)',
      btn_next: 'Naprej',
      btn_back: 'Nazaj',
      btn_submit: 'Pošlji Povpraševanje',
      success_title: 'Hvala!',
      success_desc: 'Vaše sporočilo je bilo poslano.',
      success_btn: 'Pošlji novo sporočilo',
      form_ndt: 'NDT Preiskave',
      form_supervision: 'Nadzori',
      form_consulting: 'Svetovanje',
      form_other: 'Drugo'
    },
    footer: {
      company_desc: 'Strokovne NDT storitve, nadzori in svetovanje za industrijo. Zavezani natančnosti od leta 2008.',
      sections_services: 'Storitve',
      sections_company: 'Podjetje',
      sections_contact: 'Kontakt',
      payment_info: 'Podatki za plačilo',
      rights: 'Vse pravice pridržane.',
      designed: 'Designed for Excellence.',
      legal_reg: 'Matična številka',
      legal_vat: 'Davčna številka'
    },
    personnel: {
      hero_title: 'Osebje in Certifikati',
      hero_subtitle: 'Najvišji standardi strokovnosti in mednarodnih kvalifikacij.',
      narrative_title: 'Matrika verodostojnosti',
      narrative_text: 'Profesionalizem v NDT preiskavah je definiran s certifikacijo osebja, ki izvaja delo. Ekipa MEGAMA ima najvišje stopnje mednarodnih kvalifikacij, kar zagotavlja, da so naši rezultati sprejeti s strani svetovnih regulatorjev in zavarovalnic.',
      matrix_title: 'Matrika certificiranja osebja',
      matrix_col_standard: 'Standard',
      matrix_col_methods: 'Metode in nivoji',
      matrix_col_specialized: 'Specializirane kvalifikacije',
      matrix_row1_standard: 'EN ISO 9712',
      matrix_row1_methods: 'VT (2), PT (3), MT (3), UT (3), RT (3)',
      matrix_row1_specialized: 'TOFD, PAUT',
      matrix_row2_standard: 'SNT-TC-1A',
      matrix_row2_methods: 'VT, PT, MT, UT, RT (Level III)',
      matrix_row2_specialized: '-',
      matrix_row3_standard: 'ASNT NDT',
      matrix_row3_methods: 'VT, UT (Level III)',
      matrix_row3_specialized: 'Nuclear Sector Performance Demonstration',
      matrix_row4_standard: 'ASME Sec. XI',
      matrix_row4_methods: 'PDI-UT-1, PDI-UT-2, PDI-UT-3, PDI-UT-5',
      matrix_row4_specialized: 'IGSCC Detection',
      narrative_item1: 'Sprejem s strani svetovnih regulatorjev',
      narrative_item2: 'Rezultati, potrjeni s strani zavarovalnic',
      narrative_item3: 'Najvišja stopnja kvalifikacij',
      narrative_item4: 'Standardi ISO 9712 in ASNT',
      badge_title: '100% certificirano',
      badge_desc: 'Vse terensko osebje ima veljavne mednarodne certifikate.',
      cta_ready: 'Ste pripravljeni na preverjanje vaše infrastrukture?',
      cta_btn: 'Pridobite strokovno svetovanje'
    },
    aboutPage: {
      hero_title: 'Standard MEGAMA',
      mission_title: 'Naše poslanstvo',
      mission_text: 'MEGAMA je specializiran partner za visoko natančne neporušne preiskave, nadzor kakovosti in varilni inženiring. S sedežem v Krškem služimo industrijam, kjer so posledice napak nepredstavljive. Naše poslanstvo je preprečevanje negativnih posledic pomanjkljive kontrole kakovosti z zagotavljanjem, da vsak zvar, odlitek in komponenta služi svojemu namenu zanesljivo in dolgoročno.',
      vision_title: 'Vizija prihodnosti',
      vision_text: 'Postati vodilni regijski center za zagotavljanje tehnične celovitosti z uporabo najnaprednejših metod neporušnih preiskav in nenehnim vlaganjem v znanje naše ekipe.',
      history_title: 'Naša pot',
      history_text: 'Ustanovljeni z enim ciljem: dvigniti nivo tehnične varnosti v energetiki in težki industriji. Danes smo zaupanja vreden partner največjih industrijskih sistemov.',
      trust_title: 'Indikatorji zaupanja',
      indicator1_title: 'ISO 9001:2015',
      indicator1_desc: 'Registrirano vodenje kakovosti.',
      indicator2_title: 'Kompetenca osebja',
      indicator2_desc: 'EN ISO 9712 / ASNT Level III.',
      indicator3_title: 'Standardi',
      indicator3_desc: 'ASME, AWS, EN/ISO skladnost.',
      cta_ready: 'Ste pripravljeni na natančno preverjanje vaše infrastrukture?',
      cta_btn: 'Pridobite strokovno svetovanje'
    },
    referencePage: {
      hero_title: 'Naše Reference',
      hero_subtitle: 'Projekti, ki dokazujejo našo strokovno odličnost v težki industriji.',
      hero_badge: 'DOKAZANA ODLIČNOST',
      filter_all: 'Vse',
      filter_energy: 'Energetika',
      filter_industrial: 'Težka industrija',
      filter_construction: 'Gradbeništvo',
      cta_title: 'Imaš projekt za nas?',
      cta_btn: 'Pošlji povpraševanje'
    },
    blogPage: {
      hero_title: 'Strokovni Članki',
      hero_subtitle: 'Znanje in uvidi iz sveta NDT preiskav, varjenja in tehničnega nadzora.',
      hero_badge: 'TECHNICAL INSIGHTS',
      read_more: 'Preberi več',
      cta_title: 'Potrebujete ekspertno mnenje?',
      cta_btn: 'Kontaktirajte nas',
      tag_ndt: 'NDT',
      tag_welding: 'Varjenje',
      tag_standards: 'Standardi',
      tag_safety: 'Varnost',
      min_read: 'min branja'
    },
    integrity: {
      title: 'Tehnična Integriteta',
      subtitle: 'SISTEMSKA VREDNOSTA // PROTOKOL',
      precision_title: 'Natančnost',
      precision_label_tol: 'TOLERANCA',
      precision_val_tol: '0.001mm',
      precision_label_acc: 'NATANČNOST',
      precision_val_acc: '99.98%',
      precision_desc: 'Uporaba visokofrekvenčnega ultrazvočnega skeniranja za zaznavanje nevidnega. Delujemo tam, kjer šteje vsak mikron.',
      integrity_title: 'Integriteta',
      integrity_desc: 'Brezkompromisni standardi. Certificirani tehniki, ki zagotavljajo preverljivo resnico v vsakem poročilu.',
      excellence_title: 'Odličnost',
      excellence_ghost_seq: [
        'INIT_SEQ_224... OK',
        'CALIBRATING_SENSORS... OK',
        'CHECKING_INTEGRITY... PASS',
        'UPLOAD_SPEED: 450TB/s'
      ]
    },
    certificatesPage: {
      hero_title: 'Certifikati & Standardi',
      hero_subtitle: 'Mednarodno priznana strokovnost in kakovost v NDT preiskavah.',
      hero_badge: 'PREVERLJIVA KAKOVOST',
      list_iso: 'Sistem Vodenja',
      list_ndt: 'NDT Osebje',
      desc_iso: 'ISO 9001:2015 za vodenje projektov.',
      desc_ndt: 'Zaposleni certificirani po EN ISO 9712 za nivoje I, II, III.'
    },
    industriesPage: {
      hero_title: 'Industrijske Panoge',
      hero_subtitle: 'Specializirane NDT rešitve za sektorje, kjer ima vsaka napaka posledice.',
      hero_badge: 'SEKTORJI DELOVANJA',
      title_nuclear: 'Jedrska energetika',
      desc_nuclear: 'Specializirane preiskave v jedrskih objektih z najvišjimi varnostnimi zahtevami. Osebje certificirano po ASME Sec. XI in SNT-TC-1A za detekcijo IGSCC razpok in preiskave celovitosti primarnega kroga.',
      title_pharma: 'Farmacija',
      desc_pharma: 'Nadzor kakovosti procesne opreme in sanitarnih zvarov v čistih sobah. Zagotavljamo neporoznost in brezhibnost površin zvarov po GMP zahtevah, ki so pogoj za odobritev regulatorja.',
      title_power: 'Konvencionalna energetika',
      desc_power: 'Preiskave energetskih objektov in tlačne opreme med izgradnjo, obratovanjem in remontom. Kotli, turbine, cevovodi in posode pod tlakom certificirani po evropskih tlačnih direktivah in AD 2000.',
      title_steel: 'Jeklene konstrukcije in tlačna oprema',
      desc_steel: 'Zagotavljanje strukturne celovitosti mostov, halnih konstrukcij, rezervoarjev in industrijskih cevovodov. Preiskave v skladu z EN 1090 za jeklene konstrukcijske elemente razredov EXC1–EXC4.',
      title_foundry: 'Livarstvo in jeklo',
      desc_foundry: 'NDT kontrole na odlitkih in valjanih materialih v vseh fazah produkcije. Zaznavanje vključkov, poroznosti in lunkra v litih in jeklenih odlitkih z ultrazvokom in radiografijo po EN 12680.',
      title_engineering: 'Splošna strojegradnja',
      desc_engineering: 'Nadzor varjenja in kontrola kakovosti mehanskih komponent v serijski in posamični proizvodnji. Sistematičen pristop od preverjanja polizdelka do certificiranega nadzora končnega sestava.',
      title_construction: 'Gradbeništvo',
      desc_construction: 'Tehnični nadzori in svetovanje pri izvedbi jeklenih konstrukcij in strojnih inštalacij v nizkih in visokih gradnjah. Preiskave betonskih in jeklenih elementov po veljavnih gradbenih standardih.',
      title_oil: 'Naftna, kemična in želežniška industrija',
      desc_oil: 'Zagotavljanje varnosti infrastrukturnih elementov in transportnih poti. Preiskave cevovodov, rezervoarjev in želežniških komponent po API 570, EN 15085 in DIN 27201, kjer je okvara varnostno nesprejemljiva.',
    },
    equipmentPage: {
      hero_title: 'Najnaprednejša Oprema',
      hero_subtitle: 'Sodobna tehnologija za najvišjo natančnost zaznavanja in merjenja.',
      hero_badge: 'TEHNIČNA OPREMLJENOST',
      title_ut: 'Ultrazvočna Defektoskopija',
      desc_ut: 'Phased Array UT naprave za kompleksne volumetrične preiskave.',
      title_mpi: 'Magnetografska Kontrola',
      desc_mpi: 'Zmogljivi magnetni jarki in prenosni jrmi z UV tehnologijo.'
    }
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact', certificates: 'Certificates', industries: 'Industries', equipment: 'Equipment', blog: 'Knowledge Base' },
    hero: {
      precision: 'Precision.',
      safety: 'Safety.',
      trust: 'Trust.',
      desc: 'The standard in non-destructive testing and technical supervision. Engineering excellence for critical infrastructure.',
      cta_services: 'Explore Services',
      cta_contact: 'Contact Us',
      weld_control: 'Supervision',
      weld_desc: 'Comprehensive supervision of welding and assembly works. Ensuring every weld and joint meets the strictest standards.',
      system_active: 'Status: Active'
    },
    stats: { years: 'Years Experience', projects: 'Projects', reliability: 'Reliability' },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive technical solutions. Select a field for more details.',
      cta_inquiry: 'Send Inquiry'
    },
    about: {
      title: 'Why MEGAMA?',
      precision_title: 'Precision',
      precision_desc: 'Calibrated equipment. Zero deviation.',
      integrity_title: 'Integrity',
      integrity_desc: 'Strict adherence to standards.',
      excellence_title: 'Excellence',
      excellence_desc: 'Certified personnel.',
      certs_badge: 'Certified Quality',
      certs_title: 'Certificates & Accreditations',
      certs_desc: 'Our operations and processes are regularly audited and certified by leading international institutions.',
      cert_qms: 'Quality Management System',
      cert_iqnet: 'IQNet Certified',
      cert_iqnet_desc: 'International Certification Network'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are always available for technical inquiries or quotations.',
      response_time: 'Response time: < 24 hours',
      step_services: 'Services',
      step_project: 'Project',
      step_contact: 'Contact',
      label_interest: 'What are you interested in?',
      label_describe: 'Describe your needs',
      placeholder_describe: 'Brief project description, location, deadlines...',
      label_details: 'Your Details',
      placeholder_name: 'Full Name',
      placeholder_email: 'Email Address',
      placeholder_phone: 'Phone Number (optional)',
      btn_next: 'Next',
      btn_back: 'Back',
      btn_submit: 'Send Request',
      success_title: 'Thank You!',
      success_desc: 'Your message has been sent.',
      success_btn: 'Send New Message',
      form_ndt: 'NDT Inspections',
      form_supervision: 'Supervision',
      form_consulting: 'Consulting',
      form_other: 'Other'
    },
    footer: {
      company_desc: 'Expert NDT services, supervision, and consulting for industry. Committed to precision since 2008.',
      sections_services: 'Services',
      sections_company: 'Company',
      sections_contact: 'Contact',
      payment_info: 'Payment Details',
      rights: 'All rights reserved.',
      designed: 'Designed for Excellence.',
      legal_reg: 'Registration No.',
      legal_vat: 'VAT ID'
    },
    personnel: {
      hero_title: 'Personnel & Certifications',
      hero_subtitle: 'Highest standards of professionalism and international qualifications.',
      narrative_title: 'The Credibility Matrix',
      narrative_text: 'Professionalism in NDT is defined by the certification of the personnel performing the work. MEGAMA’s team holds the highest tier of international qualifications, ensuring that our results are accepted by global regulators and insurers.',
      matrix_title: 'Personnel Certification Matrix',
      matrix_col_standard: 'Standard',
      matrix_col_methods: 'Methods & Levels',
      matrix_col_specialized: 'Specialized Qualifications',
      matrix_row1_standard: 'EN ISO 9712',
      matrix_row1_methods: 'VT (2), PT (3), MT (3), UT (3), RT (3)',
      matrix_row1_specialized: 'TOFD, PAUT',
      matrix_row2_standard: 'SNT-TC-1A',
      matrix_row2_methods: 'VT, PT, MT, UT, RT (Level III)',
      matrix_row2_specialized: '-',
      matrix_row3_standard: 'ASNT NDT',
      matrix_row3_methods: 'VT, UT (Level III)',
      matrix_row3_specialized: 'Nuclear Sector Performance Demonstration',
      matrix_row4_standard: 'ASME Sec. XI',
      matrix_row4_methods: 'PDI-UT-1, PDI-UT-2, PDI-UT-3, PDI-UT-5',
      matrix_row4_specialized: 'IGSCC Detection',
      narrative_item1: 'Global regulator acceptance',
      narrative_item2: 'Insurer approved results',
      narrative_item3: 'Highest tier qualifications',
      narrative_item4: 'ISO 9712 & ASNT standards',
      badge_title: '100% Certified',
      badge_desc: 'All field personnel hold valid international certifications.',
      cta_ready: 'Ready to verify your infrastructure?',
      cta_btn: 'Get Expert Consultation'
    },
    aboutPage: {
      hero_title: 'The MEGAMA Standard',
      mission_title: 'Our Mission',
      mission_text: 'MEGAMA is a specialized partner providing high-fidelity non-destructive testing, quality oversight, and welding engineering. Based in Krško, Slovenia, we serve industries where the cost of failure is absolute. Our mission is to prevent the negative consequences of poor quality control by ensuring that every weld, casting, and component serves its purpose reliably and for the long term.',
      vision_title: 'Our Vision',
      vision_text: 'To become the leading regional center for technical integrity, utilizing the most advanced non-destructive testing methods and continuous investment in our team\'s expertise.',
      history_title: 'Our History',
      history_text: 'Founded with a single goal: to raise the level of technical safety in energy and heavy industry. Today, we are a trusted partner to major industrial systems.',
      trust_title: 'Trust Indicators',
      indicator1_title: 'ISO 9001:2015',
      indicator1_desc: 'Registered Quality Management.',
      indicator2_title: 'Personnel Competence',
      indicator2_desc: 'EN ISO 9712 / ASNT Level III.',
      indicator3_title: 'Standards',
      indicator3_desc: 'ASME, AWS, EN/ISO compliance.',
      cta_ready: 'Ready to verify your critical infrastructure?',
      cta_btn: 'Get Expert Consultation'
    },
    referencePage: {
      hero_title: 'Our References',
      hero_subtitle: 'Projects that prove our technical excellence in heavy industry.',
      hero_badge: 'PROVEN EXCELLENCE',
      filter_all: 'All',
      filter_energy: 'Energy',
      filter_industrial: 'Heavy Industry',
      filter_construction: 'Construction',
      cta_title: 'Have a project for us?',
      cta_btn: 'Send Inquiry'
    },
    blogPage: {
      hero_title: 'Technical Articles',
      hero_subtitle: 'Knowledge and insights from the world of NDT, welding, and technical supervision.',
      hero_badge: 'TECHNICAL INSIGHTS',
      read_more: 'Read More',
      cta_title: 'Need an expert opinion?',
      cta_btn: 'Contact Us',
      tag_ndt: 'NDT',
      tag_welding: 'Welding',
      tag_standards: 'Standards',
      tag_safety: 'Safety',
      min_read: 'min read'
    },
    integrity: {
      title: 'Technical Integrity',
      subtitle: 'SYSTEM VALUES // PROTOCOL',
      precision_title: 'Precision',
      precision_label_tol: 'TOLERANCE',
      precision_val_tol: '0.001mm',
      precision_label_acc: 'ACCURACY',
      precision_val_acc: '99.98%',
      precision_desc: 'Utilizing high-frequency ultrasonic scanning to detect the invisible. We operate where every micron counts.',
      integrity_title: 'Integrity',
      integrity_desc: 'Uncompromising standards. Certified technicians delivering verifiable truth in every report.',
      excellence_title: 'Excellence',
      excellence_ghost_seq: [
        'INIT_SEQ_224... OK',
        'CALIBRATING_SENSORS... OK',
        'CHECKING_INTEGRITY... PASS',
        'UPLOAD_SPEED: 450TB/s'
      ]
    },
    certificatesPage: {
      hero_title: 'Certificates & Standards',
      hero_subtitle: 'Internationally recognized expertise and quality in NDT inspections.',
      hero_badge: 'VERIFIABLE QUALITY',
      list_iso: 'Management System',
      list_ndt: 'NDT Personnel',
      desc_iso: 'ISO 9001:2015 for project management.',
      desc_ndt: 'Personnel certified per EN ISO 9712 for levels I, II, III.'
    },
    industriesPage: {
      hero_title: 'Industrial Sectors',
      hero_subtitle: 'Specialized NDT solutions for sectors where every defect has consequences.',
      hero_badge: 'SECTORS OF OPERATION',
      title_nuclear: 'Nuclear Energy',
      desc_nuclear: 'Specialized inspections in nuclear facilities under the most demanding safety requirements. Personnel certified per ASME Sec. XI and SNT-TC-1A for IGSCC crack detection and primary circuit integrity assessment.',
      title_pharma: 'Pharmaceuticals',
      desc_pharma: 'Quality control of process equipment and sanitary welds in cleanrooms. We ensure porosity-free, smooth weld surfaces per GMP requirements as a prerequisite for regulatory approval.',
      title_power: 'Power & Energy',
      desc_power: 'Inspections of energy infrastructure and pressure equipment during construction, operation, and overhaul. Boilers, turbines, pipelines, and pressure vessels certified per European pressure equipment directives and AD 2000.',
      title_steel: 'Steel Structures & Pressure Equipment',
      desc_steel: 'Ensuring structural integrity of bridges, hall structures, tanks, and industrial pipelines. Inspections per EN 1090 for structural steel execution classes EXC1–EXC4.',
      title_foundry: 'Foundry & Raw Steel',
      desc_foundry: 'NDT controls on castings and rolled materials through all production phases. Detection of inclusions, porosity, and shrinkage voids in iron and steel castings using ultrasound and radiography per EN 12680.',
      title_engineering: 'General Engineering',
      desc_engineering: 'Welding supervision and quality control of mechanical components in serial and custom production. Systematic approach from semi-finished goods verification to certified final assembly inspection.',
      title_construction: 'Construction',
      desc_construction: 'Technical supervision and consulting for steel structures and mechanical installations in civil and high-rise construction. Inspection of concrete and steel elements per applicable construction standards.',
      title_oil: 'Oil, Chemical & Railway',
      desc_oil: 'Ensuring safety of infrastructure elements and transport corridors. Inspections of pipelines, tanks, and railway components per API 570, EN 15085, and DIN 27201 where failure carries safety implications.',
    },
    equipmentPage: {
      hero_title: 'Cutting-edge Equipment',
      hero_subtitle: 'Modern technology for the highest precision in detection and measurement.',
      hero_badge: 'TECHNICAL EQUIPMENT',
      title_ut: 'Ultrasonic Flaw Detection',
      desc_ut: 'Phased Array UT devices for complex volumetric inspections.',
      title_mpi: 'Magnetic Particle Insp.',
      desc_mpi: 'Powerful magnetic benches and portable yokes with UV technology.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sl');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};