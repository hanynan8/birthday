// app/layout.jsx

import "./globals.css";

export const metadata = {
  title: "Happy Birthday Youssef 🎉",
  description: "You are cordially invited to celebrate the wedding of Youssef El-Sayed and Mariam Fouad. Join us for an evening of love, laughter, and cherished memories.",

  icons: {
    // الـ emoji favicon بيتعمل inline في الـ <head> مباشرة عن طريق SVG
    // شوف الـ <head> في RootLayout تحت
  },

  keywords: [
    "wedding invitation",
    "electronic invitation",
    "Youssef Mariam wedding",
    "دعوة إلكترونية",
    "دعوة زفاف",
    "حفل زفاف",
  ].join(", "),

  authors: [{ name: "Youssef & Mariam" }],
  creator: "Wedding Invitation",

  robots: {
    index: false,  // دعوات الأفراح الخاصة ما محتاجة تتأشر في Google
    follow: false,
  },

  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    siteName: "Wedding Invitation",
    title: "You're Invited — Youssef & Mariam",
    description:
      "Join us as we celebrate the beginning of our new life together. An evening of love, laughter, and cherished memories.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Youssef & Mariam Wedding Invitation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Youssef & Mariam",
    description: "Join us for an evening of love, laughter, and cherished memories.",
    images: [
      "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=1200&q=80",
    ],
  },

  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Wedding Invitation",
    "mobile-web-app-capable": "yes",
    "theme-color": "#110b07",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 💍 Emoji Favicon — بيشتغل على كل المتصفحات الحديثة */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎉</text></svg>"
        />
        {/* Apple Touch Icon بديل بسيط */}
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23110b07'/><text y='.9em' font-size='80' x='10'>💍</text></svg>"
        />
        <meta name="theme-color" content="#110b07" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Wedding of Youssef El-Sayed & Mariam Fouad",
              description:
                "You are cordially invited to celebrate the wedding of Youssef El-Sayed and Mariam Fouad.",
              startDate: "2025-08-15T19:00:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Fairmont Nile City",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "2005 Corniche El Nil, Ramlet Beaulac",
                  addressLocality: "Cairo",
                  addressCountry: "EG",
                },
              },
              organizer: {
                "@type": "Person",
                name: "Youssef El-Sayed & Mariam Fouad",
              },
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#110b07" }}>
        {children}
      </body>
    </html>
  );
}