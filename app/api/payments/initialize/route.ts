import {NextResponse} from 'next/server';

const PLANS:Record<string,{amount:number;label:string}> = {
  'CAM Plus': {amount:3500,label:'CAM Plus monthly membership'},
  'CAM Pro': {amount:8500,label:'CAM Pro semester membership'}
};

export async function POST(req:Request){
  try{
    const body=await req.json();
    const plan=typeof body.plan==='string'?body.plan:'';
    const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
    const selected=PLANS[plan];
    if(!selected)return NextResponse.json({error:'Invalid membership plan.'},{status:400});
    if(!/^\S+@\S+\.\S+$/.test(email))return NextResponse.json({error:'A valid email is required.'},{status:400});
    const secret=process.env.FLW_SECRET_KEY;
    if(!secret)return NextResponse.json({error:'Flutterwave is not configured yet. Add FLW_SECRET_KEY in Vercel Environment Variables.'},{status:503});
    const base=(process.env.NEXT_PUBLIC_SITE_URL||new URL(req.url).origin).replace(/\/$/,'');
    const slug=plan==='CAM Plus'?'PLUS':'PRO';
    const txRef=`CAM-${slug}-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
    const response=await fetch('https://api.flutterwave.com/v3/payments',{
      method:'POST',
      headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        tx_ref:txRef,
        amount:selected.amount,
        currency:'NGN',
        redirect_url:`${base}/success`,
        customer:{email},
        customizations:{title:'Campus Academic Market',description:selected.label,logo:`${base}/icon.svg`},
        meta:{plan,expected_amount:selected.amount}
      })
    });
    const data=await response.json();
    if(!response.ok||data.status!=='success')return NextResponse.json({error:data.message||'Flutterwave could not initialize payment.'},{status:502});
    return NextResponse.json({link:data.data.link,tx_ref:txRef});
  }catch{return NextResponse.json({error:'Unable to initialize payment.'},{status:500});}
}
