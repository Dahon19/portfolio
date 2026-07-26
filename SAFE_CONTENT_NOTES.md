# SAFE CONTENT NOTES

This portfolio was prepared as a public-safe build based on local `SysProjects` folders and the `E-Certificates` Drive content.

## What was included

- Presentable project summaries only
- Public-safe skill summaries
- Sanitized certificate summaries grouped by relevance
- Sanitized certificate preview thumbnails generated from all relevant certificate files in the Drive certificate folders
- A contact section layout without private personal contact details
- Public contact details explicitly approved for the portfolio: `rodallenagregado19@gmail.com` and `09770317480`

## What was excluded for privacy

- `.env` files and environment-specific secrets
- API keys, service-role keys, bearer tokens, and database credentials
- Private local URLs, local admin credentials, and internal-only endpoints
- Raw certificate files, QR codes, verification links, barcodes, signatures, and certificate numbers
- Exact home address, personal IDs, and non-approved personal contact details
- Duplicate or less portfolio-relevant project variants
- Hidden metadata from original project/certificate images by avoiding direct publication of raw certificate assets

## Project inclusion decisions

- Included `hims` as the main hospital inventory project
- Included `hrms` as the main HR system project
- Excluded `hrmis` from the main showcase to avoid duplicate HR portfolio entries
- Included `edu-web`, `interna`, and `ai-automation-agent` as presentable and distinct projects
- Excluded raw or sensitive internals from `interna` and `ai-automation-agent` because those projects reference environment-based integrations

## Certificate handling

- Certificate entries were summarized from the Drive folder inventory and readable certificate text where available
- Certificate previews were cropped, resized, lightly blurred, and masked to hide certificate identifiers, QR codes, verification links, and signature areas
- `Oplan Paskong Sigurado` uses a cropped preview from the Drive PDF that keeps the certificate body visible while excluding the digital signature area
- Raw Drive files are not published in the portfolio
- The public portfolio now includes all 50 visible records from the connected Drive certificate folders, including Trainings, Webinars, Courses, Badges, and shortcut-only entries
- Shortcut-only entries are included as text records when no downloadable certificate file is exposed by Drive
- Categories were normalized into:
  - Seminars/Webinars
  - Online Courses/Trainings
  - Certifications

## Notes for future updates

- If you want to publish contact information later, add only the details you explicitly approve
- If you want more certificate thumbnails in the future, generate cropped public-safe images that remove identifiers before adding them to the site
