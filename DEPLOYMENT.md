# 🚀 Deployment Guide

Deploy your JEE Study Tracker to production with step-by-step instructions.

## Deployment Options

| Platform | Difficulty | Cost | Cold Start | Auto Deploy |
|----------|-----------|------|-----------|-------------|
| **Vercel** | ⭐ Easy | Free | <100ms | Yes |
| **Netlify** | ⭐⭐ Easy | Free | <200ms | Yes |
| **AWS Amplify** | ⭐⭐ Medium | Free/Paid | <200ms | Yes |
| **Docker** | ⭐⭐⭐ Hard | Varies | <500ms | Manual |

## ✅ Pre-Deployment Checklist

Before deploying, verify:

```bash
# 1. Build succeeds
npm run build
# Should complete without errors

# 2. Development works
npm run dev
# Test all features

# 3. Type checking passes
npx tsc --noEmit
# Should show no errors

# 4. Check .gitignore is correct
cat .gitignore
# Should exclude node_modules, .next, etc.
```

## Option 1: Vercel (⭐ Recommended)

**Why Vercel?**
- Made by Next.js creators
- Free tier generously
- Automatic deployments
- Custom domains
- Analytics included
- <100ms cold starts

### Method A: Using Vercel Dashboard

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Use GitHub, GitLab, Bitbucket, or email

2. **Prepare GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: JEE Study Tracker"
   git branch -M main
   git remote add origin https://github.com/yourusername/jee-study-tracker.git
   git push -u origin main
   ```

3. **Import Project**
   - Click on Vercel Dashboard
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Environment Variables**: Leave empty (none needed)
   - Click "Deploy"

5. **Wait for Deployment**
   - Vercel builds and deploys
   - Takes 1-3 minutes
   - Get deployment URL

6. **Visit Your App**
   - Click "Visit" button
   - Your app is live! 🎉

### Method B: Using Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login
# Follow browser instructions

# 3. Deploy from project directory
cd jee-study-tracker
vercel

# 4. Answer deployment questions
# Project name: jee-study-tracker
# Directory: ./
# Build settings: defaults (press Enter)

# 5. Wait for deployment
# You'll get a URL like: https://jee-study-tracker.vercel.app
```

### Setting Custom Domain (Vercel)

1. Go to Project Settings
2. Click "Domains"
3. Enter your custom domain
4. Add DNS records (Vercel provides instructions)
5. Wait for verification (instant with Vercel domains)

### Environment Variables (If Needed)

1. Go to Settings → Environment Variables
2. Add variables as needed
3. Re-deploy for changes to take effect

For this project: No environment variables needed!

## Option 2: Netlify

### Deploy with Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Authorize Netlify

2. **Create New Site**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub
   - Select your repository

3. **Configure Build**
   - **Base directory**: Leave empty
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Environment**: Node v18 (add in settings)

4. **Add Environment Variables** (if needed)
   - Settings → Build & Deploy → Environment
   - Click "Edit variables"
   - Leave empty for this project

5. **Deploy**
   - Click "Deploy site"
   - Wait for build completion
   - Get your live URL

### Nextjs Config for Netlify

File already compatible! No changes needed.

## Option 3: AWS Amplify

### Deploy to AWS Amplify

