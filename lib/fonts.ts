import { JetBrains_Mono as FontMono, Instrument_Serif as FontSerif } from "next/font/google"
import { GeistSans } from "geist/font/sans"

export const fontSans = GeistSans

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Editorial display serif used for hero moments, big pull quotes, and
// oversized numerals. Instrument Serif was chosen for its high-contrast
// strokes and readable italic that reads confidently at 8rem+.
export const fontSerif = FontSerif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
