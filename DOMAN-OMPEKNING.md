# Domän & DNS för erotikmassan.com

> **Status: ompekningen är GENOMFÖRD.** `www.erotikmassan.com` serverar den nya
> Vercel-sajten och mejlet lever. Det som står nedan är dels uppmätt nuläge,
> dels två poster som fortfarande saknas. Den ursprungliga flyttplanen ligger
> kvar längst ner som historik.

---

## Uppmätt nuläge (2026-08-17, live DNS mot 8.8.8.8)

| Post | Värde | Status |
|------|-------|--------|
| Nameservers | `ns01.one.com`, `ns02.one.com` | ✅ flyttade från Wix |
| Apex `@` A | `216.150.1.1` (Vercel) | ✅ |
| `www` A | `216.150.1.1` (Vercel) | ✅ |
| MX | `mx1`–`mx4.pub.mailpod9-cph3.one.com` | ✅ mejlet fungerar |
| TXT `@` | **inga TXT-poster alls** | ❌ se nedan |
| `_dmarc` TXT | `v=DMARC1; p=none;` | ✅ |
| `resend._domainkey` TXT | DKIM-nyckel | ✅ Resend verifierad |
| `send` TXT + MX | `v=spf1 include:amazonses.com ~all` / `feedback-smtp.eu-west-1.amazonses.com` | ✅ Resend bounce |

**`www` är primär domän.** `https://erotikmassan.com/` svarar `308` och
skickar vidare till `https://www.erotikmassan.com/`. Det är åt det hållet
redirecten går – koden är byggd för det: `sitemap.ts`, `robots.ts` och
`metadataBase` i `layout.tsx` använder alla `https://www.erotikmassan.com`.
Ändras primär domän i Vercel måste de tre följa med, annars pekar varje
canonical och varje sitemap-URL på en redirect.

> Observera: MX-värdena är `mailpod9`, inte `mailpod5` som den gamla planen
> angav. One.com flyttar konton mellan pods – utgå alltid från vad DNS faktiskt
> svarar, inte från vad som stod i planen.

---

## ❌ Kvarstår: två TXT-poster som saknas

### 1. Google Search Console-verifieringen är borta (viktigast)

Den gamla Wix-zonen hade den här posten, och flyttplanen listade den
uttryckligen som "bevara". Den återskapades aldrig på One.com:

| Typ | Namn | Värde |
|-----|------|-------|
| TXT | `@` | `google-site-verification=gp0-f9TwPIdOBTi8d9htQ2S-I9y9jIZLm48G2YgMfmU` |

Utan den avverifierar Google egendomen, och därmed förloras historiken från
den gamla sajten. Lägg tillbaka **exakt** den här strängen på One.com – då
återverifieras den befintliga egendomen med sin historik i behåll, i stället
för att en ny måste skapas från noll.

Alternativ metod: sätt `GOOGLE_SITE_VERIFICATION` (token från Search Console →
metoden "HTML-tagg") som miljövariabel i Vercel. `src/app/layout.tsx` lägger då
in `<meta name="google-site-verification">` automatiskt. Den token är en annan
sträng än TXT-tokenen ovan – de går inte att byta mot varandra.

### 2. SPF för apex saknas

Mejl som skickas från `info@erotikmassan.com` via One.com har ingen SPF-post.
DMARC står på `p=none` så inget avvisas, men leveransbarheten blir sämre –
märks särskilt vid utskick till utställare och press.

| Typ | Namn | Värde |
|-----|------|-------|
| TXT | `@` (tomt hostname-fält hos One.com) | `v=spf1 include:_custspf.one.com ~all` |

> ⚠️ **`_custspf.one.com`, inte `_spf.one.com`.** Den ursprungliga planen angav
> `_spf.one.com`, vilket är fel för kunddomäner – One.coms egen DNS-editor
> varnar för det. Uppmätt 2026-08-17 har `_custspf.one.com` samma IPv4-lista
> men bredare IPv6-täckning (`2a02:2350::/32` plus `2001:67c:28cc::/48` och
> `2620:11b:7000::/44`), där `_spf.one.com` bara listar sex smala `/64`- och
> `/56`-block. Med fel include kan mejl från One.coms nyare IPv6-adresser falla
> utanför posten.

> Det får finnas **exakt en** SPF-rad på apex. Uppmätt 2026-08-17 finns ingen
> alls, så det är fritt fram – men kontrollera igen innan du lägger till.
>
> Posterna för Resend ligger på subdomänen `send` och ska **inte** röras. De är
> separata och påverkas inte: SPF kontrolleras mot kuvertavsändaren, och Resend
> använder `send.erotikmassan.com` som sådan. DKIM-nyckeln ligger på
> `resend._domainkey`.

---

## Verifieringskommandon

