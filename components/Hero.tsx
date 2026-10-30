"use client";

import { useEffect, useRef, useState } from "react";
import { IMG, NAV_LEFT, NAV_RIGHT } from "@/lib/data";
import { Icon, Logo, Stars } from "./ui";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [...NAV_LEFT, ...NAV_RIGHT];

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <nav className="container header-inner" aria-label="Primary">
        <ul className="nav nav-left">
          {NAV_LEFT.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <Logo light={!scrolled} />
        <ul className="nav nav-right">
          {NAV_RIGHT.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <Icon.close /> : <Icon.menu />}
        </button>
      </nav>
      <div className="mobile-menu" aria-hidden={!open}>
        {links.map((l, i) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? i * 40 : 0}ms` }}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d: string, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x.toISOString().slice(0, 10);
};

function BookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) setGuestsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 4500);
    return () => clearTimeout(t);
  }, [status]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return setStatus({ ok: false, msg: "Please select both check-in and check-out dates." });
    if (checkOut <= checkIn) return setStatus({ ok: false, msg: "Check-out must be after check-in." });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const nights = Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000);
      setStatus({
        ok: true,
        msg: `Great news! Rooms are available for ${nights} night${nights > 1 ? "s" : ""}, ${adults + kids} guest${adults + kids > 1 ? "s" : ""}.`,
      });
    }, 900);
  };

  const guestLabel = `${adults + kids} Guest${adults + kids > 1 ? "s" : ""}`;

  return (
    <form className="booking" onSubmit={submit}>
      <label className="booking-field">
        <span className="sr-only">Check-in date</span>
        <input
          type="date"
          value={checkIn}
          min={today()}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (!checkOut || checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1));
          }}
          className={checkIn ? "has-value" : ""}
          data-placeholder="Check-in Date"
        />
        <Icon.calendar />
      </label>
      <label className="booking-field">
        <span className="sr-only">Check-out date</span>
        <input
          type="date"
          value={checkOut}
          min={checkIn ? addDays(checkIn, 1) : today()}
          onChange={(e) => setCheckOut(e.target.value)}
          className={checkOut ? "has-value" : ""}
          data-placeholder="Check-out Date"
        />
        <Icon.calendar />
      </label>
      <div className="booking-field guests" ref={guestsRef}>
        <button type="button" className="guests-btn" onClick={() => setGuestsOpen((o) => !o)} aria-expanded={guestsOpen}>
          <span>{guestLabel}</span>
          <Icon.user />
        </button>
        <div className={`guests-pop ${guestsOpen ? "open" : ""}`}>
          {[
            { label: "Adults", v: adults, set: setAdults, min: 1 },
            { label: "Children", v: kids, set: setKids, min: 0 },
          ].map((r) => (
            <div className="guests-row" key={r.label}>
              <span>{r.label}</span>
              <div className="stepper">
                <button type="button" onClick={() => r.set(Math.max(r.min, r.v - 1))} aria-label={`Fewer ${r.label}`}>
                  −
                </button>
                <b>{r.v}</b>
                <button type="button" onClick={() => r.set(Math.min(8, r.v + 1))} aria-label={`More ${r.label}`}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-green" type="submit" disabled={loading}>
        {loading ? <span className="spinner" /> : "Check Availability"}
        {!loading && <Icon.arrow size={14} />}
      </button>
      <div className={`toast ${status ? "show" : ""} ${status?.ok ? "ok" : "err"}`} role="status">
        {status?.ok && <Icon.check />} {status?.msg}
      </div>
    </form>
  );
}

export default function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % IMG.hero.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-bg" aria-hidden>
        {IMG.hero.map((src, i) => (
          <div key={src} className={`hero-slide ${i === slide ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker anim-fade" style={{ animationDelay: "0.2s" }}>
          Welcome to Shri Siddh Hotel
        </p>
        <h1 className="hero-title">
          {"A Place Truly Worth Staying".split(" ").map((w, i) => (
            <span key={i} className="word" style={{ animationDelay: `${0.35 + i * 0.12}s` }}>
              {w}&nbsp;
            </span>
          ))}
        </h1>
        <a href="#rooms" className="btn btn-light anim-fade" style={{ animationDelay: "1.1s" }}>
          View Rooms <Icon.arrow size={14} />
        </a>
        {IMG.hero.length > 1 && (
          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {IMG.hero.map((_, i) => (
              <button key={i} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
      <div className="container hero-bottom anim-fade" style={{ animationDelay: "1.3s" }}>
        <BookingBar />
        <div className="ratings">
          <Stars size={13} />
          <span>4.8 out of 5</span>
          <span className="brand">Google</span>
          <span className="brand">Tripadvisor</span>
          <span className="brand">Booking.com</span>
        </div>
      </div>
    </section>
  );
}
