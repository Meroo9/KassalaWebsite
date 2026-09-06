import { NextResponse } from "next/server";
import fallbackData from "@/data/fallbackData.json";
import fs from "fs/promises";
import path from "path";

// Allowed data keys
const ALLOWED_KEYS = [
  "kassala_custom_services",
  "kassala_custom_colleges",
  "kassala_custom_news",
  "kassala_custom_gallery",
  "kassala_custom_hero",
  "kassala_custom_rector",
  "kassala_custom_contact",
  "kassala_custom_research",
  "kassala_theme_config",
  "kassala_custom_pages"
];

// Short aliases mapping
const KEY_MAP = {
  services: "kassala_custom_services",
  colleges: "kassala_custom_colleges",
  news: "kassala_custom_news",
  gallery: "kassala_custom_gallery",
  hero: "kassala_custom_hero",
  rector: "kassala_custom_rector",
  contact: "kassala_custom_contact",
  research: "kassala_custom_research",
  theme: "kassala_theme_config",
  customPages: "kassala_custom_pages"
};

// Default seed data
const DEFAULT_STORE = {
  kassala_theme_config: {
    primaryColor: "#0d5c34",
    primaryDark: "#053b1e",
    accentColor: "#d4af37",
    fontFamily: "Helvetica",
    glowOrbs: true,
    cardGlow: true
  },
  kassala_custom_hero: {
    titleAr: "جامعة كسلا",
    titleEn: "University of Kassala",
    subtitleAr: "منارة المعرفة، البحث العلمي والتنمية المستدامة في شرق السودان",
    subtitleEn: "Beacon of Knowledge, Scientific Research and Sustainable Development in Eastern Sudan",
    ctaAr: "القبول والتسجيل",
    ctaEn: "Admissions",
    images: [
      "/images/about-uni.png",
      "/images/univercity.png",
      "/images/med.jpeg"
    ]
  },
  kassala_custom_rector: {
    nameAr: "أ.د. أماني عبدالمعروف بشير",
    nameEn: "Prof. Amani Abdelmarouf Bashir",
    roleAr: "مديرة الجامعة",
    roleEn: "Rector of the University",
    speechAr: "مرحباً بكم في رحاب جامعة كسلا. نسعى جاهدين لتقديم بيئة تعليمية متميزة تواكب التحول الرقمي وتسهم في تمكين الطلاب والباحثين لتحقيق الريادة العلمية وخدمة التنمية المحلية والإقليمية.",
    speechEn: "Welcome to the University of Kassala. We strive to provide an outstanding educational environment that embraces digital transformation, enabling students and researchers to achieve leadership and support sustainable development.",
    image: "/images/about-uni.png"
  },
  kassala_custom_services: {
    students: [
      { id: "moodle", icon: "moodle", arTitle: "منصة التعليم الإلكتروني (Moodle)", enTitle: "E-Learning Platform (Moodle)", arDesc: "الوصول للمحاضرات الرقمية والاختبارات والمناهج التعليمية عبر الإنترنت.", enDesc: "Access digital lectures, online exams, and study materials.", link: "http://e-learn.kassalauni.edu.sd/" },
      { id: "portal", icon: "portal", arTitle: "بوابة الطالب الإلكترونية", enTitle: "Student Academic Portal", arDesc: "التسجيل الأكاديمي، استخراج النتائج، وتتبع السجل الدراسي للطلاب.", enDesc: "Academic registration, transcript extraction, and grade checking.", link: "http://212.0.156.123/students/" },
      { id: "library", icon: "library", arTitle: "مستودع المكتبات الرقمية", enTitle: "Digital Library Repository", arDesc: "تصفح الكتب والمراجع والرسائل العلمية المتاحة إلكترونياً بالجامعة.", enDesc: "Browse university digital books, references, and theses.", link: "https://kassalauni.edu.sd/nw/library" },
      { id: "support", icon: "support", arTitle: "مركز الدعم الفني للطلاب", enTitle: "Student Tech Support Center", arDesc: "الإبلاغ عن المشاكل التقنية وتفعيل البريد الجامعي والحسابات.", enDesc: "Report technical issues, activate university email and accounts.", link: "/contact" }
    ],
    faculty: [
      { id: "affairs", icon: "affairs", arTitle: "بوابة الشؤون العلمية", enTitle: "Scientific Affairs Portal", arDesc: "تقديم الترقيات الأكاديمية، إدارة شؤون التدريس، والتقاويم العلمية.", enDesc: "Submit academic promotions, manage teaching, and research.", link: "https://kassalauni.edu.sd/nw/acadaffairs" },
      { id: "email", icon: "email", arTitle: "البريد الإلكتروني لأعضاء التدريس", enTitle: "Faculty Webmail System", arDesc: "خدمة البريد الجامعي الرسمي الآمن للتواصل الأكاديمي والإداري.", enDesc: "Official secure webmail system for academic communication.", link: "http://kassalauni.edu.sd/webmail" },
      { id: "library-f", icon: "library", arTitle: "مستودع المكتبات الرقمية", enTitle: "Digital Library Repository", arDesc: "تصفح الكتب والمراجع والرسائل العلمية المتاحة إلكترونياً بالجامعة.", enDesc: "Browse university digital books, references, and theses.", link: "https://kassalauni.edu.sd/nw/library" },
      { id: "moodle-f", icon: "moodle", arTitle: "منصة التعليم الإلكتروني (Moodle)", enTitle: "E-Learning Platform (Moodle)", arDesc: "الوصول للمحاضرات الرقمية والاختبارات والمناهج التعليمية عبر الإنترنت.", enDesc: "Access digital lectures, online exams, and study materials.", link: "http://e-learn.kassalauni.edu.sd/" }
    ],
    staff: [
      { id: "email-s", icon: "email", arTitle: "البريد الإلكتروني للموظفين", enTitle: "Staff Webmail System", arDesc: "البريد الإلكتروني الرسمي للمراسلات الإدارية والمعاملات الداخلية.", enDesc: "Official webmail system for administrative communications.", link: "http://kassalauni.edu.sd/webmail" },
      { id: "support-s", icon: "support", arTitle: "نظام الدعم الفني الإداري", enTitle: "Administrative IT Support", arDesc: "التبليغ عن أعطال الأجهزة والشبكات والصيانة الداخلية بالجامعة.", enDesc: "Report hardware and network failures to university IT support.", link: "/contact" }
    ],
    visitors: [
      { id: "admission", icon: "visitors", arTitle: "بوابة التقديم الإلكتروني", enTitle: "Online Admissions Portal", arDesc: "شروط القبول وخطوات التقديم الإلكتروني للطلاب السودانيين والوافدين.", enDesc: "Admission guidelines and online application for local/international students.", link: "/admissions" },
      { id: "gallery", icon: "visitors", arTitle: "معرض الفعاليات الرقمي", enTitle: "Digital Campus Gallery", arDesc: "تصفح فعاليات ومؤتمرات وحفلات تخرج الجامعة بالصور والفيديو.", enDesc: "Browse university events, conferences, and graduations in media.", link: "/gallery" }
    ]
  },
  kassala_custom_colleges: fallbackData.colleges || [],
  kassala_custom_news: fallbackData.news || [],
  kassala_custom_gallery: fallbackData.gallery || [],
  kassala_custom_research: {
    journals: [
      { id: "qalzam", arTitle: "مجلة القلزم للدراسات الإسلامية والتربوية", enTitle: "Al-Qalzam Journal for Islamic & Educational Studies", arDesc: "مجلة علمية محكمة رائدة تصدر عن مركز دراسات السلام والتنمية بالجامعة تعنى بنشر البحوث المبتكرة.", enDesc: "A leading peer-reviewed journal publishing innovative research in Islamic and educational fields.", link: "https://kassalauni.edu.sd/nw/%d9%85%d8%ac%d9%84%d8%a9-%d8%a7%d9%84%d9%82%d9%84%d8%b2%d9%85/" },
      { id: "scientific", arTitle: "المجلة العلمية لجامعة كسلا (OJS)", enTitle: "Kassala University Scientific Journal (OJS)", arDesc: "المستودع الرقمي ونظام إدارة المجلات العلمية المحكمة للعلوم الطبية والهندسة والزراعة.", enDesc: "Digital repository and management system for medicine, engineering, and agricultural journals.", link: "http://kassalauni.edu.sd/nw/kassalaojs" }
    ],
    papers: [
      { id: "p1", arTitle: "تطوير مستشعرات بيئية ذكية لمراقبة تلوث مياه نهر القاش باستخدام إنترنت الأشياء", enTitle: "Development of Smart Sensors to Monitor Al-Gash River Water Pollution Using IoT", authors: "د. أحمد طه، أ. محمد علي (كلية الهندسة - 2026م)", link: "#" },
      { id: "p2", arTitle: "دراسة وبائية حول انتشار الملاريا المقاومة للأدوية في شرق السودان والحلول الجينية المقترحة", enTitle: "Epidemiological Study on Drug-Resistant Malaria in Eastern Sudan", authors: "بروفيسور أماني عبدالمعروف (كلية الطب - 2025م)", link: "#" }
    ]
  },
  kassala_custom_contact: {
    addressAr: "رئاسة الجامعة، مدينة كسلا، ولاية كسلا، السودان",
    addressEn: "University Presidency, Kassala City, Kassala State, Sudan",
    phone: "+249822075",
    email: "info@kassalauni.edu.sd",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.540139989069!2d36.39801861517726!3d15.457813989260177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166ef58100000001%3A0xe103ee660f54070a!2sUniversity%20of%20Kassala!5e0!3m2!1sen!2ssd!4v1650000000000!5m2!1sen!2ssd"
  },
  kassala_custom_pages: fallbackData.customPages || [
    {
      id: "page_ai_conf_2026",
      slug: "ai-conference-2026",
      arTitle: "مؤتمر الذكاء الاصطناعي 2026",
      enTitle: "AI Conference 2026",
      arSubtitle: "المؤتمر العلمي الدولي الأول بجامعة كسلا لشراكات المستقبل التقني",
      enSubtitle: "1st International Scientific Conference for Future Tech Partnerships",
      location: "main",
      active: true,
      expiryDate: "2026-12-31",
      bannerImage: "/api/proxy-image?url=https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
      arContent: "يسر جامعة كسلا الإعلان عن انطلاق المؤتمر الدولي الأول للذكاء الاصطناعي والتحول الرقمي، والذي يجمع نخبة من المتحدثين والباحثين لبحث تطبيقات الذكاء الاصطناعي في التعليم الجامعي والتنمية الاقتصادية بشرق السودان.",
      enContent: "University of Kassala is honored to announce the 1st International AI & Digital Transformation Conference, bringing together top speakers and researchers to discuss AI applications in higher education and economic development.",
      agenda: [
        { time: "09:00 AM", arTopic: "الجلسة الافتتاحية وكلمة مدير الجامعة", enTopic: "Opening Ceremony & Rector Speech" },
        { time: "10:30 AM", arTopic: "ورقة عمل: الذكاء الاصطناعي في خدمة التنمية المحلية", enTopic: "Keynote: AI for Regional Development" },
        { time: "01:00 PM", arTopic: "معرض الابتكارات والشركات الناشئة", enTopic: "Innovation & Startup Exhibition" }
      ],
      pdfLink: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf",
      registrationLink: "/admissions"
    }
  ]
};

