# Quick Start Guide - FUB Lead Viewer

Get up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- FUB API key ([Get it here](https://app.followupboss.com/settings/api))
- Git (for deployment)

---

## 🚀 Local Development

### 1. Install dependencies
```bash
cd fub-lead-viewer
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
FUB_API_KEY=your_actual_api_key_here
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Test it works
1. Click **"Test FUB Connection"** → Should show ✅ success
2. Enter a test email from your FUB account
3. Click **"Search"** → Should show contact details

---

## 🌐 Deploy to Vercel

### Option 1: Quick Deploy (Recommended)

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variable:
   - **Key**: `FUB_API_KEY`
   - **Value**: Your FUB API key
5. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

When prompted, add environment variable:
```
FUB_API_KEY=your_api_key
```

---

## ✅ Verification Checklist

After deployment:

- [ ] Visit your Vercel URL
- [ ] Click "Test FUB Connection" → ✅ Success
- [ ] Search for a contact → Results display
- [ ] Test on mobile device (iPhone recommended)
- [ ] No console errors in browser DevTools

---

## 🐛 Troubleshooting

### "FUB_API_KEY not configured" error
- **Local**: Make sure `.env.local` exists and has your key
- **Vercel**: Check environment variables in project settings
- Restart dev server after changing `.env.local`

### Build fails (font errors)
- This is normal in sandboxed environments
- Fonts will load correctly in production/local environment
- Safe to ignore in restricted network environments

### Contact not found
- Verify the email/phone exists in your FUB account
- Try a different contact you know exists
- Check browser console for API errors

### CORS or network errors
- Verify your API key is valid
- Check FUB API status
- Ensure no firewall blocking api.followupboss.com

---

## 📱 Testing on iPhone

1. Deploy to Vercel (get HTTPS URL)
2. Open Safari on iPhone
3. Navigate to your Vercel URL
4. Test connection and search
5. Verify responsive layout

---

## 🎯 What's Next?

Once Phase A1 is tested and working:
- **Phase A2**: Enhanced manual contact lookup UI
- **Phase A3**: Sidebar component shell
- **Phase A4**: Lead Profile Card
- **Phase A5**: Property Activity tabs
- **Phase A6**: Appointments display
- **Phase A7**: Create appointments + outcomes

---

## 📚 Additional Resources

- Full documentation: See `README.md`
- Testing checklist: See `TESTING.md`
- FUB API docs: https://api.followupboss.com/

---

## 💡 Tips

- Keep your API key secret (never commit to git)
- Test locally before deploying
- Use Vercel preview deployments for testing
- Monitor Vercel logs for production errors
