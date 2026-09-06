# دليل مناقشة المشروع وأسئلة لجنة التحكيم (Project Defense Guide)
**المشروع:** البوابة الرقمية التفاعلية لجامعة كسلا  
**الهدف:** الفوز في المسابقة الجامعية ومناقشة المشروع أمام لجنة تحكيم برمجية متخصصة.

---

## 1. المحكّم الأول: أستاذ هندسة البرمجيات والمعمارية (Software Architecture)
* **مجال التركيز:** اختيار التقنيات، هيكلية النظام، الأداء، وعزل المكونات.

### السؤال:
> **"لماذا اعتمدتم Next.js 15 مع App Router بدلاً من تطبيق React SPA تقليدي؟ وكيف أدرتم التوازن بين مكونات الخادم (RSC) ومكونات العميل (CSR)؟"**

### الإجابة النموذجية:
1. **السرعة والأرشفة الأكاديمية (SEO & Core Web Vitals):**
   * استخدام الرندرة الخادمة (SSR) والتوليد الثابت (Static Generation) للمسارات الأكاديمية ومجلة القلزم لتسريع التحميل الأول (FCP < 1s) وضمان أرشفة فورية في محركات البحث.
2. **تحسين حجم الحزمة المرسلة (Bundle Splitting):**
   * حصر `"use client"` في المكونات التفاعلية فقط (المساعد الذكي، حاسبة النسب، وفلاتر الكليات). الهياكل العامة والـ Layout خادمية لتقليل الـ JavaScript في المتصفح.
3. **معمارية متكاملة كـ Serverless:**
   * استخدام Route Handlers كواجهات برمجية خادمة (Backend) مدمجة بدون حاجة لتشغيل خادم منفصل.

---

## 2. المحكّم الثاني: أستاذ أمن المعلومات والشبكات (Cybersecurity & Systems)
* **مجال التركيز:** حماية السيرفر، معالجة الـ CORS، ومنع هجمات الحقن والوساطة.

### السؤال:
> **"المشروع يتكامل مع WordPress الجامعة القديم ويجلب الصور من نطاقات خارجية، كيف حميتم المنظومة من ثغرات CORS وهجمات SSRF و XSS؟"**

### الإجابة النموذجية:
1. **حل الـ CORS عبر وسيط خادم محلي (`/api/news`):**
   * الاتصال بالـ WordPress API يتم Server-to-Server في [src/app/api/news/route.js](file:///d:/KassalaWebsite/KassalaWebsite/src/app/api/news/route.js) مع مهلة زمنية (`AbortSignal.timeout(4000)`) وكاش لإعادة التدوير (`revalidate: 120s`).
2. **منع هجمات الـ SSRF في وسيط الصور (`/api/proxy-image`):**
   * فحص صارم لقائمة النطاقات المسموحة (`allowedHosts: ["kassalauni.edu.sd"]`) في [src/app/api/proxy-image/route.js](file:///d:/KassalaWebsite/KassalaWebsite/src/app/api/proxy-image/route.js)، ورفض أي طلب مريب برمز `403 Forbidden`.
3. **رؤوس حماية مشددة (Security Headers):**
   * ضبط سياسات أمان صارمة في [next.config.mjs](file:///d:/KassalaWebsite/KassalaWebsite/next.config.mjs):
     * `Content-Security-Policy` لتقييد مصادر السكربتات والوسائط.
     * `Strict-Transport-Security` (HSTS) لمدة سنتين لحماية حركة البيانات.
     * `X-Frame-Options: DENY` لمنع هجمات Clickjacking وتضمين الموقع داخل إطارات خبيثة.
     * تنظيف وتطهير مدخلات النصوص وروابط الصور بـ `sanitizeInput` و `sanitizeImageUrl`.

---

## 3. المحكّم الثالث: أستاذ نظم قواعد البيانات وتجربة المستخدم (Databases & UX)
* **مجال التركيز:** استمرارية البيانات، التزامن اللحظي، والتجربة المتجاوبة.

### السؤال:
> **"كيف تضمنون استمرارية تعديلات المشرفين في لوحة التحكم وانعكاسها على بقية الزوار بدون تأخير، وماذا يحدث لو انقطعت الشبكة؟"**

### الإجابة النموذجية:
1. **معمارية التخزين الهجين المتفائل (Optimistic Dual-Layer Architecture):**
   * **طبقة الاستجابة اللحظية (Client Cache):** قراءة وكتابة فورية من الذاكرة المحلية بدون أي تأخير أو رمشة بصرية (Zero-latency UI).
   * **طبقة الحفظ المركزي السحابي (Server API):** إرسال غير تزامني في الخلفية عبر [src/app/api/content/route.js](file:///d:/KassalaWebsite/KassalaWebsite/src/app/api/content/route.js) متوافق مع Vercel KV / Redis وملف التخزين المركزي [src/data/liveData.json](file:///d:/KassalaWebsite/KassalaWebsite/src/data/liveData.json).
2. **المزامنة التلقائية اللحظية (Reactive Sync):**
   * عند إقلاع الموقع لدى أي زائر، يتم استدعاء `syncWithServer` في [src/services/contentService.js](file:///d:/KassalaWebsite/KassalaWebsite/src/services/contentService.js) لتحديث البيانات تلقائياً وإطلاق أحداث `storage` لتحديث الشاشات حياً.
3. **تجربة مستخدم تفاعلية شاملة:**
   * دعم كامل لثنائية اللغة (عربي RTL وإنجليزي LTR) بدون وميض عبر `LanguageContext`.
   * حاسبة ذكية لترشيح الكليات المتاحة حسب نسبة الشهادة الثانوية لخدمة الطلاب الجدد فورياً.
   * مساعد ذكي استباقي يقدم توجيهاً مخصصاً حسب دور المستخدم (طالب، باحث، موظف، زائر).
