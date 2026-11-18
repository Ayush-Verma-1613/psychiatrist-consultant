/**
 * Centralised photography manifest.
 * Every URL below was verified to resolve (HTTP 200) against images.unsplash.com.
 * Keeping them in one place makes it easy to swap in brand photography later.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

type Crop = { w: number; h: number };

function unsplash(id: string, { w, h }: Crop) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&crop=faces,entropy&w=${w}&h=${h}&q=80`;
}

export const PORTRAIT: Crop = { w: 900, h: 1200 };
export const LANDSCAPE: Crop = { w: 1200, h: 800 };
export const SQUARE: Crop = { w: 900, h: 900 };
export const WIDE: Crop = { w: 1400, h: 900 };

export const images = {
  hero: unsplash("1573497019940-1c28c88b4f3e", { w: 1000, h: 1250 }),
  aboutPrimary: unsplash("1604881991720-f91add269bed", { w: 900, h: 1150 }),
  aboutSecondary: unsplash("1631217868264-e5b90bb7e133", { w: 800, h: 600 }),
  online: unsplash("1598257006458-087169a1f08d", WIDE),
  doctors: {
    ananya: unsplash("1651008376811-b90baee60c1f", PORTRAIT),
    rohan: unsplash("1612349317150-e413f6a5b16d", PORTRAIT),
    sara: unsplash("1594824476967-48c8b964273f", PORTRAIT),
    daniel: unsplash("1622253692010-333f2da6031d", PORTRAIT),
  },
  articles: {
    anxiety: unsplash("1544027993-37dbfe43562a", LANDSCAPE),
    stress: unsplash("1516534775068-ba3e7458af70", LANDSCAPE),
    depression: unsplash("1447752875215-b2761acb3c5d", LANDSCAPE),
    sleep: unsplash("1520206183501-b80df61043c2", LANDSCAPE),
    stigma: unsplash("1499209974431-9dddcece7f88", LANDSCAPE),
    consult: unsplash("1518495973542-4542c06a5843", LANDSCAPE),
  },
} as const;

/**
 * Tiny inline SVG used as the blur placeholder for every remote photograph,
 * so images fade in from the brand sage tone instead of flashing white.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><filter id="b"><feGaussianBlur stdDeviation="2"/></filter><rect width="8" height="8" fill="#EEF4F1" filter="url(#b)"/></svg>`
  ).toString("base64");
