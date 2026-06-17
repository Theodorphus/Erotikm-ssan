# Peka om erotikmassan.com → Vercel (ny sajt)

**Mål:** `erotikmassan.com` + `www.erotikmassan.com` ska visa den nya Vercel-sajten,
**utan att mejlet (`info@erotikmassan.com`) slutar fungera.**

**Vald metod:** Flytta DNS-hanteringen från Wix tillbaka till **One.com** (där du är
registrar och har inlogg), och lägg in alla poster där.

> ⚠️ **STÖRSTA RISKEN: MEJLET.** När nameservrarna byts från Wix till One.com
> kastas Wix gamla DNS-zon. MX-posterna MÅSTE återskapas på One.com, annars slutar
> `info@erotikmassan.com` ta emot mejl. Allt som måste bevaras finns nedan.

---

## Nuläge (uppmätt 2026-06-17, live DNS)

| Post | Värde nu | Var |
|------|----------|-----|
| Nameservers (NS) | `ns14.wixdns.net`, `ns15.wixdns.net` | **Wix** hanterar DNS |
| Apex `@` A | `185.230.63.186/107/171` | Wix (gamla sidan) |
| `www` CNAME | `cdn1.wixdns.net` | Wix (gamla sidan) |
| **MX** | `mx1/mx2/mx3.pub.mailpod5-cph3.one.com` (prio 10) | **One.com mejl – bevara!** |
| TXT (apex) | `google-site-verification=gp0-f9TwPIdOBTi8d9htQ2S-I9y9jIZLm48G2YgMfmU` | Search Console – bevara |
| DMARC / SPF | saknas | (ingen i dag) |

---

## STEG 1 – Lägg till domänen i Vercel FÖRST (gör inget DNS-arbete än)

Detta hämtar de exakta värden Vercel kräver och förbereder SSL.

1. Vercel → projekt **erotikm-ssan** → **Settings → Domains**.
2. Lägg till `erotikmassan.com` **och** `www.erotikmassan.com`.
3. Sätt en som primär (rekommenderat: `www` primär, apex redirectar till www –
   eller tvärtom, valfritt). Vercel visar nu vilka poster den vill ha. De brukar vara:
   - **Apex `@`:** A-post → `76.76.21.21`
   - **`www`:** CNAME → `cname.vercel-dns.com`
   > Använd de värden **Vercel faktiskt visar** om de skiljer sig från ovan.

---

## STEG 2 – Byt nameservers till One.com

1. Logga in på **One.com** (registrar) → din domän → **DNS / Namnservrar**.
2. Byt från Wix NS till One.coms **egna namnservrar** (One.com sätter ofta detta
   automatiskt när du väljer "Använd One.coms namnservrar" / "DNS hos One.com").
3. Spara. (NS-byte kan ta 1–24 h att slå igenom globalt.)

---

## STEG 3 – Lägg in posterna i One.coms DNS (DNS-inställningar)

Skapa exakt dessa. **MX är viktigast – missa inte den.**

### A) Sajten (Vercel) — EXAKTA värden från Vercel 2026-06-17
| Typ | Namn/Host | Värde | TTL |
|-----|-----------|-------|-----|
| A | `@` (apex) | `216.150.1.1` | 3600 |
| CNAME | `www` | `3d17e1639250694c.vercel-dns-016.com.` | 3600 |

> Vercel använder ny IP-range; dessa är de värden Vercel visar för DETTA konto.
> (De gamla `76.76.21.21` / `cname.vercel-dns.com` funkar också men använd nya.)
> Apex är primär; `www` ger 308-redirect → apex.
> Ta bort ev. gamla A/CNAME som One.com lägger in automatiskt mot sin egen
> "parkerings"-sida för apex/www, annars krockar de.

### B) Mejlet (One.com – ÅTERSKAPA, annars dör info@-mejlen)
| Typ | Namn | Prio | Värde | TTL |
|-----|------|------|-------|-----|
| MX | `@` | 10 | `mx1.pub.mailpod5-cph3.one.com` | 3600 |
| MX | `@` | 10 | `mx2.pub.mailpod5-cph3.one.com` | 3600 |
| MX | `@` | 10 | `mx3.pub.mailpod5-cph3.one.com` | 3600 |

> One.com lägger oftast in sina egna MX automatiskt när du aktiverar deras DNS +
> mejl. **Verifiera ändå att exakt dessa tre finns** innan du går vidare.

### C) Search Console-verifiering (bevara)
| Typ | Namn | Värde |
|-----|------|-------|
| TXT | `@` | `google-site-verification=gp0-f9TwPIdOBTi8d9htQ2S-I9y9jIZLm48G2YgMfmU` |

### D) (Valfritt men rekommenderat) SPF för bättre mejl-leverans
| Typ | Namn | Värde |
|-----|------|-------|
| TXT | `@` | `v=spf1 include:_spf.one.com ~all` |

> Lägg bara till SPF om One.com inte redan lägger in en egen. Ha **bara en** SPF-rad.

---

## STEG 4 – Verifiera (efter att DNS spridits, 1–24 h)

```bash
# Apex pekar på Vercel?
nslookup -type=A erotikmassan.com 8.8.8.8        # ska visa 76.76.21.21

# www pekar på Vercel?
nslookup -type=CNAME www.erotikmassan.com 8.8.8.8 # ska visa cname.vercel-dns.com

# MEJLET intakt? (KRITISKT)
nslookup -type=MX erotikmassan.com 8.8.8.8        # ska visa mx1/2/3...one.com

# Nameservers bytta?
nslookup -type=NS erotikmassan.com 8.8.8.8        # ska visa one.com, inte wixdns
```

- I Vercel → Domains ska båda domänerna bli **Valid / SSL utfärdat** (grön).
- Skicka ett testmejl till `info@erotikmassan.com` och bekräfta att det kommer fram.

---

## STEG 5 – Sist: One.com obetald avgift (Johan)

Det ligger en **obetald avgift på 300 kr** + inget sparat betalsätt på One.com.
Påminn Johan att betala så domänen inte spärras – annars ryker både ny och gammal sida.

---

### Att känna till
- När apex/www pekas om **slutar gamla Wix-sidan visas** på erotikmassan.com. Den nya tar över.
- Mejlet rörs inte SÅ LÄNGE MX återskapas korrekt (steg 3B).
- NS-byte är det som tar längst tid – ha tålamod, det kan ta upp till ett dygn.
