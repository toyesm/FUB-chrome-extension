# FUB Lead Viewer

A Next.js test application for the Follow Up Boss (FUB) Chrome Extension project. This app provides a web interface for viewing lead details and integrating with FUB CRM.

## Project Overview

This is **Phase A** of the FUB Chrome Extension project - a Next.js web app deployed on Vercel for easier iteration and testing (especially on mobile devices like iPhone) before wrapping it into a Chrome extension.

### Current Status: Phase A1 ✅

- ✅ Next.js project with Tailwind CSS
- ✅ FUB API proxy route (`/api/fub/[...path]`)
- ✅ Frontend API client service
- ✅ Test page for connection verification and contact lookup

### Upcoming Phases

- **A2**: Manual contact lookup (enhanced UI)
- **A3**: Sidebar UI shell + styling
- **A4**: Lead Profile Card (Feature 1)
- **A5**: Property Activity tabs (Features 6-9)
- **A6**: Appointments display (Features 10, 12)
- **A7**: Create appointment + outcomes (Features 11, 13)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure FUB API Key

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Follow Up Boss API key:

```env
FUB_API_KEY=your_actual_api_key_here
```

**Where to find your FUB API key:**
- Log in to Follow Up Boss
- Navigate to Settings → API
- Copy your API key from there

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test the Connection

1. Click the **"Test FUB Connection"** button to verify your API key is working
2. Use the **Contact Lookup** form to search for leads by email or phone number

## Project Structure

```
fub-lead-viewer/
├── app/
│   ├── api/
│   │   └── fub/
│   │       └── [...path]/
│   │           └── route.ts      # FUB API proxy (handles auth)
│   ├── page.tsx                  # Main test UI
│   ├── layout.tsx
│   └── globals.css
├── components/                   # UI components (future)
├── services/
│   └── fubClient.ts              # Frontend API client
├── .env.local.example            # Environment variable template
└── .env.local                    # Your API key (gitignored)
```

## API Architecture

### Security Model

- **API Key Storage**: Stored in `.env.local` (server-side only)
- **API Proxy**: All FUB API requests go through `/api/fub/*` routes
- **Authentication**: Basic Auth handled server-side (API key never exposed to browser)

### Available Client Methods

The `fubClient.ts` service provides these methods:

```typescript
// People
getPersonByEmail(email: string)
getPersonByPhone(phone: string)
getPersonById(id: number)

// Events
getEventsByPersonId(personId: number, type?: string)

// Appointments
getAppointmentsByPersonId(personId: number)
createAppointment(appointment: Partial<Appointment>)
updateAppointment(id: number, updates: Partial<Appointment>)
getAppointmentTypes()

// Health Check
testConnection()
```

## FUB API Endpoints Used

| Endpoint | Purpose | Features |
|----------|---------|----------|
| `GET /people` | Contact lookup | 1, 2 |
| `GET /events` | Property views, saves, inquiries | 6-9 |
| `GET /appointments` | Upcoming appointments | 10 |
| `POST /appointments` | Create appointment from calendar | 11 |
| `GET /appointmentTypes` | Appointment type labels | 12 |
| `PUT /appointments/:id` | Appointment outcome tracking | 13 |

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/fub-lead-viewer)

### Manual Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `FUB_API_KEY`
   - Value: Your FUB API key
4. Deploy

## Development Notes

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **API**: FUB REST API v1

### Best Practices

- Never commit `.env.local` (already in `.gitignore`)
- API key is never sent to the browser
- All FUB requests are proxied through Next.js API routes
- Mobile-first responsive design with Tailwind

## Troubleshooting

### Connection Test Fails

- Verify your `FUB_API_KEY` is set correctly in `.env.local`
- Restart the development server after changing environment variables
- Check that your API key has the necessary permissions in FUB

### Contact Search Returns No Results

- Ensure the email/phone exists in your FUB account
- Try a different contact you know exists
- Check the browser console for error details

## Next Steps

After Phase A1 is complete and tested:

1. **Phase A2**: Build enhanced manual contact lookup UI
2. **Phase A3**: Create sidebar component shell
3. **Phase A4**: Implement Lead Profile Card
4. Continue through phases A5-A7
5. Eventually wrap in Chrome extension (Phase B)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Follow Up Boss API Documentation](https://api.followupboss.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## License

Private project - not for public distribution.
