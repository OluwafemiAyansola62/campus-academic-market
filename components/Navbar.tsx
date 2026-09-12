'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Compass, Crown, Library, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/#services', label: 'Services', icon: BookOpen, tone: 'teal' },
  { href: '/#resources', label: 'Resources', icon: Library, tone: 'blue' },
  { href: '/#pricing', label: 'Membership', icon: Crown, tone: 'gold' },
  { href: '/#about', label: 'Why CAM', icon: Compass, tone: 'violet' },
];

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
          {navItems.map(({ href, label, icon: Icon, tone }) => (
            <Link key={label} href={href} className={`nav-item ${tone}`} onClick={closeMenu}>
              <span className="nav-icon"><Icon size={14} strokeWidth={2.2} /></span>
              <span>{label}</span>
            </Link>
          ))}
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
        nav { display: flex; align-items: center; justify-content: center; gap: 8px; flex-shrink: 1; white-space: nowrap; }
        .nav-item {
          min-height: 42px; padding: 7px 13px 7px 8px; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          border-radius: 13px; color: #53615d; background: #f7f8f5; border: 1px solid #e4e8df;
          font-size: 12px; font-weight: 750; white-space: nowrap;
          box-shadow: 0 2px 5px rgba(20,40,30,.025);
          transition: color .22s ease, background .22s ease, border-color .22s ease, transform .22s ease, box-shadow .22s ease;
        }
        .nav-icon { width: 27px; height: 27px; display: inline-flex; align-items: center; justify-content: center; border-radius: 9px; transition: transform .22s ease; }
        .nav-item:hover { color: #101827; background: #fff; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(20,40,30,.08); }
        .nav-item:hover .nav-icon { transform: scale(1.06); }
        .nav-item.teal .nav-icon { color: #087f75; background: #dff5f0; }
        .nav-item.teal:hover { border-color: #b9e5dc; }
        .nav-item.blue .nav-icon { color: #3567a8; background: #e6effb; }
        .nav-item.blue:hover { border-color: #c7daf3; }
        .nav-item.gold .nav-icon { color: #a66a05; background: #fff1ce; }
        .nav-item.gold:hover { border-color: #efdca8; }
        .nav-item.violet .nav-icon { color: #6f58a7; background: #eee8fb; }
        .nav-item.violet:hover { border-color: #d9cdf2; }
        .nav-cta { min-height: 46px; padding: 11px 16px; gap: 7px; font-size: 12px; white-space: nowrap; flex-shrink: 0; }
        .menu { display: none; width: 42px; height: 42px; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: 13px; background: #fff; color: var(--ink); cursor: pointer; }

        @media (max-width: 1050px) {
          .nav-inner { gap: 10px; }
          .brand { min-width: 210px; }
          .brand-copy small { display: none; }
          nav { gap: 5px; }
          .nav-item { padding-right: 10px; }
          .nav-item span:not(.nav-icon) { font-size: 11px; }
          .nav-icon { width: 24px; height: 24px; }
          .nav-cta { padding-inline: 13px; }
        }

        @media (max-width: 760px) {
          .nav { top: 10px; }
          .nav-inner { min-height: 62px; padding: 6px 8px; border-radius: 20px; }
          .brand { min-width: auto; padding: 3px 4px; gap: 9px; }
          .brand-mark { width: 38px; height: 38px; flex-basis: 38px; border-radius: 12px; }
          .brand-copy strong { font-size: 18px; }
          .nav-cta { display: none; }
          nav { display: none; position: absolute; top: calc(100% + 9px); left: 0; right: 0; padding: 9px; border-radius: 20px; background: rgba(255,255,255,.98); border: 1px solid var(--line); box-shadow: 0 20px 55px rgba(20,40,30,.11); flex-direction: column; align-items: stretch; gap: 5px; white-space: normal; }
          nav.open { display: flex; }
          .nav-item { min-height: 48px; padding: 8px 12px; justify-content: flex-start; background: #f7f8f5; border-color: #e4e8df; }
          .nav-item span:not(.nav-icon) { font-size: 12px; }
          .nav-icon { width: 30px; height: 30px; }
          .menu { display: inline-flex; }
        }
      `}</style>
    </header>
  );
}
