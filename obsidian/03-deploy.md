# Deploy — Vercel / Static

Steps to deploy to Vercel (recommended):

1. Create a Git repository in the project folder:

```bash
cd "/Users/adrianzeltmann/Desktop/Nerja Aptm Website"
git init
git add .
git commit -m "ZeltmannHome V1 - Tailwind" 
```

2. Push to GitHub (create a remote repo) and connect repo to Vercel.
3. In Vercel dashboard, import project — use default static settings (Build Command: none, Output Directory: /).
4. After deploy, enable automatic deploys from GitHub.

Notes:
- All assets are linked remotely (Airbnb image URLs). For reliability, consider downloading and serving optimized images from the repo or an object storage.
