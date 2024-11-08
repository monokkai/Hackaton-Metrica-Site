import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider>
      <AnimatePresence initial={true}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ChakraProvider>
  );
};
export default Website;
