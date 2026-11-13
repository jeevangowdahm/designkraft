import React, { createContext, useContext, useState, ReactNode } from 'react';

// All Indian languages + major international languages
export type Language = 
  | 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as' | 'ur' | 'sa' 
  | 'es' | 'fr' | 'de' | 'ar' | 'zh' | 'ja' | 'ko' | 'pt' | 'ru' | 'it' | 'nl' | 'tr' | 'th' | 'vi' | 'id';

interface Translations {
  [key: string]: {
    [lang in Language]?: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { en: 'Home', hi: 'होम', ta: 'முகப்பு', te: 'హోమ్', bn: 'হোম', mr: 'होम', gu: 'હોમ', kn: 'ಮುಖಪುಟ', ml: 'ഹോം', pa: 'ਹੋਮ', es: 'Inicio', fr: 'Accueil', de: 'Startseite', ar: 'الرئيسية', zh: '首页', ja: 'ホーム', ko: '홈', pt: 'Início', ru: 'Главная', it: 'Home', nl: 'Home', tr: 'Anasayfa', th: 'หน้าแรก', vi: 'Trang chủ', id: 'Beranda' },
  nav_services: { en: 'Services', hi: 'सेवाएं', ta: 'சேவைகள்', te: 'సేవలు', bn: 'সেবা', mr: 'सेवा', gu: 'સેવાઓ', kn: 'ಸೇವೆಗಳು', ml: 'സേവനങ്ങൾ', pa: 'ਸੇਵਾਵਾਂ', es: 'Servicios', fr: 'Services', de: 'Dienstleistungen', ar: 'الخدمات', zh: '服务', ja: 'サービス', ko: '서비스', pt: 'Serviços', ru: 'Услуги', it: 'Servizi', nl: 'Diensten', tr: 'Hizmetler', th: 'บริการ', vi: 'Dịch vụ', id: 'Layanan' },
  nav_projects: { en: 'Projects', hi: 'प्रोजेक्ट्स', ta: 'திட்டங்கள்', te: 'ప్రాజెక్ట్‌లు', bn: 'প্রকল্প', mr: 'प्रकल्प', gu: 'પ્રોજેક્ટ્સ', kn: 'ಯೋಜನೆಗಳು', ml: 'പ്രോജക്ടുകൾ', pa: 'ਪ੍ਰੋਜੈਕਟ', es: 'Proyectos', fr: 'Projets', de: 'Projekte', ar: 'المشاريع', zh: '项目', ja: 'プロジェクト', ko: '프로젝트', pt: 'Projetos', ru: 'Проекты', it: 'Progetti', nl: 'Projecten', tr: 'Projeler', th: 'โครงการ', vi: 'Dự án', id: 'Proyek' },
  nav_gallery: { en: 'Gallery', hi: 'गैलरी', ta: 'கேலரி', te: 'గ్యాలరీ', bn: 'গ্যালারি', mr: 'गॅलरी', gu: 'ગેલેરી', kn: 'ಗ್ಯಾಲರಿ', ml: 'ഗാലറി', pa: 'ਗੈਲਰੀ', es: 'Galería', fr: 'Galerie', de: 'Galerie', ar: 'معرض', zh: '画廊', ja: 'ギャラリー', ko: '갤러리', pt: 'Galeria', ru: 'Галерея', it: 'Galleria', nl: 'Galerij', tr: 'Galeri', th: 'แกลเลอรี', vi: 'Thư viện ảnh', id: 'Galeri' },
  nav_calculator: { en: 'Calculator', hi: 'कैलकुलेटर', ta: 'கால்குலேட்டர்', te: 'కాల్క్యులేటర్', bn: 'ক্যালকুলেটর', mr: 'कॅल्क्युलेटर', gu: 'કેલ્ક્યુલેટર', kn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್', ml: 'കാൽക്കുലേറ്റർ', pa: 'ਕੈਲਕੁਲੇਟਰ', es: 'Calculadora', fr: 'Calculateur', de: 'Rechner', ar: 'الحاسبة', zh: '计算器', ja: '計算機', ko: '계산기', pt: 'Calculadora', ru: 'Калькулятор', it: 'Calcolatore', nl: 'Calculator', tr: 'Hesaplayıcı', th: 'เครื่องคิดเลข', vi: 'Máy tính', id: 'Kalkulator' },
  nav_contact: { en: 'Contact', hi: 'संपर्क', ta: 'தொடர்பு', te: 'సంప్రదించు', bn: 'যোগাযোগ', mr: 'संपर्क', gu: 'સંપર્ક', kn: 'ಸಂಪರ್ಕ', ml: 'ബന്ധപ്പെടുക', pa: 'ਸੰਪਰਕ', es: 'Contacto', fr: 'Contact', de: 'Kontakt', ar: 'اتصل', zh: '联系', ja: '連絡先', ko: '연락처', pt: 'Contato', ru: 'Контакты', it: 'Contatti', nl: 'Contact', tr: 'İletişim', th: 'ติดต่อ', vi: 'Liên hệ', id: 'Kontak' },
  nav_scheduling: { en: 'Book', hi: 'बुक करें', ta: 'முன்பதிவு', te: 'బుక్', bn: 'বুক', mr: 'बुक करा', gu: 'બુક કરો', kn: 'ಬುಕ್', ml: 'ബുക്ക്', pa: 'ਬੁੱਕ', es: 'Reservar', fr: 'Réserver', de: 'Buchen', ar: 'حجز', zh: '预约', ja: '予約', ko: '예약', pt: 'Agendar', ru: 'Забронировать', it: 'Prenota', nl: 'Boeken', tr: 'Rezervasyon', th: 'จอง', vi: 'Đặt lịch', id: 'Pesan' },
  nav_login: { en: 'Login', hi: 'लॉग इन', ta: 'உள்நுழை', te: 'లాగిన్', bn: 'লগইন', mr: 'लॉगिन', gu: 'લૉગિન', kn: 'ಲಾಗಿನ್', ml: 'ലോഗിൻ', pa: 'ਲੌਗਇਨ', es: 'Iniciar sesión', fr: 'Connexion', de: 'Anmelden', ar: 'تسجيل الدخول', zh: '登录', ja: 'ログイン', ko: '로그인', pt: 'Entrar', ru: 'Войти', it: 'Accedi', nl: 'Inloggen', tr: 'Giriş', th: 'เข้าสู่ระบบ', vi: 'Đăng nhập', id: 'Masuk' },
  nav_signup: { en: 'Sign Up', hi: 'साइन अप', ta: 'பதிவு', te: 'సైన్ అప్', bn: 'সাইন আপ', mr: 'साइन अप', gu: 'સાઇન અપ', kn: 'ಸೈನ್ ಅಪ್', ml: 'സൈൻ അപ്പ്', pa: 'ਸਾਈਨ ਅੱਪ', es: 'Registrarse', fr: "S'inscrire", de: 'Registrieren', ar: 'إنشاء حساب', zh: '注册', ja: '登録', ko: '가입', pt: 'Cadastrar', ru: 'Регистрация', it: 'Iscriviti', nl: 'Aanmelden', tr: 'Kayıt Ol', th: 'ลงทะเบียน', vi: 'Đăng ký', id: 'Daftar' },
  nav_ar_camera: { en: 'AR Camera', hi: 'AR कैमरा', ta: 'AR கேமரா', te: 'AR కెమెరా', bn: 'AR ক্যামেরা', mr: 'AR कॅमेरा', gu: 'AR કેમેરા', kn: 'AR ಕ್ಯಾಮೆರಾ', ml: 'AR ക്യാമറ', pa: 'AR ਕੈਮਰਾ', es: 'Cámara AR', fr: 'Caméra RA', de: 'AR-Kamera', ar: 'كاميرا AR', zh: 'AR相机', ja: 'ARカメラ', ko: 'AR 카메라', pt: 'Câmera AR', ru: 'AR-камера', it: 'Fotocamera AR', nl: 'AR-camera', tr: 'AR Kamera', th: 'กล้อง AR', vi: 'Camera AR', id: 'Kamera AR' },

  // Hero
  hero_title: { en: 'Transform Your Space Into Art', hi: 'अपने स्थान को कला में बदलें', ta: 'உங்கள் இடத்தை கலையாக மாற்றுங்கள்', te: 'మీ స్థలాన్ని కళగా మార్చండి', bn: 'আপনার স্থানকে শিল্পে রূপান্তর করুন', mr: 'तुमच्या जागेचे कलात्मक रूपांतर करा', gu: 'તમારી જગ્યાને કલામાં બદલો', kn: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಕಲೆಯಾಗಿ ಪರಿವರ್ತಿಸಿ', ml: 'നിങ്ങളുടെ ഇടത്തെ കലയാക്കി മാറ്റുക', pa: 'ਆਪਣੀ ਥਾਂ ਨੂੰ ਕਲਾ ਵਿੱਚ ਬਦਲੋ', es: 'Transforma Tu Espacio en Arte', fr: 'Transformez Votre Espace en Art', de: 'Verwandeln Sie Ihren Raum in Kunst', ar: 'حوّل مساحتك إلى فن', zh: '将您的空间转化为艺术', ja: '空間をアートに変える', ko: '공간을 예술로 변환', pt: 'Transforme Seu Espaço em Arte', ru: 'Преобразите свое пространство в искусство', it: 'Trasforma il Tuo Spazio in Arte', nl: 'Transformeer Uw Ruimte in Kunst', tr: 'Alanınızı Sanata Dönüştürün', th: 'เปลี่ยนพื้นที่ของคุณเป็นงานศิลปะ', vi: 'Biến không gian của bạn thành nghệ thuật', id: 'Ubah Ruang Anda Menjadi Seni' },
  hero_subtitle: { en: 'Award-winning interior design solutions for homes, offices, hospitals & more. AI-powered assistance available 24/7 across India.', hi: 'घरों, कार्यालयों, अस्पतालों और अधिक के लिए पुरस्कार विजेता इंटीरियर डिजाइन समाधान। पूरे भारत में 24/7 AI-संचालित सहायता उपलब्ध।', ta: 'வீடுகள், அலுவலகங்கள், மருத்துவமனைகள் மற்றும் பலவற்றிற்கான விருது பெற்ற உள்ளமைப்பு வடிவமைப்பு தீர்வுகள்.', te: 'ఇళ్ళు, కార్యాలయాలు, ఆసుపత్రులు మరియు మరిన్నింటి కోసం అవార్డు విజేత ఇంటీరియర్ డిజైన్ సొల్యూషన్లు.', bn: 'বাড়ি, অফিস, হাসপাতাল এবং আরও অনেক কিছুর জন্য পুরস্কার বিজয়ী ইন্টেরিয়র ডিজাইন সলিউশন।', es: 'Soluciones de diseño interior galardonadas para hogares, oficinas, hospitales y más.', fr: 'Solutions de design intérieur primées pour maisons, bureaux, hôpitaux et plus.', de: 'Preisgekrönte Innenarchitekturlösungen für Häuser, Büros, Krankenhäuser und mehr.', ar: 'حلول تصميم داخلي حائزة على جوائز للمنازل والمكاتب والمستشفيات والمزيد', zh: '屡获殊荣的室内设计解决方案，适用于住宅、办公室、医院等。', ja: '住宅、オフィス、病院などのための受賞歴のあるインテリアデザインソリューション。' },
  hero_cta: { en: 'Start Your Project', hi: 'अपना प्रोजेक्ट शुरू करें', ta: 'உங்கள் திட்டத்தைத் தொடங்குங்கள்', te: 'మీ ప్రాజెక్ట్‌ను ప్రారంభించండి', bn: 'আপনার প্রকল্প শুরু করুন', mr: 'तुमचा प्रकल्प सुरू करा', gu: 'તમારો પ્રોજેક્ટ શરૂ કરો', kn: 'ನಿಮ್ಮ ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ', ml: 'നിങ്ങളുടെ പ്രോജക്ട് ആരംഭിക്കുക', pa: 'ਆਪਣਾ ਪ੍ਰੋਜੈਕਟ ਸ਼ੁਰੂ ਕਰੋ', es: 'Inicia Tu Proyecto', fr: 'Démarrez Votre Projet', de: 'Starten Sie Ihr Projekt', ar: 'ابدأ مشروعك', zh: '开始您的项目', ja: 'プロジェクトを開始', ko: '프로젝트 시작', pt: 'Iniciar Seu Projeto', ru: 'Начать проект', it: 'Inizia il Tuo Progetto' },
  hero_chat: { en: 'Chat with AI', hi: 'AI से चैट करें', ta: 'AI உடன் அரட்டை', te: 'AI తో చాట్ చేయండి', bn: 'AI এর সাথে চ্যাট করুন', mr: 'AI सह चॅट करा', gu: 'AI સાથે ચેટ કરો', kn: 'AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ', ml: 'AI യുമായി ചാറ്റ് ചെയ്യുക', pa: 'AI ਨਾਲ ਗੱਲ ਕਰੋ', es: 'Chatea con IA', fr: 'Discuter avec IA', de: 'Mit KI chatten', ar: 'الدردشة مع الذكاء الاصطناعي', zh: '与AI聊天', ja: 'AIとチャット' },
  hero_scan: { en: 'Scan Room with AR', hi: 'AR से कमरा स्कैन करें', ta: 'AR மூலம் அறையை ஸ்கேன் செய்யுங்கள்', te: 'AR తో గదిని స్కాన్ చేయండి', bn: 'AR দিয়ে ঘর স্ক্যান করুন', mr: 'AR ने खोली स्कॅन करा', gu: 'AR સાથે રૂમ સ્કેન કરો', kn: 'AR ಮೂಲಕ ಕೋಣೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ', ml: 'AR ഉപയോഗിച്ച് റൂം സ്കാൻ ചെയ്യുക', pa: 'AR ਨਾਲ ਕਮਰਾ ਸਕੈਨ ਕਰੋ', es: 'Escanear con AR', fr: 'Scanner avec AR', de: 'Raum mit AR scannen', ar: 'مسح الغرفة بالواقع المعزز', zh: '用AR扫描房间', ja: 'ARで部屋をスキャン' },

  // Services
  services_title: { en: 'Our Services', hi: 'हमारी सेवाएं', ta: 'எங்கள் சேவைகள்', te: 'మా సేవలు', bn: 'আমাদের সেবা', mr: 'आमच्या सेवा', gu: 'અમારી સેવાઓ', kn: 'ನಮ್ಮ ಸೇವೆಗಳು', ml: 'ഞങ്ങളുടെ സേവനങ്ങൾ', pa: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ', es: 'Nuestros Servicios', fr: 'Nos Services', de: 'Unsere Dienstleistungen', ar: 'خدماتنا', zh: '我们的服务', ja: '私たちのサービス' },
  services_residential: { en: 'Residential Design', hi: 'आवासीय डिज़ाइन', ta: 'குடியிருப்பு வடிவமைப்பு', te: 'నివాస డిజైన్', bn: 'আবাসিক ডিজাইন', mr: 'निवासी डिझाइन', gu: 'રહેણાક ડિઝાઇન', kn: 'ವಾಸ ವಿನ್ಯಾಸ', ml: 'റെസിഡൻഷ്യൽ ഡിസൈൻ', pa: 'ਰਿਹਾਇਸ਼ੀ ਡਿਜ਼ਾਈਨ', es: 'Diseño Residencial', fr: 'Design Résidentiel', de: 'Wohndesign', ar: 'التصميم السكني', zh: '住宅设计', ja: '住宅デザイン' },
  services_commercial: { en: 'Commercial Spaces', hi: 'वाणिज्यिक स्थान', ta: 'வணிக இடங்கள்', te: 'వాణిజ్య ప్రదేశాలు', bn: 'বাণিজ্যিক স্থান', mr: 'व्यावसायिक जागा', gu: 'વ્યાપારી જગ્યાઓ', kn: 'ವಾಣಿಜ್ಯ ಸ್ಥಳಗಳು', ml: 'കൊമേഴ്‌സ്യൽ സ്പേസുകൾ', pa: 'ਵਪਾਰਕ ਥਾਂਵਾਂ', es: 'Espacios Comerciales', fr: 'Espaces Commerciaux', de: 'Gewerbeflächen', ar: 'المساحات التجارية', zh: '商业空间', ja: '商業スペース' },
  services_healthcare: { en: 'Healthcare Facilities', hi: 'स्वास्थ्य सुविधाएं', ta: 'சுகாதார வசதிகள்', te: 'ఆరోగ్య సౌకర్యాలు', bn: 'স্বাস্থ্যসেবা সুবিধা', mr: 'आरोग्य सुविधा', gu: 'આરોગ્ય સુવિધાઓ', kn: 'ಆರೋಗ್ಯ ಸೌಲಭ್ಯಗಳು', ml: 'ആരോഗ്യ സൗകര്യങ്ങൾ', pa: 'ਸਿਹਤ ਸਹੂਲਤਾਂ', es: 'Instalaciones Sanitarias', fr: 'Établissements de Santé', de: 'Gesundheitseinrichtungen', ar: 'المرافق الصحية', zh: '医疗设施', ja: '医療施設' },
  services_hospitality: { en: 'Hospitality Design', hi: 'आतिथ्य डिज़ाइन', ta: 'விருந்தோம்பல் வடிவமைப்பு', te: 'ఆతిథ్య డిజైన్', bn: 'আতিথেয়তা ডিজাইন', mr: 'आतिथ्य डिझाइन', gu: 'આતિથ્ય ડિઝાઇન', kn: 'ಆತಿಥ್ಯ ವಿನ್ಯಾಸ', ml: 'ഹോസ്പിറ്റാലിറ്റി ഡിസൈൻ', pa: 'ਮਹਿਮਾਨ-ਨਵਾਜ਼ੀ ਡਿਜ਼ਾਈਨ', es: 'Diseño de Hospitalidad', fr: 'Design Hôtelier', de: 'Hospitality-Design', ar: 'تصميم الضيافة', zh: '酒店设计', ja: 'ホスピタリティデザイン' },

  // Chat
  chat_title: { en: 'AI Design Assistant', hi: 'AI डिज़ाइन सहायक', ta: 'AI வடிவமைப்பு உதவியாளர்', te: 'AI డిజైన్ అసిస్టెంట్', bn: 'AI ডিজাইন সহকারী', mr: 'AI डिझाइन सहाय्यक', gu: 'AI ડિઝાઇન સહાયક', kn: 'AI ವಿನ್ಯಾಸ ಸಹಾಯಕ', ml: 'AI ഡിസൈൻ അസിസ്റ്റന്റ്', pa: 'AI ਡਿਜ਼ਾਈਨ ਸਹਾਇਕ', es: 'Asistente de Diseño IA', fr: 'Assistant Design IA', de: 'KI-Design-Assistent', ar: 'مساعد التصميم بالذكاء الاصطناعي', zh: 'AI设计助手', ja: 'AIデザインアシスタント' },
  chat_placeholder: { en: 'Ask about interior design...', hi: 'इंटीरियर डिज़ाइन के बारे में पूछें...', ta: 'உள்ளமைப்பு வடிவமைப்பு பற்றி கேளுங்கள்...', te: 'ఇంటీరియర్ డిజైన్ గురించి అడగండి...', bn: 'ইন্টেরিয়র ডিজাইন সম্পর্কে জিজ্ঞাসা করুন...', mr: 'इंटिरियर डिझाइनबद्दल विचारा...', gu: 'ઇન્ટિરિયર ડિઝાઇન વિશે પૂછો...', kn: 'ಇಂಟೀರಿಯರ್ ಡಿಸೈನ್ ಬಗ್ಗೆ ಕೇಳಿ...', ml: 'ഇന്റീരിയർ ഡിസൈനിനെ കുറിച്ച് ചോദിക്കുക...', pa: 'ਇੰਟੀਰੀਅਰ ਡਿਜ਼ਾਈਨ ਬਾਰੇ ਪੁੱਛੋ...', es: 'Pregunta sobre diseño interior...', fr: 'Posez une question sur le design...', de: 'Fragen Sie zum Innendesign...', ar: 'اسأل عن التصميم الداخلي...', zh: '询问室内设计...', ja: 'インテリアデザインについて質問...' },
  chat_welcome: { en: "Namaste! 🙏 I'm your AI design assistant. How can I help transform your space today?", hi: "नमस्ते! 🙏 मैं आपका AI डिज़ाइन सहायक हूं। आज मैं आपके स्थान को बदलने में कैसे मदद कर सकता हूं?", ta: "வணக்கம்! 🙏 நான் உங்கள் AI வடிவமைப்பு உதவியாளர். இன்று உங்கள் இடத்தை மாற்ற நான் எப்படி உதவ முடியும்?", te: "నమస్తే! 🙏 నేను మీ AI డిజైన్ అసిస్టెంట్. ఈ రోజు మీ స్థలాన్ని మార్చడానికి నేను ఎలా సహాయపడగలను?", bn: "নমস্কার! 🙏 আমি আপনার AI ডিজাইন সহকারী। আজ আপনার জায়গাকে রূপান্তর করতে আমি কীভাবে সাহায্য করতে পারি?", es: '¡Hola! 🙏 Soy tu asistente de diseño IA. ¿Cómo puedo ayudarte a transformar tu espacio hoy?', fr: 'Bonjour! 🙏 Je suis votre assistant design IA. Comment puis-je vous aider à transformer votre espace aujourd\'hui?', de: 'Hallo! 🙏 Ich bin Ihr KI-Design-Assistent. Wie kann ich Ihnen heute helfen, Ihren Raum zu verwandeln?', ar: 'مرحبا! 🙏 أنا مساعد التصميم بالذكاء الاصطناعي. كيف يمكنني مساعدتك في تحويل مساحتك اليوم؟', zh: '你好！🙏 我是您的AI设计助手。今天我能如何帮助您改造空间？', ja: 'こんにちは！🙏 私はあなたのAIデザインアシスタントです。今日、どのようにお手伝いできますか？' },

  // Projects
  projects_title: { en: 'Project Tracker', hi: 'प्रोजेक्ट ट्रैकर', ta: 'திட்ட கண்காணிப்பான்', te: 'ప్రాజెక్ట్ ట్రాకర్', bn: 'প্রকল্প ট্র্যাকার', mr: 'प्रकल्प ट्रॅकर', gu: 'પ્રોજેક્ટ ટ્રેકર', kn: 'ಯೋಜನೆ ಟ್ರ್ಯಾಕರ್', ml: 'പ്രോജക്ട് ട്രാക്കർ', pa: 'ਪ੍ਰੋਜੈਕਟ ਟ੍ਰੈਕਰ', es: 'Seguimiento de Proyectos', fr: 'Suivi de Projet', de: 'Projekt-Tracker', ar: 'متتبع المشروع', zh: '项目跟踪器', ja: 'プロジェクトトラッカー' },
  projects_budget: { en: 'Budget', hi: 'बजट', ta: 'பட்ஜெட்', te: 'బడ్జెట్', bn: 'বাজেট', mr: 'अर्थसंकल्प', gu: 'બજેટ', kn: 'ಬಜೆಟ್', ml: 'ബജറ്റ്', pa: 'ਬਜਟ', es: 'Presupuesto', fr: 'Budget', de: 'Budget', ar: 'الميزانية', zh: '预算', ja: '予算' },
  projects_progress: { en: 'Progress', hi: 'प्रगति', ta: 'முன்னேற்றம்', te: 'పురోగతి', bn: 'অগ্রগতি', mr: 'प्रगती', gu: 'પ્રગતિ', kn: 'ಪ್ರಗತಿ', ml: 'പുരോഗതി', pa: 'ਤਰੱਕੀ', es: 'Progreso', fr: 'Progression', de: 'Fortschritt', ar: 'التقدم', zh: '进度', ja: '進捗' },
  projects_deadline: { en: 'Deadline', hi: 'समय सीमा', ta: 'காலக்கெடு', te: 'గడువు', bn: 'সময়সীমা', mr: 'अंतिम मुदत', gu: 'સમયમર્યાદા', kn: 'ಗಡುವು', ml: 'സമയപരിധി', pa: 'ਸਮਾਂ-ਸੀਮਾ', es: 'Fecha límite', fr: 'Date limite', de: 'Frist', ar: 'الموعد النهائي', zh: '截止日期', ja: '締め切り' },

  // Gallery
  gallery_title: { en: 'Before & After Gallery', hi: 'पहले और बाद गैलरी', ta: 'முன் & பின் கேலரி', te: 'ముందు & తర్వాత గ్యాలరీ', bn: 'আগে ও পরে গ্যালারি', mr: 'आधी आणि नंतर गॅलरी', gu: 'પહેલાં અને પછી ગેલેરી', kn: 'ಮೊದಲು ಮತ್ತು ನಂತರ ಗ್ಯಾಲರಿ', ml: 'മുമ്പും ശേഷവും ഗാലറി', pa: 'ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ ਗੈਲਰੀ', es: 'Galería Antes y Después', fr: 'Galerie Avant/Après', de: 'Vorher & Nachher Galerie', ar: 'معرض قبل وبعد', zh: '前后对比画廊', ja: 'ビフォー＆アフターギャラリー' },
  gallery_before: { en: 'Before', hi: 'पहले', ta: 'முன்', te: 'ముందు', bn: 'আগে', mr: 'आधी', gu: 'પહેલાં', kn: 'ಮೊದಲು', ml: 'മുമ്പ്', pa: 'ਪਹਿਲਾਂ', es: 'Antes', fr: 'Avant', de: 'Vorher', ar: 'قبل', zh: '之前', ja: '以前' },
  gallery_after: { en: 'After', hi: 'बाद', ta: 'பின்', te: 'తర్వాత', bn: 'পরে', mr: 'नंतर', gu: 'પછી', kn: 'ನಂತರ', ml: 'ശേഷം', pa: 'ਬਾਅਦ', es: 'Después', fr: 'Après', de: 'Nachher', ar: 'بعد', zh: '之后', ja: '以後' },

  // Calculator
  calc_title: { en: 'Cost Calculator', hi: 'लागत कैलकुलेटर', ta: 'செலவு கால்குலேட்டர்', te: 'ఖర్చు కాల్క్యులేటర్', bn: 'খরচ ক্যালকুলেটর', mr: 'खर्च कॅल्क्युलेटर', gu: 'ખર્ચ કેલ્ક્યુલેટર', kn: 'ವೆಚ್ಚ ಕ್ಯಾಲ್ಕುಲೇಟರ್', ml: 'ചെലവ് കാൽക്കുലേറ്റർ', pa: 'ਲਾਗਤ ਕੈਲਕੁਲੇਟਰ', es: 'Calculadora de Costos', fr: 'Calculateur de Coûts', de: 'Kostenrechner', ar: 'حاسبة التكلفة', zh: '成本计算器', ja: 'コスト計算機' },
  calc_room_type: { en: 'Room Type', hi: 'कमरे का प्रकार', ta: 'அறை வகை', te: 'గది రకం', bn: 'ঘরের ধরন', mr: 'खोलीचा प्रकार', gu: 'રૂમનો પ્રકાર', kn: 'ಕೋಣೆ ಪ್ರಕಾರ', ml: 'റൂം തരം', pa: 'ਕਮਰੇ ਦੀ ਕਿਸਮ', es: 'Tipo de Habitación', fr: 'Type de Pièce', de: 'Raumtyp', ar: 'نوع الغرفة', zh: '房间类型', ja: '部屋タイプ' },
  calc_size: { en: 'Size (sq ft)', hi: 'आकार (वर्ग फुट)', ta: 'அளவு (சதுர அடி)', te: 'పరిమాణం (చదరపు అడుగులు)', bn: 'আকার (বর্গফুট)', mr: 'आकार (चौरस फूट)', gu: 'કદ (ચોરસ ફૂટ)', kn: 'ಗಾತ್ರ (ಚದರ ಅಡಿ)', ml: 'വലിപ്പം (ചതുരശ്ര അടി)', pa: 'ਆਕਾਰ (ਵਰਗ ਫੁੱਟ)', es: 'Tamaño (m²)', fr: 'Taille (m²)', de: 'Größe (m²)', ar: 'الحجم (قدم مربع)', zh: '面积（平方英尺）', ja: 'サイズ（平方フィート）' },
  calc_style: { en: 'Design Style', hi: 'डिज़ाइन शैली', ta: 'வடிவமைப்பு பாணி', te: 'డిజైన్ శైలి', bn: 'ডিজাইন শৈলী', mr: 'डिझाइन शैली', gu: 'ડિઝાઇન શૈલી', kn: 'ವಿನ್ಯಾಸ ಶೈಲಿ', ml: 'ഡിസൈൻ സ്റ്റൈൽ', pa: 'ਡਿਜ਼ਾਈਨ ਸ਼ੈਲੀ', es: 'Estilo de Diseño', fr: 'Style de Design', de: 'Design-Stil', ar: 'أسلوب التصميم', zh: '设计风格', ja: 'デザインスタイル' },
  calc_estimate: { en: 'Estimated Cost', hi: 'अनुमानित लागत', ta: 'மதிப்பிடப்பட்ட செலவு', te: 'అంచనా ఖర్చు', bn: 'আনুমানিক খরচ', mr: 'अंदाजित खर्च', gu: 'અંદાજિત ખર્ચ', kn: 'ಅಂದಾಜು ವೆಚ್ಚ', ml: 'കണക്കാക്കിയ ചെലവ്', pa: 'ਅਨੁਮਾਨਿਤ ਲਾਗਤ', es: 'Costo Estimado', fr: 'Coût Estimé', de: 'Geschätzte Kosten', ar: 'التكلفة المقدرة', zh: '预估成本', ja: '見積もり費用' },

  // Contact
  contact_title: { en: 'Get in Touch', hi: 'संपर्क करें', ta: 'தொடர்பு கொள்ளுங்கள்', te: 'సంప్రదించండి', bn: 'যোগাযোগ করুন', mr: 'संपर्क साधा', gu: 'સંપર્ક કરો', kn: 'ಸಂಪರ್ಕಿಸಿ', ml: 'ബന്ധപ്പെടുക', pa: 'ਸੰਪਰਕ ਕਰੋ', es: 'Contáctenos', fr: 'Contactez-nous', de: 'Kontaktieren Sie uns', ar: 'تواصل معنا', zh: '联系我们', ja: 'お問い合わせ' },
  contact_name: { en: 'Your Name', hi: 'आपका नाम', ta: 'உங்கள் பெயர்', te: 'మీ పేరు', bn: 'আপনার নাম', mr: 'तुमचे नाव', gu: 'તમારું નામ', kn: 'ನಿಮ್ಮ ಹೆಸರು', ml: 'നിങ്ങളുടെ പേര്', pa: 'ਤੁਹਾਡਾ ਨਾਮ', es: 'Tu Nombre', fr: 'Votre Nom', de: 'Ihr Name', ar: 'اسمك', zh: '您的姓名', ja: 'お名前' },
  contact_email: { en: 'Email Address', hi: 'ईमेल पता', ta: 'மின்னஞ்சல் முகவரி', te: 'ఇమెయిల్ చిరునామా', bn: 'ইমেইল ঠিকানা', mr: 'ईमेल पत्ता', gu: 'ઇમેઇલ સરનામું', kn: 'ಇಮೇಲ್ ವಿಳಾಸ', ml: 'ഇമെയിൽ വിലാസം', pa: 'ਈਮੇਲ ਪਤਾ', es: 'Correo Electrónico', fr: 'Adresse Email', de: 'E-Mail-Adresse', ar: 'البريد الإلكتروني', zh: '电子邮件', ja: 'メールアドレス' },
  contact_message: { en: 'Your Message', hi: 'आपका संदेश', ta: 'உங்கள் செய்தி', te: 'మీ సందేశం', bn: 'আপনার বার্তা', mr: 'तुमचा संदेश', gu: 'તમારો સંદેશ', kn: 'ನಿಮ್ಮ ಸಂದೇಶ', ml: 'നിങ്ങളുടെ സന്ദേശം', pa: 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ', es: 'Tu Mensaje', fr: 'Votre Message', de: 'Ihre Nachricht', ar: 'رسالتك', zh: '您的留言', ja: 'メッセージ' },
  contact_send: { en: 'Send Message', hi: 'संदेश भेजें', ta: 'செய்தி அனுப்பு', te: 'సందేశం పంపండి', bn: 'বার্তা পাঠান', mr: 'संदेश पाठवा', gu: 'સંદેશ મોકલો', kn: 'ಸಂದೇಶ ಕಳುಹಿಸಿ', ml: 'സന്ദേശം അയയ്ക്കുക', pa: 'ਸੁਨੇਹਾ ਭੇਜੋ', es: 'Enviar Mensaje', fr: 'Envoyer', de: 'Nachricht senden', ar: 'إرسال الرسالة', zh: '发送消息', ja: 'メッセージを送信' },

  // Common
  common_loading: { en: 'Loading...', hi: 'लोड हो रहा है...', ta: 'ஏற்றுகிறது...', te: 'లోడ్ అవుతోంది...', bn: 'লোড হচ্ছে...', mr: 'लोड होत आहे...', gu: 'લોડ થઈ રહ્યું છે...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', ml: 'ലോഡ് ചെയ്യുന്നു...', pa: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...', es: 'Cargando...', fr: 'Chargement...', de: 'Laden...', ar: 'جار التحميل...', zh: '加载中...', ja: '読み込み中...' },
  common_error: { en: 'Error', hi: 'त्रुटि', ta: 'பிழை', te: 'లోపం', bn: 'ত্রুটি', mr: 'त्रुटी', gu: 'ભૂલ', kn: 'ದೋಷ', ml: 'പിശക്', pa: 'ਗਲਤੀ', es: 'Error', fr: 'Erreur', de: 'Fehler', ar: 'خطأ', zh: '错误', ja: 'エラー' },
  common_success: { en: 'Success', hi: 'सफलता', ta: 'வெற்றி', te: 'విజయం', bn: 'সাফল্য', mr: 'यशस्वी', gu: 'સફળતા', kn: 'ಯಶಸ್ಸು', ml: 'വിജയം', pa: 'ਸਫਲਤਾ', es: 'Éxito', fr: 'Succès', de: 'Erfolg', ar: 'نجاح', zh: '成功', ja: '成功' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languageNames: { [key in Language]: string } = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
  or: 'ଓଡ଼ିଆ',
  as: 'অসমীয়া',
  ur: 'اردو',
  sa: 'संस्कृतम्',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  tr: 'Türkçe',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
};

export const languageCategories = {
  indian: ['hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'sa'] as Language[],
  international: ['en', 'es', 'fr', 'de', 'ar', 'zh', 'ja', 'ko', 'pt', 'ru', 'it', 'nl', 'tr', 'th', 'vi', 'id'] as Language[],
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