1. **Create AWS Account**
   - Go to [aws.amazon.com](https://aws.amazon.com)
   - Create free tier account
   - Enable CodeBuild

2. **Deploy from GitHub**
   - Open AWS Amplify console
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Select main branch

3. **Configure Build**
   ```yaml
   # Use Amplify's auto-detection
   # Or create amplify.yml:
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy**
   - AWS builds and deploys automatically
   - Gets URL like: `https://branch.app-id.amplifyapp.com`

## Option 4: Docker Deployment

### Build Docker Image

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Create `.dockerignore`:
```
node_modules
.next
.git
.gitignore
README.md
LICENSE
```

### Build and Run Locally

```bash
# Build image
docker build -t jee-study-tracker .

# Run container
docker run -p 3000:3000 jee-study-tracker

# Visit http://localhost:3000
```

### Deploy to Container Registries

#### Docker Hub
```bash
docker login
docker tag jee-study-tracker yourusername/jee-study-tracker
docker push yourusername/jee-study-tracker
```

#### AWS ECR
```bash
aws ecr create-repository --repository-name jee-study-tracker
docker tag jee-study-tracker:latest <account>.dkr.ecr.<region>.amazonaws.com/jee-study-tracker:latest
```

## Post-Deployment Checklist

After deploying to production:

```bash
# 1. Test All Features
- [ ] Dashboard loads
- [ ] Can log study hours
- [ ] Dark mode toggles
- [ ] Can add mock scores
- [ ] Charts display
- [ ] Export backup works
- [ ] Import backup works

# 2. Test on Different Devices
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Mobile Safari
- [ ] Mobile Chrome
- [ ] Tablet view

# 3. Performance Check
- [ ] Page loads in <2 seconds
- [ ] Smooth scrolling
- [ ] No lag on interactions
- [ ] Charts animate smoothly

# 4. Console Check
- [ ] Open DevTools (F12)
- [ ] Check Console tab
- [ ] Should be no error messages
- [ ] Only warnings acceptable

# 5. LocalStorage Check
- [ ] Save study entry
- [ ] Refresh page
- [ ] Data persists
- [ ] Toggle theme
- [ ] Theme persists
```

## Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to Project Settings
2. Click "Integrations"
3. Install "Web Analytics"
4. View real-time metrics

Metrics include:
- Page load performance
- User interactions
- Browser compatibility
- Error tracking

### Google Analytics (Optional)

Add to `app/layout.tsx`:
```tsx
{/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Custom Domain Setup

### Using Vercel

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Go to Vercel Project Settings
3. Add domain in "Domains" section
4. Follow Vercel's DNS instructions
5. Verify domain (usually automatic)

### Using Netlify

1. Purchase domain
2. Go to Netlify Site Settings
3. Click "Domain management"
4. Add custom domain
5. Update DNS records at registrar

DNS records typically:
```
Type: ALIAS/ANAME
Name: @
Value: <provided-by-platform>
```

## Troubleshooting Deployment

### Build Fails

```bash
# Check local build first
npm run build

# If it fails locally, fix it before deploying:
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### App Crashes After Deploy

1. Check deployment logs
2. Verify build command
3. Check environment variables
4. Ensure `.next` folder generated

### 404 on Refresh

Ensure `vercel.json` or platform config handles client-side routing.

### Data Not Persisting

- LocalStorage works on same origin
- Check browser settings
- Verify no incognito mode
- Clear browser cache

### Slow Performance

1. Check Lighthouse score
2. Optimize images (if added)
3. Enable caching headers
4. Check bundle size

```bash
npm run build
# Check .next size
du -sh .next/
```

## Maintenance

### Regular Updates

```bash
# Keep dependencies updated
npm outdated
npm update

# Test after updates
npm run build
npm run dev

# Commit and push
git push origin main
```

### Monitoring Health

1. **Weekly**: Check error logs
2. **Monthly**: Review analytics
3. **Quarterly**: Test all features
4. **Yearly**: Dependency audit

### Backup Strategy

1. **Regular exports**: Use backup feature daily
2. **Git commits**: Push code changes
3. **Database backups**: Not needed (client-side)

## Advanced Deployments

### Multi-Region Deployment (Vercel)

Vercel automatically deploys to edge network globally.

### Custom Server

If using custom server:

```bash
npm run build
npm start
```

Deploy the entire project folder to your server.

### Self-Hosted

```bash
# Build
npm run build

# Copy to server
scp -r .next server:/var/www/app

# Install dependencies on server
ssh server 'cd /var/www/app && npm install --production'

# Start with PM2
ssh server 'pm2 start npm --name jee-tracker -- start'
```

## Cost Estimation

| Service | Build | Hosting | Monthly |
|---------|-------|---------|---------|
| **Vercel** | Free | Free | $0 |
| **Netlify** | Free | Free | $0 |
| **AWS** | Free | $0.50-5 | $0.50-5 |
| **VPS** | Included | $5-20 | $5-20 |

**Recommended**: Vercel (completely free, no credit card required)

## Domain Options

### Free Subdomains
- `*.vercel.app` (Vercel)
- `*.netlify.app` (Netlify)

### Paid Domains ($10-15/year)
- [Namecheap.com](https://namecheap.com)
- [GoDaddy.com](https://godaddy.com)
- [Google Domains](https://domains.google.com)

## Production Optimization Checklist

- [x] Build succeeds
- [x] No TypeScript errors
- [x] No console errors
- [x] Dark mode works
- [x] Responsive design tested
- [x] All sections functional
- [x] LocalStorage working
- [x] Charts render correctly
- [x] Export/Import working
- [x] Performance acceptable

---

**Your app is deployed! Celebrate! 🎉**

Share your progress and start using it on production! 📱💪
