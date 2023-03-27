import Header from "./components/Header";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variants: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Podcaster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
