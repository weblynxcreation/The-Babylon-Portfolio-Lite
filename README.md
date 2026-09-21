# The Babylon Portfolio Lite - Capital Rift Market Pilot

A Chrome extension for unified Item Market & Stock Market trading with portfolio analytics. Features auto/manual trading modes with a Quest Trade-inspired 8-bit retro UI.

![The Babylon Portfolio](icons/brand-logo.png)

> **Lite edition** — everything the Premium edition has except the Discord webhook integration. Trades, orders, and IPO activity are still detected and logged locally in the History tab; nothing is sent to Discord.

## Features

### Portfolio Management
- **Real-time Portfolio Value** - Track your total holdings value with 24h progress indicators
- **Holdings Overview** - View all owned shares with current prices and yields
- **Dividend Tracking** - Monitor expected annual dividends from your portfolio
- **Portfolio Value Chart** - Visualize portfolio performance over time (1H, 24H timeframes)
- **Search & Filter** - Quickly find any company in the Overview and Holdings tables

### Trading
- **Unified Trade Panel** - Buy and sell shares with custom price inputs
- **Order Book** - View live bids and asks with spread information
- **Order Management** - Track open orders and cancel pending trades
- **Transaction History** - Complete log of all your trades, including shares and IPO bids

### Analytics
- **Advanced Analytics** - Deep dive into market data with interactive charts
- **Multiple Timeframes** - Analyze trends across 1H and 24H periods
- **Company Details** - Comprehensive view of each company's performance
- **Spark Data Visualization** - Historical price movements at a glance

### Market Access
- **IPO Panel** - Participate in initial public offerings
- **Market Overview** - Sortable table of all available companies
- **Filter Options** - Sort by value, yield, price, and more

### UI/UX
- **Retro 8-bit Design** - Quest Trade-inspired pixel art aesthetic
- **Responsive Layout** - Optimized for 800x600 popup and full browser tab
- **Toast Notifications** - Real-time feedback on all actions
- **Smooth Animations** - Polished transitions and interactions

### Remote Access
- **Mobile Portfolio Viewer** - Access your portfolio from any device via hosted URL
- **Vercel Serverless API** - Secure data relay with token authentication
- **Auto-Sync** - Portfolio data automatically syncs when fetched in extension
- **Auto-Refresh** - Remote viewer updates every 60 seconds

## Installation

### From Source

1. Extract the downloaded ZIP to a permanent folder (Chrome loads the extension from disk, so do not delete it afterwards), or clone the repository:

   ```bash
   git clone https://github.com/weblynxcreation/The-Babylon-Portfolio-Final.git
   ```

2. Open Chrome (or any Chromium browser) and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the extracted extension directory

5. The Babylon Portfolio icon should appear in your browser toolbar

### Loading the Extension

- Click the extension icon to open the popup (800x600)
- Click **⤢ Full Tab** to open in a full browser window for expanded view

## Usage

### Getting Started

1. **Navigate to Capital Rift** - Visit `https://play.capitalrift.com/`
2. **Open the Extension** - Click the Babylon Portfolio icon in your toolbar
3. **View Overview** - See your portfolio summary and top holdings

### Trading Shares

1. Go to the **Trade** tab
2. Select a company from the dropdown
3. Enter your desired price and quantity
4. Click **Buy** or **Sell**
5. Confirm the transaction

### Managing Orders

1. Navigate to the **Orders** tab
2. View all open orders
3. Click **Cancel** to remove pending orders

### Analyzing Performance

1. Open **Advanced Analytics** tab
2. Select a company to analyze
3. Choose timeframe (1H or 24H)
4. Review price charts and metrics

### Portfolio Chart

1. Go to **Holdings** tab
2. View the Portfolio Value chart at the top
3. Toggle between 1H and 24H timeframes
4. Monitor the progress indicator for performance trends

### Remote Access Setup

