import Link from "next/link";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  FileText, 
  Smartphone, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-speedify-green rounded-lg flex items-center justify-center">
             <span className="text-speedify-lime font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Speedify</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#solutions" className="hover:text-speedify-green/80">Solutions</Link>
          <Link href="#developers" className="hover:text-speedify-green/80">Developers</Link>
          <Link href="#pricing" className="hover:text-speedify-green/80">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hidden sm:block">Login</Link>
          <Link href="/demo" className="bg-speedify-green text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-speedify-green/90 transition-colors">
            Get Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6 md:pt-24 md:pb-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold mb-8 shadow-sm">
           <span className="w-2 h-2 rounded-full bg-speedify-lime"></span>
           <span>Compliance made simple</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Secure, compliant identity <span className="underline decoration-speedify-lime decoration-4 underline-offset-4">verification</span> for Nigeria.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Speedify helps Banks and Fintechs verify customers faster, smarter, and with more reliability. 
          90% UI handled, 100% compliant.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/demo" className="bg-speedify-green text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-speedify-green/90 transition-transform active:scale-95 flex items-center gap-2">
            Get Demo
            <ArrowRight size={18} />
          </Link>
          <Link href="#docs" className="bg-white text-speedify-green border border-gray-200 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors">
            Read Docs
          </Link>
        </div>

        {/* Floating Avatars / Trust indicators (Visual element) */}
        <div className="mt-16 md:mt-24 relative hidden md:block">
           {/* Placeholder for visual complexity - in a real app this would be images/components */}
           <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 animate-pulse">
              <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">✓</div>
                 <div className="text-left">
                    <div className="text-xs text-gray-500">Verification</div>
                    <div className="text-sm font-bold">Approved</div>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-0 right-0 translate-x-12 translate-y-4">
              <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                    <ShieldCheck size={20} />
                 </div>
                 <div className="text-left">
                    <div className="text-xs text-gray-500">Security</div>
                    <div className="text-sm font-bold">Bank-Grade</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-gray-400 mb-8 uppercase tracking-wider">Trusted by Nigeria's leading innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple text placeholders for logos */}
             <span className="text-xl font-bold font-serif">Kuda.</span>
             <span className="text-xl font-bold tracking-tight">Moniepoint</span>
             <span className="text-xl font-extrabold italic">OPay</span>
             <span className="text-xl font-bold">Cowrywise</span>
             <span className="text-xl font-medium tracking-widest">PIGGYVEST</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-speedify-green font-semibold mb-4 bg-green-50 px-3 py-1 rounded-full text-sm">
                <Zap size={16} /> Features
            </div>
            <h2 className="text-4xl font-bold mb-4">Everything you need to verify identities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Maximize your team's productivity and security with our comprehensive, user-friendly verification system.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-3">Gov Database Verification</h3>
                <p className="text-gray-600 mb-6">
                    Direct integration with NIBSS (BVN), NIMC (NIN), and FRSC to validate facial data and details in real-time.
                </p>
                <div className="h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                     {/* Mock UI */}
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-3/4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-500">NIN CHECK</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">MATCH</span>
                        </div>
                        <div className="space-y-2">
                           <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                           <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-3">Liveness Detection</h3>
                <p className="text-gray-600 mb-6">
                    ISO 30107-3 compliant active check to prevent spoofing. Ensure the user is real and present.
                </p>
                <div className="h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                     <div className="w-24 h-24 rounded-full border-4 border-speedify-green flex items-center justify-center relative">
                        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                        <div className="absolute -right-2 -top-2 bg-speedify-lime p-1.5 rounded-full border-2 border-white">
                            <CheckCircle2 size={16} className="text-speedify-green" />
                        </div>
                     </div>
                </div>
            </div>

             {/* Feature 3 */}
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-3">Document OCR</h3>
                <p className="text-gray-600 mb-6">
                    Auto-extraction of text from Nigerian Passports, Drivers Licenses, Voters Cards, and NIN Slips.
                </p>
                <div className="h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center">
                    <FileText size={48} className="text-gray-300" />
                </div>
            </div>

             {/* Feature 4 */}
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-3">Omnichannel Delivery</h3>
                <p className="text-gray-600 mb-6">
                    Support verification via Web, Mobile SDKs, or conversational interfaces like WhatsApp & Telegram.
                </p>
                <div className="h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-green-600"><MessageSquare size={24} /></div>
                    <div className="bg-white p-3 rounded-xl shadow-sm text-gray-800"><Smartphone size={24} /></div>
                    <div className="bg-white p-3 rounded-xl shadow-sm text-blue-500"><Globe2 size={24} /></div>
                </div>
            </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-speedify-green text-white py-24 px-6 rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono mb-8 tracking-wide">
                SDK INTEGRATION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't replace. Integrate.</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
                The code that connects your users to compliance. Add our SDK to your React, React Native, iOS, or Android app in under 30 minutes.
            </p>

            {/* Fake Code Block */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-left font-mono text-sm border border-white/10 max-w-2xl mx-auto shadow-2xl overflow-x-auto">
                <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="space-y-2">
                    <p><span className="text-purple-400">import</span> <span className="text-yellow-200">{"{ Speedify }"}</span> <span className="text-purple-400">from</span> <span className="text-green-300">'@speedify/react'</span>;</p>
                    <p>&nbsp;</p>
                    <p><span className="text-purple-400">return</span> (</p>
                    <p className="pl-4">{"<"}<span className="text-blue-300">Speedify</span></p>
                    <p className="pl-8"><span className="text-blue-200">apiKey</span>=<span className="text-green-300">"pk_live_..."</span></p>
                    <p className="pl-8"><span className="text-blue-200">onSuccess</span>={"{(result) => console.log(result)}"}</p>
                    <p className="pl-4">{"/>"}</p>
                    <p>);</p>
                </div>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4">
                 {/* Tech Stack Icons Placeholder */}
                 {['React', 'Vue', 'Angular', 'iOS', 'Android', 'Flutter'].map((tech) => (
                    <div key={tech} className="bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors cursor-default">
                        {tech}
                    </div>
                 ))}
            </div>
         </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
         <div className="text-4xl font-serif text-speedify-green mb-8">"</div>
         <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
            Speedify is helping our company to decrease operational expenses and turnaround time, while increasing the compliance, resource allocation and effectiveness of our onboarding.
         </h3>
         <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="text-left">
                <div className="font-bold text-sm">Tunde Bakare</div>
                <div className="text-xs text-gray-500">CTO at PayFlow</div>
            </div>
         </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
             <div>
                <div className="text-4xl font-bold text-speedify-green mb-2">2026</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Speedify Founded</div>
             </div>
             <div>
                <div className="text-4xl font-bold text-speedify-green mb-2">500K+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Identities Verified</div>
             </div>
             <div>
                <div className="text-4xl font-bold text-speedify-green mb-2">99.9%</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Uptime Guarantee</div>
             </div>
         </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-speedify-green text-center">
         <div className="max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Discover the full scale of Speedify capabilities
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="bg-white text-speedify-green px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
                    Get Demo
                </Link>
                <Link href="#contact" className="bg-speedify-lime text-speedify-green px-8 py-3 rounded-full font-bold hover:bg-[#c0e855] transition-colors w-full sm:w-auto">
                    Contact Sales
                </Link>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051F16] text-gray-400 py-16 px-6 text-sm">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
             <div className="col-span-2">
                 <div className="flex items-center gap-2 mb-4 text-white">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-speedify-green font-bold text-xs">S</span>
                    </div>
                    <span className="font-bold">Speedify</span>
                 </div>
                 <p className="mb-4 text-xs max-w-xs">
                     Secure, compliant identity verification infrastructure for the modern Nigerian digital economy.
                 </p>
                 <div className="flex gap-4">
                     {/* Social icons placeholders */}
                     <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white/10 transition-colors">𝕏</div>
                     <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white/10 transition-colors">in</div>
                 </div>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Solution</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">Why Speedify</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">OpenAPI</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Technology</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                 </ul>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Company</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                 </ul>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Resources</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Contact Sales</Link></li>
                 </ul>
             </div>
         </div>
         <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div>© 2026 Speedify. All rights reserved.</div>
             <div className="flex gap-6">
                 <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             </div>
         </div>
      </footer>
    </div>
  );
}
