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
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxdmzjuL_AYHx_XXy8qWOqCogL4LCdGFOWO8PlT4mVLqDfLj6ynxmMAQc1mbZEYEVb-/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          mode: 'no-cors', // Google Apps Script often requires this
        }
      );

      // Even with no-cors we assume success if no exception
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white font-sans">
      {/* Navbar - keep your existing navbar */}

      {/* Hero - keep your existing hero */}

      {/* Grievance Form Section */}
      <section id="file" className="py-24 bg-gradient-to-br from-red-950/30 to-black">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">File Your Grievance</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Your story matters. All public submissions are <span className="text-emerald-400 font-medium">anonymized</span>. 
              After you submit, you’ll be able to see other employees’ stories in our public archive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-10 border border-white/10">
            {submitted ? (
              <div className="text-center py-16">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">FULL NAME</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none"
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
                      className="w-full bg-black border border-white/20 focus:border-red-400 rounded-2xl px-5 py-5 outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                {/* Phone, Status, Dates, Position fields - keep your existing ones here if you want, or simplify as needed */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-medium">TELL US WHAT HAPPENED</label>
                  <textarea
                    name="grievance"
                    value={formData.grievance}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-black border border-white/20 focus:border-red-400 rounded-3xl px-5 py-5 outline-none resize-y"
                    placeholder="Be as detailed as you like..."
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
                    className="w-full bg-black border border-white/20 focus:border-red-400 rounded-3xl px-5 py-5 outline-none resize-y"
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
                    <>SUBMIT GRIEVANCE & JOIN THE FIGHT <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>

                {error && <p className="text-red-400 text-center">{error}</p>}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer - keep your existing footer */}
    </div>
  );
}
