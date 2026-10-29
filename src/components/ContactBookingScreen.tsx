import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import { IWOSAN_LOCATIONS, IWOSAN_CONTACT_INFO } from '../data/locations';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  PhoneCall,
  Phone,
  Stethoscope,
  ShieldCheck,
  Building2,
  CalendarCheck,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  Send,
  Sparkles,
  QrCode,
} from 'lucide-react';

interface ContactBookingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenQR?: () => void;
}

export const ContactBookingScreen: React.FC<ContactBookingScreenProps> = ({ onNavigate, onOpenQR }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('lagoon-vi');
  const [packageInterest, setPackageInterest] = useState('Well-Woman Comprehensive Screening');
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent || !contactInfo.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-900 px-4 sm:px-5 pt-3 pb-28 max-w-md mx-auto text-left space-y-4">
      {/* 1. Top Header Row */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            aria-label="Return to Dashboard"
            className="w-10 h-10 rounded-full bg-[#f1f3f6] hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Connect with Iwosan
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            Lagoon Hospitals
          </span>
          {onOpenQR && (
            <button
              type="button"
              onClick={onOpenQR}
              aria-label="Share Conference QR Code"
              title="Share QR Code"
              className="w-10 h-10 rounded-full bg-white border border-slate-200/90 hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-700 shadow-xs transition cursor-pointer"
            >
              <QrCode className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Signature Hero Green Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#38a946] rounded-[32px] p-6 text-slate-950 shadow-xs relative overflow-hidden"
      >
        {/* Brand Mini Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0a1820] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-wide text-slate-900/90 leading-tight block">
              Iwosan
            </span>
            <span className="text-sm font-bold text-slate-950 leading-tight block">
              Wellness Passport
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-[28px] sm:text-[31px] font-bold text-slate-950 tracking-tight leading-[1.15] mt-4">
          Personalized care, <br />
          <span className="italic font-normal">when you’re ready.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs text-slate-950/80 leading-relaxed font-medium mt-2 max-w-[340px]">
          Reach Iwosan Lagoon Hospitals for routine screening, breast imaging, gynaecology checkups, or physician consultations.
        </p>

        {/* Feature Pills */}
        <div className="flex items-center gap-2 mt-5">
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            3–5 min callback
          </span>
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            Consent-led
          </span>
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            On-device
          </span>
        </div>
      </motion.div>

      {/* 3. Direct Contact Channels Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#f0f8ff] border border-[#d2eaf8] rounded-[24px] p-4 sm:p-5 space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#d7edf9] flex items-center justify-center text-[#0284c7]">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Direct Hospital Channels
            </h3>
            <p className="text-[11px] text-slate-500">
              Immediate connection to our women’s health concierge
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={IWOSAN_CONTACT_INFO.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp (+2349139352778)"
            className="w-full bg-[#0c1626] hover:bg-slate-900 active:scale-95 text-white py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer text-center"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.2] text-[#25D366]" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href={`tel:${IWOSAN_CONTACT_INFO.emergencyHotline}`}
            title="Call Iwosan Lagoon (+2349139352778)"
            className="w-full bg-white hover:bg-slate-50 active:scale-95 border border-[#b8ddf4] text-[#006097] py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer text-center"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>0700 LAGOON</span>
          </a>
        </div>
      </motion.div>

      {/* 4. 2x2 Clinical Services & Trust Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Specialist Consultations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#eaf7ee] flex items-center justify-center text-[#16a34a]">
            <Stethoscope className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Specialist Consultations
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Direct access to female gynaecologists, cardiologists, and physicians.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Preventive Screenings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#e0f3fa] flex items-center justify-center text-[#0284c7]">
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Preventive Screenings
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Digital 3D mammography, Pap smear, HPV DNA, and DEXA scans.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Strictly Confidential */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#edf0f9] flex items-center justify-center text-[#4b6cb7]">
            <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Strictly Confidential
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Consultations and clinical records are held under medical privacy laws.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Locations Across Lagos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#fef3e7] flex items-center justify-center text-[#d97706]">
            <Building2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Locations Across Lagos
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Victoria Island, Ikoyi, Ikeja Mainland, and Lekki Phase 1.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 5. Callback / Appointment Request Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-[28px] p-5 sm:p-6 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4"
      >
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-6 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Thank You! Request Received.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                The Iwosan Women’s Health Concierge will contact you via WhatsApp or phone within 2 business hours with booking options.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-emerald-700 underline pt-2 cursor-pointer"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Request a Callback or Screening Booking
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Leave your preferred contact details and our team will get in touch with available appointments.
              </p>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Your First Name / Preferred Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chioma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Phone Number or WhatsApp (Required for callback)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Service / Package of Interest
                </label>
                <select
                  value={packageInterest}
                  onChange={(e) => setPackageInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/70 cursor-pointer"
                >
                  <option value="Well-Woman Comprehensive Screening">Well-Woman Comprehensive Screening</option>
                  <option value="Digital Mammography & Breast Ultrasound">Digital Mammography & Breast Ultrasound</option>
                  <option value="Cervical Pap Smear & HPV DNA Test">Cervical Pap Smear & HPV DNA Test</option>
                  <option value="Gynaecologist Specialist Consultation">Gynaecologist Specialist Consultation</option>
                  <option value="Cardiology & Blood Pressure Review">Cardiology & Blood Pressure Review</option>
                  <option value="General Preventive Checkup">General Preventive Checkup</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Preferred Hospital Location (Lagos)
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/70 cursor-pointer"
                >
                  {IWOSAN_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.area})
                    </option>
                  ))}
                </select>
              </div>

              {/* Explicit Consent Checkbox */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  I agree to let Iwosan Lagoon Hospitals contact me regarding this inquiry. My health check responses remain private on my device.
                </span>
              </label>

              <button
                type="submit"
                disabled={!hasConsent || !contactInfo.trim()}
                className="w-full py-3.5 px-4 rounded-full bg-[#0c1626] hover:bg-slate-900 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Request to Iwosan Concierge</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 6. Hospital Branches Directory */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 pt-2"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Hospital & Medical Specialist Locations
          </h2>
        </div>

        <div className="space-y-3">
          {IWOSAN_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {loc.address}
                  </p>
                </div>
                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0"
                  title="View on Google Maps"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-0.5 flex flex-wrap gap-1">
                {loc.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {loc.hours}
                </span>
                <span className="font-bold text-emerald-700">{loc.area}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7. Footer Disclaimer */}
      <div className="text-center pt-2 pb-6">
        <p className="text-[11px] text-slate-400">
          Educational information, not a diagnosis. Iwosan Healthcare Systems.
        </p>
      </div>
    </div>
  );
};
