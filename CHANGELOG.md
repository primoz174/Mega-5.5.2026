# 🚀 Zapisnik Sprememb (Changelog) - Modul Storitve
*Dnevnik posodobitev in uveljavljenih sprememb na spletni strani Megama*

---

## 🛠 Datum: 12. april 2026

### 🔄 Prestrukturiranje postavitve podstrani `ServicesPage.tsx`
- **Sticky Sidebar (Pritrjen levi meni):** Odpravljena napaka z `overflow-x-hidden` na glavnem vsebniku in zamenjana z `overflow-x-clip`. Levi navigacijski meni sedaj obtiči ("sticky") na vrhu ekrana ob drsenju navzdol po metodah (VT, PT ipd.).
- **3D Integracija (Vdelane animacije na karticah):** Osrednji veliki 3D pregledovalnik metod odstranjen z vrha. Namesto njega je v vsako posamezno kartico preiskave integrirana unikatna `MethodIllustrations` 3D animacija.

### 🎨 Vizualne in UI/UX Izboljšave
- **AI Zgenerirano Hero Ozadje:** V sklop komponente `InteractiveHero` smo preko Gemini "Nano Banana" integracije dodali novo, ultra profesionalno industrijsko podlago.
- **Odstranitev interaktivnih 3D delcev (Industrial Particles):** Da zmanjšamo vizualno prenasičenost v kombinaciji z novim ozadjem, so bili iz sekcije naslovnice odstranjeni mišji-interaktivni delci mreže.
- **Dinamično obarvanje (Hover Glow):** Kartice (okenca) imajo zdaj natančno uravnotežen sij (glow efekt) in odsev levo zgoraj, ki pri prehodu prevzame specifično barvo po kategorijah (modra za NDT in oranžna za Nadzore). 

---
*Koda in vse spremembe so indeksirane in varnostno shranjene v verzijski kontroli Git.*
