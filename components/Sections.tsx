"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FACILITIES, FOOTER_COLS, GALLERY, IMG, POSTS, REVIEWS, ROOMS, SERVICES } from "@/lib/data";
import { Icon, Img, Logo, Reveal, Stars, useModal } from "./ui";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function SectionHead({ kicker, title, action }: { kicker: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="section-head">
      <Reveal>
        <p className="kicker">{kicker}</p>
        <h2 className="h2">{title}</h2>
      </Reveal>
      {action && <Reveal delay={150}>{action}</Reveal>}
    </div>
  );
}

/* ---------------- Rooms ---------------- */
export function Rooms() {
  return (
    <section className="section" id="rooms">
      <div className="container">
        <SectionHead
          kicker="Rooms & Suites"
          title="Find Your Room"
          action={
            <a href="#rooms" className="btn btn-gold">
              View Rooms <Icon.arrow size={14} />
            </a>
          }
        />
        <div className="rooms-grid">
          {ROOMS.map((r, i) => (
            <Reveal key={r.name} delay={i * 120} as="article" className="room">
              <RoomImage src={r.img} alt={r.name} />
              <div className="room-meta">
                <span className="room-tag">{r.tag}</span>
                <span className="room-price">
                  Start <b>{inr(r.price)}</b>/night
                </span>
              </div>
              <h3 className="room-name">{r.name}</h3>
              <ul className="room-feats">
                <li>
                  <Icon.area /> {r.size}
                </li>
                <li>
                  <Icon.bed /> {r.bed}
                </li>
                <li>
                  <Icon.user /> {r.guests}
                </li>
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Image with a "View" badge that follows the cursor. */
function RoomImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });
  return (
    <a
      href="#rooms"
      ref={ref}
      className="room-img"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      aria-label={`View ${alt}`}
    >
      <Img src={src} alt={alt} />
      <span className={`view-badge ${pos.on ? "on" : ""}`} style={{ left: pos.x, top: pos.y }}>
        View
      </span>
    </a>
  );
}

/* ---------------- Services band ---------------- */
export function Services() {
  return (
    <section className="services" id="services">
      <div className="services-bg parallax" style={{ backgroundImage: `url(${IMG.amenitiesBg})` }} data-speed="0.25" />
      <div className="services-sign" aria-hidden>
        HOTEL
      </div>
      <div className="container">
        <Reveal className="services-card" from="zoom">
          <p className="kicker">Hotel Services</p>
          <h2 className="h2 serif-display">Everything You Need</h2>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={200 + i * 110} className="service">
                <span className="service-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Story ---------------- */
export function Story() {
  return (
    <section className="section story" id="story">
      <div className="container story-grid">
        <Reveal from="left">
          <p className="kicker">Our Story</p>
          <h2 className="h2">A Hotel Built to Last</h2>
          <p className="muted">
            We believe a great stay is built on three things: thoughtful spaces, honest hospitality and attention to
            the smallest detail. Independently owned and proudly rooted in our city, Shri Siddh has welcomed travellers,
            families and businesses since 2008.
          </p>
          <a href="#story" className="btn btn-gold">
            Our Story <Icon.arrow size={14} />
          </a>
        </Reveal>
        <Reveal from="right" className="story-img">
          <Img src={IMG.building} alt="Shri Siddh hotel building" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video tour ---------------- */
const TOUR = [IMG.video, ...ROOMS.map((r) => r.img), ...GALLERY.map((g) => g.src)];

export function VideoTour() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const close = useCallback(() => setOpen(false), []);
  useModal(open, close);

  useEffect(() => {
    if (!open) return;
    setI(0);
    const t = setInterval(() => setI((x) => (x + 1) % TOUR.length), 3200);
    return () => clearInterval(t);
  }, [open]);

  return (
    <section className="video" aria-label="Hotel tour">
      <div className="video-bg parallax" style={{ backgroundImage: `url(${IMG.video})` }} data-speed="0.2" />
      <button className="play" onClick={() => setOpen(true)} aria-label="Play hotel tour">
        <Icon.play />
      </button>
      <div className={`modal ${open ? "open" : ""}`} onClick={close} role="dialog" aria-modal="true" aria-label="Hotel tour">
        <div className="modal-body tour" onClick={(e) => e.stopPropagation()}>
          {open &&
            TOUR.map((src, k) => (
              <div key={src + k} className={`tour-slide ${k === i ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} />
            ))}
          <div className="tour-caption">
            <Logo light />
            <span>Virtual Tour · {i + 1}/{TOUR.length}</span>
          </div>
          <div className="tour-progress" key={i} />
          <button className="modal-close" onClick={close} aria-label="Close">
            <Icon.close />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Facilities ---------------- */
export function Facilities() {
  return (
    <section className="section" id="facilities">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="kicker">Hotel Facilities</p>
            <h2 className="h2">Our Luxurious Hotel Facilities</h2>
          </Reveal>
          <Reveal delay={150} className="head-note">
            <p className="muted small">
              The finest facilities, designed around your comfort, so every stay feels effortless and memorable.
            </p>
          </Reveal>
        </div>
        <div className="facilities-grid">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} className="facility">
              <div className="facility-img">
                <Img src={f.img} alt={f.title} />
              </div>
              <h3>{f.title}</h3>
              <p className="muted small">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [paused, setPaused] = useState(false);

  const onScroll = () => {
    const el = track.current!;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const step = useCallback((dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".review");
    const w = card ? card.offsetWidth + 20 : 300;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => step(1), 4000);
    return () => clearInterval(t);
  }, [paused, step]);

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="kicker">Guest Reviews</p>
            <h2 className="h2 serif-display">What Guests Say</h2>
          </Reveal>
          <Reveal delay={150} className="ratings dark">
            <Stars size={13} />
            <span>4.8 out of 5</span>
            <span className="brand">Google</span>
            <span className="brand">Tripadvisor</span>
            <span className="brand">Booking.com</span>
          </Reveal>
        </div>
      </div>
      <div
        className="reviews-track"
        ref={track}
        onScroll={onScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          drag.current = null;
          track.current?.classList.remove("dragging");
        }}
        onMouseDown={(e) => {
          drag.current = { x: e.pageX, left: track.current!.scrollLeft };
          track.current!.classList.add("dragging");
        }}
        onMouseMove={(e) => {
          if (!drag.current) return;
          e.preventDefault();
          track.current!.scrollLeft = drag.current.left - (e.pageX - drag.current.x);
        }}
        onMouseUp={() => {
          drag.current = null;
          track.current!.classList.remove("dragging");
        }}
      >
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 90} as="article" className="review">
            <Stars size={16} />
            <p>“{r.text}”</p>
            <div className="review-by">
              <b>{r.name}</b>
              <span>{r.place}</span>
              <span className="gold">Stayed at</span>
              <span>{r.room}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="container reviews-nav">
        <button onClick={() => step(-1)} aria-label="Previous review">
          <Icon.chevL />
        </button>
        <div className="bar">
          <span style={{ width: `${20 + progress * 80}%` }} />
        </div>
        <button onClick={() => step(1)} aria-label="Next review">
          <Icon.chevR />
        </button>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const n = GALLERY.length;
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? i : (i - 1 + n) % n));
    },
    [n]
  );
  useModal(idx !== null, close, keys);

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead
          kicker="Gallery"
          title="Explore Your Dream Hotel"
          action={
            <button className="btn btn-gold" onClick={() => setIdx(0)}>
              View Gallery <Icon.arrow size={14} />
            </button>
          }
        />
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 80} from="zoom" className={`g-item ${g.cls}`}>
              <button onClick={() => setIdx(i)} aria-label={`Open ${g.alt}`}>
                <Img src={g.src} alt={g.alt} />
                <span className="g-hover">
                  <span>+</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <div className={`modal ${idx !== null ? "open" : ""}`} onClick={close} role="dialog" aria-modal="true" aria-label="Gallery">
        {idx !== null && (
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={idx} src={GALLERY[idx].src} alt={GALLERY[idx].alt} />
            <p>
              {GALLERY[idx].alt} · {idx + 1}/{n}
            </p>
            <button className="lb-nav prev" onClick={() => setIdx((idx - 1 + n) % n)} aria-label="Previous image">
              <Icon.chevL />
            </button>
            <button className="lb-nav next" onClick={() => setIdx((idx + 1) % n)} aria-label="Next image">
              <Icon.chevR />
            </button>
            <button className="modal-close" onClick={close} aria-label="Close">
              <Icon.close />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Journal ---------------- */
export function Journal() {
  return (
    <section className="section" id="journal">
      <div className="container">
        <SectionHead kicker="From Our Journal" title="Stories Worth Staying For" />
        <div className="posts">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} as="article" className="post">
              <a href="#journal" className="post-img">
                <Img src={p.img} alt={p.title} />
              </a>
              <h3>{p.title}</h3>
              <p className="muted small">{p.text}</p>
              <time className="small gold">{p.date}</time>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Follow + Newsletter + Footer ---------------- */
export function Follow() {
  return (
    <section className="follow">
      <div className="container follow-inner">
        <Reveal>
          <h2 className="serif-display follow-title">Follow Us</h2>
        </Reveal>
        <Reveal delay={150} className="socials">
          <a href="#contact" aria-label="Instagram" className="s-ig">
            <Icon.instagram />
          </a>
          <a href="#contact" aria-label="Facebook" className="s-fb">
            <Icon.facebook />
          </a>
          <a href="#contact" aria-label="YouTube" className="s-yt">
            <Icon.youtube />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("error");
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  return (
    <section className="newsletter" id="contact">
      <div className="container newsletter-inner">
        <Reveal from="left" className="nl-left">
          <span className="nl-mark" aria-hidden>
            S
          </span>
          <div>
            <h3 className="serif-display">Stay Connected</h3>
            <p className="small muted">
              Be the first to hear about exclusive offers, seasonal packages and upcoming events. Subscribe for curated
              updates and a warm invitation to our next stay.
            </p>
          </div>
        </Reveal>
        <Reveal from="right" className="nl-right">
          {state === "done" ? (
            <p className="nl-done">
              <Icon.check /> Thank you! You&apos;re subscribed with {email}.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className={state === "error" ? "shake" : ""}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-label="Email address"
                aria-invalid={state === "error"}
              />
              <button className="btn btn-gold" disabled={state === "loading"}>
                {state === "loading" ? <span className="spinner" /> : <>Subscribe Now <Icon.arrow size={14} /></>}
              </button>
            </form>
          )}
          <p className={`small ${state === "error" ? "err-text" : "muted"}`}>
            {state === "error"
              ? "Please enter a valid email address."
              : "By subscribing you agree to receive updates. You can unsubscribe at any time."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer-brand">
          <Logo />
          <h4 className="serif-display">A Hotel Built to Last</h4>
          <p className="small muted">
            We believe a great stay is built on thoughtful spaces and honest hospitality. Independently owned and
            welcoming guests since 2008.
          </p>
          <a href="#story" className="link-gold small">
            Read Our Story <Icon.arrow size={12} />
          </a>
        </Reveal>
        <div className="footer-cols">
          {FOOTER_COLS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <h5>{c.title}</h5>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href={c.title === "Navigate" ? `#${l.toLowerCase()}` : "#rooms"}>{l}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal delay={320}>
            <h5>Address</h5>
            <p className="small muted">
              Plot 12, Station Road,
              <br />
              Near City Centre, Jaipur,
              <br />
              Rajasthan 302001
            </p>
            <p className="small muted">
              <a href="tel:+919876543210">+91 98765 43210</a>
              <br />
              <a href="mailto:stay@shrisiddh.com">stay@shrisiddh.com</a>
            </p>
          </Reveal>
          <Reveal delay={400}>
            <h5>Legal</h5>
            <ul>
              <li>
                <a href="#top">Privacy Policy</a>
              </li>
              <li>
                <a href="#top">Terms &amp; Conditions</a>
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="footer-bottom small">
          <span>© {new Date().getFullYear()} Shri Siddh. All rights reserved.</span>
          <span>Crafted with care</span>
        </div>
      </div>
      <Skyline />
    </footer>
  );
}

function Skyline() {
  return (
    <div className="skyline">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.skyline} alt="" aria-hidden width={1920} height={242} loading="lazy" />
    </div>
  );
}

/* ---------------- Global extras ---------------- */
export function ScrollExtras() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
        document.querySelectorAll<HTMLElement>(".parallax").forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect();
          const speed = parseFloat(el.dataset.speed || "0.2");
          el.style.transform = `translate3d(0, ${(r.top - window.innerHeight / 2) * -speed * 0.4}px, 0) scale(1.15)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <button className={`to-top ${p > 0.08 ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <Icon.up />
      </button>
    </>
  );
}
