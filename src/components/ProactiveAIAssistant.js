"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

const PAGE_SUGGESTIONS = {
  "/": {
    ar: [
      { q: "ما هي التخصصات المتاحة بجامعة كسلا؟", a: "تضم الجامعة كليات الطب، الهندسة، الحاسوب، الاقتصاد، التربية، والعلوم الزراعية." },
      { q: "كيف أصل للخدمات الإلكترونية الطلابية؟", a: "يمكنك استخدام بوابة الخدمات السريعة في الواجهة أو زيارة صفحة الخدمات الجامعية." },
      { q: "ما هي أحدث أخبار وإعلانات الجامعة؟", a: "يمكنك متابعة قسم الأخبار بالصفحة الرئيسية أو القائمة العلوية للاطلاع على أحدث الفعاليات." }
    ],
    en: [
      { q: "What majors are available at Kassala University?", a: "The university includes Medicine, Engineering, Computer Science, Economics, Education, and Agriculture." },
      { q: "How do I access student e-services?", a: "Use the Quick Services section on the homepage or visit the University Services page." },
      { q: "What are the latest news and announcements?", a: "Check the news section on the homepage or top navigation for recent events." }
    ]
  },
  "/admissions": {
    ar: [
      { q: "ما هي شروط ومتطلبات القبول؟", a: "تتطلب الشهادة السودانية أو ما يعادلها، استيفاء النسب الحاكمة لكل كلية، واستكمال المسار البصري التفاعلي." },
      { q: "كم تبلغ رسوم التقديم والقبول؟", a: "تختلف الرسوم حسب نوع القبول (عام/خاص/وافدين)، ويتم السحب والتحصيل إلكترونياً." },
      { q: "كيف أتابع حالة طلبي بعد التقديم؟", a: "استخدم شريط متابعة حالة التقديم البصري في هذه الصفحة لإدخال رقم الاستمارة." }
    ],
    en: [
      { q: "What are the admission requirements?", a: "Requires High School Certificate or equivalent, meeting college cutoffs, and completing the step-by-step process." },
      { q: "How much are application fees?", a: "Fees vary by admission type (General/Private/International) and are payable electronically." },
      { q: "How can I track my application status?", a: "Use the visual progress bar on this page by entering your application number." }
    ]
  },
  "/services": {
    ar: [
      { q: "كيف أدخل إلى منصة التعلم الإلكتروني (Moodle)؟", a: "اضغط على تبويب 'الخدمات الأكاديمية' وانقر على أيقونة Moodle للتحويل المباشر." },
      { q: "كيف أحصل على النتيجة الدراسية والشهادات؟", a: "عبر بوابة شؤون الطلاب والامتحانات بالدخول برقمك الجامعي." }
    ],
    en: [
      { q: "How do I log into Moodle?", a: "Click on Academic Services tab and select Moodle icon for direct redirection." },
      { q: "How do I check my grades and certificates?", a: "Through Student Affairs and Exams portal using your student ID." }
    ]
  },
  "/research": {
    ar: [
      { q: "ما هي المجلات العلمية المحكمة بالجامعة؟", a: "تنشر الجامعة مجلات محكمة في العلوم التنموية، العلوم الطبية، والإنسانية." },
      { q: "كيف يمكنني تقديم بحث للنشر؟", a: "عبر شباك أمانة البحث العلمي الإلكتروني المتاح بهذه الصفحة." }
    ],
    en: [
      { q: "What indexed journals does the university publish?", a: "The university publishes journals in Developmental, Medical, and Human Sciences." },
      { q: "How do I submit a research paper for publication?", a: "Via the Deanship of Scientific Research electronic window on this page." }
    ]
  }
};

/**
 * Smart Knowledge Engine for Kassala University Assistant
 */
