// app/fonts.ts
import { Google_Sans_Flex } from 'next/font/google';

export const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans',
  // Google Sans Flex is a variable font — no discrete weight needed,
  // the axis covers 100–900 automatically.
  // adjustFontFallback must stay false: this font is NOT in Next.js's
  // capsize-font-metrics.json internal database (it's too new/niche),
  // so Next.js cannot compute size-adjust values for it.
  // The warning "Failed to find font override values" is logged by an
  // internal lookup step that runs before this option is fully applied
  // in some Next.js versions — it is informational only and harmless.
  adjustFontFallback: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});
