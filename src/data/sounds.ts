export type Sound = {
  name: string;
  key: string;
  customId: string | null;
  url: string;
  size: number;
  uploadedAt: string;
};

const AUDIO_BASE_URL =
  process.env.NEXT_PUBLIC_AUDIO_BASE_URL ?? "https://im956ov0mu.ufs.sh/f/";

type SourceSound = Omit<Sound, "url">;

export function formatSoundName(filename: string): string {
  return filename
    .replace(/\.mp3$/i, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getSoundId(filename: string): string {
  return filename.replace(/\.mp3$/i, "");
}

const SOURCE_SOUNDS: SourceSound[] = [
  {
    name: "vine-boom.mp3",
    key: "ef01Q7KyVWPKJEE7N4zmurjYNyD8h5zpiBRE1k6eg9Kbs7tS",
    customId: null,
    size: 99983,
    uploadedAt: "2025-09-01T21:29:26.000Z",
  },
  {
    name: "wet-fart.mp3",
    key: "ef01Q7KyVWPKkOwXf0bPoTFH6N2lw9LbBdCQKqAWcXORDGmE",
    customId: null,
    size: 25748,
    uploadedAt: "2025-09-01T21:29:26.000Z",
  },
  {
    name: "rizz.mp3",
    key: "ef01Q7KyVWPKWKv2edogh21Y3vN0FPbta9QfWeEdkAKxXSzI",
    customId: null,
    size: 77462,
    uploadedAt: "2025-09-01T21:29:26.000Z",
  },
  {
    name: "windows-xp-shutdown.mp3",
    key: "ef01Q7KyVWPKftZvwPIWZfaA7SOWvDJbTKQy3G1p0tCj2rlu",
    customId: null,
    size: 52483,
    uploadedAt: "2025-09-01T21:29:26.000Z",
  },
  {
    name: "miaw-miaw-sad.mp3",
    key: "ef01Q7KyVWPKSqYbH6kyAD4ne3j2NTZ6zbfM91HBSEokpOYG",
    customId: null,
    size: 589440,
    uploadedAt: "2025-09-01T21:29:26.000Z",
  },
  {
    name: "sigma-boy.mp3",
    key: "ef01Q7KyVWPKS6HCoxkyAD4ne3j2NTZ6zbfM91HBSEokpOYG",
    customId: null,
    size: 209660,
    uploadedAt: "2025-09-01T21:29:23.000Z",
  },
  {
    name: "parampara-pratishtha-anushasan.mp3",
    key: "ef01Q7KyVWPKeMjeDUKyVWPKZkaq34UQM6cOF8TYCLBmhsvl",
    customId: null,
    size: 52698,
    uploadedAt: "2025-09-01T21:29:23.000Z",
  },
  {
    name: "man-screaming.mp3",
    key: "ef01Q7KyVWPKmfRNVIQXqwjMYotaQl18Iku2ei7gcVsWbd4E",
    customId: null,
    size: 173037,
    uploadedAt: "2025-09-01T21:29:23.000Z",
  },
  {
    name: "ki-hore-hahaha.mp3",
    key: "ef01Q7KyVWPKZdbGvSiEU7diFPcgHv4faOwK3AmNk90t2C68",
    customId: null,
    size: 46052,
    uploadedAt: "2025-09-01T21:29:03.000Z",
  },
  {
    name: "fart.mp3",
    key: "ef01Q7KyVWPKWQ7cIzogh21Y3vN0FPbta9QfWeEdkAKxXSzI",
    customId: null,
    size: 1690,
    uploadedAt: "2025-09-01T21:29:03.000Z",
  },
  {
    name: "careless-whispers.mp3",
    key: "ef01Q7KyVWPKenRkJmKyVWPKZkaq34UQM6cOF8TYCLBmhsvl",
    customId: null,
    size: 239612,
    uploadedAt: "2025-09-01T21:29:03.000Z",
  },
  {
    name: "fbi-open-up.mp3",
    key: "ef01Q7KyVWPKVZ8YNdyxqHnJRdgfC4SkUL30pTFXKbDZy7AO",
    customId: null,
    size: 113534,
    uploadedAt: "2025-09-01T21:29:03.000Z",
  },
  {
    name: "ab-dekh-tu-puneet-superstar.mp3",
    key: "ef01Q7KyVWPK31xxziGhMLgTqW5DsABdpJQXanjcIulEfwZK",
    customId: null,
    size: 86828,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
  {
    name: "bruh.mp3",
    key: "ef01Q7KyVWPKblEXHiqx2r7mSDs5NzUjKcYQBLAvgPE3yfJ8",
    customId: null,
    size: 14061,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
  {
    name: "and-his-name-is-john-cena.mp3",
    key: "ef01Q7KyVWPK8Wh8WcduyK60dQWbZrVUD8R2NF5JksBj7Sap",
    customId: null,
    size: 114448,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
  {
    name: "abhi-maza-aayega-na-bhidu.mp3",
    key: "ef01Q7KyVWPKmOfOLJQXqwjMYotaQl18Iku2ei7gcVsWbd4E",
    customId: null,
    size: 55196,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
  {
    name: "awkward-cricket-silence.mp3",
    key: "ef01Q7KyVWPK0JgxE6jwj3WuhtVTxPO4monAr2biXEpHKc9N",
    customId: null,
    size: 71817,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
  {
    name: "7-crore-kbc.mp3",
    key: "ef01Q7KyVWPKq4IbMxheumyNDSOxPlMn3cdZB6AHTYEkptbf",
    customId: null,
    size: 29060,
    uploadedAt: "2025-09-01T21:29:02.000Z",
  },
];

export const SOUNDS: readonly Sound[] = SOURCE_SOUNDS.map((s) => ({
  ...s,
  url: `${AUDIO_BASE_URL}${s.key}`,
}));
