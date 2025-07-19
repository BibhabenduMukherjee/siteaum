// This is the dedicated layout for the chat page.
// It does NOT include the main site's header or footer.

// Make sure to import the global CSS and syntax highlighting theme here as well.
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Providers } from '@/components/providers';

export const metadata = {
  title: 'Codeaum Assistant',
  description: 'Chat with the Codeaum AI assistant.',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* This layout only renders its children, nothing else. */}
        <Providers>
        <SiteHeader />
        </Providers>
        {children}
      </body>
    </html>
  );
}