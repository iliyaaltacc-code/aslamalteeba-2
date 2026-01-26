# Customer Memory Layer Documentation

## Overview

The Customer Memory Layer is a frontend-only solution that remembers non-personal user preferences across visits, improving user experience and conversion rates.

## Features

### Persisted Preferences

The system automatically remembers and restores:

1. **Currency Selection** - USD or AED preference
2. **Bulk Mode** - Whether bulk ordering mode is enabled
3. **Brand Filter** - Last selected brand filter in the shop
4. **WhatsApp Usage** - Tracks if user has contacted via WhatsApp
5. **Bulk Quote Requests** - Tracks if user has requested bulk quotes

### Multilingual Support

- Fully implemented across English (`/`), Persian (`/fa/`), and Arabic (`/ar/`)
- Welcome messages translated appropriately
- RTL (Right-to-Left) layout respected for Persian and Arabic

### Welcome Back Message

When a returning user visits the site, a subtle, non-intrusive notification appears:
- **English**: "Welcome back — preferences restored"
- **Persian**: "خوش آمدید — ترجیحات بازیابی شد"
- **Arabic**: "مرحبًا بعودتك — تم استعادة التفضيلات"

The message:
- Appears for 5 seconds then auto-hides
- Shows only once per day
- Uses smooth animations
- Positioned to avoid interfering with site content

## Technical Implementation

### Files

- **`customerMemory.js`** - Core memory layer module
  - Safe localStorage wrapper with fallback
  - Language detection
  - Preference management
  - Welcome message display

- **`index.html`** (English), **`ar/index.html`** (Arabic), **`fa/index.html`** (Persian)
  - Integration with Alpine.js state management
  - Tracking of user interactions
  - Automatic preference restoration

### Storage Keys

All preferences are stored in localStorage with the `aa_` prefix:

```javascript
{
  aa_language: 'en' | 'fa' | 'ar',
  aa_currency: 'USD' | 'AED',
  aa_bulkMode: 'true' | 'false',
  aa_brandFilter: 'Duraturn' | 'Bridgestone' | 'Firemax' | '',
  aa_whatsappUsed: 'true',
  aa_bulkQuoteUsed: 'true',
  aa_welcomeShown: '<date string>' // Resets daily
}
```

### API

The `CustomerMemory` global object provides:

```javascript
// Get/Set preferences
CustomerMemory.getCurrency()
CustomerMemory.setCurrency('AED')
CustomerMemory.getBulkMode()
CustomerMemory.setBulkMode(true)
CustomerMemory.getBrandFilter()
CustomerMemory.setBrandFilter('Duraturn')

// Track usage
CustomerMemory.markWhatsAppUsed()
CustomerMemory.markBulkQuoteUsed()
CustomerMemory.hasUsedWhatsApp()
CustomerMemory.hasUsedBulkQuote()

// Check returning user status
CustomerMemory.isReturningUser()

// Display welcome message
CustomerMemory.showWelcomeBack()

// Reset all preferences
CustomerMemory.resetAll()
```

### Graceful Fallback

If localStorage is unavailable (e.g., private browsing, disabled cookies):
- The system continues to work within the session
- No errors are thrown
- User experience is not disrupted
- Console warnings are logged for debugging

## Privacy & Security

### No Personal Data

The system stores **zero personal information**:
- ❌ No names, emails, phone numbers
- ❌ No IP addresses or location data
- ❌ No browsing history beyond preferences
- ✅ Only non-personal shopping preferences

### Data Stored

All stored data is:
- Anonymous
- Non-identifiable
- Preference-based only
- Easily clearable by user

### User Control

Users can reset preferences:
- Through browser's "Clear Site Data"
- Through developer tools (localStorage.clear())
- System provides `CustomerMemory.resetAll()` API

## UX Design Principles

1. **Subtle** - Welcome message is non-intrusive, auto-hides
2. **Professional** - Clean design matching site aesthetic
3. **Helpful** - Saves user time by remembering preferences
4. **Transparent** - No hidden behavior
5. **Optional** - Works without requiring any user action

## Browser Compatibility

Works in all modern browsers that support:
- localStorage API (IE8+, all modern browsers)
- ES6 JavaScript features
- CSS animations

Fallback behavior for older browsers:
- Preferences work within session
- No persistence across visits
- No errors or broken functionality

## Testing

To test the customer memory layer:

1. **First Visit**
   - Change currency to AED
   - Enable Bulk Mode
   - Select a brand filter (e.g., "Duraturn")
   - Click the WhatsApp button

2. **Reload Page**
   - Currency should be AED
   - Bulk Mode should be enabled
   - Brand filter should be "Duraturn"
   - Welcome message should appear

3. **Clear and Test**
   - Open DevTools → Application → Local Storage
   - Clear `aa_*` keys
   - Reload - should behave as first visit

## Future Enhancements

Potential improvements:
- Remember cart items across sessions
- Track product view history for recommendations
- Remember search queries for quick access
- Export/import preferences feature
- Preference sync across devices (requires backend)

## Support

For issues or questions:
- Check browser console for error messages
- Verify localStorage is enabled in browser
- Test in incognito mode to rule out extensions
- Check `window.CustomerMemory` object exists
