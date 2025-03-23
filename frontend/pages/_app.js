import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
import Teams from './components/Teams';

<Route path="/teams" element={<Teams />} />

import CashOut from './components/CashOut';

// In your router configuration
<Route path="/cashout" element={<CashOut />} />
