import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { UserRoleProvider } from "../context/UserRoleContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeManager from "../components/ThemeManager";
import ProactiveAIAssistant from "../components/ProactiveAIAssistant";

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
      <body>
        <LanguageProvider>
          <UserRoleProvider>
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
            <ProactiveAIAssistant />
            <Footer />
          </UserRoleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
