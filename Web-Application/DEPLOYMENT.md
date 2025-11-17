# Deployment Guide

This guide will help you deploy the Smart Scribes application to production.

## Prerequisites

1. **Node.js** 18.x or higher
2. **npm** or **yarn** package manager
3. **Supabase** account and project
4. **Google Cloud Platform** account (for file storage)
5. **Google Gemini API** key (for AI features)

## Pre-Deployment Checklist

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

#### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Cloud Storage
GCP_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=your-gcs-bucket-name

# Google Cloud Storage Credentials (choose one method)
# Option A: Base64 JSON (recommended)
GOOGLE_APPLICATION_CREDENTIALS_JSON=<BASE64_OF_JSON>

# Option B: File path
# GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Option C: Minimal vars
# GCP_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
# GCP_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n

# Gemini AI API
GEMINI_API_KEY=your-gemini-api-key
```

#### Optional Variables

```bash
# Google Search API (for web search in chat)
GOOGLE_SEARCH_API_KEY=your-google-search-api-key
SEARCH_ENGINE_ID=your-search-engine-id
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
```

### 2. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase_schema.sql` in the Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`

### 3. Build and Test

```bash
# Install dependencies
npm install

# Run build to check for errors
npm run build

# Test production build locally
npm run start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add Environment Variables**:
   - Go to your Vercel project settings
   - Add all environment variables from `.env.local`
   - Redeploy

4. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Option 2: Docker Deployment

The project is configured with `output: 'standalone'` for Docker deployments.

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t smart-scribes .
   docker run -p 3000:3000 --env-file .env.local smart-scribes
   ```

### Option 3: Other Platforms

#### Netlify
- Build command: `npm run build`
- Publish directory: `.next`
- Add environment variables in Netlify dashboard

#### Railway
- Connect your GitHub repository
- Add environment variables
- Railway will auto-detect Next.js and deploy

#### Self-Hosted (Node.js)
```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Post-Deployment

1. **Verify Environment Variables**: Ensure all required variables are set in your deployment platform
2. **Test API Routes**: Verify that `/api/chat`, `/api/qna/generate`, and `/api/upload` are working
3. **Check Database Connection**: Verify Supabase connection is working
4. **Test File Uploads**: Verify GCS upload functionality

## Troubleshooting

### Build Errors
- Ensure all TypeScript errors are resolved
- Check that all dependencies are installed
- Verify environment variables are set correctly

### Runtime Errors
- Check server logs for missing environment variables
- Verify API keys are valid and have proper permissions
- Ensure database schema is set up correctly

### File Upload Issues
- Verify GCS bucket exists and is accessible
- Check service account permissions
- Ensure bucket name matches `GCS_BUCKET_NAME` environment variable

## Security Notes

1. **Never commit `.env.local`** to version control
2. **Use environment variables** in your deployment platform
3. **Rotate API keys** regularly
4. **Enable Supabase Row Level Security (RLS)** for production
5. **Use HTTPS** in production

## Performance Optimization

The build is already optimized with:
- Static page generation where possible
- Code splitting
- Image optimization (configure `next.config.js` images for your CDN)
- Compression enabled

## Support

For issues or questions, refer to:
- `README.md` - General project information
- `QUICK_START.md` - Quick setup guide
- `README_SUPABASE_SETUP.md` - Supabase configuration
- `GCS_SETUP.md` - Google Cloud Storage setup

