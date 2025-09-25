import "./../styles/globals.scss";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Planets of Star Wars</title>
      </head>
      <body>
        <div className="container">
          <div className="sidebar">
            <h1>Planets from Star Wars</h1>
            <small>
              Dive into the rich and diverse worlds of the Star Wars galaxy. Our
              website offers detailed information on every known planet, from
              the desert landscapes of Tatooine to the icy plains of Hoth.
              Discover key attributes such as climate, terrain, population, and
              more. Each planet page also highlights the films in which it
              appears, giving you a complete view of its role in the saga.
              <br />
              <br />
            </small>
            <Image
              src="/starwars2.gif"
              alt="Decoration gif of starwars"
              width={200}
              height={200}
              unoptimized
            />
          </div>
          <div className="container">{children}</div>
        </div>
      </body>
    </html>
  );
}
