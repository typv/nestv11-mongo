import React from 'react';

import { Column, Img, Link, Row, Section, Text } from '@react-email/components';

const baseUrl = 'https://d2j3c5xsiu45mh.cloudfront.net/images';

const contactItems = [
  { icon: 'mail-icon.png', value: 'company@example.com' },
  { icon: 'global-icon.png', value: 'aeadipisicingenimc.com' },
  { icon: 'phone-icon.png', value: '+71 93847 098' },
  { icon: 'environment-icon.png', value: '4 Golden Road, NY' },
];

export const Footer = () => (
  <div className="m-0 mb-6 pt-6">
    <Text className="text-lightGray leading-6 text-base mt-0 mb-6">
      Didn’t sign up for Docmap? No worries - just ignore this email!
    </Text>
    <Section>
      <Row className="block mb-6">
        <Column>
          <Section>
            <Row>
              <Column>
                <Link target="_blank" href="https://play.google.com/">
                  <Img
                    src={`${baseUrl}/static/google-play-badge.png`}
                    alt="GooglePlay"
                    width={107}
                    height={32}
                    className="cursor-pointer mr-[10px]"
                  />
                </Link>
              </Column>
              <Column>
                <Link
                  target="_blank"
                  href="https://www.apple.com/vn/app-store/"
                >
                  <Img
                    src={`${baseUrl}/static/app-store-badge.png`}
                    alt="AppStore"
                    width={125}
                    height={32}
                    className="cursor-pointer"
                  />
                </Link>
              </Column>
            </Row>
          </Section>
        </Column>
      </Row>
    </Section>
    <div
      className="box-border bg-[url(https://d2j3c5xsiu45mh.cloudfront.net/images/static/footer-banner.png)] pt-6 pb-6 w-full rounded-xl h-[180px] bg-cover bg-[center_left_1px]">
      <Row className="block">
        <Column style={{ width: '90%' }}>
          <div className="pl-6 text-white pb-5">
            <div className="font-medium leading-6 text-base">Docmap Team</div>
            <div className="text-xs leading-5 opacity-60 mb-2">
              @2025 Docmap, Inc. All rights reserved
            </div>
            {contactItems.map((item, index) => (
              <div key={index} className="text-xs leading-5">
                <Img
                  src={`${baseUrl}/static/${item.icon}`}
                  alt="DocMapIcon"
                  className="h-3 align-middle inline-block mr-1"
                />
                <div className="align-middle inline-block text-white">
                  <a className="text-white no-underline">{item.value}</a>
                </div>
              </div>
            ))}
          </div>
        </Column>
      </Row>
    </div>
  </div>
);

export default Footer;
