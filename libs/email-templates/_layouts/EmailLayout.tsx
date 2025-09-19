import React from "react";

import { Body, Container, Head, Html, Tailwind } from "@react-email/components"
import Footer from "../_components/Footer"
import Header from "../_components/Header"
import { Font } from "../_components/Font"

type Props = {
  children: React.ReactNode
}

export const EmailLayout = ({ children }: Props) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            confirmButton: "#393CE5",
            lightGray: "#595959",
            trueGray: "#262626",
          },
        },
        screens: {
          xs: "411px", 
        },
      },
    }}
  >
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container className="mx-auto px-4">
        <Header />
        <Body className="mx-auto">{children}</Body>
        <Footer />
      </Container>
    </Html>
  </Tailwind>
)

export default EmailLayout
