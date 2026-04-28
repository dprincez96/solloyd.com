export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';
    const R2 = 'https://pub-5039dcb3d175443ea565073c83281975.r2.dev';

    function range(prefix, ext, n) {
      return Array.from({length:n}, (_, i) => `${prefix}-${i+1}.${ext}`);
    }

    function dualRange(prefix,n){return[...range(prefix,'JPG',n),...range(prefix,'jpg',n)];}

    const COUNTRIES = [
      { slug:'japan', name:'Japan', flag:'🇯🇵', cover:'japan-kyoto-1.JPG',
        subs:[
          {slug:'kyoto',    name:'Kyoto',    tags:'Culture · Temples · Streets',      cover:'japan-kyoto-1.JPG',           photos:dualRange('japan-kyoto',30)},
          {slug:'hokkaido', name:'Hokkaido', tags:'Winter · Snow · Long Exposure',    cover:'japan-hokkaido-winter-1.JPG', photos:dualRange('japan-hokkaido-winter',30)},
          {slug:'mtfuji',   name:'Mt Fuji',  tags:'Landscape · Iconic · Sunrise',     cover:'japan-mtfuji-1.JPG',          photos:dualRange('japan-mtfuji',30)},
        ]
      },
      { slug:'singapore', name:'Singapore', flag:'🇸🇬', cover:'singapore-moon-1.JPG',
        subs:[
          {slug:'moon',         name:'Sun & Moon of Singapore', tags:'Sun/Moon · Golden Hour · Sky',   cover:'singapore-moon-1.JPG',    photos:[...dualRange('singapore-moon',30),...dualRange('singapore-sunrise',30)]},
          {slug:'architecture', name:'Architecture',   tags:'MBS · Chinatown · Streets',      cover:'singapore-mbs-1.JPG',     photos:[...dualRange('singapore-mbs',30),...dualRange('singapore-architecture',30),...dualRange('singapore-chinatown',30)]},
        ]
      },
      { slug:'hongkong', name:'Hong Kong', flag:'🇭🇰', cover:'hongkong-1.JPG',
        photos:dualRange('hongkong',30)
      },
      { slug:'thailand', name:'Thailand', flag:'🇹🇭', cover:'thailand-bangkok-1.JPG',
        photos:dualRange('thailand-bangkok',30)
      },
      { slug:'malaysia', name:'Malaysia', flag:'🇲🇾', cover:'malaysia-penang-1.JPG',
        subs:[
          {slug:'penang',      name:'Penang',       tags:'Streets · Heritage · Culture',  cover:'malaysia-penang-1.JPG',      photos:dualRange('malaysia-penang',30)},
          {slug:'milkyway',    name:'Milky Way',    tags:'Astrophotography · Night Sky',  cover:'malaysia-milkyway-1.JPG',    photos:dualRange('malaysia-milkyway',30)},
          {slug:'kualalumpur', name:'Kuala Lumpur', tags:'Cityscape · Architecture',      cover:'malaysia-kualalumpur-1.JPG', photos:dualRange('malaysia-kualalumpur',30)},
        ]
      },
      { slug:'vietnam', name:'Vietnam', flag:'🇻🇳', cover:'vietnam-sapa-1.JPG',
        subs:[
          {slug:'sapa',     name:'Sapa',      tags:'Rice Terraces · Nature · Landscape', cover:'vietnam-sapa-1.JPG',     photos:dualRange('vietnam-sapa',30)},
          {slug:'hanoi',    name:'Hanoi',     tags:'Culture · Streets · Architecture',   cover:'vietnam-hanoi-1.JPG',    photos:dualRange('vietnam-hanoi',30)},
          {slug:'ninhbinh', name:'Ninh Binh', tags:'Karst Mountains · River · Boats',    cover:'vietnam-ninhbinh-1.JPG', photos:dualRange('vietnam-ninhbinh',30)},
        ]
      },
    ];

    const FEATURED = [
      {file:'featured-1.jpg',          credit:'Published in Shin Ming Daily News'},
      {file:'featured-2.JPG',          credit:'Runner-up, Sony Singapore Photography Contest 2025'},
      {file:'singapore-sunrise-5.JPG', credit:'Featured by Sony Alpha HQ'},
      {file:'singapore-moon-1.JPG',    credit:'Featured by Sony Alpha HQ'},
    ];

    const PORTRAITS = range('portraits','JPG',15);
    const WALLPAPERS = [...range('phone-wallpaper','JPG',8),...range('phone-wallpaper','jpg',8)];

    // ── Routing ──────────────────────────────────────────────────────────
    if (path.startsWith('/portfolio')) {
      const parts = path.slice('/portfolio'.length).split('/').filter(Boolean);
      if (parts.length === 1) {
        const country = COUNTRIES.find(c => c.slug === parts[0]);
        if (!country) return new Response('Not found', {status:404});
        if (country.subs) return new Response(countryIndexPage(R2, country), {headers:{'content-type':'text/html;charset=UTF-8'}});
        return new Response(galleryPage(R2, country.flag, country.name, country.name, null, null, country.photos), {headers:{'content-type':'text/html;charset=UTF-8'}});
      }
      if (parts.length === 2) {
        const country = COUNTRIES.find(c => c.slug === parts[0]);
        if (!country || !country.subs) return new Response('Not found', {status:404});
        const sub = country.subs.find(s => s.slug === parts[1]);
        if (!sub) return new Response('Not found', {status:404});
        return new Response(galleryPage(R2, country.flag, sub.name, country.name, `/portfolio/${country.slug}`, country.name, sub.photos), {headers:{'content-type':'text/html;charset=UTF-8'}});
      }
    }

    return new Response(mainPage(R2, COUNTRIES, FEATURED, PORTRAITS, WALLPAPERS), {headers:{'content-type':'text/html;charset=UTF-8'}});
  }
};

