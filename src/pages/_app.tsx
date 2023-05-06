import { Header } from "@/components/Header";
import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ModalProvider>
          <Header />
          <Component {...pageProps} />
        </ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
