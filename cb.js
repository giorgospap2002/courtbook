/* ════════════════════════════════════════════════════════════
   CourtBook — Shared helpers (Supabase client, toast, auth)
   Loaded after: supabase-js CDN + config.js
   ════════════════════════════════════════════════════════════ */

const sb = window.supabase.createClient(
    CB_CONFIG.SUPABASE_URL,
    CB_CONFIG.SUPABASE_ANON_KEY
);

/* ── Toast ───────────────────────────────────────────────── */
function cbToast(msg, type = 'ok') {
    let wrap = document.getElementById('cb-toasts');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'cb-toasts';
        wrap.style.cssText = 'position:fixed;bottom:20px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:320px';
        document.body.appendChild(wrap);
    }
    const err = type === 'err';
    const el = document.createElement('div');
    el.style.cssText = `display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:12px;
        box-shadow:0 8px 30px rgba(0,0,0,.15);font-size:14px;font-weight:500;
        background:${err ? '#ef4444' : '#fff'};color:${err ? '#fff' : '#1e293b'};
        border:1px solid ${err ? '#ef4444' : '#e2e8f0'};animation:cbSlide .25s ease both`;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 3600);
}

/* ── Loading overlay ─────────────────────────────────────── */
let _cbLoadN = 0;
function cbLoading(show) {
    _cbLoadN = Math.max(0, _cbLoadN + (show ? 1 : -1));
    let el = document.getElementById('cb-loading');
    if (!el) {
        el = document.createElement('div');
        el.id = 'cb-loading';
        el.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);z-index:9998;display:none;align-items:center;justify-content:center';
        el.innerHTML = '<div style="width:38px;height:38px;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:cbSpin .7s linear infinite"></div>';
        document.body.appendChild(el);
    }
    el.style.display = _cbLoadN > 0 ? 'flex' : 'none';
}

/* ── Inject keyframes once ───────────────────────────────── */
(function () {
    const s = document.createElement('style');
    s.textContent = '@keyframes cbSpin{to{transform:rotate(360deg)}}@keyframes cbSlide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}';
    document.head.appendChild(s);
})();

/* ── Auth helpers ────────────────────────────────────────── */
async function cbCurrentUser() {
    const { data } = await sb.auth.getUser();
    return data?.user || null;
}

async function cbSignUp(email, password, name, phone, clubId, level) {
    const { data, error } = await sb.auth.signUp({
        email, password,
        options: { data: { name, phone, club_id: clubId || null, level: (level ?? null) } }
    });
    if (error) throw error;
    return data;
}

async function cbSignIn(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function cbSignOut() {
    await sb.auth.signOut();
}

/* ── Config check ────────────────────────────────────────── */
function cbConfigured() {
    return CB_CONFIG.SUPABASE_URL.includes('supabase.co')
        && !CB_CONFIG.SUPABASE_URL.includes('YOUR-PROJECT')
        && !CB_CONFIG.SUPABASE_ANON_KEY.includes('YOUR-ANON');
}

/* ── Utils ───────────────────────────────────────────────── */
function cbToday()      { return new Date().toISOString().split('T')[0]; }
function cbValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function cbValidPhone(p){ return /^[0-9+\s\-]{10,15}$/.test(p); }
function cbT2M(t)        { const [h,m] = t.split(':').map(Number); return h*60+m; }
function cbM2T(m)        { return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`; }
function cbFmtDate(str)  { return new Date(str+'T12:00:00').toLocaleDateString('el-GR',{weekday:'short',day:'numeric',month:'short'}); }
function cbQS(name)      { return new URLSearchParams(location.search).get(name); }
function cbSlugify(s) {
    return s.toLowerCase().trim()
        .replace(/[άαà]/g,'a').replace(/[έεè]/g,'e').replace(/[ήηίϊîì]/g,'i')
        .replace(/[όοò]/g,'o').replace(/[ύυϋù]/g,'y').replace(/ω/g,'w')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40);
}
