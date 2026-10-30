import { IwosanLocation } from '../types';

export const IWOSAN_LOCATIONS: IwosanLocation[] = [
  {
    id: 'lagoon-ikoyi',
    name: 'Iwosan Lagoon Hospitals, Ikoyi',
    address: '17B Bourdillon Road, Ikoyi, Lagos',
    area: 'Ikoyi',
    phone: '+234 700 524666 / +234 1 271 2700',
    hours: '24/7 Outpatient, Specialist Clinics & Inpatient Care',
    specialties: ['Obstetrics & Maternity', 'Well-Woman Health Packages', 'Paediatrics', 'Ultrasound & Radiology', 'Endocrinology'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Lagoon+Hospitals,+17B+Bourdillon+Road,+Ikoyi,+Lagos',
  },
  {
    id: 'lagoon-vi',
    name: 'Iwosan Wellness Centre, Victoria Island',
    address: '13B Idejo Street, Victoria Island, Lagos',
    area: 'Victoria Island',
    phone: '+234 700 524666 / +234 1 888 8888',
    hours: '24/7 Full Emergency & Multi-Specialty Clinic',
    specialties: ["Women's Health & Gynaecology", 'Digital Mammography', 'Cardiology & Catheterization Lab', 'Advanced Surgery', 'Executive Wellness'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Wellness+Centre,+13B+Idejo+Street,+Victoria+Island,+Lagos',
  },
  {
    id: 'lagoon-ikeja',
    name: 'Iwosan Lagoon Hospitals, Ikeja',
    address: '97/101 Obafemi Awolowo Way, Ikeja, Lagos',
    area: 'Ikeja',
    phone: '+234 700 524666 / +234 1 888 8888',
    hours: '24/7 Emergency, Surgery & Intensive Care',
    specialties: ['Comprehensive Health Screenings', 'Orthopaedics & Bone Care', 'Gynaecology & Minimally Invasive Surgery', 'Cardiac Diagnostics'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Lagoon+Hospitals,+97/101+Obafemi+Awolowo+Way,+Ikeja,+Lagos',
  },
  {
    id: 'lagoon-adeniyi-jones',
    name: 'Iwosan Lagoon Clinic, Ikeja',
    address: '91 Adeniyi Jones Avenue, Ikeja, Lagos',
    area: 'Adeniyi Jones, Ikeja',
    phone: '+234 700 524666 / +234 1 888 8888',
    hours: '24/7 Outpatient, Specialist Consultations & Diagnostics',
    specialties: ['Well-Woman Health Screenings', 'General Outpatient & Specialist Care', 'Diagnostic Laboratory & Ultrasound', 'Pharmacy Services'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Lagoon+Clinic,+91+Adeniyi+Jones+Avenue,+Ikeja,+Lagos',
  },
  {
    id: 'lagoon-idejo-outpatient',
    name: 'Iwosan Lagoon Outpatient Clinic, Idejo',
    address: '13A Idejo Street, Victoria Island, Lagos',
    area: 'Victoria Island',
    phone: '+234 700 524666 / +234 809 396 0000',
    hours: 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 10:00 AM – 4:00 PM',
    specialties: ['Fast-Track Blood & Vitals Screening', 'Women’s Health Consultations', 'Pharmacy & Diagnostic Lab', 'Vaccinations & HPV Care'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Lagoon+Outpatient+Clinic,+13A+Idejo+Street,+Victoria+Island,+Lagos',
  },
  {
    id: 'lagoon-ligali-vi',
    name: 'Iwosan Lagoon Hospitals, Victoria Island',
    address: '3B, Ligali Ayorinde Street, Victoria Island, Lagos',
    area: 'Victoria Island',
    phone: '+234 700 524666 / +234 1 888 8888',
    hours: '24/7 Specialized Cardiac Emergencies & Interventional Care',
    specialties: ['Women’s Heart Program', 'Echocardiography & Stress Testing', 'Holter Blood Pressure Monitoring', 'Hypertension Clinic'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Iwosan+Lagoon+Hospitals,+3B+Ligali+Ayorinde+Street,+Victoria+Island,+Lagos',
  },
  {
    id: 'paelon-memorial-vi',
    name: 'Paelon Memorial Hospital',
    address: '1221 Ahmadu Bello Way, Victoria Island, Lagos',
    area: 'Victoria Island',
    phone: '+234 1 454 4455 / +234 809 308 0000',
    hours: '24/7 Full Emergency & Specialist Clinics',
    specialties: ['Well-Woman Checkups & Gynaecology', 'Family Medicine & Executive Screening', 'Diagnostic Laboratory & Imaging', 'Maternity & Paediatrics'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Paelon+Memorial+Hospital,+1221+Ahmadu+Bello+Way,+Victoria+Island,+Lagos',
  },
  {
    id: 'euracare-vi',
    name: 'Euracare Multi-Specialist Hospital',
    address: '293B Younis Bashorun Street, Off Sinari Daranijo Street, Victoria Island, Lagos',
    area: 'Victoria Island',
    phone: '+234 700 387 22273 / +234 1 277 8700',
    hours: '24/7 Multi-Specialty, Advanced Diagnostics & Surgery',
    specialties: ['Advanced Diagnostic Radiology (MRI & CT)', 'Cardiology & Interventional Suite', 'Women’s Preventive Health & Gynaecology', 'Minimally Invasive Surgery'],
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Euracare+Multi-Specialist+Hospital,+293B+Younis+Bashorun+Street,+Victoria+Island,+Lagos',
  }
];

export const HOSPITAL_LOCATIONS = IWOSAN_LOCATIONS;


export const IWOSAN_CONTACT_INFO = {
  generalHotline: '+234 913 935 2778',
  emergencyHotline: '+2349139352778',
  directPhone: '+2349139352778',
  whatsappConcierge: '+234 913 935 2778',
  whatsappDirectUrl: 'https://wa.me/2349139352778?text=Hello%20Wellness%20Passport%20Team%2C%20I%20completed%20the%20WIMBIZ%20Health%20Awareness%20Check%20and%20would%20like%20to%20inquire%20about%20a%20screening%20appointment.',
  email: 'wellness@iwosanlagoon.life',
  website: 'https://iwosanlagoon.life',
  wimbizPartnerNote: 'Proudly delivered in partnership with WIMBIZ (Women in Management, Business and Public Service).',
};
