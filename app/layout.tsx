// app/layout.tsx
export const metadata = {
  title: "FarGarden",
  description: "Mini farming game integrated with Farcaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster meta tag */}
        <meta
          name="fc:frame"
          content='{"version": "1", "imageUrl": "https://fargarden.vercel.app/splash.png"}'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
