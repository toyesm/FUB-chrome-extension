# Testing Checklist - Phase A1

## Overview
Phase A1 testing focuses on verifying the FUB API integration, proxy route functionality, and basic contact lookup features.

---

## 🔧 Environment Setup Tests

- [ ] **Local Environment**
  - [ ] `.env.local` file created with valid `FUB_API_KEY`
  - [ ] Development server starts without errors (`npm run dev`)
  - [ ] No console errors on page load
  - [ ] All dependencies installed correctly

- [ ] **Vercel Deployment**
  - [ ] Project deploys successfully to Vercel
  - [ ] `FUB_API_KEY` environment variable configured
  - [ ] Production build completes without errors
  - [ ] App accessible via Vercel URL

---

## 🔌 API Proxy Route Tests

### Basic Functionality
- [ ] **Connection Test**
  - [ ] "Test FUB Connection" button works
  - [ ] Success message displays when API key is valid
  - [ ] Error message displays when API key is invalid/missing
  - [ ] Loading state shows during request

### Error Handling
- [ ] Missing `FUB_API_KEY` returns appropriate error (500)
- [ ] Invalid API key returns authentication error
- [ ] Network errors handled gracefully
- [ ] Malformed requests return helpful error messages

### HTTP Methods
- [ ] GET requests work (people lookup)
- [ ] POST requests ready for future appointment creation
- [ ] PUT requests ready for future appointment updates
- [ ] DELETE requests ready if needed

### Security
- [ ] API key never exposed in browser/network tab
- [ ] All requests routed through `/api/fub/*` proxy
- [ ] CORS properly handled
- [ ] No API key in client-side JavaScript

---

## 👤 Contact Lookup Tests

### Email Search
- [ ] **Valid Email**
  - [ ] Search returns matching contact(s)
  - [ ] Contact details display correctly:
    - [ ] Name
    - [ ] Email address(es)
    - [ ] Phone number(s)
    - [ ] Stage
    - [ ] Created date
  - [ ] Multiple contacts handled if returned
  - [ ] Raw data viewer expands/collapses correctly

- [ ] **Edge Cases**
  - [ ] Email not found returns "0 contacts found" message
  - [ ] Empty email field validation works
  - [ ] Special characters in email handled correctly
  - [ ] Loading state displays during search

### Phone Search
- [ ] **Valid Phone**
  - [ ] Phone search returns matching contact(s)
  - [ ] Same display requirements as email search
  - [ ] Various phone formats handled (with/without formatting)

- [ ] **Edge Cases**
  - [ ] Phone not found returns appropriate message
  - [ ] Empty phone field validation works
  - [ ] Different phone formats accepted

### UI/UX
- [ ] Radio button toggles between email/phone work
- [ ] Input field placeholder changes based on search type
- [ ] Input type changes (email vs tel)
- [ ] Form submission works (button click + Enter key)
- [ ] Disabled state during loading prevents double submission
- [ ] Error messages display clearly and are dismissible

---

## 📱 Responsive Design Tests

- [ ] **Desktop (1920px+)**
  - [ ] Layout looks clean and centered
  - [ ] Max-width container (4xl) applies correctly
  - [ ] Cards have appropriate spacing

- [ ] **Tablet (768px - 1024px)**
  - [ ] Layout remains functional
  - [ ] Buttons and inputs scale appropriately
  - [ ] No horizontal scroll

- [ ] **Mobile (375px - 767px)**
  - [ ] Cards stack vertically
  - [ ] Text remains readable
  - [ ] Buttons full-width or appropriately sized
  - [ ] Touch targets adequate size
  - [ ] No content cut off

- [ ] **iPhone Specific** (primary target)
  - [ ] Test on Safari iOS
  - [ ] Form inputs don't zoom on focus
  - [ ] Submit works with iOS keyboard

---

## 🎨 Visual/Styling Tests

- [ ] Tailwind CSS styles applied correctly
- [ ] Color scheme consistent (grays, blues, greens, reds)
- [ ] Button hover states work
- [ ] Focus states visible for accessibility
- [ ] Card shadows and borders render correctly
- [ ] Monospace font for raw JSON display
- [ ] Loading states visually clear

---

## 🔍 Frontend API Client Tests

### fubClient.ts Methods
- [ ] `testConnection()` - works
- [ ] `getPersonByEmail(email)` - returns correct data structure
- [ ] `getPersonByPhone(phone)` - returns correct data structure
- [ ] Error handling throws appropriate errors
- [ ] TypeScript types/interfaces match FUB API responses

