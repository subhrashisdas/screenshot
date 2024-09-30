# Screenshot API

This API captures webpage screenshots using Puppeteer.

## Setup

1. **Clone the repository:**
   ```bash
   export CHROMIUM_PATH=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
   git clone https://github.com/subhrashisdas/screenshot.git
   cd screenshot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Access the API:**
   - Visit: `http://localhost:3000`

## API Endpoint

### `GET /:url.:path`

- **Parameters:**
  - `url`: Base64 encoded webpage URL.
  - `path`: Image format (`png` or `jpeg`).
