import { NextResponse } from "next/server";
type Payload = { firstName:string; lastName:string; email:string; topic?:string; message:string; };
export async function POST(req:Request){
  try{
    const body=(await req.json()) as Partial<Payload>; const {firstName,lastName,email,topic,message}=body;
    if(!firstName||!lastName||!email||!message){ return NextResponse.json({ok:false,error:"Missing required fields."},{status:400}); }
    const subject=`[Scratch Club] Contact: ${topic||"General"} — ${firstName} ${lastName}`;
    const text=`From: ${firstName} ${lastName} <${email}>
Topic: ${topic||"General"}

${message}`;
    const RESEND_API_KEY=process.env.RESEND_API_KEY; const CONTACT_TO=process.env.CONTACT_TO||"hello@scratchclubgolf.com"; const CONTACT_FROM=process.env.CONTACT_FROM||"noreply@scratchclubgolf.com";
    if(RESEND_API_KEY){
      const { Resend } = await import("resend"); const resend=new Resend(RESEND_API_KEY);
      try{ await resend.emails.send({from:CONTACT_FROM,to:CONTACT_TO,subject,text}); }catch(err){ console.error("Resend send failed:",err); }
    } else if(process.env.SMTP_HOST){
      const nodemailer = await import("nodemailer"); const transporter=nodemailer.createTransport({ host:process.env.SMTP_HOST, port:Number(process.env.SMTP_PORT||587), secure:process.env.SMTP_SECURE==="true", auth:(process.env.SMTP_USER&&process.env.SMTP_PASS)?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined });
      try{ await transporter.sendMail({from:CONTACT_FROM,to:CONTACT_TO,subject,text}); }catch(err){ console.error("SMTP send failed:",err); }
    } else {
      console.log("[contact:log]",{firstName,lastName,email,topic,message});
    }
    return NextResponse.json({ok:true});
  }catch(e){ console.error("Contact API error:",e); return NextResponse.json({ok:false,error:"Server error."},{status:500}); }
}