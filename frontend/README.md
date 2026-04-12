# MuneerDev Portfolio Frontend

Next.js 15 frontend for the MuneerDev portfolio.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PharmacistEdge.tsx
│   ├── FeaturedProjects.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Home page

public/
└── projects/            # Project images
```

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Validation**: Zod
- **Language**: TypeScript

## Dark Mode

The portfolio uses a professional dark theme optimized for readability and modern aesthetics.

## Contact Form

Submits to the FastAPI backend at `/api/contact/submit`. Ensure the backend is running.

## Deployment

See the root [README.md](../README.md) for deployment instructions.
