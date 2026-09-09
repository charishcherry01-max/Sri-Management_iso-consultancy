# Sri Management Consultancy - Project Documentation

## 🌐 Live Website & Production Details
* **Primary Live Domain:** [https://www.srimanagement.in](https://www.srimanagement.in)
* **Redirect Domain:** [https://srimanagement.in](https://srimanagement.in) (308 redirect to `www`)
* **Hosting Platform:** Vercel
* **Vercel Project Name:** `iso-consultancy`
* **Vercel Root Directory Setting:** `frontend`
* **Production Status:** Ready & Active

---

## 🐙 GitHub Repository
* **Repository URL:** [https://github.com/charishcherry01-max/Sri-Management_iso-consultancy](https://github.com/charishcherry01-max/Sri-Management_iso-consultancy)
* **Default Branch:** `main`
* **Local Git Remote:** Configured to `origin https://github.com/charishcherry01-max/Sri-Management_iso-consultancy.git`

---

## ✉️ Email Notification System

All form submissions on the website automatically trigger instant notifications:

### **Recipient:**
* **`COMPANY_EMAIL`:** `sri.qci@gmail.com` *(Only this company inbox receives client emails)*

### **Sender Configuration:**
* **SMTP Provider:** Google Gmail SMTP (`smtp.gmail.com`)
* **Port:** `587`
* **Secure (SSL):** `false` (uses STARTTLS)
* **`SMTP_USER`:** `meghanamegha.m23@gmail.com` (service account used by server)

### **Email Formats:**
1. **Contact / Inquiries (`/contact` & `/consultation`):**
   * **Subject:** `New Query: <Customer Name> (<Customer Email>)`
   * **Header Banner:** **`New Query`** with customer name, email, phone, and inquiry details.
2. **Client Registrations (`/register`):**
   * **Subject:** `New Registration: <Customer Name> (<Customer Email>)`
   * **Header Banner:** **`New Registration`** with user type (Company/Individual), company name, selected ISO standard(s), requested services, and details.

---

## 🔑 Vercel Environment Variables Configured

Configured in Vercel Project Settings (`iso-consultancy`):
| Variable | Value |
| :--- | :--- |
| `SMTP_USER` | `meghanamegha.m23@gmail.com` |
| `SMTP_PASS` | `ksvh zbwk akcd rxjz` |
| `COMPANY_EMAIL` | `sri.qci@gmail.com` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |

---

## 💻 Local Development
* **Frontend:** `cd frontend && npm run dev` (Runs on `http://localhost:3000`)
* **Local Environment:** Stored in `frontend/.env.local`
