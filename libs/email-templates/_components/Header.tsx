import React from "react";

import { Column, Img, Link, Row, Section } from "@react-email/components"

const baseUrl = "https://d2j3c5xsiu45mh.cloudfront.net/images"

export const Header = () => (
  <div className="py-10">
    <Section>
      <Row className="block">
        <Column style={{ width: "66%" }}>
          <Img
            src={`${baseUrl}/static/docmap-logo.png`}
            width={111}
            height={33}
          />
        </Column>
        <Column>
          <Section>
            <Row>
              <Column>
                <Link target="_blank" href="https://x.com/">
                  <Img
                    src={`${baseUrl}/static/twitter-logo.png`}
                    width={24}
                    height={24}
                    className="cursor-pointer ml-24"
                  />
                </Link>
              </Column>
              <Column>
                <Link target="_blank" href="https://www.facebook.com/">
                  <Img
                    src={`${baseUrl}/static/facebook-logo.png`}
                    width={24}
                    height={24}
                    className="cursor-pointer ml-6"
                  />
                </Link>
              </Column>
              <Column>
                <Link target="_blank" href="https://www.instagram.com/">
                  <Img
                    src={`${baseUrl}/static/instagram-logo.png`}
                    width={24}
                    height={24}
                    className="cursor-pointer ml-6"
                  />
                </Link>
              </Column>
            </Row>
          </Section>
        </Column>
      </Row>
    </Section>
  </div>
)

export default Header