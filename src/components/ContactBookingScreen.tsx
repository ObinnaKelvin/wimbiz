import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import { IWOSAN_LOCATIONS, IWOSAN_CONTACT_INFO } from '../data/locations';
import {
  PhoneCall,
  CalendarCheck,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ContactBookingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ContactBookingScreen: React.FC<ContactBookingScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('lagoon-vi');
  const [packageInterest, setPackageInterest] = useState('Well-Woman Comprehensive Screening');
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent || !contactInfo.trim()) return;

    // Consent-led lead simulation
    setIsSubmitted(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-28 pt-2 text-left max-w-md mx-auto"
    >
      {/* Category header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
          <CalendarCheck className="w-4 h-4 text-emerald-700" />
          <span>Optional & Consent-Led</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">WIMBIZ Partner</span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Connect with Iwosan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Ready for your next step? Reach Iwosan Lagoon Hospitals for routine screening, gynaecology checkups, or physician reviews.
        </p>
      </motion.div>

      {/* Quick Direct WhatsApp & Hotline Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={IWOSAN_CONTACT_INFO.whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-3.5 shadow-sm transition flex flex-col justify-between cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-2">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold block">WhatsApp Concierge</span>
            <span className="text-[11px] text-emerald-100 block mt-0.5">Chat directly</span>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={`tel:${IWOSAN_CONTACT_INFO.emergencyHotline}`}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl p-3.5 shadow-sm transition flex flex-col justify-between cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center mb-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold block">24/7 Helpline</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">0700 LAGOON</span>
          </div>
        </motion.a>
      </motion.div>

      {/* Callback / Appointment Request Form */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
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
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Request a Callback or Screening Booking
                </h3>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Your First Name / Preferred Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chioma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Phone Number or WhatsApp (Required for callback)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Service / Package of Interest
                </label>
                <select
                  value={packageInterest}
                  onChange={(e) => setPackageInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
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
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Preferred Hospital Location (Lagos)
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
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
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  I agree to let Iwosan Lagoon Hospitals contact me regarding this inquiry. My health awareness responses remain private on my device.
                </span>
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!hasConsent || !contactInfo.trim()}
                className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Request to Iwosan Concierge</span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hospital Branches Directory */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
            Hospital & Medical Specialist Locations
          </h2>
        </div>

        <div className="space-y-3">
          {IWOSAN_LOCATIONS.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
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

              <div className="pt-1 flex flex-wrap gap-1">
                {loc.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {loc.hours}
                </span>
                <span className="font-bold text-emerald-700">{loc.area}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
