// Define the structure for a single article
export interface Article {
  slug: string; // The URL path to the article, e.g., /blog/my-first-post
  title: string;
  description: string;
  keywords: string[]; // Add relevant keywords for better search matching
}

// Populate this array with your actual articles
export const knowledgeBase: Article[] = [
  {
    slug: '/blog/inside-the-architecture-of-high-frequency-trading-(HFT)-systems',
    title: 'Inside the Architecture of High-Frequency Trading (HFT) Systems',
    description: 'Unveiling the ultra-fast world of high-frequency trading — where every microsecond counts and systems are engineered for extreme speed.',
    keywords: [ 'build trading app', 'trading system', 'Architecture to trading system'],
  },
  {
    slug: '/advanced/trusted-execution-environment-tee-and-apple-secure-enclave',
    title: 'Trusted Execution Environment (TEE)',
    description: 'Trusted Execution Environment (TEE) is a secure area in a device’s processor that protects sensitive data and computations from the main OS. Apple’s Secure Enclave is a TEE that securely handles encryption, biometrics, and DRM.',
    keywords: ['tee', 'how ott secure videos', 'content protection from piracy'],
  },
  {
    slug: '/advanced/atomicity-in-programming',
    title: 'Atomicity in Programming',
    description: 'Atomicity in programming ensures operations complete entirely or not at all, preventing partial updates and protecting data integrity.',
    keywords: ['atomic programming', 'Atomicity', 'golang', 'go'],
  },
  // ... add all your other articles here
];