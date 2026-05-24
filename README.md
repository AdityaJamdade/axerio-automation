# Axerio Automation — Landing Page

Production landing page for [axerioautomation.com](https://axerioautomation.com).

## Files

```
axerio-deploy/
├── index.html       ← The single-page site
├── assets/
│   └── logo.png     ← Brand logo
├── CNAME            ← Custom domain config for GitHub Pages
└── .gitignore
```

---

## Deploy to GitHub Pages (step-by-step)

### 1. Create a GitHub repository

Go to [github.com/new](https://github.com/new) and create a **public** repo.  
Name it anything — e.g. `axerio-landing`.

### 2. Push this folder to GitHub

Open a terminal inside this `axerio-deploy/` folder and run:

```bash
git init
git add .
git commit -m "Initial landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/axerio-landing.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)` → **Save**

GitHub will give you a URL like `https://yourusername.github.io/axerio-landing` — the site is live there within ~60 seconds.

### 4. Point your domain to GitHub Pages

In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), add these DNS records:

**A Records** (point apex domain `axerioautomation.com`):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (point `www`):
```
Type:  CNAME
Name:  www
Value: YOUR_USERNAME.github.io
```

### 5. Set the custom domain in GitHub Pages

Back in **Settings → Pages**, under **Custom domain**, type:
```
axerioautomation.com
```
Hit **Save**. GitHub will auto-provision an SSL certificate (usually within 5–10 minutes).

### Done ✓

Once DNS propagates (can take up to 24 hrs but usually under 1 hr), your site will be live at:
**https://axerioautomation.com**

---

## Making updates

Edit `index.html`, then:

```bash
git add .
git commit -m "Update landing page"
git push
```

GitHub Pages auto-deploys on every push to `main`. Changes go live in under 60 seconds.