function getUniversityAIAnswer(rawQuery, isEn) {
  const query = rawQuery.trim().toLowerCase();
  
  // Reject single characters or empty meaningless strings
  if (query.length < 2) {
    return isEn 
      ? "Please ask a question related to Kassala University."
      : "رجاءً اسأل بشأن جامعة كسلا لو سمحت.";
  }

  // 1. Majors & Colleges (تخصصات وكليات)
  if (/تخصص|تخصصات|كلية|كليات|مجالات|قسم|أقسام|major|majors|college|colleges|faculty|faculties|department/.test(query)) {
    if (/طب|صحة|طبي|medicine|medical|health/.test(query)) {
      return isEn
        ? "Faculty of Medicine & Health Sciences offers MBBS degree with a cutoff percentage of 88%."
        : "تضم كلية الطب والعلوم الصحية بجامعة كسلا تخصصات الطب البشري والعلوم الصحية بنسبة قبول 88%.";
    }
    if (/هندسة|هندسي|eng|engineering/.test(query)) {
      return isEn
        ? "Faculty of Engineering offers Civil, Electrical, and Mechanical Engineering with a cutoff percentage of 80%."
        : "تضم كلية الهندسة بجامعة كسلا تخصصات الهندسة المدنية، الكهربائية، والميكانيكية بنسبة قبول 80%.";
    }
    if (/حاسوب|تقانة|برمجة|تكنولوجيا|يت|it|computer|cs|software/.test(query)) {
      return isEn
        ? "Faculty of Computer Science & IT offers Computer Science and Information Technology programs with a cutoff percentage of 75%."
        : "تضم كلية علوم الحاسوب وتقانة المعلومات تخصصات علوم الحاسوب ونظم المعلومات بنسبة قبول 75%.";
    }
    if (/اقتصاد|إدارة|إدارية|حسابات|economics|business/.test(query)) {
      return isEn
        ? "Faculty of Economics & Administrative Sciences offers Economics and Business Administration with a cutoff percentage of 70%."
        : "تضم كلية الاقتصاد والعلوم الإدارية تخصصات الاقتصاد وإدارة الأعمال بنسبة قبول 70%.";
    }
    if (/تربية|تعليم|education/.test(query)) {
      return isEn
        ? "Faculty of Education offers Science and Arts teaching programs with a cutoff percentage of 65%."
        : "تضم كلية التربية التخصصات التربوية العلمية والأدبية بنسبة قبول 65%.";
    }
    if (/زراعة|زراعي|بيئة|agri|agriculture/.test(query)) {
      return isEn
        ? "Faculty of Agricultural & Environmental Sciences offers Agricultural and Environmental studies with a cutoff percentage of 60%."
        : "تضم كلية العلوم الزراعية والبيئية التخصصات الزراعية والبيئية بنسبة قبول 60%.";
    }
    return isEn
      ? "Kassala University includes 13 faculties: Medicine, Engineering, Computer Science & IT, Economics, Education, Agriculture, Science, Islamic Studies, Arts, and Graduate Studies."
      : "تضم جامعة كسلا 13 كلية ومعهداً متخصصاً، أبرزها: الطب والعلوم الصحية، الهندسة، علوم الحاسوب والتقانة، الاقتصاد والإدارية، التربية، والعلوم الزراعية والبيئية.";
  }

  // 2. Admissions, Fees, and Cutoff Percentages (قبول ونسب ورسوم)
  if (/قبول|نسبة|نسب|شروط|استيفاء|رسوم|تقديم|استمارة|admission|admissions|cutoff|cutoffs|fee|fees|apply|application/.test(query)) {
    if (/نسبة|نسب|حد|استيفاء|cutoff|score|percentage/.test(query)) {
      return isEn
        ? "Kassala University Cutoffs: Medicine 88%, Engineering 80%, Computer Science 75%, Economics 70%, Education 65%, Agriculture 60%."
        : "نسب الاستيفاء للقبول بجامعة كسلا: الطب والعلوم الصحية (88%)، الهندسة (80%)، علوم الحاسوب والتقانة (75%)، الاقتصاد والإدارية (70%)، التربية (65%)، والعلوم الزراعية (60%).";
    }
    if (/رسوم|دفع|مالية|مصاريف|سداد|fee|payment|cost/.test(query)) {
      return isEn
        ? "Application and tuition fees are paid online via authorized Sudan banking apps like Bankak or OCash."
        : "تُمكّن الجامعة الطلاب من سداد رسوم الاستمارة والرسوم الدراسية إلكترونياً عبر تطبيقات الدفع المصرفي المعتمدة (مثل تطبيق بنكك أو أوكاش).";
    }
    return isEn
      ? "Admissions process: 1. Review requirements & cutoffs 2. Prepare verified documents 3. Submit online application 4. Pay application fee 5. Track admission result."
      : "خطوات التقديم الإلكتروني بجامعة كسلا: 1. مراجعة النسب للشروط 2. توثيق الشهادة السودانية والوثائق 3. تعبئة طلب التقديم 4. سداد الرسوم إلكترونياً 5. متابعة نتيجة القبول والاستلام.";
  }

  // 3. E-Learning, Moodle, Portal & Student Services (مودل وبوابة إلكترونية)
  if (/مودل|moodle|تعلم|تعليم|الكتروني|بوابة|طالب|طلاب|سجل|نتيجة|نتائج|بريد|شؤون|خدمة|خدمات|portal|webmail|email|grades|result/.test(query)) {
    if (/مودل|moodle|تعلم|محاضرة|محاضرات|واجبات/.test(query)) {
      return isEn
        ? "Moodle E-Learning Platform: Access lectures and course materials online via http://e-learn.kassalauni.edu.sd/"
        : "منصة التعليم الإلكتروني (Moodle): يمكنك الوصول للمحاضرات الرقمية والمناهج عبر الرابط المباشر (http://e-learn.kassalauni.edu.sd/).";
    }
    if (/نتيجة|نتائج|سجل|طالب|بوابة|grades|transcript|id/.test(query)) {
      return isEn
        ? "Student Academic Portal: Track academic status, transcripts, and courses at http://212.0.156.123/students/"
        : "بوابة الطالب الأكاديمية: تتيح لك التسجيل الأكاديمي، استخراج النتائج، وتتبع السجل الدراسي (http://212.0.156.123/students/).";
    }
    if (/بريد|ايميل|email|webmail/.test(query)) {
      return isEn
        ? "Official Webmail: Access your official university email at http://kassalauni.edu.sd/webmail"
        : "البريد الإلكتروني الجامعي: يمكنك تسجيل الدخول لبريدك الجامعي الرسمي عبر (http://kassalauni.edu.sd/webmail).";
    }
    return isEn
      ? "Kassala University provides unified digital e-services including Moodle E-Learning, Student Academic Portal, Official Webmail, and Digital Library."
      : "تقدم بوابة الخدمات الإلكترونية لجامعة كسلا: منصة Moodle للتعليم الإلكتروني، بوابة الطالب للنتائج والتسجيل، البريد الجامعي الرسمي، والمكتبة الرقمية.";
  }

  // 4. Research, Library & Scientific Publications (أبحاث ومكتبة ومجلات)
  if (/بحث|أبحاث|مجلة|مجلات|مكتبة|علمية|نشر|رسائل|ماجستير|دكتوراه|research|journal|journals|library|thesis|publication/.test(query)) {
    return isEn
      ? "Kassala University Deanship of Scientific Research publishes peer-reviewed journals in Medical, Agricultural, and Human Sciences, offering MSc and PhD programs."
      : "تشرف عمادة البحث العلمي والدراسات العليا بجامعة كسلا على المجلات العلمية المحكمة ونشر الأبحاث وتوفير برامج الماجستير والدكتوراه والمكتبة الرقمية.";
  }

  // 5. University History, Rector, Location, and General Info (تأسيس، مديرة، موقع، كسلا)
  if (/تأسيس|تاريخ|بداية|تأسست|مرسوم|مدير|مديرة|أماني|كسلا|موقع|مكان|جامعة|جامعه|kassala|rector|president|history|location|about/.test(query)) {
    if (/مدير|مديرة|أماني|rector|president/.test(query)) {
      return isEn
        ? "Rector of Kassala University: Prof. Dr. Amany Abdelmarouf Bashir."
        : "مديرة جامعة كسلا هي البروفيسور أماني عبد المعروف بشير.";
    }
    if (/تأسيس|تاريخ|بداية|مرسوم|founded|established|history/.test(query)) {
      return isEn
        ? "Kassala University was established in 1990 by presidential decree in Eastern Sudan."
        : "تأسست جامعة كسلا عام 1990 بموجب مرسوم جمهوري لتلبية احتياجات التعليم العالي بشرق السودان.";
    }
    return isEn
      ? "Kassala University is a leading higher education institution in Eastern Sudan, established in 1990 in Kassala State."
      : "جامعة كسلا هي مؤسسة تعليم عالي رائدة بشرق السودان (ولاية كسلا)، تأسست عام 1990 وتضم 13 كلية ومراكز بحثية متعددة.";
  }

  // 6. Contact & Technical Support (اتصال ودعم)
  if (/اتصال|تواصل|هاتف|تلفون|مساعدة|دعم|عنوان|contact|phone|help|support/.test(query)) {
    return isEn
      ? "Contact Kassala University: Phone +249 411 822 100 | Email: info@kassalauni.edu.sd"
      : "يمكنك التواصل مع جامعة كسلا عبر الهاتف (+249 411 822 100) أو البريد الإلكتروني الرسمي (info@kassalauni.edu.sd).";
  }

  // OUT OF SCOPE / UNRELATED QUERY -> Strict fallback as requested by user
  return isEn
    ? "Please ask a question related to Kassala University."
    : "رجاءً اسأل بشأن جامعة كسلا لو سمحت.";
}

