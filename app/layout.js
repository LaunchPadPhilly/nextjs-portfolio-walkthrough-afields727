import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Aaron Fields | Portfolio",
  description: "Personal portfolio for Aaron Fields",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
