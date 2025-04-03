# Moonlit Psychiatry

A modern telehealth platform connecting patients with psychiatric care providers in Utah.

## Tech Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_SITE_URL`: Public site URL

## Security

This repository contains sensitive configuration. Please ensure:
- Never commit `.env` files
- Keep API keys and credentials secure
- Follow security best practices when contributing

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for review and approval

## License

Copyright © 2024 Moonlit Psychiatry. All rights reserved. 