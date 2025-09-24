import Button from "@mui/material/Button";
import "./../styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="sidebar">
            <h1>Planets from Star Wars</h1>
            <p>
              This is a front-end challenge by <b>Ília</b>
            </p>
            <div className="buttons">
              <Button variant="outlined">Primary</Button>
            </div>
          </div>
          <div className="container">{children}</div>
        </div>
      </body>
    </html>
  );
}
