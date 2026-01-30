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
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-speedify-green rounded-lg flex items-center justify-center">
              <span className="text-speedify-lime font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-speedify-green">Speedify</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#solutions" className="hover:text-speedify-green transition-colors">Solutions</Link>
            <Link href="#developers" className="hover:text-speedify-green transition-colors">Developers</Link>
            <Link href="#pricing" className="hover:text-speedify-green transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-speedify-green transition-colors hidden sm:block">Login</Link>
            <Link href="/demo" className="bg-speedify-green text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-speedify-green/90 transition-all hover:shadow-lg hover:shadow-speedify-green/20">
              Get Demo
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Added pt for fixed header */}
      <section className="pt-32 pb-24 px-6 md:pt-40 md:pb-32 max-w-5xl mx-auto text-center relative overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-speedify-lime/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold mb-8 shadow-sm">
           <span className="w-2 h-2 rounded-full bg-speedify-lime animate-pulse"></span>
           <span className="text-gray-600">Compliance made simple</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-speedify-green">
          Secure, compliant identity <span className="underline decoration-speedify-lime decoration-4 underline-offset-4">verification</span> for Nigeria.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Speedify helps Banks and Fintechs verify customers faster, smarter, and with more reliability. 
          90% UI handled, 100% compliant.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/demo" className="bg-speedify-green text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-speedify-green/90 transition-all hover:shadow-xl hover:shadow-speedify-green/20 active:scale-95 flex items-center gap-2">
            Get Demo
            <ArrowRight size={18} />
          </Link>
          <Link href="#docs" className="bg-white text-speedify-green border border-gray-200 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-50 hover:border-speedify-green/30 transition-all">
            Read Docs
          </Link>
        </div>

        {/* Floating Avatars / Trust indicators */}
        <div className="mt-16 md:mt-24 relative hidden md:block max-w-3xl mx-auto">
           <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 animate-[bounce_3s_infinite]">
              <div className="bg-white p-3 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                 <div className="text-left">
                    <div className="text-xs text-gray-500">Verification</div>
                    <div className="text-sm font-bold text-gray-900">Approved</div>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-0 right-0 translate-x-12 translate-y-4 animate-[bounce_4s_infinite]">
              <div className="bg-white p-3 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <ShieldCheck size={20} />
                 </div>
                 <div className="text-left">
                    <div className="text-xs text-gray-500">Security</div>
                    <div className="text-sm font-bold text-gray-900">Bank-Grade</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm my-12 border border-gray-100">
        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-speedify-green font-semibold mb-4 bg-green-50 px-3 py-1 rounded-full text-sm">
                <Zap size={16} /> Features
            </div>
            <h2 className="text-4xl font-bold mb-4 text-speedify-green">Everything you need to verify identities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Maximize your team's productivity and security with our comprehensive, user-friendly verification system.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-speedify-bg p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold mb-3 text-speedify-green">Gov Database Verification</h3>
                <p className="text-gray-600 mb-6">
                    Direct integration with NIBSS (BVN), NIMC (NIN), and FRSC to validate facial data and details in real-time.
                </p>
                <div className="h-48 bg-white rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
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
            <div className="bg-speedify-bg p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold mb-3 text-speedify-green">Liveness Detection</h3>
                <p className="text-gray-600 mb-6">
                    ISO 30107-3 compliant active check to prevent spoofing. Ensure the user is real and present.
                </p>
                <div className="h-48 bg-white rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                     <div className="w-24 h-24 rounded-full border-4 border-speedify-green flex items-center justify-center relative">
                        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                        <div className="absolute -right-2 -top-2 bg-speedify-lime p-1.5 rounded-full border-2 border-white">
                            <CheckCircle2 size={16} className="text-speedify-green" />
                        </div>
                     </div>
                </div>
            </div>

             {/* Feature 3 */}
             <div className="bg-speedify-bg p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold mb-3 text-speedify-green">Document OCR</h3>
                <p className="text-gray-600 mb-6">
                    Auto-extraction of text from Nigerian Passports, Drivers Licenses, Voters Cards, and NIN Slips.
                </p>
                <div className="h-48 bg-white rounded-2xl border border-gray-100 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                    <FileText size={48} className="text-gray-300" />
                </div>
            </div>

             {/* Feature 4 */}
             <div className="bg-speedify-bg p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold mb-3 text-speedify-green">Omnichannel Delivery</h3>
                <p className="text-gray-600 mb-6">
                    Support verification via Web, Mobile SDKs, or conversational interfaces like WhatsApp & Telegram.
                </p>
                <div className="h-48 bg-white rounded-2xl border border-gray-100 flex items-center justify-center gap-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="flex flex-col items-center gap-2 group/icon">
                        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-speedify-green shadow-sm group-hover/icon:scale-110 transition-transform">
                             <MessageSquare size={28} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Chat</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group/icon">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-gray-700 shadow-sm group-hover/icon:scale-110 transition-transform">
                             <Smartphone size={28} strokeWidth={1.5} />
                        </div>
                         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">App</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group/icon">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-blue-600 shadow-sm group-hover/icon:scale-110 transition-transform">
                             <Globe2 size={28} strokeWidth={1.5} />
                        </div>
                         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Web</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-speedify-green text-white py-24 px-6 rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative shadow-2xl">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         {/* Glow effects */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-speedify-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block border border-speedify-lime/30 bg-speedify-lime/10 px-4 py-1.5 rounded-full text-xs font-mono mb-8 tracking-wide text-speedify-lime">
                SDK INTEGRATION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't replace. Integrate.</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                The code that connects your users to compliance. Add our SDK to your React, React Native, iOS, or Android app in under 30 minutes.
            </p>

            {/* Code Block */}
            <div className="bg-[#051F16]/80 backdrop-blur-md rounded-2xl p-6 text-left font-mono text-sm border border-white/10 max-w-2xl mx-auto shadow-2xl overflow-x-auto transform hover:scale-[1.01] transition-transform cursor-text group">
                <div className="flex gap-1.5 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 leading-relaxed">
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
                 {/* Tech Stack Icons */}
                 {['React', 'Vue', 'Angular', 'iOS', 'Android', 'Flutter'].map((tech) => (
                    <div key={tech} className="bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                        {tech}
                    </div>
                 ))}
            </div>
         </div>
      </section>

      {/* Stats */}
      <section className="bg-speedify-bg py-24 border-b border-gray-100">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
             <div className="p-4">
                <div className="text-5xl font-bold text-speedify-green mb-2">2026</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Speedify Founded</div>
             </div>
             <div className="p-4">
                <div className="text-5xl font-bold text-speedify-green mb-2">500K+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Identities Verified</div>
             </div>
             <div className="p-4">
                <div className="text-5xl font-bold text-speedify-green mb-2">99.9%</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Uptime Guarantee</div>
             </div>
         </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-white text-center">
         <div className="max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-speedify-green mb-6">
                Discover the full scale of Speedify capabilities
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="bg-speedify-green text-white px-8 py-3.5 rounded-full font-bold hover:bg-speedify-green/90 transition-all shadow-lg shadow-speedify-green/20 w-full sm:w-auto">
                    Get Demo
                </Link>
                <Link href="#contact" className="bg-speedify-lime text-speedify-green px-8 py-3.5 rounded-full font-bold hover:bg-[#c0e855] transition-all hover:shadow-lg hover:shadow-speedify-lime/20 w-full sm:w-auto">
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
                 <p className="mb-4 text-xs max-w-xs leading-relaxed opacity-80">
                     Secure, compliant identity verification infrastructure for the modern Nigerian digital economy.
                 </p>
                 <div className="flex gap-4">
                     {/* Social icons placeholders */}
                     <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">𝕏</div>
                     <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">in</div>
                 </div>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Solution</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">Why Speedify</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">OpenAPI</Link></li>
                 </ul>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Company</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                 </ul>
             </div>
             <div>
                 <h4 className="text-white font-bold mb-4">Resources</h4>
                 <ul className="space-y-2">
                     <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                     <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
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
