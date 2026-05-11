import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import NahidFooter from "../components/NahidFooter";

export const AVATARS = [
  { id: "bloom",    icon: "🌸", bg: "linear-gradient(135deg,#FECDD3,#FB7185)", label: "Bloom"    },
  { id: "amber",    icon: "🔮", bg: "linear-gradient(135deg,#FDE68A,#FBBF24)", label: "Amber"    },
  { id: "oud",      icon: "🌿", bg: "linear-gradient(135deg,#A7F3D0,#10B981)", label: "Oud"      },
  { id: "mystique", icon: "✦",  bg: "linear-gradient(135deg,#DDD6FE,#7C3AED)", label: "Mystique" },
  { id: "rose",     icon: "🌹", bg: "linear-gradient(135deg,#FECDD3,#E11D48)", label: "Rose"     },
  { id: "soleil",   icon: "☀️", bg: "linear-gradient(135deg,#FEF08A,#EAB308)", label: "Soleil"   },
  { id: "marine",   icon: "💎", bg: "linear-gradient(135deg,#BAE6FD,#0284C7)", label: "Marine"   },
  { id: "nature",   icon: "🌲", bg: "linear-gradient(135deg,#BBF7D0,#059669)", label: "Nature"   },
];

const Toast = Swal.mixin({
  toast: true, position: "top-end", showConfirmButton: false,
  timer: 3500, timerProgressBar: true,
  didOpen: t => { t.addEventListener("mouseenter", Swal.stopTimer); t.addEventListener("mouseleave", Swal.resumeTimer); },
});

const EMPTY = { first_name: "", last_name: "", avatar: "bloom", message: "", rating: 5 };

