# Ohio Multi-Solution: appearance and security notes

## Appearance
- The shared navigation now adds a Light/Dark switch to pages that have a header navigation.
- Dark mode is the default. A visitor's choice is saved in that browser using localStorage.

## Hosting security headers
- `_headers` adds baseline browser protections for Netlify deployments: MIME sniffing protection, clickjacking protection, a restrictive referrer policy, disabled unused device permissions, and a Content Security Policy.
- Review the Content Security Policy after adding any new third-party scripts, payment widgets, embeds, or form providers. The current policy permits the site's Google Fonts, HTTPS images, and Formspree form submission.

## Important limits
This project is a static front-end website. Client-side JavaScript and static pages alone cannot securely authenticate users, store passwords, prevent spam by themselves, or guarantee protection from hackers/fraudsters. The current login, signup, password recovery, and course enrolment pages must not be treated as secure account systems unless they are connected to a trusted backend/authentication provider.

Before collecting personal information or launching real accounts:
1. Use a reputable authentication provider or a server-side backend; never store plaintext passwords in the browser or in static files.
2. Enforce HTTPS (Netlify provides HTTPS for hosted sites) and enable multi-factor authentication for Netlify, GitHub, domain registrar, and any admin accounts.
3. Add server-side validation, rate limiting, bot/spam protection, and secure session handling to any backend endpoints.
4. Keep dependencies updated, avoid publishing API keys/secrets in this repository, and review form destinations and privacy notices.
5. Test the site after deployment; headers are a baseline, not a security audit or guarantee.
