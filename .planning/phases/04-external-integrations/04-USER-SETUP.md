# Phase 4: External Integrations — User Setup

**Status:** Incomplete

## EmailJS Configuration

EmailJS is used for RSVP form email delivery (Plan 02). Set up your account now so it's ready.

### Account Setup

1. [ ] Create free EmailJS account at https://dashboard.emailjs.com/sign-up
2. [ ] Add email service (Gmail or other) at **EmailJS Dashboard -> Email Services -> Add New Service**
3. [ ] Create RSVP email template at **EmailJS Dashboard -> Email Templates -> Create New Template**
   - Template should include variables: `from_name`, `status`, `plus_one`, `wishes`

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values:

```bash
cp .env.local.example .env.local
```

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Dashboard -> Email Services -> Service ID | Yes |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Dashboard -> Email Templates -> Template ID | Yes |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Dashboard -> Account -> Public Key | Yes |

### Verification

After configuring, the RSVP form (Plan 02) will use these values to send confirmation emails.

---
*Phase: 04-external-integrations*