// Global memory cache for current server lifecycle
let globalStore = { ...DEFAULT_STORE };

// Local db file path for server environments
const LOCAL_DB_PATH = path.join(process.cwd(), "src", "data", "liveData.json");

// Helper: check Cloud KV (Vercel KV / Upstash Redis) config
function getCloudKVConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

// Fetch single key from Cloud KV
async function getCloudKV(cloud, key) {
  try {
    const res = await fetch(`${cloud.url}/get/${key}`, {
      headers: { Authorization: `Bearer ${cloud.token}` },
      cache: "no-store"
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (body.result) {
      try {
        return typeof body.result === "string" ? JSON.parse(body.result) : body.result;
      } catch {
        return body.result;
      }
    }
    return null;
  } catch (err) {
    console.error("Cloud KV GET error:", err.message);
    return null;
  }
}

// Set single key in Cloud KV
async function setCloudKV(cloud, key, data) {
  try {
    const res = await fetch(`${cloud.url}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cloud.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JSON.stringify(data))
    });
    return res.ok;
  } catch (err) {
    console.error("Cloud KV SET error:", err.message);
    return false;
  }
}

// Load local file cache
async function readLocalDbFile() {
  try {
    const content = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// Save local file cache
async function writeLocalDbFile(data) {
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    // Expected on readonly serverless filesystems
    return false;
  }
}

/**
 * GET Handler: Fetch all or specific persistent data
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reqKey = searchParams.get("key");
    const cloud = getCloudKVConfig();

    // Try reading local db file first to populate server memory
    const fileStore = await readLocalDbFile();
    if (fileStore) {
      globalStore = { ...globalStore, ...fileStore };
    }

    // If specific key requested
    if (reqKey) {
      const realKey = KEY_MAP[reqKey] || reqKey;
      if (!ALLOWED_KEYS.includes(realKey)) {
        return NextResponse.json({ error: "Invalid key" }, { status: 400 });
      }

      if (cloud) {
        const cloudVal = await getCloudKV(cloud, realKey);
        if (cloudVal !== null) {
          globalStore[realKey] = cloudVal;
          return NextResponse.json({ key: realKey, data: cloudVal, storage: "cloud_kv" });
        }
      }

      const data = globalStore[realKey] !== undefined ? globalStore[realKey] : DEFAULT_STORE[realKey];
      return NextResponse.json({
        key: realKey,
        data,
        storage: cloud ? "cloud_kv_fallback" : (fileStore ? "local_file" : "memory_fallback")
      });
    }

    // Return full store for client sync
    let result = { ...globalStore };

    if (cloud) {
      // Sync allowed keys from cloud
      await Promise.all(
        ALLOWED_KEYS.map(async (k) => {
          const cloudVal = await getCloudKV(cloud, k);
          if (cloudVal !== null) {
            result[k] = cloudVal;
            globalStore[k] = cloudVal;
          }
        })
      );
    }

    return NextResponse.json({
      data: result,
      storage: cloud ? "cloud_kv" : (fileStore ? "local_file" : "memory_fallback"),
      timestamp: new Date().toISOString()
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59"
      }
    });
  } catch (err) {
    console.error("API /api/content GET Error:", err);
    return NextResponse.json({ error: "Failed to load data", fallback: globalStore }, { status: 500 });
  }
}

/**
 * POST Handler: Persist data across visitors
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { key, value, allData } = body;
    const cloud = getCloudKVConfig();

    // Bulk save if allData provided
    if (allData && typeof allData === "object") {
      for (const [k, v] of Object.entries(allData)) {
        const realKey = KEY_MAP[k] || k;
        if (ALLOWED_KEYS.includes(realKey)) {
          globalStore[realKey] = v;
          if (cloud) {
            await setCloudKV(cloud, realKey, v);
          }
        }
      }
      await writeLocalDbFile(globalStore);
      return NextResponse.json({
        success: true,
        message: "All data synced successfully",
        storage: cloud ? "cloud_kv" : "local"
      });
    }

    // Single key save
    const realKey = KEY_MAP[key] || key;
    if (!realKey || !ALLOWED_KEYS.includes(realKey)) {
      return NextResponse.json({ error: "Invalid or unauthorized key" }, { status: 400 });
    }

    globalStore[realKey] = value;

    let storageType = "memory";
    if (cloud) {
      const ok = await setCloudKV(cloud, realKey, value);
      storageType = ok ? "cloud_kv" : "cloud_failed";
    }

    // Also write to local file for dev persistence
    const fileSaved = await writeLocalDbFile(globalStore);
    if (!cloud && fileSaved) {
      storageType = "local_file";
    }

    return NextResponse.json({
      success: true,
      key: realKey,
      storage: storageType,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("API /api/content POST Error:", err);
    return NextResponse.json({ error: "Failed to persist data" }, { status: 500 });
  }
}