/* ─── SHARED ─────────────────────────────────────────────────────────────── */
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&family=Bebas+Neue&display=swap" rel="stylesheet"/>`;
const BASE_CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--accent:#b5883a;--border:rgba(255,255,255,.08);}
  body{background:#080808;color:#f0ebe2;font-family:'DM Mono',monospace;font-weight:300;cursor:none;}
  img{-webkit-user-drag:none;-webkit-touch-callout:none;user-select:none;pointer-events:none;}
  .cursor{position:fixed;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s;}
  .cursor-ring{position:fixed;width:32px;height:32px;border:1px solid var(--accent);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.5;transition:width .2s,height .2s;}
  nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:20px 52px;background:rgba(0,0,0,.78);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
  .nav-logo{font-family:'Bebas Neue',sans-serif;font-size:1.35rem;letter-spacing:.14em;color:#fff;text-decoration:none;}
  .nav-logo span{color:var(--accent);}
  .nav-back{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5);text-decoration:none;border:1px solid rgba(255,255,255,.15);padding:9px 20px;transition:color .2s,border-color .2s;cursor:none;pointer-events:auto;}
  .nav-back:hover{color:#fff;border-color:rgba(255,255,255,.4);}
  .page-header{padding:120px 52px 44px;border-bottom:1px solid var(--border);}
  .page-eyebrow{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
  .page-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5vw,4.5rem);font-weight:300;color:#fff;line-height:1.05;margin-bottom:8px;}
  .page-tags{font-size:.6rem;letter-spacing:.18em;color:rgba(255,255,255,.38);text-transform:uppercase;}
  footer{border-top:1px solid var(--border);padding:36px 52px;display:flex;align-items:center;justify-content:space-between;margin-top:48px;}
  .footer-logo{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:.14em;color:rgba(255,255,255,.3);}
  .footer-logo span{color:var(--accent);}
  .footer-back{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s;cursor:none;pointer-events:auto;}
  .footer-back:hover{color:var(--accent);}
  @media(max-width:768px){
    nav{padding:16px 20px;} .page-header{padding:90px 20px 32px;} footer{padding:28px 20px;flex-direction:column;gap:14px;text-align:center;}
    body{cursor:auto;} .cursor,.cursor-ring{display:none;} a,button{cursor:pointer!important;}
  }`;
const BASE_JS = `
  const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='18px';cursor.style.height='18px';ring.style.width='50px';ring.style.height='50px';});el.addEventListener('mouseleave',()=>{cursor.style.width='8px';cursor.style.height='8px';ring.style.width='32px';ring.style.height='32px';});});
  document.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG')e.preventDefault();});
  document.addEventListener('selectstart',e=>e.preventDefault());`;

/* ─── COUNTRY INDEX PAGE ─────────────────────────────────────────────────── */
function countryIndexPage(R2, country) {
  const cards = country.subs.map(s=>`
    <a href="/portfolio/${country.slug}/${s.slug}" class="sub-card">
      <div class="sub-card-bg" style="background-image:url('${R2}/${s.cover}');"></div>
      <div class="sub-card-overlay">
        <h3 class="sub-card-name">${s.name}</h3>
        <p class="sub-card-tags">${s.tags}</p>
        <span class="sub-card-cta">View Photos →</span>
      </div>
    </a>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${country.name} — SO LLOYD's</title>${FONTS}
  <style>${BASE_CSS}
    .sub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:48px 52px;}
    .sub-card{position:relative;aspect-ratio:3/4;overflow:hidden;display:block;text-decoration:none;cursor:none;}
    .sub-card-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94);}
    .sub-card:hover .sub-card-bg{transform:scale(1.05);}
    .sub-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,8,18,.88) 0%,rgba(5,8,18,.08) 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;}
    .sub-card-name{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;color:#fff;margin-bottom:6px;}
    .sub-card-tags{font-size:.55rem;letter-spacing:.16em;color:rgba(255,255,255,.5);text-transform:uppercase;margin-bottom:14px;}
    .sub-card-cta{font-size:.57rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s;}
    .sub-card:hover .sub-card-cta{opacity:1;transform:translateY(0);}
    @media(max-width:768px){.sub-grid{grid-template-columns:1fr 1fr;gap:10px;padding:32px 20px;}}
  </style>
</head>
<body>
  <div class="cursor" id="cursor"></div><div class="cursor-ring" id="cursorRing"></div>
  <nav><a href="/" class="nav-logo">SO LLOYD'S<span>.</span></a><a href="/" class="nav-back">← All Destinations</a></nav>
  <div class="page-header">
    <p class="page-eyebrow">${country.flag} Portfolio</p>
    <h1 class="page-title">${country.name}</h1>
    <p class="page-tags">Select a location to explore</p>
  </div>
  <div class="sub-grid">${cards}</div>
  <footer><div class="footer-logo">SO LLOYD'S<span>.</span></div><a href="/" class="footer-back">← All Destinations</a></footer>
  <script>${BASE_JS}</script>
</body></html>`;
}

/* ─── GALLERY PAGE ───────────────────────────────────────────────────────── */
function galleryPage(R2, flag, title, countryName, backUrl, backLabel, photos) {
  const backHref = backUrl || '/';
  const backText = backUrl ? `← ${backLabel}` : '← All Destinations';
  const crumb = backUrl ? `${flag} ${countryName} <span style="opacity:.35;margin:0 8px;">›</span> ${title}` : `${flag} ${title}`;
  const items = photos.map(f=>`<div class="photo-item"><img src="${R2}/${f}" loading="lazy" decoding="async" onerror="this.closest('.photo-item').style.display='none'" draggable="false"/></div>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title} — SO LLOYD's</title>${FONTS}
  <style>${BASE_CSS}
    .crumb{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:14px;}
    .photo-masonry{columns:2;column-gap:16px;padding:40px 52px;}
    .photo-item{break-inside:avoid;margin-bottom:16px;overflow:hidden;position:relative;}
    .photo-item img{width:100%;height:auto;display:block;transition:transform .5s cubic-bezier(.25,.46,.45,.94);}
    .photo-item:hover img{transform:scale(1.03);}
    @media(max-width:768px){.photo-masonry{columns:1;padding:20px 16px;column-gap:0;} .photo-item{margin-bottom:12px;}}
  </style>
</head>
<body>
  <div class="cursor" id="cursor"></div><div class="cursor-ring" id="cursorRing"></div>
  <nav><a href="/" class="nav-logo">SO LLOYD'S<span>.</span></a><a href="${backHref}" class="nav-back">${backText}</a></nav>
  <div class="page-header">
    <p class="page-eyebrow crumb">${crumb}</p>
    <h1 class="page-title">${title}</h1>
  </div>
  <div class="photo-masonry">${items}</div>
  <footer><div class="footer-logo">SO LLOYD'S<span>.</span></div><a href="${backHref}" class="footer-back">${backText}</a></footer>
  <script>${BASE_JS}</script>
