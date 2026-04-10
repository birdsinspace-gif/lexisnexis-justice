'use client';

import { useState } from 'react';
import { ArrowRight, Shield, Users, Scale, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employmentStatus: 'former',
    employmentStart: '',
    employmentEnd: '',
    position: '',
    grievance: '',
    criminalActivity: '',
    submitAnonymously: false,
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : null;
    setFormData(prev => ({
      ...prev,
      [name]: checked !== null ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please confirm the statement to submit your grievance.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }

    // Reset form after success
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        employmentStatus: 'former',
        employmentStart: '',
        employmentEnd: '',
        position: '',
        grievance: '',
        criminalActivity: '',
        submitAnonymously: false,
        agree: false,
      });
      setSubmitted(false);
      setError('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="w-9 h-9 bg-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl rotate-12">⚖️</div>
            <div>
              <span className="text-2xl font-semibold tracking-tighter">LexisNexis</span>
              <span className="text-2xl font-semibold tracking-tighter text-red-500">Justice</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
            <a href="#problem" className="hover:text-red-400 transition-colors">The Problem</a>
            <a href="#why" className="hover:text-red-400 transition-colors">Why Class Action?</a>
            <a href="#stories" className="hover:text-red-400 transition-colors">Real Stories</a>
            <a href="#file" className="hover:text-red-400 transition-colors">File Grievance</a>
          </div>

          <button
            onClick={() => document.getElementById('file')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 transition-all rounded-2xl font-semibold flex items-center gap-x-2 text-sm uppercase tracking-widest"
          >
            FILE NOW <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-x-2 bg-white/10 text-white text-sm font-medium px-5 py-2 rounded-3xl border border-white/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              CLASS ACTION FORMING
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
              You were <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">screwed over</span>.<br />
              Now we fight back.
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-lg">
              Former and current employees of LexisNexis Risk Solutions: 
              Join the growing class-action lawsuit against unfair practices, 
              wrongful terminations, data misuse, and corporate exploitation.
            </p>

            <div className="flex items-center gap-x-4">
              <button
                onClick={() => document.getElementById('file')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-6 bg-white text-black hover:scale-105 transition-all text-xl font-semibold rounded-3xl flex items-center gap-x-3 shadow-2xl shadow-red-500/30"
              >
                FILE YOUR GRIEVANCE
                <ArrowRight className="w-6 h-6" />
              </button>
              
              <div className="text-sm leading-tight">
                <div className="flex -space-x-4">
                  <div className="w-8 h-8 bg-zinc-700 border-2 border-black rounded-2xl flex items-center justify-center text-xs">👷</div>
                  <div className="w-8 h-8 bg-zinc-700 border-2 border-black rounded-2xl flex items-center justify-center text-xs">📊</div>
                  <div className="w-8 h-8 bg-zinc-700 border-2 border-black rounded-2xl flex items-center justify-center text-xs">💼</div>
                </div>
                <p className="text-zinc-400 mt-2">+1,847 employees<br />already joined</p>
              </div>
            </div>

            <div className="flex items-center gap-x-8 text-sm text-zinc-400">
              <div className="flex items-center gap-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <span>No fees to join</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Attorney-backed</span>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-[4rem] -rotate-6" />
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-red-400 font-mono text-sm">LEXISNEXIS RISK SOLUTIONS</div>
                  <div className="text-3xl font-semibold mt-1">Employee Impact Report</div>
                </div>
                <div className="px-4 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-2xl">CONFIDENTIAL</div>
              </div>
              
              <div className="space-y-6">
                <div className="h-2 bg-white/10 rounded-3xl w-3/4" />
                <div className="h-2 bg-white/10 rounded-3xl w-5/6" />
                <div className="h-2 bg-white/10 rounded-3xl w-1/2" />
                
                <div className="pt-8 border-t border-white/10 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-x-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Class Action Filed</span>
                  </div>
                  <div className="text-zinc-400">Q2 2026</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-black border border-white/20 text-xs px-6 py-3 rounded-3xl flex items-center gap-x-2 shadow-xl">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                1,847 grievances received
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-20 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <div className="sticky top-28">
                <span className="text-red-500 font-medium tracking-widest text-sm">THE TRUTH</span>
                <h2 className="text-5xl font-bold tracking-tighter mt-3 leading-none">
                  LexisNexis Risk Solutions has been screwing over its people for years.
                </h2>
                <p className="text-zinc-400 mt-6 text-lg">
                  Inaccurate background reports. Retaliatory firings. Misuse of employee data. 
                  Broken promises and zero accountability.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-red-400/30 transition-all group">
                <FileText className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition" />
                <h4 className="font-semibold text-xl">Inaccurate Risk Reports</h4>
                <p className="text-zinc-400 mt-3">Employees blacklisted by faulty data that ruined careers and future job prospects.</p>
              </div>
              <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-red-400/30 transition-all group">
                <FileText className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition" />
                <h4 className="font-semibold text-xl">Wrongful Terminations</h4>
                <p className="text-zinc-400 mt-3">Sudden layoffs tied to internal “risk scoring” systems that were never transparent.</p>
              </div>
              <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-red-400/30 transition-all group">
                <FileText className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition" />
                <h4 className="font-semibold text-xl">Data Privacy Violations</h4>
                <p className="text-zinc-400 mt-3">Employee personal information sold and shared without consent or compensation.</p>
              </div>
              <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-red-400/30 transition-all group">
                <FileText className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition" />
                <h4 className="font-semibold text-xl">Broken Retaliation Promises</h4>
                <p className="text-zinc-400 mt-3">Whistleblowers silenced. HR complaints ignored. Careers destroyed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CLASS ACTION */}
      <section id="why" className="py-20 bg-gradient-to-b from-black/60 to-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold tracking-tighter">One voice is easy to ignore.<br />Thousands cannot be silenced.</h2>
          <div className="max-w-2xl mx-auto mt-8 text-zinc-400 text-xl">
            Together we are stronger. A class-action lawsuit forces LexisNexis Risk Solutions to answer in court and pay what they owe.
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-3xl p-8 text-left">
              <div className="text-emerald-400 text-6xl font-bold">01</div>
              <h3 className="text-2xl font-semibold mt-6">Collective Power</h3>
              <p className="text-zinc-400 mt-4">Your story adds weight. More grievances = higher chance of success and bigger settlement.</p>
            </div>
            <div className="bg-white/5 rounded-3xl p-8 text-left">
              <div className="text-emerald-400 text-6xl font-bold">02</div>
              <h3 className="text-2xl font-semibold mt-6">No Cost to You</h3>
              <p className="text-zinc-400 mt-4">Contingency attorneys. You pay nothing unless we win. We fight for you.</p>
            </div>
            <div className="bg-white/5 rounded-3xl p-8 text-left">
              <div className="text-emerald-400 text-6xl font-bold">03</div>
              <h3 className="text-2xl font-semibold mt-6">Real Accountability</h3>
              <p className="text-zinc-400 mt-4">Force LexisNexis to reform its practices and compensate every affected employee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="stories" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-12">Real employees. Real pain.</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8">
              <p className="italic text-zinc-300">
                “My background report flagged me as high-risk because of an error in their database. I lost three job offers in a row. HR wouldn’t even talk to me.”
              </p>
              <div className="mt-8 flex items-center gap-x-3">
                <div className="w-10 h-10 bg-amber-300 rounded-2xl flex items-center justify-center text-xl">🧔</div>
                <div>
                  <div className="font-medium">Marcus Rivera</div>
                  <div className="text-xs text-zinc-400">Senior Data Analyst • Terminated 2024</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8">
              <p className="italic text-zinc-300">
                “They used my personal data in their ‘risk scoring’ without consent. When I complained, I was let go within two weeks. This company destroys lives.”
              </p>
              <div className="mt-8 flex items-center gap-x-3">
                <div className="w-10 h-10 bg-purple-300 rounded-2xl flex items-center justify-center text-xl">👩🏻‍💼</div>
                <div>
                  <div className="font-medium">Sarah Patel</div>
                  <div className="text-xs text-zinc-400">Compliance Officer • 2023-2025</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8">
              <p className="italic text-zinc-300">
                “Former employee here — watched them bury legitimate whistleblower complaints. Their internal ‘risk solutions’ are just cover for union-busting.”
              </p>
              <div className="mt-8 flex items-center gap-x-3">
                <div className="w-10 h-10 bg-cyan-300 rounded-2xl flex items-center justify-center text-xl">👨🏽‍💻</div>
                <div>
                  <div className="font-medium">Jamal Thompson</div>
                  <div className="text-xs text-zinc-400">Software Engineer • Atlanta, GA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM / FILE GRIEVANCE */}
      <section id="file" className="py-24 bg-gradient-to-br from-red-950/30 to-black">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tighter">File Your Grievance</h2>
            <p className="text-xl text-zinc-400 mt-4">
              Takes 90 seconds. Your information is protected under attorney-client privilege.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mx-auto w-20 h-20 bg-emerald-500 text-black rounded-3xl flex items-center justify-center text-6xl mb-6">✅</div>
                <h3 className="text-4xl font-semibold mb-2">Grievance Received</h3>
                <p className="text-zinc-400 mb-8">Thank you for standing up for justice.</p>
                <div className="inline-flex items-center gap-x-3 bg-emerald-900/50 border border-emerald-400/30 px-6 py-3 rounded-2xl">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium text-emerald-400">Attorneys Reviewing</span>
                </div>
                <p className="text-sm text-zinc-500 mt-10">
                  Your submission has been added to the public archive (anonymized). 
                  You can now view other employees’ stories.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Your story matters. All public submissions are <span className="text-emerald-400 font-medium">anonymized</span>. 
                    After you submit, you’ll be able to see other employees’ stories in our public archive.
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">FULL NAME</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">PHONE</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">EMPLOYMENT STATUS</label>
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                    >
                      <option value="former">Former Employee</option>
                      <option value="current">Current Employee</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">START DATE</label>
                    <input
                      type="month"
                      name="employmentStart"
                      value={formData.employmentStart}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">END DATE (if former)</label>
                    <input
                      type="month"
                      name="employmentEnd"
                      value={formData.employmentEnd}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-medium">YOUR POSITION / DEPARTMENT</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none transition"
                    placeholder="Senior Risk Analyst, Atlanta HQ"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-medium">TELL US WHAT HAPPENED</label>
                  <textarea
                    name="grievance"
                    value={formData.grievance}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black border border-white/20 focus:border-red-400 rounded-3xl px-5 py-5 outline-none resize-none transition"
                    placeholder="Be as detailed as you like. Dates, names, specific incidents, how it affected you..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-medium flex items-center gap-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    DID THIS INVOLVE POTENTIAL CRIMINAL ACTIVITY?
                  </label>
                  <textarea
                    name="criminalActivity"
                    value={formData.criminalActivity}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black border border-white/20 focus:border-red-400 rounded-3xl px-5 py-5 outline-none resize-none transition"
                    placeholder="Data theft, retaliation, harassment, false reporting, etc. (optional but powerful)"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="submitAnonymously"
                    name="submitAnonymously"
                    checked={formData.submitAnonymously}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-red-600"
                  />
                  <label htmlFor="submitAnonymously" className="text-sm text-zinc-400 cursor-pointer">
                    Submit completely anonymously (recommended for privacy)
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-red-600"
                  />
                  <label htmlFor="agree" className="text-sm text-zinc-400 cursor-pointer">
                    I confirm that this information is truthful. I understand my story may be used (anonymously if requested) by the legal team.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-7 bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 transition-all rounded-3xl text-xl font-semibold flex items-center justify-center gap-x-3"
                >
                  {isSubmitting ? (
                    <>SUBMITTING TO LEGAL TEAM...</>
                  ) : (
                    <>
                      SUBMIT GRIEVANCE & JOIN THE FIGHT
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                {error ? <p className="text-red-400 text-center">{error}</p> : null}
              </div>
            )}
          </form>

          <p className="text-center text-xs text-zinc-500 mt-8">
            All submissions are reviewed by licensed attorneys. Your data is encrypted and never shared with LexisNexis.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-y-4">
          <div>© 2026 LexisNexis Justice Initiative • Not affiliated with LexisNexis Risk Solutions</div>
          <div className="flex gap-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Attorney Disclaimer</a>
            <a href="#" className="hover:text-white">Contact Legal Team</a>
          </div>
          <div>Made with 🔥 for every employee who deserves better</div>
        </div>
      </footer>
    </div>
  );
}
