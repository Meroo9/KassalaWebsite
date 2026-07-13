"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { sanitizeInput, isValidEmail } from "../../utils/security";
import { contentService } from "../../services/contentService";
import styles from "./contact.module.css";

export default function Contact() {
  const { locale, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Contact Info state
  const [contact, setContact] = useState(() => contentService.getContactSettings());

  useEffect(() => {
    const timer = setTimeout(() => {
      setContact(contentService.getContactSettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    
    if (!formData.name || !formData.email || !formData.message) return;

    // Validate email pattern
    if (!isValidEmail(formData.email)) {
      setEmailError(
        locale === "ar"
          ? "الرجاء إدخال بريد إلكتروني صحيح."
          : "Please enter a valid email address."
      );
      return;
    }

    setIsSending(true);

    // Sanitize values
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedSubject = sanitizeInput(formData.subject);
    const sanitizedMessage = sanitizeInput(formData.message);

    // Simulate sending email to university servers
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("contact_title")}</h1>
          <p>{t("contact_subtitle")}</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* Left: Contact Form */}
            <div className={styles.formBox}>
              <h3>{t("contact_form_title")}</h3>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t("form_name")} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={styles.inputField}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{t("form_email")} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={styles.inputField}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {emailError && (
                    <span style={{ color: "#E53E3E", fontSize: "0.82rem", fontWeight: "700", marginTop: "2px" }}>
                      ⚠️ {emailError}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{t("form_subject")}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={styles.inputField}
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{t("form_message")} *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className={styles.textareaField}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSending}
                >
                  {isSending ? t("form_sending") : t("form_submit")}
                </button>
              </form>

              {isSuccess && (
                <div className={styles.successMsg}>
                  ✓ {t("form_success")}
                </div>
              )}
            </div>

            {/* Right: Info Box & Map */}
            <div className={styles.infoBox}>
              <h3>{t("contact_info_title")}</h3>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📍</span>
                  <div className={styles.infoText}>
                    <h4>{locale === "ar" ? "الموقع" : "Address"}</h4>
                    <p>{locale === "ar" ? contact.addressAr : contact.addressEn}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📞</span>
                  <div className={styles.infoText}>
                    <h4>{locale === "ar" ? "الهاتف" : "Phone"}</h4>
                    <p>{contact.phone}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>✉️</span>
                  <div className={styles.infoText}>
                    <h4>{locale === "ar" ? "البريد الإلكتروني" : "Email"}</h4>
                    <p>{contact.email}</p>
                  </div>
                </div>
              </div>

              <h3>{t("university_location")}</h3>
              <div className={styles.mapWrapper}>
                <iframe
                  title="Kassala University Map Location"
                  className={styles.mapFrame}
                  src={contact.mapsUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
