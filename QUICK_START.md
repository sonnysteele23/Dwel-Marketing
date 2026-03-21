# DWEL - Quick Start Guide

## 🌟 Welcome

Welcome to the DWEL company website! This is a general information site about DWEL's integrated AI platform that helps balance work and caregiving responsibilities.

---

## 📖 What is DWEL?

DWEL's integrated AI platform and intelligent technology reduces the burden of care driving employee absenteeism, productivity loss and turnover - enabling older adults to live safely and confidently at home while allowing employers to reduce absenteeism, retain talent and drive higher levels of productivity.

---

## 🎯 Website Sections

### 1. **Home (Hero)**
- Company tagline and mission
- Three key benefits
- Call-to-action buttons

### 2. **About - The Caregiving Challenge**
- Statistics about aging population
- Interactive chart showing growth projections
- Key demographics

### 3. **Our Platform**
- Technology-enhanced support
- Employer retention tools
- Employee well-being features
- Integrated platform overview

### 4. **Our Impact**
- 73% of employees are caregivers
- Talent retention benefits
- Better outcomes for families

### 5. **How It Works**
- 4-step process
- Sign up → Assess → Access → Track

### 6. **Contact**
- Contact form for inquiries
- Company contact information
- Business hours

---

## 📝 Contact Form Types

When visitors submit the contact form, they can select from:

1. **Employer** - Companies wanting to add DWEL to benefits
2. **Employee** - Employees wanting to learn more
3. **Partnership** - Partnership opportunities
4. **Press** - Media inquiries
5. **General** - General questions

---

## 🗄️ Database

### Table: `contact_inquiries`

All form submissions are saved to a database with:
- Name
- Email  
- Company
- Inquiry Type
- Message
- Submission date
- Status (New, In Progress, Responded, Closed)

---

## 👨‍💼 Admin Dashboard

Access at: `admin.html`

**Features:**
- View all contact inquiries
- Search by name, email, or company
- Filter by status
- Update inquiry status
- View full details in modal

**Statistics shown:**
- Total inquiries
- New inquiries
- In progress
- Responded

---

## 🧪 Testing the Website

### Test the Contact Form

1. Open `index.html`
2. Scroll to Contact section
3. Fill out the form:
   - Name: John Doe
   - Email: john@example.com
   - Company: Example Corp
   - Inquiry Type: Employer
   - Message: "I'm interested in DWEL for our company"
4. Click "Send Message"
5. You should see a success message

### Test the Admin Dashboard

1. Open `admin.html`
2. See your test inquiry in the table
3. Try the search feature
4. Try filtering by status
5. Click "View" to see full details
6. Update the status to "In Progress"

---

## 🎨 Key Statistics

The website displays important caregiving statistics:

- **+1 Billion** - Adults over 60 globally
- **1 in 6** - Americans are 65+
- **161 Million** - Projected U.S. 65+ by 2050
- **94%** - Seniors prefer aging in place
- **73%** - Employees managing caregiving duties

---

## 🚀 Deployment

### Quick Deploy
1. Go to the **Publish** tab
2. Click publish
3. Get your live URL

### Manual Deploy
- Netlify, Vercel, GitHub Pages, or AWS S3

### After Deployment
- Main site: `https://your-domain.com/`
- Admin: `https://your-domain.com/admin.html`

⚠️ **Important:** Add authentication to admin.html before going live!

---

## 📱 Mobile Friendly

The website is fully responsive:
- Desktop: Full layout
- Tablet: Adjusted columns  
- Mobile: Hamburger menu, stacked layout

---

## ✏️ Customization

### Update Company Info

Edit `index.html` to change:
- Company name
- Contact details (email, phone, location)
- Business hours
- Statistics

### Change Colors

Edit `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
}
```

### Add/Remove Form Fields

1. Edit HTML form in `index.html`
2. Update JavaScript in `js/main.js`
3. Update database schema if needed
4. Update admin dashboard display

---

## 🔒 Security Checklist

Before going live:

- [ ] Add authentication to admin.html
- [ ] Update contact email
- [ ] Enable HTTPS
- [ ] Add CAPTCHA to prevent spam
- [ ] Set up email notifications
- [ ] Configure backups
- [ ] Add privacy policy
- [ ] Add terms of service

---

## 🐛 Troubleshooting

### Form not submitting
- Check all required fields are filled
- Check browser console for errors
- Verify email format is valid

### Admin dashboard empty
- Submit a test inquiry first
- Hard refresh (Ctrl+Shift+R)
- Check browser console

### Chart not showing
- Wait for page to fully load
- Check that Chart.js CDN is accessible
- Check browser console for errors

---

## 📞 Need Help?

- Check README.md for full documentation
- Review browser console for errors
- Test in different browsers
- Clear browser cache

---

## ✅ Pre-Launch Checklist

- [ ] Test form submission
- [ ] Verify admin dashboard
- [ ] Update company information
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Add admin authentication
- [ ] Configure custom domain
- [ ] Set up email notifications
- [ ] Add analytics tracking
- [ ] Review privacy policy

---

## 🎉 You're Ready!

Your DWEL company information website is ready to go live. It provides comprehensive information about DWEL's caregiving platform while capturing contact inquiries in a professional database system.

**Next Steps:**
1. Customize content as needed
2. Add admin authentication
3. Deploy using Publish tab
4. Share with your team!

---

**Good luck! 🚀**