```bash
nslookup -type=A   erotikmassan.com      8.8.8.8   # 216.150.1.1 (Vercel)
nslookup -type=A   www.erotikmassan.com  8.8.8.8   # 216.150.1.1 (Vercel)
nslookup -type=MX  erotikmassan.com      8.8.8.8   # mx1-4...one.com  ← KRITISKT
nslookup -type=NS  erotikmassan.com      8.8.8.8   # ns01/ns02.one.com
nslookup -type=TXT erotikmassan.com      8.8.8.8   # ska visa google-site-verification + SPF
```

Skicka även ett testmejl till `info@erotikmassan.com` efter varje DNS-ändring
på apex och bekräfta att det kommer fram.

---

## 🔴 STÖRSTA RISKEN JUST NU: obetalda fakturor hos One.com

Kontrollpanelen visar (avläst 2026-08-17) tre varningar:

| Post | Belopp |
|------|--------|
| Utestående saldo, "PHP Extended Support" | 100,00 SEK |
| Obetald faktura | 800,00 SEK |
| Sparat betalsätt | **saknas** |

Kundens abonnemang är **Beginner, 79 kr/mån (årsvis debitering)**.

**Varför det här är kritiskt och inte bara en administrativ detalj:** One.com är
både registrar *och* nameserver-operatör för domänen (`ns01/ns02.one.com`), och
dessutom mejlleverantör. Spärras kontot faller DNS – och då försvinner **allt
samtidigt**:

- `www.erotikmassan.com` slutar svara, trots att sajten ligger hos Vercel och är
  helt opåverkad. Utan DNS går den inte att nå.
- All mejl till `info@`, `joakim@`, `johan@`, `yngve@` och `simone@` slutar
  fungera – inkommande mejl studsar.
- Kontaktformuläret slutar leverera (Resend skickar till `info@`).

Mässan går av stapeln 11–12 september 2026. En spärr under de veckorna skulle
släcka biljettförsäljningens landningssida och all kundkontakt samtidigt.

**Åtgärd, i den här ordningen:**

1. Betala båda posterna (900 SEK totalt).
2. **Lägg in ett sparat betalsätt.** Utan det upprepas problemet vid nästa
   förnyelse, och årsdebiteringen gör att den kan slå till utan förvarning.
3. Kontrollera domänens förnyelsedatum under Domain – ikonen bredvid
   `erotikmassan.com` i sidomenyn visar en varningsflagga.

> **Fundera på om "PHP Extended Support" ens behövs.** Den tjänsten hör till
> One.coms egen webbhotell-PHP, och sajten ligger sedan flytten på Vercel.
> One.com behövs numera bara för tre saker: domänregistreringen, DNS och
> mejlen. Webbhotellsdelen används inte. Kontrollera med One.com vad de
> 800 kr avser innan de betalas – går de till hosting som inte används kan
> abonnemanget troligen skalas ned. Domän + mejl måste dock behållas.

---

## Att hålla koll på

- **Mejlet är alltid den största risken** vid DNS-arbete på den här domänen.
  Rör aldrig MX-posterna, och kontrollera dem efter varje ändring.
- **Mejlupplägget:** `info@erotikmassan.com` är landningsadressen och
  vidarebefordrar till `joakim@`, `johan@`, `yngve@` och `simone@`. Samtliga är
  Basic-konton med 3 GB. Backup & Restore är **inte** aktiverat på något av dem
  (det är en tilläggstjänst, inte "Daily backup" som ingår i planen).

---

<details>
<summary><strong>Historik: den ursprungliga flyttplanen (juni 2026)</strong></summary>

**Mål:** `erotikmassan.com` + `www.erotikmassan.com` skulle visa den nya
Vercel-sajten utan att `info@erotikmassan.com` slutade fungera.

**Vald metod:** flytta DNS-hanteringen från Wix tillbaka till One.com (där
Johan är registrar och har inlogg) och lägga in alla poster där.

**Nuläge före flytten (uppmätt 2026-06-17):**

| Post | Värde | Var |
|------|-------|-----|
| Nameservers | `ns14.wixdns.net`, `ns15.wixdns.net` | Wix hanterade DNS |
| Apex `@` A | `185.230.63.186/107/171` | Wix (gamla sidan) |
| `www` CNAME | `cdn1.wixdns.net` | Wix (gamla sidan) |
| MX | `mx1/mx2/mx3.pub.mailpod5-cph3.one.com` | One.com mejl |
| TXT `@` | `google-site-verification=gp0-...` | Search Console |
| DMARC / SPF | saknades | – |

**Stegen som utfördes:**

1. Lägg till båda domänerna i Vercel först (Settings → Domains), så SSL
   förbereds och Vercel visar exakta DNS-värden.
2. Byt nameservers hos One.com från Wix till One.coms egna. (1–24 h spridning.)
3. Lägg in posterna i One.coms DNS: A-post för apex och `www` mot Vercel, samt
   återskapa MX-posterna för mejlet.
4. Verifiera med `nslookup` och ett testmejl.

**Det som missades i steg 3:** TXT-posten för Search Console och den
rekommenderade SPF-posten. Se avsnittet "Kvarstår" ovan.

</details>