### Future Methods (not tested yet, but available)
- [ ] `getPersonById(id)` - ready for Phase A4
- [ ] `getEventsByPersonId(personId, type?)` - ready for Phase A5
- [ ] `getAppointmentsByPersonId(personId)` - ready for Phase A6
- [ ] `createAppointment(appointment)` - ready for Phase A7
- [ ] `updateAppointment(id, updates)` - ready for Phase A7
- [ ] `getAppointmentTypes()` - ready for Phase A6/A7

---

## 📊 Data Validation Tests

### FUB API Response Handling
- [ ] **Person Object**
  - [ ] ID parsed correctly
  - [ ] Name/firstName/lastName handled (fallback logic works)
  - [ ] Email array processed correctly
  - [ ] Phone array processed correctly
  - [ ] Stage displays when present
  - [ ] Created date formatted correctly
  - [ ] Unknown/missing fields don't break UI

- [ ] **Empty/Null Values**
  - [ ] Missing emails doesn't crash
  - [ ] Missing phones doesn't crash
  - [ ] Missing name shows "Unknown"
  - [ ] Empty arrays handled gracefully

---

## 🚨 Error Scenarios to Test

- [ ] **Network Issues**
  - [ ] No internet connection
  - [ ] Slow connection (timeout handling)
  - [ ] Server unavailable (FUB API down)

- [ ] **API Issues**
  - [ ] Rate limiting (if applicable)
  - [ ] Invalid responses from FUB
  - [ ] Unexpected data structures

- [ ] **User Input Issues**
  - [ ] Malformed email addresses
  - [ ] Invalid phone numbers
  - [ ] SQL injection attempts (should be sanitized)
  - [ ] XSS attempts (should be sanitized)

---

## 📝 Documentation Tests

- [ ] **README.md**
  - [ ] Setup instructions accurate
  - [ ] All commands work as written
  - [ ] Links functional
  - [ ] Troubleshooting section helpful

- [ ] **.env.local.example**
  - [ ] Copy command works
  - [ ] Template has correct format
  - [ ] Comments clear

---

## ⚡ Performance Tests

- [ ] Page load time < 3 seconds
- [ ] API proxy response time reasonable
- [ ] No memory leaks during repeated searches
- [ ] Build size acceptable
- [ ] No unnecessary re-renders (React DevTools)

---

## ♿ Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Screen reader friendly (semantic HTML)
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible
- [ ] Form labels associated correctly
- [ ] Error messages announced

---

## 🔐 Security Tests

- [ ] API key never in client bundle
- [ ] API key never in network responses
- [ ] No sensitive data in console logs
- [ ] `.env.local` in `.gitignore`
- [ ] `.env.local.example` committed (no actual key)
- [ ] HTTPS enforced in production

---

## 📦 Build Tests

- [ ] `npm run build` succeeds
- [ ] `npm run start` works after build
- [ ] No TypeScript errors
- [ ] No ESLint errors (if applicable)
- [ ] Production bundle optimized

---

## 🎯 Test Scenarios with Real Data

### Scenario 1: Happy Path
1. Start dev server
2. Click "Test FUB Connection" → ✅ Success
3. Enter known email → ✅ Contact found
4. Verify all fields populate correctly
5. Expand raw data viewer → ✅ JSON displays

### Scenario 2: Contact Not Found
1. Enter email that doesn't exist in FUB
2. Search → ✅ "0 contacts found" message
3. No errors in console

### Scenario 3: Invalid API Key
1. Use wrong/missing API key
2. Test connection → ✅ Error message displayed
3. Search attempt → ✅ Same error message

### Scenario 4: Mobile Testing
1. Open on iPhone Safari
2. Test connection works
3. Search by email works
4. UI fully functional and readable

---

## 🐛 Known Issues / Tech Debt

- [ ] None identified yet - add as discovered

---

## ✅ Sign-Off

**Tested By:** ___________
**Date:** ___________
**Environment:** [ ] Local [ ] Vercel
**Status:** [ ] All tests pass [ ] Issues found (see notes)

**Notes:**
_________________________________________
_________________________________________
_________________________________________

---

## 🚀 Ready for Phase A2 When:
- [ ] All critical tests pass
- [ ] No blocking issues
- [ ] Deployed to Vercel successfully
- [ ] Tested on iPhone (primary use case)
- [ ] Documentation accurate
