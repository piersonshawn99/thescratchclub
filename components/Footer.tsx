import Link from "next/link";
import { LINKS } from "./links";
export default function Footer(){
  return (<footer className="mt-24 border-t border-neutral-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-10 md:grid-cols-4">
        <div><div className="flex items-center gap-2"><Logo/><span className="font-semibold tracking-tight">The Scratch Club</span></div>
          <p className="mt-4 max-w-xs text-sm text-neutral-600">Practice with purpose. Play with confidence.</p></div>
        <FooterCol title="Explore"><FooterLink href={LINKS.about}>About Us</FooterLink><FooterLink href={LINKS.memberships}>Memberships</FooterLink><FooterLink href={LINKS.coaching}>Coaching</FooterLink><FooterLink href={LINKS.courses}>Courses</FooterLink></FooterCol>
        <FooterCol title="Support"><FooterLink href="/faq">FAQ</FooterLink><FooterLink href="/contact">Contact / Directions</FooterLink><FooterLink href="/privacy">Privacy</FooterLink><FooterLink href="/terms">Terms</FooterLink></FooterCol>
        <FooterCol title="Follow"><FooterLink href="https://instagram.com/">Instagram</FooterLink><FooterLink href="https://facebook.com/">Facebook</FooterLink><FooterLink href="https://youtube.com/">YouTube</FooterLink></FooterCol>
      </div>
      <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 text-xs text-neutral-500"><p>© {new Date().getFullYear()} The Scratch Club. All rights reserved.</p><p>Powered by Trackman</p></div>
    </div>
  </footer>);
}
function FooterCol({title,children}:{title:string;children:React.ReactNode}){return (<div><h5 className="text-sm font-semibold tracking-tight">{title}</h5><ul className="mt-4 space-y-2 text-sm text-neutral-700">{children}</ul></div>);}
function FooterLink({href,children}:{href:string;children:React.ReactNode}){return (<li><Link className="hover:text-emerald-700" href={href}>{children}</Link></li>);}
function Logo(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 48 48" aria-hidden="true" className="h-6 w-6 text-emerald-700" {...props}><circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M10 32c6-6 12-10 19-13 2-.7 5-1 7 1" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="36" cy="20" r="2.5" fill="currentColor"/></svg>);} 
