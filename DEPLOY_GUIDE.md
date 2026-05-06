# Deploy Wormzone ke Vercel - Step by Step Guide

## Cara 1: Deploy via v0 (Paling Mudah)

1. **Buka Settings (gear icon di top-right v0)**
   - Click "Settings" button
   - Go ke "Settings" tab

2. **Connect GitHub Repository**
   - Click "Git" section
   - Click "Connect to GitHub"
   - Select your GitHub account
   - Create new repo atau select existing
   - Push kode ke GitHub

3. **Connect Vercel Project**
   - Click "Vercel" section in Settings
   - Click "Connect to Vercel"
   - Select the GitHub repo you connected
   - Vercel akan auto-detect Next.js project
   - Click "Deploy"
   - Wait for build to complete

✅ **Done!** Your game is live at `your-project.vercel.app`

---

## Cara 2: Manual Deploy via Vercel CLI

```bash
# 1. Login ke Vercel
vercel login

# 2. Deploy project
vercel

# 3. Follow prompts:
# - Link to existing project? (No - first time)
# - Project name? (wormzone atau nama apapun)
# - Framework? (Next.js akan auto-detect)
# - Root directory? (press Enter - default)

# 4. Wait for deployment...
```

---

## Cara 3: Deploy via GitHub (Recommended)

1. **Push ke GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Click "New Project"
   - Select your GitHub repo
   - Click "Import"
   - Leave all settings default
   - Click "Deploy"

✅ **Every push to main = automatic deploy!**

---

## Environment Variables (If Using Supabase)

Jika kamu mau integrate dengan Supabase database:

1. **Go to Vercel Project Settings**
   - Settings → Environment Variables
   
2. **Add these variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Get values from Supabase:**
   - Go to https://supabase.com
   - Project Settings → API
   - Copy URL and Anon Key
   - Paste ke Vercel

4. **Redeploy**
   - Go back to Vercel
   - Deployments → Latest → Redeploy
   - Or: Push new code to GitHub (auto-redeploy)

---

## Troubleshooting Deployment Errors

### Error: "Build failed"
- Check build logs in Vercel Dashboard
- Make sure `pnpm build` works locally:
  ```bash
  pnpm build
  ```
- Fix TypeScript errors if any
- Push fixed code to GitHub

### Error: "Module not found"
- Pastikan semua dependencies installed:
  ```bash
  pnpm install
  ```
- Commit lock file:
  ```bash
  git add pnpm-lock.yaml
  git commit -m "Add dependencies"
  git push
  ```

### Error: "ERR_CONNECTION_REFUSED" pada game
- Usually temporary - just wait 2-3 minutes after deploy
- Try refreshing the page
- Check if all APIs are working in browser console

### Performance Issues
- Game should run smooth pada desktop
- Mobile mungkin lebih slow - normal untuk canvas 2D game
- Try Timed mode (60s) dulu sebelum Classic

---

## Testing Sebelum Deploy

Pastikan semua jalan di local:

```bash
# 1. Start dev server
pnpm dev

# 2. Open browser
# http://localhost:3000

# 3. Test all pages:
# - Home page (/)
# - Play page (/play)
# - Leaderboard (/leaderboard)
# - Stats (/stats)

# 4. Test game:
# - Try Classic mode
# - Try Timed mode
# - Try Survival mode
# - Test power-ups

# 5. Check API:
# curl http://localhost:3000/api/scores
```

Jika semua OK di local, siap untuk deploy!

---

## Domain Custom (Optional)

1. **Go to Vercel Project Settings**
   - Settings → Domains

2. **Add domain:**
   - Nameservers dari Vercel
   - Update di domain registrar kamu
   - Wait 24-48 hours untuk propagate

---

## Monitoring & Logs

**After Deploy:**
- Vercel Dashboard shows all logs
- Check "Deployments" tab untuk history
- Click deployment untuk lihat detailed logs
- Real-time logs di "Functions" tab

---

## Rollback Jika Ada Error

Jika deployment error dan game down:

1. **Go to Vercel Deployments**
2. **Find previous working deployment**
3. **Click "Promote to Production"**
4. Boom! Balik ke version yang lama

---

## Next Steps Setelah Deploy

1. **Share game link ke temen!**
   - URL: `your-project.vercel.app`

2. **Setup Database (Optional)**
   - Integrate Supabase untuk save scores permanently
   - Setup email notifications
   - Add user authentication

3. **Monitor Performance**
   - Check Vercel analytics
   - Track game scores
   - Analyze user behavior

4. **Add More Features**
   - Multiplayer (dengan WebSockets)
   - More game modes
   - Skin/themes system
   - Sound effects

---

## Support

Jika ada error saat deploy:
1. Check Vercel build logs
2. Try `pnpm build` locally
3. Make sure git pushed dengan benar
4. Check environment variables sudah set

Good luck! Selamat main! 🎮