export default function Reviews() {
  const navigate = useNavigate();
  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = "Prénom requis";
    if (!form.last_name.trim())  e.last_name  = "Nom requis";
    if (!form.message.trim())    e.message    = "Message requis";
    else if (form.message.trim().length < 10) e.message = "Minimum 10 caractères";
    if (!form.rating)            e.rating     = "Note requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await axios.post("/api/reviews", form);
      setDone(true);
    } catch (err) {
      const msg = err.response?.data?.error
        || (err.response ? `Erreur ${err.response.status}` : "Impossible de joindre le serveur");
      Toast.fire({ icon: "error", title: msg });
      console.error("[POST /api/reviews]", err.response?.status, err.response?.data);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="rv-hero">
        <div className="rv-hero-orb rv-orb-1" />
        <div className="rv-hero-orb rv-orb-2" />
        <div className="rv-hero-inner">
          <span className="rv-eyebrow">✦ TÉMOIGNAGES</span>
          <h1 className="rv-hero-title">Partagez votre expérience</h1>
          <p className="rv-hero-sub">
            Votre avis aide notre communauté à découvrir les parfums qui leur correspondent.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="rv-section">
        <div className="rv-container">

          {done ? (
            /* ── SUCCESS STATE ── */
            <div className="rv-success">
              <div className="rv-success-icon">✓</div>
              <h2 className="rv-success-title">Merci pour votre avis !</h2>
              <p className="rv-success-sub">
                Votre témoignage sera visible .
              </p>
              <div className="rv-success-actions">
                <button className="rv-btn-primary" onClick={() => { setForm(EMPTY); setDone(false); }}>
                  Soumettre un autre avis
                </button>
                <button className="rv-btn-ghost" onClick={() => navigate("/")}>
                  Retour à l'accueil
                </button>
              </div>
            </div>
          ) : (
            <form className="rv-form-card" onSubmit={handleSubmit} noValidate>

              {/* ── SECTION: Identity ── */}
              <div className="rv-form-section-label">01 — Votre identité</div>
              <div className="rv-grid-2">
                <div className="rv-field">
                  <label className="rv-lbl">Prénom <span className="rv-req">*</span></label>
                  <input
                    className={`rv-input${errors.first_name ? " rv-input-err" : ""}`}
                    type="text" placeholder="Yasmine" value={form.first_name}
                    onChange={set("first_name")} maxLength={100}
                  />
                  {errors.first_name && <span className="rv-err-msg">{errors.first_name}</span>}
                </div>
                <div className="rv-field">
                  <label className="rv-lbl">Nom <span className="rv-req">*</span></label>
                  <input
                    className={`rv-input${errors.last_name ? " rv-input-err" : ""}`}
                    type="text" placeholder="El Amrani" value={form.last_name}
                    onChange={set("last_name")} maxLength={100}
                  />
                  {errors.last_name && <span className="rv-err-msg">{errors.last_name}</span>}
                </div>
              </div>

              {/* ── SECTION: Avatar ── */}
              <div className="rv-form-section-label">02 — Choisissez votre avatar</div>
              <div className="rv-avatars-grid">
                {AVATARS.map(av => (
                  <button
                    key={av.id}
                    type="button"
                    className={`rv-avatar-card${form.avatar === av.id ? " rv-avatar-active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, avatar: av.id }))}
                    aria-label={av.label}
                  >
                    <div className="rv-avatar-circle" style={{ background: av.bg }}>
                      <span className="rv-avatar-icon">{av.icon}</span>
                    </div>
                    <span className="rv-avatar-label">{av.label}</span>
                    {form.avatar === av.id && <div className="rv-avatar-check">✓</div>}
                  </button>
                ))}
              </div>

              {/* ── SECTION: Rating ── */}
              <div className="rv-form-section-label">03 — Votre note</div>
              <div className="rv-stars-row">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`rv-star-btn${n <= form.rating ? " rv-star-on" : ""}`}
                    onClick={() => setForm(f => ({ ...f, rating: n }))}
                    aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
                <span className="rv-stars-label">
                  {["", "Décevant", "Passable", "Bien", "Très bien", "Excellent !"][form.rating]}
                </span>
              </div>
              {errors.rating && <span className="rv-err-msg">{errors.rating}</span>}

              {/* ── SECTION: Message ── */}
              <div className="rv-form-section-label">04 — Votre témoignage</div>
              <div className="rv-field">
                <textarea
                  className={`rv-input rv-textarea${errors.message ? " rv-input-err" : ""}`}
                  placeholder="Décrivez votre expérience avec Nahid Perfume — le parfum, la livraison, l'emballage…"
                  value={form.message}
                  onChange={set("message")}
                  maxLength={2000}
                  rows={5}
                />
                <div className="rv-char-count">{form.message.length} / 2000</div>
                {errors.message && <span className="rv-err-msg">{errors.message}</span>}
              </div>

              {/* ── SUBMIT ── */}
              <button className="rv-submit-btn" type="submit" disabled={sending}>
                {sending
                  ? <><span className="rv-spin" /> Envoi en cours…</>
                  : <>Soumettre mon avis <span className="rv-submit-arrow">→</span></>
                }
              </button>

              <p className="rv-disclaimer">
                Votre avis sera visible après validation par notre équipe sous 24h.
              </p>
            </form>
          )}
        </div>
      </section>

      <NahidFooter />
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Cormorant+Garamond:wght@400;500;600&display=swap');

/* ── BASE ── */
.rv-hero *, .rv-section * { box-sizing: border-box; margin: 0; padding: 0; }
.rv-hero, .rv-section { font-family: 'DM Sans', system-ui, sans-serif; }
button { font-family: inherit; }

/* ── HERO ── */
.rv-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, #FAF8F4 0%, #F4EFE8 100%);
  padding: clamp(100px,12vw,160px) 0 clamp(60px,8vw,100px);
  text-align: center;
  border-bottom: 1px solid #EDE8DF;
}
.rv-hero-orb {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, #EF776A, transparent 70%);
  filter: blur(80px); opacity: .07;
}
.rv-orb-1 { width: 600px; height: 600px; top: -200px; right: -100px; }
.rv-orb-2 { width: 400px; height: 400px; bottom: -150px; left: -80px;  }
.rv-hero-inner { position: relative; z-index: 2; }
.rv-eyebrow {
  display: inline-block; font-size: .68rem; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase; color: #EF776A;
  margin-bottom: 18px;
}
.rv-hero-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 400;
  color: #1A1A1A; line-height: 1.15; margin-bottom: 18px;
  letter-spacing: -.01em;
}
.rv-hero-sub {
  font-size: clamp(.9rem, 1.8vw, 1.05rem); color: #7A7370;
  max-width: 500px; margin: 0 auto; line-height: 1.7;
}

/* ── SECTION WRAPPER ── */
.rv-section { background: #FAFAF9; padding: clamp(48px,8vw,96px) 0 clamp(64px,10vw,120px); }
.rv-container { max-width: 720px; margin: 0 auto; padding: 0 clamp(16px,4vw,32px); }

/* ── FORM CARD ── */
.rv-form-card {
  background: white; border: 1px solid #EDE8DF;
  border-radius: 28px; padding: clamp(28px,5vw,52px);
  box-shadow: 0 2px 8px rgba(0,0,0,.03), 0 12px 48px rgba(0,0,0,.05);
  display: flex; flex-direction: column; gap: 28px;
}

/* ── SECTION LABELS ── */
.rv-form-section-label {
  font-size: .68rem; font-weight: 800; letter-spacing: .2em;
  text-transform: uppercase; color: #EF776A;
  padding-bottom: 10px; border-bottom: 1px solid #F4EFE8;
}

/* ── GRID ── */
.rv-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* ── FIELD ── */
.rv-field { display: flex; flex-direction: column; gap: 6px; }
.rv-lbl { font-size: .72rem; font-weight: 700; color: #8A8478; letter-spacing: .06em; text-transform: uppercase; }
.rv-req { color: #EF776A; }
.rv-input {
  padding: 13px 16px; border: 1.5px solid #E8E4DC; border-radius: 14px;
  font-size: .95rem; color: #1A1A1A; background: #FAFAF9; outline: none;
  transition: border-color .2s, box-shadow .2s; width: 100%;
}
.rv-input:focus { border-color: #EF776A; box-shadow: 0 0 0 3px rgba(239,119,106,.1); background: white; }
.rv-input::placeholder { color: #C0BAB2; }
.rv-input-err { border-color: #F87171 !important; }
.rv-textarea { resize: vertical; min-height: 130px; line-height: 1.65; }
.rv-err-msg { font-size: .75rem; color: #EF4444; font-weight: 500; }
.rv-char-count { font-size: .72rem; color: #B0AAA2; text-align: right; }

/* ── AVATAR GRID ── */
.rv-avatars-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.rv-avatar-card {
  position: relative; display: flex; flex-direction: column;
  align-items: center; gap: 8px; padding: 14px 8px 12px;
  border: 2px solid #EDE8DF; border-radius: 18px; background: white;
  cursor: pointer; transition: all .2s; outline: none;
}
.rv-avatar-card:hover { border-color: #EF776A; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239,119,106,.12); }
.rv-avatar-active { border-color: #EF776A !important; background: #FFF8F7 !important; box-shadow: 0 6px 24px rgba(239,119,106,.18) !important; }
.rv-avatar-circle {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,.12);
}
.rv-avatar-icon { font-size: 1.4rem; line-height: 1; }
.rv-avatar-label { font-size: .72rem; font-weight: 600; color: #6A6460; letter-spacing: .04em; }
.rv-avatar-check {
  position: absolute; top: 7px; right: 7px;
  width: 18px; height: 18px; border-radius: 50%;
  background: #EF776A; color: white;
  font-size: .62rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

/* ── STAR RATING ── */
.rv-stars-row { display: flex; align-items: center; gap: 6px; }
.rv-star-btn {
  font-size: 2rem; color: #DDD8D0; background: none; border: none;
  cursor: pointer; padding: 0 2px; transition: color .15s, transform .15s;
  line-height: 1;
}
.rv-star-btn:hover { color: #EF776A; transform: scale(1.15); }
.rv-star-on { color: #EF776A; }
.rv-stars-label { font-size: .85rem; color: #8A8478; font-weight: 500; margin-left: 8px; min-width: 80px; }

/* ── SUBMIT BUTTON ── */
.rv-submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: linear-gradient(135deg, #EF776A, #D45F53);
  color: white; border: none; padding: 16px 36px;
  border-radius: 999px; font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: all .25s; margin-top: 4px;
  box-shadow: 0 8px 28px rgba(239,119,106,.35);
  width: 100%;
}
.rv-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(239,119,106,.45); }
.rv-submit-btn:disabled { opacity: .65; cursor: not-allowed; }
.rv-submit-arrow { font-size: 1.1rem; transition: transform .2s; }
.rv-submit-btn:hover:not(:disabled) .rv-submit-arrow { transform: translateX(4px); }
.rv-spin {
  display: inline-block; width: 16px; height: 16px;
  border: 2.5px solid rgba(255,255,255,.4); border-top-color: white;
  border-radius: 50%; animation: rvSpin .7s linear infinite;
}
@keyframes rvSpin { to { transform: rotate(360deg); } }

.rv-disclaimer { text-align: center; font-size: .78rem; color: #ABA6A0; }

/* ── SUCCESS STATE ── */
.rv-success {
  background: white; border: 1px solid #EDE8DF;
  border-radius: 28px; padding: clamp(48px,7vw,80px) clamp(28px,5vw,64px);
  text-align: center; box-shadow: 0 12px 48px rgba(0,0,0,.05);
}
.rv-success-icon {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, #4ADE80, #22C55E);
  color: white; font-size: 1.8rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px; box-shadow: 0 8px 24px rgba(34,197,94,.3);
}
.rv-success-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.8rem,4vw,2.6rem); font-weight: 400; color: #1A1A1A; margin-bottom: 14px;
}
.rv-success-sub { font-size: .95rem; color: #7A7370; line-height: 1.7; max-width: 420px; margin: 0 auto 36px; }
.rv-success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ── */
.rv-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: #EF776A; color: white; border: none;
  padding: 12px 28px; border-radius: 999px; font-size: .9rem; font-weight: 700;
  cursor: pointer; transition: all .2s; box-shadow: 0 6px 20px rgba(239,119,106,.3);
}
.rv-btn-primary:hover { background: #D45F53; transform: translateY(-1px); }
.rv-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: none; color: #6A6460; border: 1.5px solid #DDD8D0;
  padding: 12px 28px; border-radius: 999px; font-size: .9rem; font-weight: 500;
  cursor: pointer; transition: all .2s;
}
.rv-btn-ghost:hover { border-color: #EF776A; color: #EF776A; }

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .rv-grid-2 { grid-template-columns: 1fr; }
  .rv-avatars-grid { grid-template-columns: repeat(4,1fr); gap: 8px; }
  .rv-avatar-circle { width: 44px; height: 44px; }
  .rv-avatar-icon { font-size: 1.1rem; }
  .rv-star-btn { font-size: 1.7rem; }
}
@media (max-width: 400px) {
  .rv-avatars-grid { grid-template-columns: repeat(4,1fr); }
  .rv-avatar-card { padding: 10px 4px 8px; }
}
`;