</body></html>`;
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────────── */
function mainPage(R2, COUNTRIES, FEATURED, PORTRAITS, WALLPAPERS) {

  const destCards = COUNTRIES.map(c=>`
    <a href="/portfolio/${c.slug}" class="dest-card">
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-sub">${c.subs ? c.subs.map(s=>s.name).join(' · ') : 'Explore'}</div>
    </a>`).join('') + `
    <div class="dest-card dest-plain"><div class="dest-flag">🇮🇩</div><div class="dest-name">Indonesia</div><div class="dest-sub">Nature · Hike · Aerial</div></div>
    <div class="dest-card dest-plain"><div class="dest-flag">🇳🇴</div><div class="dest-name">Norway</div><div class="dest-sub upcoming">↑ Coming Soon</div></div>`;

  const featItems = FEATURED.map(f=>`
    <div class="feat-item">
      <div class="feat-bg lazy-bg" data-bg="${R2}/${f.file}"></div>
      <div class="feat-credit">${f.credit}</div>
    </div>`).join('');

  const countryCards = COUNTRIES.map(c=>`
    <a href="/portfolio/${c.slug}" class="country-card reveal">
      <div class="cc-bg lazy-bg" data-bg="${R2}/${c.cover}"></div>
      <div class="cc-overlay">
        <div class="cc-flag">${c.flag}</div>
        <h3 class="cc-name">${c.name}</h3>
        <p class="cc-sub">${c.subs ? c.subs.map(s=>s.name).join(' · ') : 'Explore Gallery'}</p>
        <span class="cc-cta">Explore →</span>
      </div>
    </a>`).join('');

  const portraitItems = PORTRAITS.map(f=>`
    <div class="portrait-item">
      <img src="${R2}/${f}" loading="lazy" decoding="async"
           onerror="this.closest('.portrait-item').style.display='none'"
           draggable="false"/>
    </div>`).join('');

  const wallpaperItems = WALLPAPERS.map(f=>`
    <div class="wp-item">
      <div class="phone-shell">
        <div class="phone-island"></div>
        <div class="phone-screen">
          <img src="${R2}/${f}" loading="lazy" decoding="async"
               onerror="this.closest('.wp-item').style.display='none'"
               draggable="false" style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;"/>
        </div>
      </div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>SO LLOYD's — Travel, Sun/Moon & Portraits</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="${R2}" crossorigin/>
  <link rel="preload" as="image" href="${R2}/japan-mtfuji-1.JPG"/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Bebas+Neue&display=swap" rel="stylesheet"/>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --cream:#f7f4ef;--paper:#f0ebe2;
      --charcoal:#1a1814;--muted:#8c8070;--muted-light:#b8ac9c;
      --accent:#b5883a;--accent-dark:#6b4b14;
      --border:rgba(28,24,20,.10);--border-strong:rgba(28,24,20,.18);
    }
    html{scroll-behavior:smooth;}
    body{background:linear-gradient(to bottom,#f0f9fc 0%,#d8eef7 4%,#a8d8ec 9%,#87ceeb 15%,#5fb3d4 24%,#3a8db5 35%,#1e5a8a 47%,#0a3a5e 58%,#051f3a 70%,#02060d 83%,#000 100%);background-attachment:fixed;color:var(--charcoal);font-family:'DM Mono',monospace;font-weight:300;overflow-x:hidden;cursor:none;}

    /* IMAGE PROTECTION */
    img{-webkit-user-drag:none;-webkit-touch-callout:none;user-select:none;pointer-events:none;}
    .photo-bg,.feat-bg,.cc-bg,.hero-bg,.insta-bg,.sub-card-bg,.portrait-bg{-webkit-user-drag:none;-webkit-touch-callout:none;user-select:none;}

    .cursor{position:fixed;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s;}
    .cursor-ring{position:fixed;width:32px;height:32px;border:1px solid var(--accent);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.55;transition:width .2s,height .2s;}

    /* NAV */
    nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:22px 52px;background:rgba(5,12,25,.65);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08);transition:background .6s,border-color .6s;}
    .nav-logo{font-family:'Bebas Neue',sans-serif;font-size:1.45rem;letter-spacing:.14em;color:#fff;text-decoration:none;}
    .nav-logo span{color:var(--accent);}
    .nav-links{display:flex;gap:26px;list-style:none;}
    .nav-links a{color:rgba(255,255,255,.65);text-decoration:none;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;transition:color .3s;}
    .nav-links a:hover{color:#fff;}
    .nav-cta{background:var(--accent);color:#fff;padding:10px 22px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;transition:background .25s;}
    .nav-cta:hover{background:var(--charcoal);}
    .menu-toggle{display:none;background:none;border:none;cursor:none;width:32px;height:32px;position:relative;padding:0;}
    .menu-toggle span{display:block;position:absolute;left:4px;right:4px;height:1.5px;background:#fff;transition:transform .3s,opacity .3s,top .3s;}
    .menu-toggle span:nth-child(1){top:10px;}.menu-toggle span:nth-child(2){top:16px;}.menu-toggle span:nth-child(3){top:22px;}
    .menu-toggle.open span:nth-child(1){top:16px;transform:rotate(45deg);}.menu-toggle.open span:nth-child(2){opacity:0;}.menu-toggle.open span:nth-child(3){top:16px;transform:rotate(-45deg);}
    .mobile-menu{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#080808;z-index:150;flex-direction:column;justify-content:center;align-items:center;gap:28px;padding:80px 24px 40px;opacity:0;pointer-events:none;transition:opacity .35s;}
    .mobile-menu.open{opacity:1;pointer-events:auto;}
    .mobile-menu a{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;color:#fff;text-decoration:none;transition:color .2s;}
    .mobile-menu a:hover{color:var(--accent);}
    .mobile-menu-cta{margin-top:20px;background:var(--accent);color:#fff!important;padding:14px 36px;font-family:'DM Mono',monospace!important;font-size:.65rem!important;letter-spacing:.2em;text-transform:uppercase;}

    /* HERO */
    .hero{min-height:100vh;position:relative;display:flex;align-items:center;padding:110px 8% 80px;overflow:hidden;}
    .hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0;will-change:transform;}
    .hero-overlay{position:absolute;inset:0;background:linear-gradient(105deg,rgba(4,10,22,.9) 0%,rgba(4,10,22,.65) 48%,rgba(4,10,22,.2) 100%);z-index:1;}
    .hero-left{position:relative;z-index:2;max-width:560px;}
    .hero-eyebrow{font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:20px;opacity:0;animation:fadeUp .7s .2s forwards;}
    .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.6rem,5.8vw,5.2rem);font-weight:300;line-height:1.02;color:#fff;margin-bottom:28px;opacity:0;animation:fadeUp .7s .35s forwards;}
    .hero-title em{font-style:italic;color:var(--accent);}
    .hero-title .line{display:block;}
    .hero-title .line-sub{font-size:.72em;color:rgba(255,255,255,.5);margin-top:.18em;}
    .hero-sub{font-size:.68rem;color:rgba(255,255,255,.58);line-height:2;letter-spacing:.04em;max-width:420px;margin-bottom:38px;opacity:0;animation:fadeUp .7s .5s forwards;}
    .hero-sub a{color:rgba(255,255,255,.82);text-decoration:none;border-bottom:1px solid var(--accent);transition:color .2s;}
    .hero-sub a:hover{color:var(--accent);}
    .hero-sub .badge{display:inline-block;font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);border:1px solid rgba(181,136,58,.45);padding:3px 10px;margin-top:14px;}
    .hero-actions{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:fadeUp .7s .65s forwards;}
    .btn-dark{background:var(--accent);color:#fff;padding:13px 28px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;transition:background .25s;}
    .btn-dark:hover{background:#fff;color:var(--charcoal);}
    .btn-outline{background:transparent;color:rgba(255,255,255,.78);border:1px solid rgba(255,255,255,.28);padding:13px 28px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;transition:border-color .25s,color .25s;}
    .btn-outline:hover{border-color:#fff;color:#fff;}

    /* STATS */
    .stats-band{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:rgba(255,255,255,.78);backdrop-filter:blur(8px);transition:background .6s;}
    .stat{padding:30px 52px;border-right:1px solid var(--border);}
    .stat:last-child{border-right:none;}
    .stat-num{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:300;color:var(--accent);line-height:1;margin-bottom:5px;}
    .stat-label{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);transition:color .6s;}

    /* SHARED LAYOUT */
    .sec-pad{padding:72px 52px 0;}
    .section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:36px;}
    .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:300;color:var(--charcoal);transition:color .6s;}
    /* Darker gold on light bg, regular accent on dark bg */
    .section-title em{font-style:italic;color:var(--accent-dark);}
    body.scroll-mid .section-title em{color:var(--accent);}
    .section-link{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .6s;}
    .section-link:hover{color:var(--accent);}

    /* WHERE I'VE SHOT — full bleed, no side gaps */
    .destinations-wrap{overflow:hidden;}
    .destinations{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:rgba(255,255,255,.78);backdrop-filter:blur(8px);transition:background .6s;-webkit-overflow-scrolling:touch;}
    .destinations::-webkit-scrollbar{display:none;}
    a.dest-card,div.dest-card{flex:0 0 175px;padding:28px 24px;border-right:1px solid var(--border);text-decoration:none;color:inherit;display:block;transition:background .22s;cursor:none;flex-shrink:0;}
    a.dest-card:hover{background:rgba(181,136,58,.1);}
    div.dest-plain{cursor:default;}
    .dest-flag{font-size:1.5rem;margin-bottom:10px;}
    .dest-name{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:300;color:var(--charcoal);margin-bottom:4px;transition:color .6s;}
    .dest-sub{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);transition:color .6s;line-height:1.6;}
    .dest-sub.upcoming{color:var(--accent-dark);}
    body.scroll-mid .dest-sub.upcoming{color:var(--accent);}

    /* FEATURED — horizontal carousel, 3:4 ratio */
    #portfolio{padding:72px 0 0;}
    .feat-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:14px;padding:56px 52px 36px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
    .feat-carousel::-webkit-scrollbar{display:none;}
    .feat-item{flex:0 0 380px;aspect-ratio:3/4;position:relative;overflow:hidden;cursor:none;scroll-snap-align:start;flex-shrink:0;}
    .feat-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94);will-change:transform;}
    .feat-item:hover .feat-bg{transform:scale(1.04);}
    .feat-credit{position:absolute;bottom:0;left:0;right:0;padding:48px 20px 18px;background:linear-gradient(to top,rgba(5,8,18,.88) 0%,transparent 100%);font-size:.57rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.82);}

    /* COUNTRY CARDS */
    .country-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 52px;margin-top:36px;}
    .country-card{position:relative;aspect-ratio:4/5;overflow:hidden;display:block;text-decoration:none;cursor:none;}
    .cc-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94);will-change:transform;}
    .country-card:hover .cc-bg{transform:scale(1.05);}
    .cc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,8,18,.9) 0%,rgba(5,8,18,.06) 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:26px;}
    .cc-flag{font-size:1.3rem;margin-bottom:8px;}
    .cc-name{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:300;color:#fff;margin-bottom:4px;line-height:1.15;}
    .cc-sub{font-size:.54rem;letter-spacing:.14em;color:rgba(255,255,255,.45);text-transform:uppercase;margin-bottom:12px;line-height:1.6;}
    .cc-cta{font-size:.57rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s;}
    .country-card:hover .cc-cta{opacity:1;transform:translateY(0);}

    /* ARTICLES */
    #articles{padding-bottom:80px;}
    .articles-placeholder{padding:60px 52px;text-align:center;border:1px dashed var(--border-strong);background:rgba(247,244,239,.6);backdrop-filter:blur(8px);margin:0 52px;font-size:.67rem;color:var(--muted);line-height:1.9;letter-spacing:.04em;transition:background .6s,color .6s;}
    .articles-placeholder em{font-style:italic;color:var(--accent-dark);}
    body.scroll-mid .articles-placeholder em{color:var(--accent);}

    /* WALLPAPERS — horizontal carousel */
    #wallpapers{padding-bottom:40px;}
    .wp-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:32px;padding:36px 52px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
    .wp-carousel::-webkit-scrollbar{display:none;}
    .wp-item{flex-shrink:0;scroll-snap-align:start;}
    .phone-shell{width:118px;height:208px;background:#1a1a1a;border-radius:24px;padding:8px 5px;box-shadow:0 18px 48px rgba(0,0,0,.45);position:relative;transition:transform .4s;}
    .wp-item:hover .phone-shell{transform:translateY(-8px) rotate(-1.5deg);}
    .phone-screen{width:100%;height:100%;border-radius:18px;overflow:hidden;}
    .phone-island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:30px;height:8px;background:#1a1814;border-radius:6px;z-index:5;}

    /* PORTRAITS */
    #portraits{padding-bottom:40px;}
    .portrait-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:14px;padding:36px 52px;scrollbar-width:none;-webkit-overflow-scrolling:touch;align-items:flex-start;}
    .portrait-carousel::-webkit-scrollbar{display:none;}
    .portrait-item{flex:0 0 280px;overflow:hidden;cursor:none;scroll-snap-align:start;flex-shrink:0;}
    .portrait-item img{width:100%;height:auto;display:block;transition:transform .7s cubic-bezier(.25,.46,.45,.94);}
    .portrait-item:hover img{transform:scale(1.04);}

    /* GEARS */
    #gears{padding-bottom:40px;}
    .gear-intro{font-size:.7rem;color:var(--muted);line-height:2;max-width:580px;margin:0 52px 48px;letter-spacing:.03em;transition:color .6s;}
    .gear-categories{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:0 52px;}
    .gear-cat{background:rgba(247,244,239,.85);backdrop-filter:blur(8px);border:1px solid var(--border);padding:36px 32px;transition:box-shadow .25s,background .6s;}
    .gear-cat:hover{box-shadow:0 6px 32px rgba(28,24,20,.09);}
    .gear-cat-title{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);transition:color .6s;}
    body.scroll-mid .gear-cat-title{color:var(--accent);}
    .gear-list{list-style:none;display:flex;flex-direction:column;}
    .gear-item{display:flex;align-items:flex-start;gap:14px;padding:13px 0;border-bottom:1px solid var(--border);font-size:.67rem;color:var(--charcoal);line-height:1.6;transition:color .6s;}
    .gear-item:last-child{border-bottom:none;}
    .gear-num{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:300;color:var(--muted-light);min-width:20px;line-height:1.2;}
    .gear-name{flex:1;}
    .gear-name strong{display:block;font-weight:400;color:var(--charcoal);transition:color .6s;}
    .gear-name span{font-size:.6rem;color:var(--muted);letter-spacing:.06em;transition:color .6s;}

    /* ABOUT */
    .about-section{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);margin:0 52px;background:rgba(240,235,226,.7);backdrop-filter:blur(8px);transition:background .6s;}
    .about-text{padding:80px 64px 80px 64px;border-right:1px solid var(--border);}
    .about-text h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.2vw,2.9rem);font-weight:300;color:var(--charcoal);margin-bottom:36px;line-height:1.2;transition:color .6s;}
    .about-text h2 em{font-style:italic;color:var(--accent-dark);}
    body.scroll-mid .about-text h2 em{color:var(--accent);}
    .about-text p{font-size:.76rem;color:var(--muted);line-height:2.3;margin-bottom:22px;letter-spacing:.03em;transition:color .6s;}
    .badge-tag{display:inline-block;border:1px solid var(--border-strong);color:var(--muted);font-size:.57rem;letter-spacing:.15em;text-transform:uppercase;padding:6px 14px;margin:5px 5px 0 0;transition:color .6s,border-color .6s;}
    .about-visual{padding:80px 0 80px 64px;display:flex;flex-direction:column;justify-content:center;gap:36px;}
    .profile-frame{position:relative;width:210px;height:210px;border-radius:50%;overflow:hidden;align-self:flex-start;box-shadow:0 6px 28px rgba(28,24,20,.12);border:3px solid #fff;}
    .profile-frame img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}
    .about-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(1.35rem,2.5vw,2rem);font-style:italic;font-weight:300;color:var(--charcoal);line-height:1.6;margin-bottom:20px;transition:color .6s;}
    .about-divider{width:40px;height:1px;background:var(--accent);margin-bottom:16px;}
    .about-quote-attr{font-size:.6rem;letter-spacing:.24em;color:var(--accent-dark);text-transform:uppercase;transition:color .6s;}
    body.scroll-mid .about-quote-attr{color:var(--accent);}
    .about-quote-attr .dot{display:inline-block;margin:0 10px;opacity:.6;}

    /* CONTACT */
    #contact{padding:90px 52px;text-align:center;}
    .contact-eyebrow{font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:22px;transition:color .6s;}
    body.scroll-mid .contact-eyebrow{color:var(--accent);}
    .contact-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.8vw,3.8rem);font-weight:300;color:var(--charcoal);line-height:1.1;margin-bottom:26px;transition:color .6s;}
    .contact-title em{font-style:italic;color:var(--accent-dark);}
    body.scroll-mid .contact-title em{color:var(--accent);}
    .contact-sub{font-size:.7rem;color:var(--muted);line-height:1.95;max-width:520px;margin:0 auto 40px;letter-spacing:.03em;transition:color .6s;}
    .contact-email{display:inline-block;font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3.6vw,2.8rem);font-weight:300;font-style:italic;color:var(--charcoal);text-decoration:none;padding:18px 40px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);transition:color .6s,border-color .6s;margin-bottom:32px;}
    .contact-email:hover{color:var(--accent);border-color:var(--accent);}
    .contact-note{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted-light);margin-top:12px;transition:color .6s;}

    /* INSTAGRAM */
    .insta-section{padding:80px 52px;border-top:1px solid var(--border);}
    .insta-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:40px;}
    .insta-cell{aspect-ratio:1;overflow:hidden;cursor:none;position:relative;}
    .insta-bg{width:100%;height:100%;transition:transform .5s;background-size:cover;background-position:center;}
    .insta-cell:hover .insta-bg{transform:scale(1.08);}
    .insta-overlay{position:absolute;inset:0;background:rgba(26,24,20,.38);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;font-size:1.4rem;color:var(--cream);}
    .insta-cell:hover .insta-overlay{opacity:1;}
    .insta-cta{text-align:center;}
    .insta-handle{font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3vw,2.6rem);font-style:italic;color:var(--muted);margin-bottom:20px;transition:color .6s;}
    .insta-handle a{color:var(--charcoal);text-decoration:none;transition:color .6s;}
    .insta-handle a:hover{color:var(--accent);}

    /* FOOTER */
    footer{border-top:1px solid var(--border);background:rgba(0,0,0,.3);backdrop-filter:blur(8px);padding:40px 52px;display:flex;align-items:center;justify-content:space-between;transition:background .6s;}
    .footer-logo{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:.14em;color:var(--muted);transition:color .6s;}
    .footer-logo span{color:var(--accent);}
    .footer-links{display:flex;gap:22px;list-style:none;}
    .footer-links a{font-size:.57rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .6s;}
    .footer-links a:hover{color:var(--accent);}
    .footer-copy{font-size:.57rem;color:var(--muted-light);transition:color .6s;}

    /* SCROLL STATES */
    body.scroll-mid .section-title,body.scroll-mid .dest-name,body.scroll-mid .about-text h2,body.scroll-mid .contact-title,body.scroll-mid .about-quote,body.scroll-mid .insta-handle a,body.scroll-mid .gear-name strong,body.scroll-mid .gear-item{color:#f0f6fb;}
    body.scroll-mid .about-text p,body.scroll-mid .gear-intro,body.scroll-mid .contact-sub,body.scroll-mid .articles-placeholder,body.scroll-mid .gear-name span,body.scroll-mid .dest-sub{color:rgba(240,246,251,.72);}
    body.scroll-mid .section-link,body.scroll-mid .footer-copy,body.scroll-mid .contact-note,body.scroll-mid .insta-handle,body.scroll-mid .badge-tag{color:rgba(240,246,251,.55);}
    body.scroll-mid .badge-tag{border-color:rgba(240,246,251,.28);}
    body.scroll-mid .stats-band,body.scroll-mid .destinations,body.scroll-mid .gear-cat,body.scroll-mid .articles-placeholder,body.scroll-mid .about-section{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.1);}
    body.scroll-mid .stat-num{color:#ffd27a;}
    body.scroll-deep .contact-title,body.scroll-deep .insta-handle a{color:#fff;}
    body.scroll-deep .contact-email{color:#fff;border-color:rgba(255,255,255,.22);}
    body.scroll-deep nav{background:rgba(0,0,0,.6)!important;border-bottom-color:rgba(255,255,255,.07);}
    body.scroll-deep .nav-logo{color:#fff;}
    body.scroll-deep .nav-links a{color:rgba(255,255,255,.7);}
    body.scroll-deep footer{background:rgba(0,0,0,.6);}
    body.scroll-deep .footer-logo,body.scroll-deep .footer-links a{color:rgba(255,255,255,.68);}
    body.scroll-deep .footer-copy{color:rgba(255,255,255,.35);}

    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .reveal{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s;}
    .reveal.visible{opacity:1;transform:translateY(0);}

    /* MOBILE */
    @media(max-width:768px){
      nav{padding:16px 20px;} .nav-links{display:none;} .nav-cta{display:none;} .menu-toggle{display:block;}
      .mobile-menu{display:flex;} body{cursor:auto;} .cursor,.cursor-ring{display:none;} a,button{cursor:pointer!important;}
      .hero{padding:100px 24px 60px;}
      .stats-band{grid-template-columns:1fr;} .stat{border-right:none;border-bottom:1px solid var(--border);padding:22px 24px;}
      .sec-pad{padding:48px 24px 0;}
      .feat-carousel{padding:40px 20px 24px;gap:12px;} .feat-item{flex:0 0 75vw;}
      .country-cards{grid-template-columns:1fr 1fr;gap:10px;padding:0 20px;}
      .articles-placeholder{margin:0 20px;padding:40px 24px;}
      .wp-carousel{padding:24px 20px;gap:20px;}
      .portrait-carousel{padding:24px 20px;gap:12px;} .portrait-item{flex:0 0 65vw;aspect-ratio:unset;}
      .portrait-item img{height:auto;}
      .gear-intro,.gear-categories{margin:0 20px;} .gear-categories{grid-template-columns:1fr;gap:10px;}
      .about-section{margin:0 20px;grid-template-columns:1fr;}
      .about-text{padding:44px 28px 44px 28px;border-right:none;border-bottom:1px solid var(--border);}
      .about-visual{padding:44px 28px;}
      #contact{padding:56px 24px;} .contact-email{font-size:1.4rem;padding:16px 20px;}
      .insta-section{padding:56px 24px;} .insta-grid{grid-template-columns:repeat(3,1fr);gap:6px;}
      footer{padding:30px 24px;flex-direction:column;gap:18px;text-align:center;} .footer-links{flex-wrap:wrap;justify-content:center;}
    }
  </style>
</head>
<body>
  <div class="cursor" id="cursor"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <nav>
    <a href="#" class="nav-logo">SO LLOYD'S<span>.</span></a>
    <ul class="nav-links">
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#wallpapers">Wallpapers</a></li>
      <li><a href="#portraits">Portraits</a></li>
      <li><a href="#gears">Gears</a></li>
      <li><a href="#articles">Articles</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="https://instagram.com/being_lloyds" target="_blank">Instagram</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Contact</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="#portfolio" onclick="closeMobileMenu()">Portfolio</a>
    <a href="#wallpapers" onclick="closeMobileMenu()">Wallpapers</a>
    <a href="#portraits" onclick="closeMobileMenu()">Portraits</a>
    <a href="#gears" onclick="closeMobileMenu()">Gears</a>
    <a href="#articles" onclick="closeMobileMenu()">Articles</a>
    <a href="#about" onclick="closeMobileMenu()">About</a>
    <a href="https://instagram.com/being_lloyds" target="_blank" onclick="closeMobileMenu()">Instagram</a>
    <a href="#contact" class="mobile-menu-cta" onclick="closeMobileMenu()">Contact</a>
  </div>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg" style="background-image:url('${R2}/japan-mtfuji-1.JPG');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-left">
      <p class="hero-eyebrow">solloyd.com — Travel, Sun/Moon & Portraits</p>
      <h1 class="hero-title">
        <span class="line">Light finds those</span>
        <span class="line">who <em>chase</em> it.</span>
        <span class="line line-sub">Moments find those</span>
        <span class="line line-sub">who <em>waited</em>.</span>
      </h1>
      <p class="hero-sub">
        A part-time travel photographer carrying 10kg of <a href="#gears">gear</a> to inspire you to explore. Mobile wallpapers in the <a href="#wallpapers">wallpapers</a> section.
        <br><span class="badge">✦ Never made by AI</span>
      </p>
      <div class="hero-actions">
        <a href="#portfolio" class="btn-dark">View Portfolio</a>
        <a href="#about" class="btn-outline">About Me</a>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <div class="stats-band reveal">
    <div class="stat"><div class="stat-num">24.3K</div><div class="stat-label">Instagram Followers</div></div>
    <div class="stat"><div class="stat-num">100,000+</div><div class="stat-label">Shots Taken</div></div>
    <div class="stat"><div class="stat-num">∞</div><div class="stat-label">Moments Worth Waiting For</div></div>
  </div>

  <!-- WHERE I'VE SHOT — edge to edge -->
  <div class="sec-pad reveal">
    <div class="section-header"><h2 class="section-title">Where I've <em>Shot</em></h2></div>
  </div>
  <div class="destinations-wrap reveal">
    <div class="destinations">${destCards}</div>
  </div>

  <!-- PORTFOLIO -->
  <section id="portfolio">
    <div class="sec-pad reveal">
      <div class="section-header"><h2 class="section-title">Featured <em>Work</em></h2></div>
    </div>
    <div class="feat-carousel reveal">${featItems}</div>

    <div class="sec-pad reveal" style="padding-top:64px;">
      <div class="section-header">
        <h2 class="section-title">Browse by <em>Destination</em></h2>
        <span class="section-link">Click to explore all photos →</span>
      </div>
    </div>
    <div class="country-cards">${countryCards}</div>
    <div style="height:80px;"></div>
  </section>

  <!-- MOBILE WALLPAPERS -->
  <section id="wallpapers">
    <div class="sec-pad reveal"><div class="section-header"><h2 class="section-title">Mobile <em>Wallpapers</em></h2></div></div>
    <div class="wp-carousel reveal">${wallpaperItems}</div>
    <div style="height:80px;"></div>
  </section>

  <!-- PORTRAITS -->
  <section id="portraits">
    <div class="sec-pad reveal"><div class="section-header"><h2 class="section-title">Portrait <em>Work</em></h2></div></div>
    <div class="portrait-carousel reveal">${portraitItems}</div>
    <div style="height:80px;"></div>
  </section>

  <!-- GEARS -->
  <section id="gears">
    <div class="sec-pad reveal"><div class="section-header"><h2 class="section-title">The <em>Gears</em></h2></div></div>
    <p class="gear-intro reveal">Roughly 10kg on the back at any given time. These are the tools I actually reach for — chosen over time through trial, error, and a few expensive lessons.</p>
    <div class="gear-categories">
      <div class="gear-cat reveal">
        <div class="gear-cat-title">📷 Camera & Lenses</div>
        <ul class="gear-list">
          <li class="gear-item"><span class="gear-num">01</span><div class="gear-name"><strong>A7RV</strong><span>61MP · Primary body</span></div></li>
          <li class="gear-item"><span class="gear-num">02</span><div class="gear-name"><strong>16–35mm f2.8 GM II</strong><span>Wide · Landscape & architecture</span></div></li>
          <li class="gear-item"><span class="gear-num">03</span><div class="gear-name"><strong>24–70mm f2.8 GM II</strong><span>Standard zoom · Everyday workhorse</span></div></li>
          <li class="gear-item"><span class="gear-num">04</span><div class="gear-name"><strong>28–70mm f2 GM</strong><span>Fast zoom · Low light & portraits</span></div></li>
          <li class="gear-item"><span class="gear-num">05</span><div class="gear-name"><strong>70–200mm f2.8 GM II</strong><span>Telephoto · Compression & wildlife</span></div></li>
          <li class="gear-item"><span class="gear-num">06</span><div class="gear-name"><strong>85mm f1.4 GM II</strong><span>Portrait prime · Dreamy separation</span></div></li>
          <li class="gear-item"><span class="gear-num">07</span><div class="gear-name"><strong>2× Teleconverter</strong><span>Reach extension for 70–200</span></div></li>
        </ul>
      </div>
      <div class="gear-cat reveal">
        <div class="gear-cat-title">🦅 Drone & Action</div>
        <ul class="gear-list">
          <li class="gear-item"><span class="gear-num">08</span><div class="gear-name"><strong>DJI Air 3S</strong><span>Aerial · 4K HDR video & stills</span></div></li>
          <li class="gear-item"><span class="gear-num">09</span><div class="gear-name"><strong>Antigravity A1</strong><span>Latest drone by Insta360's incubated company</span></div></li>
          <li class="gear-item"><span class="gear-num">10</span><div class="gear-name"><strong>Insta360 Ace Pro 2</strong><span>Action cam · Vlogging & POV</span></div></li>
          <li class="gear-item"><span class="gear-num">11</span><div class="gear-name"><strong>Insta360 Flow 2 Pro</strong><span>Mobile gimbal · Smooth video</span></div></li>
          <li class="gear-item"><span class="gear-num">12</span><div class="gear-name"><strong>iPhone 17 Pro Max</strong><span>Always-on cam · Behind the scenes</span></div></li>
        </ul>
      </div>
      <div class="gear-cat reveal">
        <div class="gear-cat-title">🎒 Support & Carry</div>
        <ul class="gear-list">
          <li class="gear-item"><span class="gear-num">13</span><div class="gear-name"><strong>PeakDesign Travel Tripod</strong><span>Primary · Carbon, ultra-compact</span></div></li>
          <li class="gear-item"><span class="gear-num">14</span><div class="gear-name"><strong>Pgytech Ultralight 40L Backpack</strong><span>Long-haul travel · Gear + day kit</span></div></li>
          <li class="gear-item"><span class="gear-num">15</span><div class="gear-name"><strong>Shimoda Explorer 35L</strong><span>Shoot days · Quick-access bag</span></div></li>
        </ul>
      </div>
    </div>
    <div style="height:40px;"></div>
  </section>

  <!-- ARTICLES -->
  <section id="articles">
    <div class="sec-pad reveal"><div class="section-header"><h2 class="section-title">Field <em>Notes</em></h2></div></div>
    <div style="height:36px;"></div>
    <div class="articles-placeholder reveal">
      <p>Writing in progress — <em>stories, gear reviews, and location guides on the way.</em></p>
      <p style="margin-top:10px;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-light);">Follow <a href="https://instagram.com/being_lloyds" target="_blank" style="color:var(--accent-dark);text-decoration:none;border-bottom:1px solid currentColor;">@being_lloyds</a> for updates</p>
    </div>
    <div style="height:60px;"></div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div style="padding:80px 52px 0;" class="reveal"><div class="section-header"><h2 class="section-title">The <em>Story</em></h2></div></div>
    <div class="about-section reveal">
      <div class="about-text">
        <h2>Fitness enthusiast.<br><em>Accidental photographer.</em><br>Moment chaser.</h2>
        <p>I've always wanted to own a camera since I was young — it was only when my career in the fitness industry stabilised that I finally bought my first, and two weeks later a dear friend convinced me to futureproof the system. I did.</p>
        <p>The first year was genuinely bad. Trial, error, and a lot of replicating the work of photographers I admired — trying to reverse-engineer what they were thinking when they pressed the shutter. Editing thousands of photos in that first year did something unexpected: it rapidly sharpened my creative instinct, and changed how I see the world through a viewfinder.</p>
        <p>Now I'm a part-time travel photographer obsessed with creating wall-hung-standard images in places I could never see from Singapore. I believe in waiting for the right moment — to create the unforgettable secret.</p>
        <div style="margin-top:28px;">
          <span class="badge-tag">Travel Photography</span><span class="badge-tag">Landscape</span><span class="badge-tag">Long Exposure</span><span class="badge-tag">Astrophotography</span><span class="badge-tag">Lightroom</span><span class="badge-tag">Fitness & Gym</span>
        </div>
      </div>
      <div class="about-visual">
        <div class="profile-frame">
          <img src="${R2}/profile.JPG" alt="Lloyd So" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" loading="lazy" decoding="async"/>
          <div style="display:none;width:100%;height:100%;background:linear-gradient(135deg,#a8c4e0,#1a5080);align-items:center;justify-content:center;color:rgba(255,255,255,.45);font-size:.58rem;letter-spacing:.08em;text-align:center;padding:16px;pointer-events:none;">Upload profile.JPG to R2</div>
        </div>
        <div>
          <p class="about-quote">"Light finds those who chase it. Moments find those who waited."</p>
          <div class="about-divider"></div>
          <p class="about-quote-attr">Lloyd<span class="dot">·</span>@being_lloyds</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <p class="contact-eyebrow reveal">— Get in Touch</p>
    <h2 class="contact-title reveal">Let's make something<br><em>meaningful.</em></h2>
    <p class="contact-sub reveal">For collaborations, work, or just to say hi — drop a message and I'll get back within 24 hours.</p>
    <a href="mailto:hello@solloyd.com" class="contact-email reveal">hello@solloyd.com</a>
    <p class="contact-note reveal">Based in Singapore · Available worldwide</p>
  </section>

  <!-- INSTAGRAM -->
  <section>
    <div class="insta-section">
      <div class="section-header reveal"><h2 class="section-title">Follow the <em>Journey</em></h2></div>
      <div class="insta-grid">
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/singapore-moon-3.JPG"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/japan-kyoto-1.JPG"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/malaysia-penang-1.JPG"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/hongkong-4.JPG"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/thailand-bangkok-3.JPG"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg lazy-bg" data-bg="${R2}/vietnam-sapa-2.JPG"></div><div class="insta-overlay">＋</div></div>
      </div>
      <div class="insta-cta">
        <p class="insta-handle"><a href="https://instagram.com/being_lloyds" target="_blank">@being_lloyds</a></p>
        <a href="https://instagram.com/being_lloyds" target="_blank" class="btn-outline" style="display:inline-block;">Follow on Instagram</a>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-logo">SO LLOYD'S<span>.</span></div>
    <ul class="footer-links">
      <li><a href="#portfolio">Portfolio</a></li><li><a href="#wallpapers">Wallpapers</a></li>
      <li><a href="#portraits">Portraits</a></li><li><a href="#gears">Gears</a></li>
      <li><a href="#articles">Articles</a></li><li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="https://instagram.com/being_lloyds" target="_blank">Instagram</a></li>
    </ul>
    <p class="footer-copy">© 2026 solloyd.com · All rights reserved.</p>
  </footer>

  <script>
    const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
    (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
    document.querySelectorAll('a,button').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cursor.style.width='18px';cursor.style.height='18px';ring.style.width='50px';ring.style.height='50px';});
      el.addEventListener('mouseleave',()=>{cursor.style.width='8px';cursor.style.height='8px';ring.style.width='32px';ring.style.height='32px';});
    });
    const menuToggle=document.getElementById('menuToggle'),mobileMenu=document.getElementById('mobileMenu');
    function closeMobileMenu(){menuToggle.classList.remove('open');mobileMenu.classList.remove('open');document.body.style.overflow='';}
    menuToggle.addEventListener('click',()=>{const o=menuToggle.classList.toggle('open');mobileMenu.classList.toggle('open');document.body.style.overflow=o?'hidden':'';});
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.07});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    window.addEventListener('scroll',()=>{const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);document.body.classList.toggle('scroll-mid',p>.30);document.body.classList.toggle('scroll-deep',p>.78);},{passive:true});

    // Lazy-load background images as they scroll into view
    const bgObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){const b=e.target.dataset.bg;if(b)e.target.style.backgroundImage=`url('${b}')`;bgObs.unobserve(e.target);}});
    },{rootMargin:'300px'});
    document.querySelectorAll('.lazy-bg').forEach(el=>bgObs.observe(el));

    // Portrait & wallpaper onerror is handled directly on <img> tags

    // Image protection
    document.addEventListener('contextmenu',e=>e.preventDefault());
    document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG')e.preventDefault();});
    document.addEventListener('selectstart',e=>e.preventDefault());
    // iOS long-press protection
    let longPress;
    document.addEventListener('touchstart',e=>{longPress=setTimeout(()=>e.preventDefault(),500);},{passive:false});
    document.addEventListener('touchend',()=>clearTimeout(longPress));
  </script>
</body>
</html>`;
}
