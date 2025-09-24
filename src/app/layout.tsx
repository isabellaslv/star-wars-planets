import "./../styles/globals.scss";
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <div className="container">
          <div className="sidebar">
            <h1>Planets from Star Wars</h1>
            <p>
              This is a front-end challenge by <b>Ília</b>
            </p>
          </div>
          <div className="container">{children}</div>
        </div>
      </body>
    </html>
  );
}
