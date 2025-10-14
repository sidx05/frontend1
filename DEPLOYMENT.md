# NewsHub Deployment Guide

This guide covers deploying NewsHub to various cloud platforms.

## Prerequisites

- Node.js 18+ 
- MongoDB database
- Redis (for job queues)
- Environment variables configured

## Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `REDIS_URL` - Redis connection string
- `NEXT_PUBLIC_API_URL` - Public API URL

## Deployment Options

### 1. Vercel (Recommended for Frontend)

Vercel is ideal for Next.js applications with serverless functions.

#### Setup:
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

#### Configuration:
- Uses `vercel.json` for configuration
- API routes run as serverless functions
- Automatic HTTPS and CDN

#### Environment Variables in Vercel:
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add REDIS_URL
```

### 2. Docker Deployment

For full-stack deployment with backend services.

#### Setup:
```bash
# Build and deploy
./deploy.sh docker

# Or manually:
docker-compose -f docker-compose.prod.yml up -d
```

#### Features:
- MongoDB container
- Redis container
- Nginx reverse proxy
- SSL termination
- Auto-restart policies

### 3. AWS/GCP/Azure

For enterprise deployments with full control.

#### AWS Elastic Beanstalk:
1. Create `Dockerrun.aws.json`
2. Deploy via EB CLI or console
3. Configure RDS for MongoDB
4. Use ElastiCache for Redis

#### Google Cloud Run:
1. Build container: `gcloud builds submit`
2. Deploy: `gcloud run deploy`
3. Use Cloud SQL for MongoDB
4. Use Memorystore for Redis

### 4. Traditional VPS

For cost-effective deployments.

#### Setup:
```bash
# On your server
git clone <your-repo>
cd newshub
npm install
npm run build
npm start
```

#### With PM2:
```bash
npm install -g pm2
pm2 start npm --name "newshub" -- start
pm2 startup
pm2 save
```

## Database Setup

### MongoDB Atlas (Cloud):
1. Create cluster at mongodb.com
2. Get connection string
3. Set `MONGODB_URI` environment variable

### Self-hosted MongoDB:
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or install locally
# Ubuntu/Debian:
sudo apt install mongodb
# macOS:
brew install mongodb
```

## Redis Setup

### Redis Cloud:
1. Create account at redis.com
2. Create database
3. Get connection string

### Self-hosted Redis:
```bash
# Using Docker
docker run -d -p 6379:6379 --name redis redis:7.2-alpine

# Or install locally
# Ubuntu/Debian:
sudo apt install redis-server
# macOS:
brew install redis
```

## SSL/HTTPS Setup

### Let's Encrypt (Free):
```bash
# Install certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Recommended):
1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption
4. Configure caching rules

## Monitoring & Logging

### Application Monitoring:
- Vercel Analytics (for Vercel deployments)
- Google Analytics
- Sentry for error tracking

### Server Monitoring:
- PM2 monitoring (for VPS)
- Docker stats
- Cloud provider monitoring

### Logging:
```bash
# View logs
docker-compose logs -f app

# Or with PM2
pm2 logs newshub
```

## Performance Optimization

### Frontend:
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement caching strategies
- Optimize bundle size

### Backend:
- Database indexing
- Redis caching
- Connection pooling
- Rate limiting

### Database:
```javascript
// Add indexes for better performance
db.articles.createIndex({ "publishedAt": -1 })
db.articles.createIndex({ "language": 1, "category": 1 })
db.articles.createIndex({ "status": 1 })
```

## Security Checklist

- [ ] Environment variables secured
- [ ] JWT secrets are strong
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Database Connection:**
   - Check MongoDB URI format
   - Verify network connectivity
   - Check authentication credentials

3. **Memory Issues:**
   - Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`
   - Optimize Docker memory limits

4. **API Timeouts:**
   - Increase function timeout in Vercel
   - Optimize database queries
   - Implement caching

### Logs:
```bash
# Application logs
npm run start 2>&1 | tee app.log

# Docker logs
docker-compose logs -f

# PM2 logs
pm2 logs newshub --lines 100
```

## Backup Strategy

### Database Backup:
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/newshub" --out=backup/

# Restore
mongorestore --uri="mongodb://localhost:27017/newshub" backup/newshub/
```

### Automated Backups:
```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Scaling

### Horizontal Scaling:
- Load balancer (Nginx/HAProxy)
- Multiple app instances
- Database clustering
- Redis clustering

### Vertical Scaling:
- Increase server resources
- Optimize application code
- Database optimization
- Caching strategies

## Support

For deployment issues:
1. Check logs first
2. Verify environment variables
3. Test database connectivity
4. Check network configuration
5. Review security settings

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Security measures in place
- [ ] Performance optimized
- [ ] Error tracking configured
- [ ] Logging configured
- [ ] Health checks working
