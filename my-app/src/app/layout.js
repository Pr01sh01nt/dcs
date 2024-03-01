


import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";

import { AuthContextProvider } from "@/context/AuthContext";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {


  return (
    <html lang="en">
        <title>Learning Note</title>
      <body className={inter.className}>
   
   
        <AuthContextProvider>

          <NavBar/>
          {children}

        </AuthContextProvider>
        <Footer/>
        
        
        </body>

    </html>
  );
}
