'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Campus Academic Market home">
          <span className="brand-mark" aria-hidden="true"><BookOpen size={17} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>CAM</strong><small>Campus Academic Market</small></span>
        </Link>

        <nav className={open ? 'open' : ''} aria-label="Main navigation">
          <Link href="/#services" onClick={closeMenu}>Services</Link>
          <Link href="/#resources" onClick={closeMenu}>Resources</Link>
          <Link href="/#pricing" onClick={closeMenu}>Membership</Link>
          <Link href="/#about" onClick={closeMenu}>Why CAM</Link>
        </nav>

        <Link className="btn btn-primary nav-cta magnetic" href="/#pricing" onClick={closeMenu}>
          Join CAM <ArrowUpRight size={15} strokeWidth={2.4} />
        </Link>

        <button className="menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <style jsx>{`
        .nav { position: fixed; z-index: 100; top: 14px; left: 0; right: 0; pointer-events: none; }
        .nav-inner {
          position: relative; min-height: 72px; padding: 9px 12px;
          display: flex; align-items: center; justify-content: space-between; gap: 18px;
          pointer-events: auto; border-radius: 24px; background: rgba(255,255,255,.94);
          backdrop-filter: blur(22px) saturate(145%); -webkit-backdrop-filter: blur(22px) saturate(145%);
          border: 1px solid rgba(220,228,221,.95); box-shadow: 0 16px 48px rgba(20,40,30,.09), 0 2px 8px rgba(20,40,30,.035);
        }
        .brand { min-width: 238px; padding: 5px 8px; display: inline-flex; align-items: center; gap: 11px; flex-shrink: 0; }
        .brand-mark { width: 42px; height: 42px; flex: 0 0 42px; display: inline-flex; align-items: center; justify-content: center; color: #fff; background: #101827; border-radius: 13px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), 0 7px 18px rgba(16,24,39,.13); }
        .brand-copy { display: flex; flex-direction: column; justify-content: center; line-height: 1; gap: 5px; white-space: nowrap; }
        .brand-copy strong { color: #101827; font-family: Arial,Helvetica,sans-serif; font-size: 20px; font-weight: 850; letter-spacing: -.055em; }
        .brand-copy small { color: #6b7773; font-size: 9px; font-weight: 700; letter-spacing: .055em; text-transform: uppercase; }
        nav { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 0; flex-shrink: 1; white-space: nowrap; }
        nav a {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 40px; padding: 10px 15px; border-radius: 12px;
          color: #56635f; background: rgba(247,248,245,.82);
          border: 1px solid rgba(228,232,223,.72);
          font-size: 12px; font-weight: 700; white-space: nowrap;
          box-shadow: 0 1px 2px rgba(20,40,30,.025);
          transition: color .2s ease, background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        nav a:hover { color: #101827; background: #fff; border-color: rgba(210,218,211,.95); transform: translateY(-1px); box-shadow: 0 5px 14px rgba(20,40,30,.07); }
        .nav-cta { min-height: 46px; padding: 11px 16px; gap: 7px; font-size: 12px; white-space: nowrap; flex-shrink: 0; }
        .menu { display: none; width: 42px; height: 42px; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: 13px; background: #fff; color: var(--ink); cursor: pointer; }

        @media (max-width: 1050px) {
          .nav-inner { gap: 10px; }
          .brand { min-width: 210px; }
          .brand-copy small { display: none; }
          nav { gap: 6px; }
          nav a { padding-inline: 11px; }
          .nav-cta { padding-inline: 13px; }
        }

        @media (max-width: 760px) {
          .nav { top: 10px; }
          .nav-inner { min-height: 62px; padding: 6px 8px; border-radius: 20px; }
          .brand { min-width: auto; padding: 3px 4px; gap: 9px; }
          .brand-mark { width: 38px; height: 38px; flex-basis: 38px; border-radius: 12px; }
          .brand-copy strong { font-size: 18px; }
          .nav-cta { display: none; }
          nav { display: none; position: absolute; top: calc(100% + 9px); left: 0; right: 0; padding: 8px; border-radius: 20px; background: rgba(255,255,255,.97); border: 1px solid var(--line); box-shadow: 0 20px 55px rgba(20,40,30,.11); flex-direction: column; align-items: stretch; gap: 2px; white-space: normal; }
          nav.open { display: flex; }
          nav a { min-height: auto; padding: 13px 14px; border-radius: 12px; justify-content: flex-start; background: transparent; border-color: transparent; box-shadow: none; }
          nav a:hover { background: #f7f8f5; border-color: transparent; box-shadow: none; }
          .menu { display: inline-flex; }
        }
      `}</style>
    </header>
  );
}