export default function ProactiveAIAssistant() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [badgeCount, setBadgeCount] = useState(1);

  const lang = locale === "en" ? "en" : "ar";
  const defaultSuggestions = PAGE_SUGGESTIONS[pathname]?.[lang] || PAGE_SUGGESTIONS["/"][lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setBadgeCount(1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleAskQuestion = (item) => {
    setActiveChat((prev) => [
      ...prev,
      { role: "user", text: item.q },
      { role: "assistant", text: item.a }
    ]);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    const query = userQuery;
    setUserQuery("");
    
    // First check exact match in default suggestions for current page
    const found = defaultSuggestions.find(s => s.q.includes(query) || query.includes(s.q.slice(0, 10)));
    let response = found ? found.a : getUniversityAIAnswer(query, lang === "en");

    setActiveChat((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "assistant", text: response }
    ]);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", left: lang === "ar" ? "24px" : "auto", right: lang === "en" ? "24px" : "auto", zIndex: 9999 }}>
      {/* Trigger Button (Emerald Green & Gold Accent Theme) */}
      <button
        onClick={() => { setIsOpen(!isOpen); setBadgeCount(0); }}
        style={{
          background: "linear-gradient(135deg, #0D5C34 0%, #053B1E 100%)",
          color: "#fff",
          border: "2px solid #d4a017",
          borderRadius: "50px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 10px 25px rgba(13, 92, 52, 0.4)",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "15px",
          transition: "transform 0.2s ease, boxShadow 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f3cb65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
          <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3"/>
          <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3"/>
        </svg>
        <span>{lang === "en" ? "Smart Assistant" : "المساعد الذكي"}</span>
        {badgeCount > 0 && (
          <span style={{
            background: "#d32f2f",
            color: "#fff",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}>
            !
          </span>
        )}
      </button>

      {/* Chat Drawer Dialog (Emerald Green & Gold Theme) */}
      {isOpen && (
        <div style={{
          position: "absolute",
          bottom: "70px",
          left: lang === "ar" ? "0" : "auto",
          right: lang === "en" ? "0" : "auto",
          width: "360px",
          maxHeight: "520px",
          background: "#092817",
          border: "1px solid rgba(212, 160, 23, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          color: "#fff"
        }}>
          {/* Header */}
          <div style={{
            padding: "16px",
            background: "linear-gradient(90deg, #053B1E, #0D5C34)",
            borderBottom: "1px solid rgba(212, 160, 23, 0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f3cb65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4"/>
                <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3"/>
                <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3"/>
              </svg>
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>
                  {lang === "en" ? "Proactive AI Assistant" : "المساعد الاستباقي الذكي"}
                </strong>
                <small style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>
                  {lang === "en" ? "Live guidance for this page" : "إرشادات فورية للصفحة الحالية"}
                </small>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "16px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {activeChat.length === 0 && (
              <div>
                <p style={{ fontSize: "13px", opacity: 0.9, marginBottom: "10px" }}>
                  {lang === "en" 
                    ? "Welcome! Here are suggested topics for this page:"
                    : "مرحباً بك! أسئلة واقتراحات شائعة لهذه الصفحة:"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {defaultSuggestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleAskQuestion(item)}
                      style={{
                        textAlign: lang === "ar" ? "right" : "left",
                        background: "rgba(13, 92, 52, 0.25)",
                        border: "1px solid rgba(212, 160, 23, 0.3)",
                        color: "#f3cb65",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer",
                        lineHeight: "1.4",
                        transition: "all 0.2s ease"
                      }}
                    >
                      💡 {item.q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeChat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#0D5C34" : "rgba(255, 255, 255, 0.1)",
                  border: msg.role === "user" ? "1px solid #d4a017" : "none",
                  color: "#fff",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  maxWidth: "85%",
                  lineHeight: "1.5"
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <form onSubmit={handleCustomSubmit} style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder={lang === "en" ? "Ask a question..." : "اكتب سؤالك هنا..."}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#fff",
                fontSize: "12px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                background: "#0D5C34",
                border: "1px solid #d4a017",
                color: "#fff",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f3cb65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
