#!/bin/bash
# Add environment variables to Vercel for production deployment

echo "Setting up Vercel environment variables..."

# Required for NextAuth
echo "K3yL4rg3S3cr3tF0rN3xtAuthC4s30S2024Production" | vercel env add NEXTAUTH_SECRET production --force
echo "https://caseos-minimal.vercel.app" | vercel env add NEXTAUTH_URL production --force
echo "https://caseos-minimal.vercel.app" | vercel env add NEXT_PUBLIC_APP_URL production --force

# Database (you'll need to update this with a real database URL)
echo "postgresql://postgres:postgres@localhost:5432/caseos_prod" | vercel env add DATABASE_URL production --force

# Dummy values for required env vars (replace with real values when ready)
echo "dummy-google-client-id" | vercel env add GOOGLE_CLIENT_ID production --force
echo "dummy-google-client-secret" | vercel env add GOOGLE_CLIENT_SECRET production --force
echo "sk-dummy-openai-key" | vercel env add OPENAI_API_KEY production --force
echo "sk-ant-dummy-anthropic-key" | vercel env add ANTHROPIC_API_KEY production --force
echo "re_dummy_resend_key" | vercel env add RESEND_API_KEY production --force
echo "noreply@caseos.ai" | vercel env add RESEND_FROM_EMAIL production --force
echo "dummy-r2-access-key" | vercel env add CLOUDFLARE_R2_ACCESS_KEY_ID production --force
echo "dummy-r2-secret-key" | vercel env add CLOUDFLARE_R2_SECRET_ACCESS_KEY production --force
echo "caseos-documents" | vercel env add CLOUDFLARE_R2_BUCKET_NAME production --force
echo "https://dummy.r2.cloudflarestorage.com" | vercel env add CLOUDFLARE_R2_ENDPOINT production --force
echo "https://dummy-instance.upstash.io" | vercel env add UPSTASH_REDIS_REST_URL production --force
echo "dummy-redis-token" | vercel env add UPSTASH_REDIS_REST_TOKEN production --force

# Feature flags
echo "false" | vercel env add NEXT_PUBLIC_ENABLE_ANALYTICS production --force
echo "false" | vercel env add NEXT_PUBLIC_ENABLE_AI_CHAT production --force
echo "false" | vercel env add NEXT_PUBLIC_ENABLE_DOCUMENT_UPLOAD production --force

echo "Environment variables added. Now deploying..."