"use client";

import { useState, useEffect, Suspense } from "react";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedButton } from "@/components/AnimatedButton";
import { UserPlus, CheckCircle2, Loader2, AlertCircle, Phone, Building2, User, ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";

function RegisterContent() {
  const searchParams = useSearchParams();
  const initialStandardParam = searchParams.get('standard');

  const [formData, setFormData] = useState({ 
    userType: 'company', // 'company' or 'individual'
    name: '', 
    email: '', 
    phone: '',
    company: '', 
    standard: [] as string[],
    serviceType: 'both',
    message: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showStandards, setShowStandards] = useState(false);

  useEffect(() => {
    if (initialStandardParam) {
      const formatted = initialStandardParam.toUpperCase().startsWith('ISO')
        ? initialStandardParam.toUpperCase()
        : initialStandardParam.toLowerCase() === 'ims'
        ? 'Multiple / Not Sure Yet'
        : `ISO ${initialStandardParam}`;
      setFormData(prev => {
        if (prev.standard.includes(formatted)) return prev;
        return { ...prev, standard: [...prev.standard, formatted] };
      });
    }
  }, [initialStandardParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, standard: formData.standard.join(', ') })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during registration. Is the backend running?');
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Get Started</h1>
        <p className="text-muted-foreground text-lg">Register your company or sign up as an individual trainee for our ISO programs.</p>
      </div>

      <GlassCard className="max-w-xl mx-auto p-8 border-primary/20">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground">Your request has been securely submitted. One of our specialists will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {status === 'error' && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Are you registering as a Company or Individual Trainee?</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'company', serviceType: 'both'})}
                  className={`flex items-center justify-center space-x-3 cursor-pointer p-4 rounded-lg border transition-colors ${formData.userType === 'company' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <Building2 className={`w-5 h-5 ${formData.userType === 'company' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${formData.userType === 'company' ? 'text-primary' : 'text-foreground'}`}>Company</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'individual', company: '', serviceType: 'training'})}
                  className={`flex items-center justify-center space-x-3 cursor-pointer p-4 rounded-lg border transition-colors ${formData.userType === 'individual' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <User className={`w-5 h-5 ${formData.userType === 'individual' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${formData.userType === 'individual' ? 'text-primary' : 'text-foreground'}`}>Individual Trainee</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="Rahul Sharma" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-muted-foreground font-medium">+91</span>
                  <input 
                    required 
                    type="tel" 
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit Indian mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                    placeholder="98765 43210" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="rahul@domain.in" 
                />
              </div>
              
              {formData.userType === 'company' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <input 
                    required={formData.userType === 'company'}
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                    placeholder="Tech Solutions Pvt Ltd" 
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Which ISO standard are you interested in?</label>
              
              <button 
                type="button"
                onClick={() => setShowStandards(!showStandards)}
                className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground cursor-pointer hover:bg-white/10 transition-colors"
              >
                <span className={`truncate mr-2 ${formData.standard.length > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {formData.standard.length > 0 ? formData.standard.join(', ') : "Select ISO standards..."}
                </span>
                {showStandards ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 ml-2" />}
              </button>

              {showStandards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 p-3 bg-black/20 border border-white/10 rounded-lg max-h-[300px] overflow-y-auto">
                  {[
                    "ISO 9001",
                    "ISO 14001",
                    "ISO 45001",
                    "ISO 27001",
                    "ISO 22301",
                    "ISO 50001",
                    "ISO 22000",
                    "ISO 15189",
                    "ISO 37001",
                    "ISO 42001",
                    "Multiple / Not Sure Yet"
                  ].map((std) => {
                    const isSelected = formData.standard.includes(std);
                    return (
                      <button 
                        type="button"
                        key={std}
                        onClick={() => {
                          let newStandards;
                          if (isSelected) {
                            newStandards = formData.standard.filter(s => s !== std);
                          } else {
                            newStandards = [...formData.standard, std];
                          }
                          setFormData({...formData, standard: newStandards});
                        }}
                        className={`w-full text-left flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-colors ${isSelected ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                          {isSelected && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <span className={`text-sm ${isSelected ? 'text-primary font-medium' : 'text-foreground'}`}>{std}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {formData.userType === 'company' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">What services do you require?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <input type="radio" name="service" value="training" checked={formData.serviceType === 'training'} onChange={(e) => setFormData({...formData, serviceType: e.target.value})} className="accent-primary w-4 h-4" />
                    <span className="text-sm text-foreground">Training Only</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <input type="radio" name="service" value="documentation" checked={formData.serviceType === 'documentation'} onChange={(e) => setFormData({...formData, serviceType: e.target.value})} className="accent-primary w-4 h-4" />
                    <span className="text-sm text-foreground">Documentation</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors border-primary/30">
                    <input type="radio" name="service" value="both" checked={formData.serviceType === 'both'} onChange={(e) => setFormData({...formData, serviceType: e.target.value})} className="accent-primary w-4 h-4" />
                    <span className="text-sm text-foreground font-medium">I need both</span>
                  </label>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Additional Details (Optional)</label>
              <textarea 
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                placeholder={formData.userType === 'company' ? "Tell us a bit about your current compliance status or specific requirements..." : "Tell us about your background or why you want to take this training..."} 
              />
            </div>
            
            <AnimatedButton type="submit" disabled={status === 'loading'} className="w-full justify-center">
              {status === 'loading' ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
              ) : (
                <><UserPlus className="w-4 h-4 mr-2" /> Submit Request</>
              )}
            </AnimatedButton>
          </form>
        )}
      </GlassCard>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 min-h-screen text-center text-muted-foreground">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
