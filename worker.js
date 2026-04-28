export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SO LLOYD's — Travel, Sun/Moon & Portraits</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Bebas+Neue&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream: #f7f4ef;
      --warm-white: #faf8f5;
      --paper: #f0ebe2;
      --charcoal: #1a1814;
      --muted: #8c8070;
      --muted-light: #b8ac9c;
      --accent: #b5883a;
      --accent-light: rgba(181,136,58,0.10);
      --border: rgba(28,24,20,0.10);
      --border-strong: rgba(28,24,20,0.18);
      --wall: #e8e2d8;
    }

    html { scroll-behavior: smooth; }

    img, .photo-bg, .print-art, .insta-bg, .profile-img {
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      pointer-events: auto;
    }

    body {
      background: linear-gradient(
        to bottom,
        #f0f9fc 0%,
        #d8eef7 6%,
        #a8d8ec 14%,
        #87ceeb 22%,
        #5fb3d4 36%,
        #3a8db5 50%,
        #1e5a8a 62%,
        #0a3a5e 74%,
        #051f3a 84%,
        #02060d 93%,
        #000000 100%
      );
      background-attachment: fixed;
      color: var(--charcoal);
      font-family: 'DM Mono', monospace;
      font-weight: 300;
      overflow-x: hidden;
      cursor: none;
    }

    .cursor { position:fixed;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s; }
    .cursor-ring { position:fixed;width:32px;height:32px;border:1px solid var(--accent);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.55;transition:width .2s,height .2s; }

    nav {
      position:fixed;top:0;left:0;right:0;z-index:200;
      display:flex;align-items:center;justify-content:space-between;
      padding:22px 52px;
      background:rgba(234,246,251,0.85);
      backdrop-filter:blur(14px);
      border-bottom:1px solid var(--border);
      transition: background 0.6s ease, border-color 0.6s ease;
    }
    .nav-logo { font-family:'Bebas Neue',sans-serif;font-size:1.45rem;letter-spacing:.14em;color:var(--charcoal);text-decoration:none;transition:color .6s ease; }
    .nav-logo span { color:var(--accent); }
    .nav-links { display:flex;gap:30px;list-style:none; }
    .nav-links a { color:var(--muted);text-decoration:none;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;transition:color .6s ease; }
    .nav-links a:hover { color:var(--charcoal); }
    .nav-cta { background:var(--charcoal);color:var(--cream);padding:10px 22px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;transition:background .25s; }
    .nav-cta:hover { background:var(--accent); }

    .menu-toggle {
      display:none;
      background:none;border:none;cursor:none;
      width:32px;height:32px;position:relative;
      padding:0;
    }
    .menu-toggle span {
      display:block;position:absolute;left:4px;right:4px;height:1.5px;
      background:var(--charcoal);
      transition:transform .3s ease,opacity .3s ease,top .3s ease;
    }
    .menu-toggle span:nth-child(1){top:10px;}
    .menu-toggle span:nth-child(2){top:16px;}
    .menu-toggle span:nth-child(3){top:22px;}
    .menu-toggle.open span:nth-child(1){top:16px;transform:rotate(45deg);}
    .menu-toggle.open span:nth-child(2){opacity:0;}
    .menu-toggle.open span:nth-child(3){top:16px;transform:rotate(-45deg);}

    .mobile-menu {
      display:none;
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:var(--warm-white);
      z-index:150;
      flex-direction:column;justify-content:center;align-items:center;
      gap:28px;padding:80px 24px 40px;
      opacity:0;pointer-events:none;
      transition:opacity .35s ease;
    }
    .mobile-menu.open { opacity:1;pointer-events:auto; }
    .mobile-menu a {
      font-family:'Cormorant Garamond',serif;
      font-size:1.9rem;font-weight:300;
      color:var(--charcoal);text-decoration:none;
      transition:color .2s;
    }
    .mobile-menu a:hover { color:var(--accent); }
    .mobile-menu a em { font-style:italic;color:var(--accent); }
    .mobile-menu-cta {
      margin-top:20px;
      background:var(--charcoal);color:var(--cream) !important;
      padding:14px 36px;
      font-family:'DM Mono',monospace !important;
      font-size:.65rem !important;font-weight:300 !important;
      letter-spacing:.2em;text-transform:uppercase;
    }

    .hero {
      min-height:100vh;
      background: linear-gradient(
        to bottom,
        rgba(234, 246, 251, 0.4) 0%,
        rgba(220, 240, 250, 0.25) 100%
      );
      display:flex;align-items:center;
      padding:110px 52px 80px;gap:60px;
      position:relative;overflow:hidden;
    }
    .hero::before {
      content:'';position:absolute;inset:0;pointer-events:none;
      background:
        repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(28,24,20,.012) 3px,rgba(28,24,20,.012) 4px),
        repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(28,24,20,.008) 3px,rgba(28,24,20,.008) 4px);
    }

    .hero-left { flex:1;max-width:520px;position:relative;z-index:2; }
    .hero-eyebrow { font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:20px;opacity:0;animation:fadeUp .7s .2s forwards; }

    .hero-title {
      font-family:'Cormorant Garamond',serif;
      font-size:clamp(2.6rem,5.8vw,5.2rem);
      font-weight:300;line-height:1.02;
      color:var(--charcoal);margin-bottom:28px;
      opacity:0;animation:fadeUp .7s .35s forwards;
      transition:color .6s ease;
    }
    .hero-title em { font-style:italic;color:var(--accent); }
    .hero-title .line { display:block; }
    .hero-title .line-sub { font-size:.72em;color:var(--muted);margin-top:.18em;transition:color .6s ease; }

    .hero-sub { font-size:.68rem;color:var(--muted);line-height:2;letter-spacing:.04em;max-width:420px;margin-bottom:38px;opacity:0;animation:fadeUp .7s .5s forwards;transition:color .6s ease; }
    .hero-sub a { color:var(--charcoal);text-decoration:none;border-bottom:1px solid var(--accent);transition:color .2s; }
    .hero-sub a:hover { color:var(--accent); }
    .hero-sub .badge { display:inline-block;font-family:'DM Mono',monospace;font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);padding:3px 10px;margin-top:14px; }

    .hero-actions { display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:fadeUp .7s .65s forwards; }
    .btn-dark { background:var(--charcoal);color:var(--cream);padding:13px 28px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;transition:background .25s; }
    .btn-dark:hover { background:var(--accent); }
    .btn-outline { background:transparent;color:var(--charcoal);border:1px solid var(--border-strong);padding:13px 28px;text-decoration:none;cursor:none;font-family:'DM Mono',monospace;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;transition:border-color .25s,color .25s; }
    .btn-outline:hover { border-color:var(--accent);color:var(--accent); }

    .hero-right { flex:1;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;opacity:0;animation:fadeIn 1s .85s forwards; }
    .wall-scene { position:relative;width:480px;height:400px; }

    .hframe {
      position:absolute;
      box-shadow:
        0 2px 12px rgba(28,24,20,.18),
        0 1px 4px rgba(28,24,20,.12),
        -12px 12px 32px rgba(28,24,20,.35),
        -22px 22px 56px rgba(28,24,20,.22),
        -32px 32px 80px rgba(28,24,20,.10);
      background:#fff;padding:3px;
    }
    .hframe-inner { width:100%;height:100%;position:relative;overflow:hidden; }
    .hframe-inner::after { content:'';position:absolute;inset:0;border:2.5px solid #fff;pointer-events:none; }
    .hframe::after { content:'';position:absolute;bottom:-10px;left:10%;width:80%;height:8px;background:radial-gradient(ellipse,rgba(28,24,20,.1) 0%,transparent 70%);border-radius:50%;pointer-events:none; }
    .hframe::before { content:'';position:absolute;top:-16px;left:50%;transform:translateX(-50%);width:1px;height:16px;background:rgba(100,100,100,.3); }

    .nail { position:absolute;z-index:5;width:7px;height:7px;background:radial-gradient(circle at 35% 35%,#ccc,#666);border-radius:50%;box-shadow:1px 2px 4px rgba(28,24,20,.3); }

    .hf-a { width:240px;height:160px;top:60px;left:10px;transform:rotate(-1.6deg); }
    .hf-b { width:130px;height:195px;top:40px;left:280px;transform:rotate(1.3deg); }
    .hf-c { width:200px;height:112px;top:250px;left:55px;transform:rotate(.7deg); }
    .hf-d { width:135px;height:90px;top:270px;left:275px;transform:rotate(-1.1deg); }
    .nail-a { top:42px;left:128px; }
    .nail-b { top:22px;left:342px; }
    .nail-c { top:232px;left:152px; }
    .nail-d { top:252px;left:339px; }

    .art-a { background:linear-gradient(160deg,#a8c0d8 0%,#5888b0 35%,#204870 60%,#b89050 85%,#e0c880 100%); }
    .art-b { background:linear-gradient(170deg,#c8c0e8 0%,#9888c8 35%,#604890 65%,#d0b8e8 90%); }
    .art-c { background:linear-gradient(155deg,#b0d0b8 0%,#70a880 35%,#306048 65%,#a0c8a8 90%); }
    .art-d { background:linear-gradient(145deg,#e0d0a8 0%,#c0a060 35%,#887030 65%,#d0b880 90%); }

    .stats-band {
      display:grid;grid-template-columns:repeat(3,1fr);
      border-top:1px solid var(--border);border-bottom:1px solid var(--border);
      background: rgba(255,255,255,0.78);
      backdrop-filter: blur(8px);
      transition: background .6s ease;
    }
    .stat { padding:30px 52px;border-right:1px solid var(--border); }
    .stat:last-child { border-right:none; }
    .stat-num { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:300;color:var(--accent);line-height:1;margin-bottom:5px; }
    .stat-label { font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);transition:color .6s ease; }

    .sec-pad { padding:72px 52px 0; }
    .section-header { display:flex;align-items:baseline;justify-content:space-between;margin-bottom:36px; }
    .section-title { font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:300;color:var(--charcoal);transition:color .6s ease; }
    .section-title em { font-style:italic;color:var(--accent); }
    .section-link { font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .6s ease; }
    .section-link:hover { color:var(--accent); }

    .destinations {
      display:flex;gap:0;overflow-x:auto;
      border:1px solid var(--border);
      background: rgba(255,255,255,0.78);
      backdrop-filter: blur(8px);
      scrollbar-width:none;
      transition: background .6s ease;
    }
    .destinations::-webkit-scrollbar { display:none; }
    .dest-card { flex:0 0 175px;padding:28px 24px;border-right:1px solid var(--border);transition:background .22s;cursor:none; }
    .dest-card:last-child { border-right:none; }
    .dest-card:hover { background:var(--accent-light); }
    .dest-flag { font-size:1.5rem;margin-bottom:10px; }
    .dest-name { font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:300;color:var(--charcoal);margin-bottom:4px;transition:color .6s ease; }
    .dest-status { font-size:.56rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);transition:color .6s ease; }
    .dest-status.upcoming { color:var(--accent); }

    #portfolio { padding:72px 0 80px; }
    .portfolio-grid { display:grid;grid-template-columns:repeat(12,1fr);gap:3px;padding:0 52px; }
    .photo-card { position:relative;overflow:hidden;cursor:none; }
    .photo-bg { width:100%;height:100%;transition:transform .7s cubic-bezier(.25,.46,.45,.94); }
    .photo-card:hover .photo-bg { transform:scale(1.05); }
    .photo-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(26,24,20,.72) 0%,transparent 55%);opacity:0;transition:opacity .35s;display:flex;align-items:flex-end;padding:20px; }
    .photo-card:hover .photo-overlay { opacity:1; }
    .photo-meta { font-size:.6rem;letter-spacing:.14em;color:#faf8f5;text-transform:uppercase; }
    .photo-meta span { display:block;color:rgba(200,160,70,.9);margin-bottom:3px;font-size:.54rem; }

    .pa { background:linear-gradient(160deg,#a8c4e0 0%,#5890b8 35%,#1a5080 60%,#c0a060 85%,#e8d090 100%); }
    .pb { background:linear-gradient(150deg,#b0d0b0 0%,#68a878 35%,#286840 60%,#a8d898 85%,#e0f0d8 100%); }
    .pc { background:linear-gradient(165deg,#c8c0e8 0%,#9888c8 35%,#584890 60%,#c0b0e0 85%,#f0e8ff 100%); }
    .pd { background:linear-gradient(145deg,#e8d890 0%,#c8a838 35%,#907820 60%,#e0c870 85%,#f8f0c8 100%); }
    .pe { background:linear-gradient(155deg,#b0d0e8 0%,#6898c8 35%,#286898 60%,#90c0e0 85%,#d8eef8 100%); }

    #articles { padding-bottom:80px; }
    .articles-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:3px;padding:0 52px; }
    .article-card {
      background: rgba(247,244,239,0.85);
      backdrop-filter: blur(8px);
      border:1px solid var(--border);
      text-decoration:none;color:inherit;cursor:none;
      display:flex;flex-direction:column;
      transition:box-shadow .3s,transform .3s,background .6s ease;
    }
    .article-card:hover { box-shadow:0 10px 40px rgba(28,24,20,.1); transform:translateY(-3px); }
    .article-thumb { aspect-ratio:3/2;overflow:hidden;position:relative; }
    .article-thumb-bg { width:100%;height:100%;transition:transform .6s cubic-bezier(.25,.46,.45,.94); }
    .article-card:hover .article-thumb-bg { transform:scale(1.05); }
    .article-tag {
      position:absolute;top:16px;left:16px;
      background:var(--warm-white);color:var(--charcoal);
      font-size:.54rem;letter-spacing:.2em;text-transform:uppercase;
      padding:5px 10px;
    }
    .article-body { padding:28px 28px 30px;display:flex;flex-direction:column;flex:1; }
    .article-meta { font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted-light);margin-bottom:12px; }
    .article-title {
      font-family:'Cormorant Garamond',serif;
      font-size:1.35rem;font-weight:300;color:var(--charcoal);
      line-height:1.25;margin-bottom:12px;
    }
    .article-excerpt { font-size:.62rem;color:var(--muted);line-height:1.8;margin-bottom:20px;flex:1; }
    .article-read {
      font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;
      color:var(--accent);border-bottom:1px solid var(--accent);
      padding-bottom:2px;align-self:flex-start;
    }
    .articles-placeholder {
      padding:60px 52px;text-align:center;
      border:1px dashed var(--border-strong);
      background: rgba(247,244,239,0.6);
      backdrop-filter: blur(8px);
      margin:0 52px;
      font-size:.65rem;color:var(--muted);line-height:1.9;letter-spacing:.05em;
      transition: background .6s ease, color .6s ease;
    }
    .articles-placeholder em { font-style:italic;color:var(--accent); }

    .country-block { padding:0 52px 60px; }
    .country-label {
      display:flex;align-items:baseline;gap:16px;
      padding-bottom:16px;margin-bottom:20px;
      border-bottom:1px solid var(--border);
    }
    .country-flag { font-size:1.2rem; }
    .country-name {
      font-family:'Cormorant Garamond',serif;
      font-size:1.5rem;font-weight:300;color:var(--charcoal);
      transition:color .6s ease;
    }
    .country-tags {
      font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;
      color:var(--muted-light);
      transition:color .6s ease;
    }

    .country-grid { display:grid;gap:3px; }
    .grid-japan { grid-template-columns:repeat(3,1fr); }
    .grid-wide { grid-template-columns:2fr 1fr; }

    .cg-1,.cg-2,.cg-3 { aspect-ratio:3/2;overflow:hidden;position:relative;cursor:none; }
    .cg-wide { aspect-ratio:16/9;overflow:hidden;position:relative;cursor:none; }
    .cg-tall { aspect-ratio:2/3;overflow:hidden;position:relative;cursor:none; }

    .portfolio-shop-nudge {
      margin:0 52px 72px;
      padding:32px 40px;
      border:1px solid var(--border);
      background: rgba(247,244,239,0.85);
      backdrop-filter: blur(8px);
      display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:16px;
      transition: background .6s ease;
    }
    .nudge-text {
      font-size:.7rem;color:var(--muted);
      letter-spacing:.06em;line-height:1.6;
      transition:color .6s ease;
    }
    .nudge-link {
      font-family:'Cormorant Garamond',serif;
      font-size:1.2rem;font-weight:300;font-style:italic;
      color:var(--charcoal);text-decoration:none;
      border-bottom:1px solid var(--accent);padding-bottom:2px;
      transition:color .6s ease;white-space:nowrap;
    }
    .nudge-link:hover { color:var(--accent); }
    .nudge-link span { font-style:normal;margin-left:6px; }

    #shop { padding-bottom:80px; }
    .shop-header { padding:72px 52px 0; }
    .shop-tabs-row { display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 52px;margin-bottom:48px; }
    .tab-btn { padding:14px 26px;font-family:'DM Mono',monospace;font-size:.61rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);background:none;border:none;border-bottom:2px solid transparent;cursor:none;transition:color .6s ease,border-color .2s; }
    .tab-btn.active { color:var(--charcoal);border-bottom-color:var(--accent); }
    .tab-btn:hover { color:var(--charcoal); }
    .shop-panel { display:none;padding:0 52px; }
    .shop-panel.active { display:block; }

    .framed-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:44px; }
    .framed-product { display:block;text-decoration:none;color:inherit;cursor:none; }
    .framed-mockup {
      background: rgba(232,226,216,0.85);
      backdrop-filter: blur(8px);
      padding:44px 44px 60px;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:22px;
      border:1px solid var(--border);
      transition:box-shadow .3s, background .6s ease;
    }
    .framed-mockup::before { content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(28,24,20,.01) 3px,rgba(28,24,20,.01) 4px); }
    .framed-product:hover .framed-mockup { box-shadow:0 10px 44px rgba(28,24,20,.12); }
    .print-frame { position:relative;background:#fff;padding:4px;box-shadow:0 4px 20px rgba(28,24,20,.1),0 1px 4px rgba(28,24,20,.06);transition:transform .4s; }
    .framed-product:hover .print-frame { transform:translateY(-5px); }
    .print-inner { position:relative;overflow:hidden; }
    .print-inner.landscape { width:190px;height:127px; }
    .print-inner.portrait { width:115px;height:173px; }
    .print-inner.widescreen { width:200px;height:113px; }
    .print-inner::after { content:'';position:absolute;inset:0;border:2.5px solid #fff;pointer-events:none;z-index:2; }
    .print-art { width:100%;height:100%;display:block; }
    .print-frame::before { content:'';position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:1px;height:20px;background:rgba(100,100,100,.3); }
    .print-nail { position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:7px;height:7px;background:radial-gradient(circle at 35% 35%,#ccc,#666);border-radius:50%;z-index:5;box-shadow:0 2px 4px rgba(28,24,20,.3); }
    .print-shadow { position:absolute;bottom:22px;left:50%;transform:translateX(-50%);width:60%;height:10px;background:radial-gradient(ellipse,rgba(28,24,20,.18) 0%,transparent 70%);border-radius:50%; }

    .product-category { font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:8px; }
    .product-name { font-family:'Cormorant Garamond',serif;font-size:1.28rem;font-weight:300;color:var(--charcoal);margin-bottom:8px;line-height:1.2;transition:color .6s ease; }
    .product-desc { font-size:.62rem;color:var(--muted);line-height:1.8;margin-bottom:10px;transition:color .6s ease; }
    .product-note { font-size:.58rem;color:var(--accent);letter-spacing:.06em;line-height:1.6;margin-bottom:16px;font-style:italic; }
    .product-footer { display:flex;align-items:center;justify-content:space-between; }
    .product-price { font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:300;color:var(--charcoal);transition:color .6s ease; }
    .product-price sup { font-size:.78rem;vertical-align:super; }
    .product-buy { font-size:.59rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);border-bottom:1px solid var(--accent);padding-bottom:2px; }

    .wallpaper-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:32px; }
    .wallpaper-product { display:block;text-decoration:none;color:inherit;cursor:none; }
    .phone-wrap { display:flex;justify-content:center;margin-bottom:20px; }
    .phone-shell { width:118px;height:208px;background:linear-gradient(145deg,#2a2522,#1a1814);border-radius:24px;padding:8px 5px;box-shadow:0 0 0 1px rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.04),0 14px 44px rgba(28,24,20,.35),0 4px 12px rgba(28,24,20,.25);position:relative;transition:transform .4s; }
    .wallpaper-product:hover .phone-shell { transform:translateY(-8px) rotate(-1.5deg); }
    .phone-screen { width:100%;height:100%;border-radius:18px;overflow:hidden;position:relative; }
    .phone-island { position:absolute;top:11px;left:50%;transform:translateX(-50%);width:30px;height:8px;background:#1a1814;border-radius:6px;z-index:5; }
    .phone-shell::before { content:'';position:absolute;right:-3px;top:50px;width:3px;height:36px;background:#2a2522;border-radius:0 2px 2px 0; }
    .wp-a { background:linear-gradient(175deg,#0c1828 0%,#183860 28%,#2a6090 55%,#70a0c0 78%,#c0a858 90%,#e0c870 100%); }
    .wp-b { background:linear-gradient(175deg,#180828 0%,#301860 30%,#7050b8 65%,#d0c0f0 88%,#f0eaff 100%); }
    .wp-c { background:linear-gradient(175deg,#081828 0%,#183858 30%,#28709a 55%,#78c0e0 80%,#e8f6ff 100%); }
    .wp-d { background:linear-gradient(175deg,#181008 0%,#382815 28%,#786038 55%,#c8a860 80%,#f0e8c0 100%); }
    .wallpaper-label .product-name { font-size:1.05rem; }
    .wallpaper-label .product-footer { margin-top:10px; }

    #gears { padding-bottom:80px; }
    .gear-intro { font-size:.68rem;color:var(--muted);line-height:2;max-width:580px;margin:0 52px 48px;letter-spacing:.03em;transition:color .6s ease; }

    .gear-categories { display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:0 52px; }
    .gear-cat {
      background: rgba(247,244,239,0.85);
      backdrop-filter: blur(8px);
      border:1px solid var(--border);
      padding:32px 28px;
      transition:box-shadow .25s, background .6s ease;
    }
    .gear-cat:hover { box-shadow:0 6px 32px rgba(28,24,20,.09); }
    .gear-cat-title { font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border); }
    .gear-list { list-style:none;display:flex;flex-direction:column;gap:0; }
    .gear-item { display:flex;align-items:flex-start;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);font-size:.65rem;color:var(--charcoal);line-height:1.5;transition:color .6s ease; }
    .gear-item:last-child { border-bottom:none; }
    .gear-num { font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:300;color:var(--muted-light);min-width:20px;line-height:1.2; }
    .gear-name { flex:1; }
    .gear-name strong { display:block;font-weight:400;color:var(--charcoal);transition:color .6s ease; }
    .gear-name span { font-size:.58rem;color:var(--muted);letter-spacing:.06em;transition:color .6s ease; }

    .about-section { display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);margin:0 52px;background:rgba(240,235,226,0.7);backdrop-filter:blur(8px);transition:background .6s ease; }
    .about-text { padding:68px 52px 68px 0;border-right:1px solid var(--border); }
    .about-text h2 { font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,3.2vw,2.7rem);font-weight:300;color:var(--charcoal);margin-bottom:26px;line-height:1.15;transition:color .6s ease; }
    .about-text h2 em { font-style:italic;color:var(--accent); }
    .about-text p { font-size:.67rem;color:var(--muted);line-height:2.1;margin-bottom:16px;letter-spacing:.03em;transition:color .6s ease; }
    .badge-tag { display:inline-block;border:1px solid var(--border-strong);color:var(--muted);font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;padding:5px 12px;margin:4px 4px 0 0;transition:color .6s ease,border-color .6s ease; }
    .about-visual { padding:68px 0 68px 52px;display:flex;flex-direction:column;justify-content:center;gap:36px; }
    .profile-frame {
      position:relative;
      width:200px;height:200px;
      border-radius:50%;
      overflow:hidden;
      background:#ffffff;
      align-self:flex-start;
      box-shadow:0 6px 28px rgba(28,24,20,.12),0 2px 8px rgba(28,24,20,.08);
      border:3px solid #ffffff;
    }
    .profile-img { display:block;width:100%;height:100%;object-fit:cover; }
    .profile-caption { max-width:380px; }
    .about-quote { font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,2.5vw,1.9rem);font-style:italic;font-weight:300;color:var(--charcoal);line-height:1.55;margin-bottom:20px;transition:color .6s ease; }
    .about-divider { width:40px;height:1px;background:var(--accent);margin-bottom:16px; }
    .about-quote-attr { font-size:.58rem;letter-spacing:.24em;color:var(--accent);text-transform:uppercase; }
    .about-quote-attr .dot { display:inline-block;margin:0 10px;opacity:.6; }

    #contact { padding:90px 52px; text-align:center; }
    .contact-eyebrow { font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:22px; }
    .contact-title { font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.8vw,3.8rem);font-weight:300;color:var(--charcoal);line-height:1.1;margin-bottom:26px;transition:color .6s ease; }
    .contact-title em { font-style:italic;color:var(--accent); }
    .contact-sub { font-size:.68rem;color:var(--muted);line-height:1.95;max-width:520px;margin:0 auto 40px;letter-spacing:.03em;transition:color .6s ease; }
    .contact-email {
      display:inline-block;
      font-family:'Cormorant Garamond',serif;
      font-size:clamp(1.8rem,3.6vw,2.8rem);
      font-weight:300;font-style:italic;
      color:var(--charcoal);text-decoration:none;
      padding:18px 40px;
      border-top:1px solid var(--border);border-bottom:1px solid var(--border);
      transition:color .6s ease,border-color .6s ease;
      margin-bottom:32px;
    }
    .contact-email:hover { color:var(--accent);border-color:var(--accent); }
    .contact-note { font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted-light);margin-top:12px;transition:color .6s ease; }

    .insta-section { padding:80px 52px;border-top:1px solid var(--border); }
    .insta-grid { display:grid;grid-template-columns:repeat(6,1fr);gap:3px;margin-bottom:40px; }
    .insta-cell { aspect-ratio:1;overflow:hidden;cursor:none;position:relative; }
    .insta-bg { width:100%;height:100%;transition:transform .5s; }
    .insta-cell:hover .insta-bg { transform:scale(1.08); }
    .insta-overlay { position:absolute;inset:0;background:rgba(26,24,20,.38);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;font-size:1.4rem;color:var(--cream); }
    .insta-cell:hover .insta-overlay { opacity:1; }
    .ig-1 { background:linear-gradient(135deg,#b0c8e0,#3878a8); }
    .ig-2 { background:linear-gradient(135deg,#b8d0b8,#388858); }
    .ig-3 { background:linear-gradient(135deg,#c8c0e8,#6858b0); }
    .ig-4 { background:linear-gradient(135deg,#e8d890,#a07820); }
    .ig-5 { background:linear-gradient(135deg,#b0d0e8,#3080b0); }
    .ig-6 { background:linear-gradient(135deg,#e0c8a8,#a06830); }
    .insta-cta { text-align:center; }
    .insta-handle { font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3vw,2.6rem);font-style:italic;color:var(--muted);margin-bottom:20px;transition:color .6s ease; }
    .insta-handle a { color:var(--charcoal);text-decoration:none;transition:color .6s ease; }
    .insta-handle a:hover { color:var(--accent); }

    footer { border-top:1px solid var(--border);background:rgba(0,0,0,0.3);backdrop-filter:blur(8px);padding:40px 52px;display:flex;align-items:center;justify-content:space-between;transition:background .6s ease; }
    .footer-logo { font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:.14em;color:var(--muted);transition:color .6s ease; }
    .footer-logo span { color:var(--accent); }
    .footer-links { display:flex;gap:22px;list-style:none; }
    .footer-links a { font-size:.57rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .6s ease; }
    .footer-links a:hover { color:var(--accent); }
    .footer-copy { font-size:.57rem;color:var(--muted-light);transition:color .6s ease; }

    body.scroll-mid .section-title,
    body.scroll-mid .country-name,
    body.scroll-mid .about-text h2,
    body.scroll-mid .contact-title,
    body.scroll-mid .article-title,
    body.scroll-mid .product-name,
    body.scroll-mid .about-quote,
    body.scroll-mid .insta-handle a,
    body.scroll-mid .gear-name strong,
    body.scroll-mid .gear-item,
    body.scroll-mid .product-price,
    body.scroll-mid .dest-name { color: #f0f6fb; }

    body.scroll-mid .hero-sub,
    body.scroll-mid .about-text p,
    body.scroll-mid .product-desc,
    body.scroll-mid .nudge-text,
    body.scroll-mid .gear-intro,
    body.scroll-mid .contact-sub,
    body.scroll-mid .articles-placeholder,
    body.scroll-mid .gear-name span,
    body.scroll-mid .dest-status { color: rgba(240,246,251,0.75); }

    body.scroll-mid .section-link,
    body.scroll-mid .footer-copy,
    body.scroll-mid .contact-note,
    body.scroll-mid .insta-handle,
    body.scroll-mid .article-meta,
    body.scroll-mid .badge-tag { color: rgba(240,246,251,0.6); }

    body.scroll-mid .badge-tag { border-color: rgba(240,246,251,0.3); }

    body.scroll-mid .stats-band,
    body.scroll-mid .destinations,
    body.scroll-mid .gear-cat,
    body.scroll-mid .article-card,
    body.scroll-mid .articles-placeholder,
    body.scroll-mid .portfolio-shop-nudge,
    body.scroll-mid .framed-mockup,
    body.scroll-mid .about-section { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); }

    body.scroll-mid .stat-num { color: #ffd27a; }

    body.scroll-deep .section-title,
    body.scroll-deep .country-name,
    body.scroll-deep .contact-title,
    body.scroll-deep .insta-handle a { color: #ffffff; }

    body.scroll-deep .contact-email { color:#ffffff; border-color:rgba(255,255,255,0.25); }

    body.scroll-deep nav {
      background: rgba(0,0,0,0.6) !important;
      border-bottom-color: rgba(255,255,255,0.08);
    }
    body.scroll-deep .nav-logo { color: #ffffff; }
    body.scroll-deep .nav-links a { color: rgba(255,255,255,0.7); }
    body.scroll-deep .nav-cta { background: var(--accent); }

    body.scroll-deep footer { background: rgba(0,0,0,0.6); }
    body.scroll-deep .footer-logo,
    body.scroll-deep .footer-links a { color: rgba(255,255,255,0.7); }
    body.scroll-deep .footer-copy { color: rgba(255,255,255,0.4); }

    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .reveal { opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease; }
    .reveal.visible { opacity:1;transform:translateY(0); }

    @media(max-width:768px){
      nav{padding:16px 20px;}
      .nav-links{display:none;}
      .nav-cta{display:none;}
      .menu-toggle{display:block;}
      .mobile-menu{display:flex;}
      body{cursor:auto;}
      .cursor,.cursor-ring{display:none;}
      a,button{cursor:pointer !important;}
      .hero{flex-direction:column;padding:100px 24px 56px;gap:40px;}
      .wall-scene{width:320px;height:270px;}
      .hf-a{width:165px;height:110px;left:5px;top:50px;}
      .hf-b{width:90px;height:135px;left:185px;top:35px;}
      .hf-c{width:140px;height:79px;top:185px;left:40px;}
      .hf-d{width:95px;height:63px;top:200px;left:195px;}
      .nail-a{top:32px;left:87px;} .nail-b{top:17px;left:230px;} .nail-c{top:167px;left:110px;} .nail-d{top:182px;left:243px;}
      .stats-band{grid-template-columns:1fr;} .stat{border-right:none;border-bottom:1px solid var(--border);padding:22px 24px;}
      .country-block{padding:0 24px 44px;}
      .country-tags{display:none;}
      .grid-japan{grid-template-columns:1fr 1fr;}
      .cg-3{display:none;}
      .grid-wide{grid-template-columns:1fr;}
      .cg-tall{aspect-ratio:3/2;}
      .portfolio-shop-nudge{margin:0 24px 48px;padding:24px;flex-direction:column;text-align:center;}
      .shop-header{padding:48px 24px 0;} .shop-tabs-row{padding:0 24px;overflow-x:auto;}
      .shop-panel{padding:0 24px;}
      .articles-grid{padding:0 24px;grid-template-columns:1fr;}
      .articles-placeholder{margin:0 24px;padding:40px 24px;}
      .framed-grid{grid-template-columns:1fr;gap:44px;}
      .wallpaper-grid{grid-template-columns:repeat(2,1fr);}
      .gear-intro,.gear-categories{margin:0 24px 32px;}
      .gear-categories{grid-template-columns:1fr;}
      .about-section{margin:0 24px;grid-template-columns:1fr;}
      .about-text{padding:44px 0;border-right:none;border-bottom:1px solid var(--border);}
      .about-visual{padding:44px 0;}
      #contact{padding:56px 24px;} .contact-email{font-size:1.4rem;padding:16px 20px;}
      .insta-section{padding:56px 24px;} .insta-grid{grid-template-columns:repeat(3,1fr);}
      footer{padding:30px 24px;flex-direction:column;gap:18px;text-align:center;}
      .footer-links{flex-wrap:wrap;justify-content:center;}
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
      <li><a href="#shop">Shop</a></li>
      <li><a href="#articles">Articles</a></li>
      <li><a href="#gears">Gears</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="https://instagram.com/being_lloyds" target="_blank">Instagram</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Contact</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="#portfolio" onclick="closeMobileMenu()">Portfolio</a>
    <a href="#shop" onclick="closeMobileMenu()"><em>Shop</em></a>
    <a href="#articles" onclick="closeMobileMenu()">Articles</a>
    <a href="#gears" onclick="closeMobileMenu()">Gears</a>
    <a href="#about" onclick="closeMobileMenu()">About</a>
    <a href="https://instagram.com/being_lloyds" target="_blank" onclick="closeMobileMenu()">Instagram</a>
    <a href="#contact" class="mobile-menu-cta" onclick="closeMobileMenu()">Contact</a>
  </div>

  <section class="hero">
    <div class="hero-left">
      <p class="hero-eyebrow">solloyd.com — Travel, Sun/Moon & Portraits</p>
      <h1 class="hero-title">
        <span class="line">Light finds those</span>
        <span class="line">who <em>chase</em> it.</span>
        <span class="line line-sub">Moments find those</span>
        <span class="line line-sub">who <em>waited</em>.</span>
      </h1>
      <p class="hero-sub">
        A part-time travel photographer who carries 10kg worth of <a href="#gears">gears</a> in his trusty bag to inspire you to explore. Available as high-res digital prints and mobile wallpapers in the <a href="#shop">shop</a>.
        <br>
        <span class="badge">✦ Never made by AI</span>
      </p>
      <div class="hero-actions">
        <a href="#shop" class="btn-dark">Shop Prints</a>
        <a href="#portfolio" class="btn-outline">View Portfolio</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="wall-scene">
        <div class="nail nail-a"></div>
        <div class="nail nail-b"></div>
        <div class="nail nail-c"></div>
        <div class="nail nail-d"></div>
        <div class="hframe hf-a"><div class="hframe-inner art-a"></div></div>
        <div class="hframe hf-b"><div class="hframe-inner art-b"></div></div>
        <div class="hframe hf-c"><div class="hframe-inner art-c"></div></div>
        <div class="hframe hf-d"><div class="hframe-inner art-d"></div></div>
      </div>
    </div>
  </section>

  <div class="stats-band reveal">
    <div class="stat"><div class="stat-num">23.5K</div><div class="stat-label">Instagram Followers</div></div>
    <div class="stat"><div class="stat-num">100,000+</div><div class="stat-label">Shots Taken</div></div>
    <div class="stat"><div class="stat-num">∞</div><div class="stat-label">Moments Worth Waiting For</div></div>
  </div>

  <div class="sec-pad reveal">
    <div class="section-header">
      <h2 class="section-title">Where I've <em>Shot</em></h2>
    </div>
    <div class="destinations">
      <div class="dest-card"><div class="dest-flag">🇯🇵</div><div class="dest-name">Japan</div><div class="dest-status">Culture · Streets · Winter</div></div>
      <div class="dest-card"><div class="dest-flag">🇸🇬</div><div class="dest-name">Singapore</div><div class="dest-status">Sun/Moon · Street · Architecture</div></div>
      <div class="dest-card"><div class="dest-flag">🇭🇰</div><div class="dest-name">Hong Kong</div><div class="dest-status">Culture · Taxis · Streets</div></div>
      <div class="dest-card"><div class="dest-flag">🇹🇭</div><div class="dest-name">Thailand</div><div class="dest-status">Culture · Streets</div></div>
      <div class="dest-card"><div class="dest-flag">🇲🇾</div><div class="dest-name">Malaysia</div><div class="dest-status">Sun · Aerial · Cityscape</div></div>
      <div class="dest-card"><div class="dest-flag">🇻🇳</div><div class="dest-name">Vietnam</div><div class="dest-status">Culture · Streets · Nature</div></div>
      <div class="dest-card"><div class="dest-flag">🇮🇩</div><div class="dest-name">Indonesia</div><div class="dest-status">Nature · Hike · Aerial</div></div>
      <div class="dest-card"><div class="dest-flag">🇳🇴</div><div class="dest-name">Norway</div><div class="dest-status upcoming">↑ Coming Soon — Late 2026</div></div>
    </div>
  </div>

  <section id="portfolio">
    <div class="sec-pad reveal">
      <div class="section-header" style="margin-bottom:0;">
        <h2 class="section-title">Featured <em>Work</em></h2>
      </div>
    </div>
    <div style="height:36px;"></div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇯🇵</span><span class="country-name">Japan</span><span class="country-tags">Culture · Streets · Winter</span></div>
      <div class="country-grid grid-japan">
        <div class="photo-card cg-1"><div class="photo-bg pa" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Japan</span>Long Exposure · Winter</div></div></div>
        <div class="photo-card cg-2"><div class="photo-bg pb" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Japan</span>Street · Culture</div></div></div>
        <div class="photo-card cg-3"><div class="photo-bg pc" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Japan</span>Milky Way</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇸🇬</span><span class="country-name">Singapore</span><span class="country-tags">Sun/Moon · Street · Architecture</span></div>
      <div class="country-grid grid-wide">
        <div class="photo-card cg-wide"><div class="photo-bg pd" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Singapore</span>Architecture · Night</div></div></div>
        <div class="photo-card cg-tall"><div class="photo-bg pe" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Singapore</span>Sun/Moon</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇭🇰</span><span class="country-name">Hong Kong</span><span class="country-tags">Culture · Taxis · Streets</span></div>
      <div class="country-grid grid-japan">
        <div class="photo-card cg-1"><div class="photo-bg pa" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Hong Kong</span>Streets · Neon</div></div></div>
        <div class="photo-card cg-2"><div class="photo-bg pb" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Hong Kong</span>Taxis · Culture</div></div></div>
        <div class="photo-card cg-3"><div class="photo-bg pc" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Hong Kong</span>Cityscape</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇹🇭</span><span class="country-name">Thailand</span><span class="country-tags">Culture · Streets</span></div>
      <div class="country-grid grid-wide">
        <div class="photo-card cg-wide"><div class="photo-bg pe" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Thailand</span>Culture · Streets</div></div></div>
        <div class="photo-card cg-tall"><div class="photo-bg pd" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Thailand</span>Golden Hour</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇲🇾</span><span class="country-name">Malaysia</span><span class="country-tags">Sun · Aerial · Cityscape</span></div>
      <div class="country-grid grid-japan">
        <div class="photo-card cg-1"><div class="photo-bg pb" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Malaysia</span>Aerial · Cityscape</div></div></div>
        <div class="photo-card cg-2"><div class="photo-bg pc" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Malaysia</span>Sun · Landscape</div></div></div>
        <div class="photo-card cg-3"><div class="photo-bg pa" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Malaysia</span>Nature</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇻🇳</span><span class="country-name">Vietnam</span><span class="country-tags">Culture · Streets · Nature</span></div>
      <div class="country-grid grid-wide">
        <div class="photo-card cg-wide"><div class="photo-bg pa" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Vietnam</span>Streets · Culture</div></div></div>
        <div class="photo-card cg-tall"><div class="photo-bg pe" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Vietnam</span>Nature · Golden Hour</div></div></div>
      </div>
    </div>

    <div class="country-block reveal">
      <div class="country-label"><span class="country-flag">🇮🇩</span><span class="country-name">Indonesia</span><span class="country-tags">Nature · Hike · Aerial</span></div>
      <div class="country-grid grid-japan">
        <div class="photo-card cg-1"><div class="photo-bg pc" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Indonesia</span>Mt Bromo · Aerial</div></div></div>
        <div class="photo-card cg-2"><div class="photo-bg pd" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Indonesia</span>Nature · Hike</div></div></div>
        <div class="photo-card cg-3"><div class="photo-bg pb" style="height:100%;"></div><div class="photo-overlay"><div class="photo-meta"><span>Indonesia</span>Landscape</div></div></div>
      </div>
    </div>

    <div class="portfolio-shop-nudge reveal">
      <p class="nudge-text">Interested in bringing these moments home?</p>
      <a href="#shop" class="nudge-link">Shop digital prints here <span>→</span></a>
    </div>
  </section>

  <section id="shop">
    <div class="shop-header reveal">
      <div class="section-header">
        <h2 class="section-title">The <em>Shop</em></h2>
        <a href="https://gumroad.com" target="_blank" class="section-link">All products on Gumroad →</a>
      </div>
    </div>
    <div class="shop-tabs-row">
      <button class="tab-btn active" onclick="switchTab('prints',this)">🖼&nbsp; Digital Prints</button>
      <button class="tab-btn" onclick="switchTab('wallpaper',this)">📱&nbsp; Mobile Wallpapers</button>
    </div>
    <div class="shop-panel active" id="panel-prints">
      <div class="framed-grid">
        <a href="https://gumroad.com" target="_blank" class="framed-product reveal">
          <div class="framed-mockup"><div class="print-nail"></div><div class="print-frame"><div class="print-inner landscape"><div class="print-art pa" style="height:100%;"></div></div></div><div class="print-shadow"></div></div>
          <div><p class="product-category">Digital Print · Landscape</p><h3 class="product-name">Milky Way over Japan</h3><p class="product-desc">Long-exposure Milky Way from rural Japan. High-resolution digital download. Personal use licence included.</p><p class="product-note">✦ Email me at hello@solloyd.com for high-res A1 & A2 print files</p><div class="product-footer"><span class="product-buy">Enquire →</span></div></div>
        </a>
        <a href="https://gumroad.com" target="_blank" class="framed-product reveal">
          <div class="framed-mockup"><div class="print-nail"></div><div class="print-frame"><div class="print-inner portrait"><div class="print-art pc" style="height:100%;"></div></div></div><div class="print-shadow"></div></div>
          <div><p class="product-category">Digital Print · Cityscape</p><h3 class="product-name">Singapore After Dark</h3><p class="product-desc">City lights across Marina Bay. Portrait orientation — ideal for hallway or bedroom display. High-resolution digital download.</p><p class="product-note">✦ Email me at hello@solloyd.com for high-res A1 & A2 print files</p><div class="product-footer"><span class="product-buy">Enquire →</span></div></div>
        </a>
        <a href="https://gumroad.com" target="_blank" class="framed-product reveal">
          <div class="framed-mockup"><div class="print-nail"></div><div class="print-frame"><div class="print-inner widescreen"><div class="print-art pd" style="height:100%;"></div></div></div><div class="print-shadow"></div></div>
          <div><p class="product-category">Print Bundle · 5 Prints</p><h3 class="product-name">Asia Collection</h3><p class="product-desc">Five curated shots from Japan, Vietnam, Thailand, Malaysia, and Singapore. Cohesive warm palette. Save 35% vs singles.</p><p class="product-note">✦ Email me at hello@solloyd.com for high-res A1 & A2 print files</p><div class="product-footer"><span class="product-buy">Enquire →</span></div></div>
        </a>
      </div>
    </div>
    <div class="shop-panel" id="panel-wallpaper">
      <div class="wallpaper-grid">
        <a href="https://gumroad.com" target="_blank" class="wallpaper-product reveal"><div class="phone-wrap"><div class="phone-shell"><div class="phone-island"></div><div class="phone-screen wp-a"></div></div></div><div class="wallpaper-label"><p class="product-category">Mobile Wallpaper</p><h3 class="product-name">Milky Way, Japan</h3><div class="product-footer"><span class="product-buy">Enquire →</span></div></div></a>
        <a href="https://gumroad.com" target="_blank" class="wallpaper-product reveal"><div class="phone-wrap"><div class="phone-shell"><div class="phone-island"></div><div class="phone-screen wp-b"></div></div></div><div class="wallpaper-label"><p class="product-category">Mobile Wallpaper</p><h3 class="product-name">Singapore Skyline</h3><div class="product-footer"><span class="product-buy">Enquire →</span></div></div></a>
        <a href="https://gumroad.com" target="_blank" class="wallpaper-product reveal"><div class="phone-wrap"><div class="phone-shell"><div class="phone-island"></div><div class="phone-screen wp-c"></div></div></div><div class="wallpaper-label"><p class="product-category">Mobile Wallpaper</p><h3 class="product-name">Vietnam Coast</h3><div class="product-footer"><span class="product-buy">Enquire →</span></div></div></a>
        <a href="https://gumroad.com" target="_blank" class="wallpaper-product reveal"><div class="phone-wrap"><div class="phone-shell"><div class="phone-island"></div><div class="phone-screen wp-d"></div></div></div><div class="wallpaper-label"><p class="product-category">Wallpaper Pack · 5 screens</p><h3 class="product-name">Asia Pack</h3><div class="product-footer"><span class="product-buy">Enquire →</span></div></div></a>
      </div>
    </div>
  </section>

  <section id="articles">
    <div class="sec-pad reveal">
      <div class="section-header">
        <h2 class="section-title">Field <em>Notes</em></h2>
        <a href="#articles" class="section-link">All Articles →</a>
      </div>
    </div>
    <div class="articles-placeholder reveal">
      <p>Writing in progress — <em>stories, gear reviews, and location guides on the way.</em></p>
      <p style="margin-top:10px;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-light);">Follow <a href="https://instagram.com/being_lloyds" target="_blank" style="color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent);">@being_lloyds</a> for updates</p>
    </div>
  </section>

  <section id="gears">
    <div class="sec-pad reveal">
      <div class="section-header"><h2 class="section-title">The <em>Gears</em></h2></div>
    </div>
    <p class="gear-intro reveal">Roughly 10kg on the back at any given time. These are the tools I actually reach for — chosen over time through trial, error, and a few expensive lessons. Just what's in the bag.</p>
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
  </section>

  <section id="about">
    <div style="padding:80px 52px 0;" class="reveal">
      <div class="section-header"><h2 class="section-title">The <em>Story</em></h2></div>
    </div>
    <div class="about-section reveal">
      <div class="about-text">
        <h2>Fitness enthusiast.<br><em>Accidental photographer.</em><br>Moment chaser.</h2>
        <p>I've always wanted to own a camera since I was young — it was only when my career in the fitness industry stabilised that I finally bought my first, and two weeks later a dear friend convinced me to futureproof the system. I did.</p>
        <p>The first year was genuinely bad. Trial, error, and a lot of replicating the work of photographers I admired — trying to reverse-engineer what they were thinking when they pressed the shutter. Editing thousands of photos in that first year did something unexpected: it rapidly sharpened my creative instinct, and changed how I see the world through a viewfinder.</p>
        <p>Now I'm a part-time travel photographer obsessed with creating wall-hung-standard images in places I could never see from Singapore. I believe in waiting for the right moment — to create the unforgettable secret.</p>
        <div style="margin-top:22px;">
          <span class="badge-tag">Travel Photography</span>
          <span class="badge-tag">Landscape</span>
          <span class="badge-tag">Long Exposure</span>
          <span class="badge-tag">Astrophotography</span>
          <span class="badge-tag">Lightroom</span>
          <span class="badge-tag">Fitness & Gym</span>
        </div>
      </div>
      <div class="about-visual">
        <div class="profile-frame">
          <div class="profile-img" style="background:linear-gradient(135deg,#a8c4e0,#1a5080);"></div>
        </div>
        <div class="profile-caption">
          <p class="about-quote">"Light finds those who chase it. Moments find those who waited."</p>
          <div class="about-divider"></div>
          <p class="about-quote-attr">Lloyd<span class="dot">·</span>@being_lloyds</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact">
    <p class="contact-eyebrow reveal">— Get in Touch</p>
    <h2 class="contact-title reveal">Let's make something<br><em>meaningful.</em></h2>
    <p class="contact-sub reveal">For physical prints, collaborations, work, or just to say hi — drop a message and I'll get back within 24 hours.</p>
    <a href="mailto:hello@solloyd.com" class="contact-email reveal">hello@solloyd.com</a>
    <p class="contact-note reveal">Based in Singapore · Available worldwide</p>
  </section>

  <section>
    <div class="insta-section">
      <div class="section-header reveal"><h2 class="section-title">Follow the <em>Journey</em></h2></div>
      <div class="insta-grid">
        <div class="insta-cell"><div class="insta-bg ig-1"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg ig-2"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg ig-3"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg ig-4"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg ig-5"></div><div class="insta-overlay">＋</div></div>
        <div class="insta-cell"><div class="insta-bg ig-6"></div><div class="insta-overlay">＋</div></div>
      </div>
      <div class="insta-cta">
        <p class="insta-handle"><a href="https://instagram.com/being_lloyds" target="_blank">@being_lloyds</a></p>
        <a href="https://instagram.com/being_lloyds" target="_blank" class="btn-outline">Follow on Instagram</a>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-logo">SO LLOYD'S<span>.</span></div>
    <ul class="footer-links">
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#shop">Shop</a></li>
      <li><a href="#articles">Articles</a></li>
      <li><a href="#gears">Gears</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="https://instagram.com/being_lloyds" target="_blank">Instagram</a></li>
    </ul>
    <p class="footer-copy">© 2026 solloyd.com · All rights reserved.</p>
  </footer>

  <script>
    const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
    (function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
    document.querySelectorAll('a,button').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cursor.style.width='18px';cursor.style.height='18px';ring.style.width='50px';ring.style.height='50px';});
      el.addEventListener('mouseleave',()=>{cursor.style.width='8px';cursor.style.height='8px';ring.style.width='32px';ring.style.height='32px';});
    });
    const menuToggle=document.getElementById('menuToggle');
    const mobileMenu=document.getElementById('mobileMenu');
    function closeMobileMenu(){menuToggle.classList.remove('open');mobileMenu.classList.remove('open');document.body.style.overflow='';}
    menuToggle.addEventListener('click',()=>{const isOpen=menuToggle.classList.toggle('open');mobileMenu.classList.toggle('open');document.body.style.overflow=isOpen?'hidden':'';});
    function switchTab(tab,btn){document.querySelectorAll('.tab-btn').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.shop-panel').forEach(p=>p.classList.remove('active'));const panel=document.getElementById('panel-'+tab);if(panel){panel.classList.add('active');}btn.classList.add('active');}
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.07});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    window.addEventListener('scroll',()=>{const max=document.body.scrollHeight-window.innerHeight;const pct=window.scrollY/max;document.body.classList.toggle('scroll-mid',pct>0.30);document.body.classList.toggle('scroll-deep',pct>0.78);},{passive:true});
    document.addEventListener('contextmenu',e=>{if(e.target.tagName==='IMG'||e.target.classList.contains('photo-bg')||e.target.classList.contains('print-art')||e.target.classList.contains('insta-bg')||e.target.classList.contains('profile-img')){e.preventDefault();return false;}});
    document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG'||e.target.classList.contains('photo-bg')||e.target.classList.contains('print-art')||e.target.classList.contains('insta-bg')||e.target.classList.contains('profile-img')){e.preventDefault();return false;}});
    document.querySelectorAll('img,.photo-bg,.print-art,.insta-bg,.profile-img,.photo-card,.product-image,.hframe').forEach(el=>{el.style.userSelect='none';el.style.webkitUserSelect='none';el.style.webkitUserDrag='none';el.setAttribute('draggable','false');});
  </script>

</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
