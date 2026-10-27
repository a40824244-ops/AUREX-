# AUREX Haute Parfumerie

React and Vite frontend for the AUREX luxury perfume store. The storefront
connects to the hosted FastAPI backend at
`https://aurexb-9ec42955.fastapicloud.dev/api` by default.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`.

To use a different backend, set `VITE_API_BASE_URL` in a local `.env` file to
the API base URL, including `/api`. Example:

```env
VITE_API_BASE_URL=https://aurexb-9ec42955.fastapicloud.dev/api
```

## Build and lint

```powershell
npm run build
npm run lint
```

## Deployment

Deploy the generated `dist` directory using a static-site host. Set
`VITE_API_BASE_URL` to the deployed API base URL when it differs from the
default. The backend must allow the deployed site origin in its CORS settings.
The API documentation is available at
`https://aurexb-9ec42955.fastapicloud.dev/docs`.
