import {NextResponse} from 'next/server';

const EXPECTED:Record<string,number>={PLUS:3500,PRO:8500};

export async function GET(req:Request){
  try{
    const {searchParams}=new URL(req.url);
    const id=searchParams.get('transaction_id');
    if(!id)return NextResponse.json({error:'Missing transaction_id'},{status:400});
    const secret=process.env.FLW_SECRET_KEY;
    if(!secret)return NextResponse.json({error:'Payments not configured'},{status:503});
    const r=await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(id)}/verify`,{
      headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},
      cache:'no-store'
    });
    const data=await r.json();
    if(!r.ok)return NextResponse.json({error:data.message||'Verification failed'},{status:502});
    const d=data.data;
    const txRef=typeof d?.tx_ref==='string'?d.tx_ref:'';
    const match=txRef.match(/^CAM-(PLUS|PRO)-/);
    const expected=match?EXPECTED[match[1]]:undefined;
    const verified=d?.status==='successful'&&d?.currency==='NGN'&&Boolean(expected)&&Number(d?.amount)===expected;
    return NextResponse.json({verified,status:d?.status,amount:d?.amount,currency:d?.currency,tx_ref:txRef,plan:match?.[1]||null});
  }catch{return NextResponse.json({error:'Unable to verify payment.'},{status:500});}
}
