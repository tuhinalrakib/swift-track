# SwiftTrack / Edu Core — Modern Order Tracking & Logistics Platform

> **Task 1 — Order Tracking Screen Assessment**  
> Designed with a sleek, luxury **Dark Obsidian & Neon Purple** theme inspired by Edu Core SaaS design system. Built with **Next.js (App Router)**, **React 19**, and **Tailwind CSS**.

---

## 🌟 Overview & Redesign Architecture

The original tracking screen only displayed four basic text statuses (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*). 

This redesign delivers a state-of-the-art dual experience:
1. **Interactive Mobile Order Tracking Screen (360px – 430px)**: The primary requirement for Task 1, fully responsive and interactive with live telemetry, visual timeline, driver card, order summary, and dispute resolution.
2. **Edu Core-Style SaaS Dashboard Table & Navigation**: Complete with dark glass cards (`#0b0f19`), glowing purple borders (`#8b5cf6`), top search, user profile ("Tuhin Al Rakib - Admin"), horizontal pill tabs, and filter pills with count badges (`All Orders 4`, `Delayed 1`, etc.).

---

## 🎯 Handling the 3 Critical Assessment Situations

The application includes an interactive **Evaluator Scenario Switcher** and dashboard filter pills to test all required states:

### 1. ⚠️ Delayed Order
- **Scenario**: The estimated delivery time has passed or the order is significantly delayed.
- **UI Adaptation**:
  - Prominent amber alert banner: *"Severe weather blizzard conditions halted flights at Chicago Air Cargo Hub"*.
  - Compares **Original Estimate** (Passed) with **New Revised ETA** (Rescheduled).
  - Clear next-step resolution actions:
    - ⚡ *Priority Expediting*
    - 📅 *Reschedule Delivery Window*
    - 💰 *Claim $10 Inconvenience Credit* (Instant wallet credit)

### 2. ❓ Delivered but Not Received
- **Scenario**: The system indicates the parcel was delivered, but the customer reports they haven't received it.
- **UI Adaptation**:
  - Prominent alert: *"Haven't received your order yet?"*.
  - **Proof of Delivery Photo Modal**: Shows actual doorstep photo, geotag coordinates, and driver GPS radius match.
  - Guided 3-step investigation checklist (check porch, inspect photo, report missing).
  - 1-click **Report Missing Package Claim**: Select between immediate free replacement shipment or 100% instant refund.

### 3. ⏳ Tracking Not Available Yet
- **Scenario**: The order exists and is confirmed, but courier tracking information is not available yet.
- **UI Adaptation**:
  - Reassuring warehouse status: *"Preparing Order for Dispatch at Fulfillment Hub"*.
  - Explanatory roadmap: Informs the customer that carrier tracking activates automatically upon the first barcode scan (~12-24 hrs).
  - Expected carrier handover countdown: *"Today by 6:00 PM"*.
  - Proactive toggle: *"SMS & WhatsApp Tracking Alerts"* (Notifies the customer the second tracking goes live).

---

## 💻 Local Setup & Running Instructions

### Prerequisites
- **Node.js** (v18.17.0 or later)
- **npm** or **pnpm** or **yarn**

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Live Deployment to Vercel (For Submission)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete order tracking screen with dark Edu Core aesthetic"
   git branch -M main
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** > **"Project"** and select `order-tracking`.
4. Click **"Deploy"**. Vercel will build and provide a live URL in ~1 minute.
5. Submit the **Live Deployed URL** and your **GitHub Repository URL**!
