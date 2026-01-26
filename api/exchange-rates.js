export const config = {
  runtime: "nodejs",
};

// Simple in-memory cache
let ratesCache = null;
let lastFetch = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check if we have cached rates
    const now = Date.now();
    if (ratesCache && lastFetch && (now - lastFetch) < CACHE_DURATION) {
      return res.status(200).json({
        rates: ratesCache,
        cached: true,
        timestamp: lastFetch
      });
    }

    // Fetch fresh rates from exchangerate-api.com (free tier)
    // Using USD as base currency
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    
    if (!response.ok) {
      throw new Error(`Exchange rate API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Extract only the currencies we need
    const rates = {
      USD: 1, // Base currency
      AED: data.rates.AED || 3.67, // UAE Dirham (fallback to approximate rate)
      IRR: data.rates.IRR || 42000 // Iranian Rial (fallback to approximate rate)
    };

    // Update cache
    ratesCache = rates;
    lastFetch = now;

    return res.status(200).json({
      rates: rates,
      cached: false,
      timestamp: now
    });
  } catch (err) {
    console.error("Exchange rate fetch error:", err);
    
    // Return fallback rates if fetch fails
    const fallbackRates = {
      USD: 1,
      AED: 3.67, // Approximate rate (pegged)
      IRR: 42000 // Approximate rate (varies)
    };
    
    return res.status(200).json({
      rates: fallbackRates,
      cached: false,
      timestamp: Date.now(),
      error: "Using fallback rates"
    });
  }
}
