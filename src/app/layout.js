import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeManager from "../components/ThemeManager";

export const metadata = {
  title: "جامعة كسلا | University of Kassala",
  description: "الموقع الرسمي لجامعة كسلا - السودان - منارة المعرفة والبحث العلمي والتنمية المستدامة في شرق السودان.",
  icons: {
    icon: "https://kassalauni.edu.sd/nw/wp-content/uploads/2018/08/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <LanguageProvider>
          <ThemeManager />
          <div className="digitalBackground">
            <div className="glowSphere sphere1"></div>
            <div className="glowSphere sphere2"></div>
            <div className="glowSphere sphere3"></div>
          </div>
          <Navbar />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
