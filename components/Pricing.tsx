'use client';
import {FormEvent, useState} from 'react';
import {Check, LoaderCircle, Sparkles, X} from 'lucide-react';
import {plans} from '@/lib/data';

type Plan = {name:string;price:number;period?:string;desc:string;features:string[];cta:string;featured?:boolean};

export function Pricing(){
  const [loading,setLoading]=useState('');
  const [selected,setSelected]=useState<Plan|null>(null);
  const [email,setEmail]=useState('');
  const [error,setError]=useState('');

  function openCheckout(plan:Plan){
    if(!plan.price){document.getElementById('resources')?.scrollIntoView({behavior:'smooth'});return;}
    setError('');setEmail('');setSelected(plan);
  }

  async function pay(e:FormEvent){
    e.preventDefault();
    if(!selected)return;
    if(!/^\S+@\S+\.\S+$/.test(email)){setError('Enter a valid email address.');return;}
    setLoading(selected.name);setError('');
    try{
      const r=await fetch('/api/payments/initialize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:selected.name,email})});
      const data=await r.json();
      if(!r.ok)throw new Error(data.error||'Payment could not start');
      window.location.href=data.link;
    }catch(err){setError(err instanceof Error?err.message:'Payment error');setLoading('');}
  }

  return <>
    <div className="pricing-grid">
      {plans.map((p)=><div key={p.name} className={'price-card card reveal '+(p.featured?'featured':'')}>
        {p.featured&&<div className="popular"><Sparkles size={13}/> MOST POPULAR</div>}
        <h3>{p.name}</h3><p>{p.desc}</p>
        <div className="price">₦{p.price.toLocaleString()}<small>{p.period}</small></div>
        <ul>{p.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
        <button className={'btn '+(p.featured?'btn-primary':'btn-secondary')} onClick={()=>openCheckout(p)} disabled={!!loading}>
          {loading===p.name?<LoaderCircle className="spin" size={17}/>:p.cta}
        </button>
      </div>)}
    </div>

    {selected&&<div className="checkout-backdrop" role="dialog" aria-modal="true" aria-label="CAM checkout">
      <div className="checkout-card">
        <button className="close" onClick={()=>{setSelected(null);setLoading('')}} aria-label="Close checkout"><X size={18}/></button>
        <span className="eyebrow">Secure CAM checkout</span>
        <h3>{selected.name}</h3>
        <p>Enter your email to continue to Flutterwave. Your payment is processed securely on Flutterwave.</p>
        <div className="checkout-price">₦{selected.price.toLocaleString()}<small>{selected.period}</small></div>
        <form onSubmit={pay}>
          <label htmlFor="cam-email">Email address</label>
          <input id="cam-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required/>
          {error&&<div className="form-error" role="alert">{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={!!loading}>{loading?<><LoaderCircle className="spin" size={17}/> Connecting to Flutterwave...</>:`Continue to payment`}</button>
        </form>
        <small className="secure-note">You will be redirected to Flutterwave to complete payment.</small>
      </div>
    </div>}

    <style jsx>{`.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.price-card{padding:30px;position:relative}.price-card h3{font:800 25px Manrope;margin:0 0 10px}.price-card p{color:var(--muted);line-height:1.65;min-height:52px}.price{font:800 36px Manrope;letter-spacing:-.06em;margin:25px 0}.price small{font:500 12px DM Sans;color:var(--muted);letter-spacing:0}.price-card ul{list-style:none;padding:0;margin:0 0 25px;display:grid;gap:13px}.price-card li{display:flex;gap:10px;align-items:center;font-size:14px}.price-card li svg{color:#0f766e}.price-card .btn{width:100%}.featured{border:1.5px solid #83cdb2;box-shadow:0 25px 70px rgba(15,118,110,.12);transform:translateY(-8px)}.popular{position:absolute;right:20px;top:18px;background:#dff6ed;color:#0f5f58;border-radius:999px;padding:6px 9px;font-size:9px;font-weight:800;display:flex;align-items:center;gap:5px}.spin{animation:spin 1s linear infinite}.checkout-backdrop{position:fixed;inset:0;z-index:100;background:rgba(5,15,20,.6);backdrop-filter:blur(10px);display:grid;place-items:center;padding:20px}.checkout-card{width:min(470px,100%);background:#fff;border:1px solid #e4e8df;border-radius:28px;padding:30px;position:relative;box-shadow:0 30px 100px rgba(0,0,0,.25)}.checkout-card h3{font:800 34px Manrope;letter-spacing:-.05em;margin:18px 0 8px}.checkout-card p{color:var(--muted);line-height:1.65}.close{position:absolute;right:18px;top:18px;border:1px solid var(--line);background:#fff;border-radius:50%;width:36px;height:36px;display:grid;place-items:center;cursor:pointer}.checkout-price{font:800 30px Manrope;margin:22px 0}.checkout-price small{font:500 12px DM Sans;color:var(--muted);margin-left:6px}.checkout-card form{display:grid;gap:9px}.checkout-card label{font-size:13px;font-weight:700}.checkout-card input{width:100%;border:1px solid #dce3de;border-radius:13px;padding:13px 14px;outline:none}.checkout-card input:focus{border-color:#79bda7;box-shadow:0 0 0 4px #edf9f4}.form-error{color:#b42318;background:#fff1f0;border:1px solid #ffd2ce;border-radius:10px;padding:10px;font-size:12px}.secure-note{display:block;color:#7a8784;margin-top:16px;font-size:11px;text-align:center}@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:900px){.pricing-grid{grid-template-columns:1fr}.featured{transform:none}}`}</style>
  </>
}
