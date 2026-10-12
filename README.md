# GeoMine Machinery & Telemetry Management

## Overview

Vue application for inspection summaries and telemetry registration.

## Authorship

Albino Caceres — U201923820.

Private repository URL: pending; no repository URL was provided.

## Run the project

```powershell
npm install vue@^3.5.43 vue-router@^5.3.1 pinia@^4.0.3 axios@^1.20.0 vue-i18n@^11.4.12 primevue@^5.0.1 @primeuix/themes@^3.0.1 primeflex@^4.0.0 primeicons@^8.0.1
npm install -D @vitejs/plugin-vue@^6.0.8 vite@^8.3.0 json-server@0.17.4
npm run server
npm run dev
```

Run the server and application commands in separate terminals.

The supplied data lacked telemetry operatingHours and inspection maxOperatingHours; server/db.json adds sample values for these fields.

Set VITE_LOGO_PUBLIC_KEY in .env to your Logo.dev publishable key to display the company logo.