1. Deploy the remote viewer project (see [Remote Viewer Deployment](#remote-viewer-deployment))
2. Set up Vercel KV database in your project dashboard
3. Go to **Settings** tab in the extension
4. Enter your deployed Vercel URL in the **Remote API URL** field
5. Enable **Remote Access** — a secure token will be created
6. Copy the generated link and open it on any device

## Technical Details

### Architecture

- **Manifest V3** - Modern Chrome extension architecture
- **Service Worker** - Background script for API communication
- **Content Scripts** - Injected into Capital Rift for data access
- **Popup UI** - Main interface with modular panels

### Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Lightweight Charts by TradingView
- **Fonts**: Press Start 2P, JetBrains Mono, Inter
- **API**: Capital Rift Game API

### Permissions

- `storage` - Save user preferences and cached data
- `scripting` - Execute content scripts
- `activeTab` - Access current tab
- `alarms` - Schedule periodic data refresh
- `notifications` - Display trade confirmations
- `tabs` - Open full tab mode
- Host access to `play.capitalrift.com` (game API) and `*.vercel.app` (remote viewer)

### API Integration

The extension communicates with Capital Rift's API:
- `/api/me` - Player authentication and ID
- `/api/companies` - Market data and spark prices
- `/api/holdings` - Portfolio holdings
- `/api/orders` - Order management
- `/api/transactions` - Trade history
- `/api/dividends` - Dividend tracking

## Development

### Project Structure

```
The-Babylon-Portfolio-Lite/
├── manifest.json          # Extension manifest
├── popup.html             # Main UI (styles embedded)
├── popup.js               # Popup logic
├── background.js          # Service worker
├── content.js             # Content script
├── inject.js              # Page-context API bridge
├── remote.html            # Mobile portfolio viewer page
├── icons/                 # Extension icons
│   ├── brand-logo.png
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
├── screenshots/           # Feature screenshots
├── lib/                   # Third-party libraries
│   └── lightweight-charts.standalone.production.js
└── LICENSE
```

### Remote Viewer Deployment

The remote portfolio viewer is a separate Vercel project. The packaged `remote.html` is the mobile-friendly viewer page:

```
babylon-remote/
├── api/
│   ├── portfolio.js      # GET/POST portfolio data (Edge runtime)
│   └── auth.js           # Token generation/validation
├── public/
│   └── remote.html       # Mobile-friendly portfolio viewer
├── package.json
├── vercel.json           # Rewrites and CORS config
├── deploy.bat            # Windows deployment script
└── setup-token.bat       # Token setup instructions
```

**Deploy steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `deploy.bat` in the `babylon-remote` directory
3. Enable Vercel KV in your project dashboard
4. Enter the deployed URL in the extension settings

### Key Files

- **popup.html** - Complete UI with embedded CSS
- **popup.js** - All popup logic, API calls, and chart rendering
- **background.js** - Service worker handling API proxy, message routing, and activity detection
- **content.js** - Injected script for page interaction
- **inject.js** - Page-context bridge for reading authenticated game data

### Building

No build step required - the extension runs directly from source.

### Testing

1. Load the extension in Chrome
2. Navigate to Capital Rift
3. Test each tab and feature
4. Verify API calls in Chrome DevTools

## Screenshots

### Overview Tab
Real-time portfolio summary with sortable company table
![Overview Tab](screenshots/overview-tab.png)

### Holdings & Portfolio Chart
Track your holdings with interactive portfolio value chart
![Holdings Tab](screenshots/holdings-tab.png)

### Advanced Analytics
Candlestick charts and detailed market analysis
![Advanced Analytics](screenshots/advanced-analytics.png)

### Company Detail Overlay
Deep dive into individual companies with order book and quick trade
![Company Detail](screenshots/company-detail.png)

## Known Limitations

- **Spark Data**: API returns limited historical data (~24-72 points), restricting chart timeframes to 1H and 24H
- **Popup Size**: Fixed 800x600 dimensions for optimal display (use Full Tab mode for larger view)
- **API Rate Limits**: Respect Capital Rift's API rate limits to avoid throttling
- **Remote Viewer**: Requires Vercel deployment and KV database setup
- **No Discord Integration**: This build does not include webhook alerts or Discord exports — see the Premium edition for those

## Future Enhancements

- [ ] Extended timeframe support (7D, 30D) when API allows
- [ ] Automated trading strategies
- [ ] Price alerts and notifications
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is an unofficial tool for Capital Rift. It is not affiliated with or endorsed by the Capital Rift development team. Use at your own risk. The extension is designed for educational and portfolio tracking purposes.

## Acknowledgments

- **Capital Rift** - The game that inspired this tool
- **TradingView** - Lightweight Charts library
- **Quest Trade** - UI design inspiration

---

Built with passion for portfolio management and retro gaming aesthetics.
