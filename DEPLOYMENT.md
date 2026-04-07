# 🚀 Deployment Guide - Eternal Pixels

## Quick Deploy to Vercel

### Option 1: Deploy from CLI (Fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts and your app will be live!

### Option 2: Deploy from GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Click "Deploy"

Your app will be live at `<project-name>.vercel.app`

## Environment Setup

No environment variables needed! This is a 100% frontend app.

## Pre-Deployment Checklist

- [ ] Update password in `app/utils/constants.ts`
- [ ] Customize timeline events
- [ ] Update final message
- [ ] Test password locally: `npm run dev`
- [ ] Verify game works in browser
- [ ] Check mobile responsiveness

## After Deployment

1. **Share the link** with your special someone!
2. **Test in a private browser** to verify everything works
3. **Check mobile viewing** on an actual phone

## Demo Password

Default password is "ourStory" (change it!)

## Troubleshooting Deployment

### App is blank?
- Check browser console (F12)
- Clear browser cache
- Try incognito window

### Game not loading?
- Ensure you're using a modern browser
- Check Network tab in F12 for failed requests
- Try refreshing

### Password screen appears stuck?
- Clear localStorage: `localStorage.clear()`
- Check console for errors

## Custom Domain

To use a custom domain with Vercel:

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## Analytics (Optional)

Vercel includes free analytics. Check your project dashboard to see:
- Page views
- Visitor count
- Device types
- Geographic data

## Going Live Checklist

```
[ ] Build passes locally: npm run build
[ ] No console errors in dev mode
[ ] All screens tested: password → timeline → game → message
[ ] Password changed to something personal
[ ] Timeline and message customized
[ ] Deployed to Vercel
[ ] Tested on mobile
[ ] Shared with special someone 💕
```

---

**Remember**: This is a special gift—make it personal! ✨
