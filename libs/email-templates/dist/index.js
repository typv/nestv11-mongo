'use strict';

var components = require('@react-email/components');
var jsxRuntime = require('react/jsx-runtime');

// index.tsx
var baseUrl = "https://d2j3c5xsiu45mh.cloudfront.net/images";
var contactItems = [
  { icon: "mail-icon.png", value: "company@example.com" },
  { icon: "global-icon.png", value: "aeadipisicingenimc.com" },
  { icon: "phone-icon.png", value: "+71 93847 098" },
  { icon: "environment-icon.png", value: "4 Golden Road, NY" }
];
var Footer = () => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "m-0 mb-6 pt-6", children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-lightGray leading-6 text-base mt-0 mb-6", children: "Didn\u2019t sign up for Docmap? No worries - just ignore this email!" }),
  /* @__PURE__ */ jsxRuntime.jsx(components.Section, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Row, { className: "block mb-6", children: /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Section, { children: /* @__PURE__ */ jsxRuntime.jsxs(components.Row, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Link, { target: "_blank", href: "https://play.google.com/", children: /* @__PURE__ */ jsxRuntime.jsx(
      components.Img,
      {
        src: `${baseUrl}/static/google-play-badge.png`,
        alt: "GooglePlay",
        width: 107,
        height: 32,
        className: "cursor-pointer mr-[10px]"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(
      components.Link,
      {
        target: "_blank",
        href: "https://www.apple.com/vn/app-store/",
        children: /* @__PURE__ */ jsxRuntime.jsx(
          components.Img,
          {
            src: `${baseUrl}/static/app-store-badge.png`,
            alt: "AppStore",
            width: 125,
            height: 32,
            className: "cursor-pointer"
          }
        )
      }
    ) })
  ] }) }) }) }) }),
  /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "box-border bg-[url(https://d2j3c5xsiu45mh.cloudfront.net/images/static/footer-banner.png)] pt-6 pb-6 w-full rounded-xl h-[180px] bg-cover bg-[center_left_1px]",
      children: /* @__PURE__ */ jsxRuntime.jsx(components.Row, { className: "block", children: /* @__PURE__ */ jsxRuntime.jsx(components.Column, { style: { width: "90%" }, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pl-6 text-white pb-5", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium leading-6 text-base", children: "Docmap Team" }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs leading-5 opacity-60 mb-2", children: "@2025 Docmap, Inc. All rights reserved" }),
        contactItems.map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs leading-5", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            components.Img,
            {
              src: `${baseUrl}/static/${item.icon}`,
              alt: "DocMapIcon",
              className: "h-3 align-middle inline-block mr-1"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "align-middle inline-block text-white", children: /* @__PURE__ */ jsxRuntime.jsx("a", { className: "text-white no-underline", children: item.value }) })
        ] }, index))
      ] }) }) })
    }
  )
] });
var Footer_default = Footer;
var baseUrl2 = "https://d2j3c5xsiu45mh.cloudfront.net/images";
var Header = () => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxRuntime.jsx(components.Section, { children: /* @__PURE__ */ jsxRuntime.jsxs(components.Row, { className: "block", children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Column, { style: { width: "66%" }, children: /* @__PURE__ */ jsxRuntime.jsx(
    components.Img,
    {
      src: `${baseUrl2}/static/docmap-logo.png`,
      width: 111,
      height: 33
    }
  ) }),
  /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Section, { children: /* @__PURE__ */ jsxRuntime.jsxs(components.Row, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Link, { target: "_blank", href: "https://x.com/", children: /* @__PURE__ */ jsxRuntime.jsx(
      components.Img,
      {
        src: `${baseUrl2}/static/twitter-logo.png`,
        width: 24,
        height: 24,
        className: "cursor-pointer ml-24"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Link, { target: "_blank", href: "https://www.facebook.com/", children: /* @__PURE__ */ jsxRuntime.jsx(
      components.Img,
      {
        src: `${baseUrl2}/static/facebook-logo.png`,
        width: 24,
        height: 24,
        className: "cursor-pointer ml-6"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Column, { children: /* @__PURE__ */ jsxRuntime.jsx(components.Link, { target: "_blank", href: "https://www.instagram.com/", children: /* @__PURE__ */ jsxRuntime.jsx(
      components.Img,
      {
        src: `${baseUrl2}/static/instagram-logo.png`,
        width: 24,
        height: 24,
        className: "cursor-pointer ml-6"
      }
    ) }) })
  ] }) }) })
] }) }) });
var Header_default = Header;
var Font = ({
  webFont,
  fontStyle = "normal",
  fontFamily = "",
  fontWeight = 400,
  fallbackFontFamily = ""
}) => {
  const src = webFont ? `src: url(${webFont.url}) format(${webFont.format});` : "";
  return /* @__PURE__ */ jsxRuntime.jsx("style", { children: `
            @font-face {
                font-style: ${fontStyle};
                font-family: ${fontFamily};
                font-weight: ${fontWeight};
                mso-font-alt: ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily};
                ${src}
            }

            * {
                font-family: ${fontFamily}, ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(", ") : fallbackFontFamily};
            }
            ` });
};
var EmailLayout = ({ children }) => /* @__PURE__ */ jsxRuntime.jsx(
  components.Tailwind,
  {
    config: {
      theme: {
        extend: {
          colors: {
            confirmButton: "#393CE5",
            lightGray: "#595959",
            trueGray: "#262626"
          }
        },
        screens: {
          xs: "411px"
        }
      }
    },
    children: /* @__PURE__ */ jsxRuntime.jsxs(components.Html, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(components.Head, { children: /* @__PURE__ */ jsxRuntime.jsx(
        Font,
        {
          fontFamily: "Roboto",
          fallbackFontFamily: "Verdana",
          webFont: {
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2"
          },
          fontWeight: 400,
          fontStyle: "normal"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsxs(components.Container, { className: "mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Header_default, {}),
        /* @__PURE__ */ jsxRuntime.jsx(components.Body, { className: "mx-auto", children }),
        /* @__PURE__ */ jsxRuntime.jsx(Footer_default, {})
      ] })
    ] })
  }
);
var EmailLayout_default = EmailLayout;
var ResetYourPasswordEmail = ({
  name = "[User Name]",
  resetPasswordUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Click to reset your password. Link expires in 30 minutes." }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Forgot Your Password? Let\u2019s Reset It!" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "It looks like you requested a password reset for your",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "Docmap" }),
      " account."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "To reset your password, click the button below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[171px] h-8 rounded-md mb-6 text-center leading-8",
        href: resetPasswordUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Reset my password" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 my-0 text-trueGray", children: [
      "For your security, this link will expire in",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "30 minutes" }),
      ". Please click the button before it expires."
    ] })
  ] }) })
] });
var VerifyEmailAddressEmail = ({
  name = "[User Name]",
  verifyUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Please confirm your email within 30 minutes to activate your DocMap account" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Verify Your Email Address" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We just want to make sure it's you \u{1F60A}" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Click the button below to confirm your email address and get started with ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "Docmap" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-40 h-8 rounded-md mb-6 text-center leading-8",
        href: verifyUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Confirm my email" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 my-0 text-trueGray", children: [
      "For your security, this link will expire in",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "30 minutes" }),
      ". Please click the button before it expires."
    ] })
  ] }) })
] });
var ReminderEmail = ({
  verifyUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Please confirm your email within 30 minutes to activate your DocMap account" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Oh no, you missed a step!" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "To complete your sign-up and get started with Docmap, just click the button below to confirm your email address" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm leading-6 w-40 h-8 rounded-md mb-6 text-center leading-8",
        href: verifyUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Confirm my email" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 my-0 text-trueGray", children: [
      "For your security, this link will expire in",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "30 minutes" }),
      ". Please click the button before it expires."
    ] })
  ] }) })
] });
var PasswordUpdatedEmail = ({
  name = "[User Name]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your password was successfully updated. Contact support if this wasn\u2019t you." }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your Password Has Been Successfully Changed" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We wanted to let you know that your password has been successfully updated." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you did not make this change or if you have any concerns, please contact our support team immediately." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "To keep your account secure, make sure your new password is unique and not shared with anyone." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions, feel free to reach out!" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 my-0", children: "Thank you," })
  ] }) })
] });
var ApprovePractitionerEmail = ({
  name = "[User Name]",
  practitionerName = "[Practitioner Name]",
  verifyUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your practitioner profile has been approved" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your practitioner profile has been approved" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Great news! The practitioner profile",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      " has been approved by our admin team."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "You can now manage the profile details, update availability, and list it on the marketplace for patient bookings." }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[180px] h-8 rounded-md mb-6 text-center leading-8",
        href: verifyUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Go to Manage Profile" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or need assistance, feel free to contact us." })
  ] }) })
] });
var ReturnedPractitionerEmail = ({
  name = "[User Name]",
  practitionerName = "[Practitioner Name]",
  verifyUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your practitioner profile has been returned" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your practitioner profile has been returned" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Thank you for submitting the practitioner profile",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "After reviewing the information provided, we found that some details need to be corrected or completed before we can proceed with approval." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "You can update the profile and resubmit it for approval by clicking the link below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[180px] h-8 rounded-md mb-6 text-center leading-8",
        href: verifyUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Go to Manage Profile" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or need assistance, feel free to contact us." })
  ] }) })
] });
var DeletedProfileEmail = ({
  name = "[User Name]",
  fullName = "[Full Name]",
  verifyUrl = "https://www.google.com/",
  deletedOn = "[Date / Time]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout_default, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Profile has been successfully deleted" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Profile has been successfully deleted" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: name }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We\u2019re writing to confirm that the following profile has been successfully deleted from your account:" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Profile Name: ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: fullName }),
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "Deleted on: ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: deletedOn })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "This action is permanent and the profile is no longer accessible." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If this was done in error, please contact our admin team as soon as possible." }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[180px] h-8 rounded-md text-center leading-8",
        href: verifyUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Contact our Admin" })
      }
    )
  ] }) })
] });

// utils/index.ts
var extractDate = (str) => str.split(", ").slice(1).join(", ");
var CreateAppointmentPatientEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  supportEmail = "support@docmap.com",
  feeSuffix = "$"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Appointment Confirmed with ",
    practitionerName,
    " on",
    " ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Appointment Confirmed with ",
      practitionerName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Your appointment has been successfully booked. Below are the details of your visit:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      clinicName && /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7 mb-[2px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Clinic:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: clinicName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from You" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "If you need to make any changes to your appointment, please log into your account or contact us at",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-[#1890FF]", children: supportEmail }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for choosing DocMap. We look forward to seeing you soon!" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var CreateAppointmentPractitionerEmail = ({
  practitionerName = "[Practitioner Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  feeSuffix = "$",
  patientType = "New",
  bookedBy = "Patient"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "New Appointment Scheduled with ",
    patientName,
    " on",
    " ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "New Appointment Scheduled with ",
      patientName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "A new appointment has been scheduled. Below are the details:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Patient Information" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Type:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientType })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Booked By:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: bookedBy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from Patient" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var CreateAppointmentClinicEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  feeSuffix = "$",
  patientType = "New",
  bookedBy = "Patient"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "New Appointment Scheduled with ",
    patientName,
    " on",
    " ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "New Appointment Scheduled with ",
      patientName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: clinicName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "A new appointment has been scheduled. Below are the details:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Patient Information" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Type:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientType })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Booked By:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: bookedBy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from Patient" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var UpdateAppointmentPatientEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  supportEmail = "support@docmap.com",
  feeSuffix = "$"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Appointment Updated with ",
    practitionerName,
    " on",
    " ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Appointment Updated with ",
      practitionerName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Your appointment has been successfully updated. Please review your updated details below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Clinic:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: clinicName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from You" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "If this update was unexpected or incorrect, please log into your account or contact us at",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-[#1890FF]", children: supportEmail }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for choosing DocMap. We look forward to seeing you soon!" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var UpdateAppointmentPractitionerEmail = ({
  practitionerName = "[Practitioner Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  feeSuffix = "$",
  patientType = "New",
  bookedBy = "Patient"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Appointment Updated with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Appointment Updated with ",
      patientName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "The appointment with the following patient has been updated:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Patient Information" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Type:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientType })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Booked By:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: bookedBy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from Patient" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var UpdateAppointmentClinicEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  feeAmount = "[Fee Amount]",
  discountAmount = "[Discount Amount]",
  total = "[Total]",
  patientNote = "[Patient Note]",
  feeSuffix = "$",
  patientType = "New",
  bookedBy = "Patient"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Appointment Updated with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Appointment Updated with ",
      patientName,
      " on",
      " ",
      extractDate(appointmentDate)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: clinicName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "The appointment with the following patient has been updated:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Patient Information" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Type:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientType })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Booked By:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: bookedBy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Booking Summary" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          feeAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Discount Applied:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          "-",
          feeSuffix,
          discountAmount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          feeSuffix,
          total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Note from Patient" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 -mt-2", children: patientNote }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var PatientCancelAppointmentPatientEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    practitionerName,
    " on ",
    extractDate(appointmentDate),
    " ",
    "Has Been Canceled."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      practitionerName,
      " on",
      " ",
      extractDate(appointmentDate),
      " Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "This is to confirm that your appointment has been successfully canceled. Below are the details:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Clinic:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: clinicName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If this cancellation was made in error, you can easily rebook your appointment by logging into your DocMap account." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for using DocMap. We hope to serve you again soon." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var PractitionerCancelAppointmentPatientEmail = ({
  practitionerName = "[Practitioner Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    " Has Been Canceled"
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      patientName,
      " on ",
      extractDate(appointmentDate),
      " ",
      "Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please be advised that the following appointment has been canceled:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var ClinicCancelAppointmentPatientEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    " Has Been Canceled"
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      patientName,
      " on ",
      extractDate(appointmentDate),
      " ",
      "Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: clinicName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please be advised that the following appointment has been canceled:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "If you have any questions or notes for the patient, please log into your DocMap account and contact the patient via inbox." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for providing care through DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var PatientCancelAppointmentPractitionerEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "[Appointment Date]",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    practitionerName,
    " on ",
    appointmentDate,
    " Has Been Canceled."
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      practitionerName,
      " on ",
      appointmentDate,
      " Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "We regret to inform you that your upcoming appointment with",
      " ",
      practitionerName,
      " has been canceled by the practitioner. Please find the details below:"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Clinic:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: clinicName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We apologize for the inconvenience caused. You can rebook your appointment or find another practitioner by logging into your DocMap account if needed." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Thank you for your understanding. We look forward to helping you rebook soon." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var PractitionerCancelAppointmentPractitionerEmail = ({
  practitionerName = "[Practitioner Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    " Has Been Canceled"
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      patientName,
      " on ",
      extractDate(appointmentDate),
      " ",
      "Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "You has canceled an upcoming appointment with a patient. Details are below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please ensure the patient has been notified and assist with rescheduling if needed." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Thank you,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var ClinicCancelAppointmentPractitionerEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  appointmentDate = "Friday, May 9, 2025",
  appointmentTime = "[Appointment Time]",
  locationType = "Digital",
  meetingLink = "[Meeting Link]",
  channelName = "[Channel Name]",
  locationAddress = "[Location Address]",
  cancelReason = "[Cancel Reason]"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Your Appointment with ",
    patientName,
    " on ",
    extractDate(appointmentDate),
    " Has Been Canceled"
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: [
      "Your Appointment with ",
      patientName,
      " on ",
      extractDate(appointmentDate),
      " ",
      "Has Been Canceled"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: clinicName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "You has canceled an upcoming appointment with a patient. Details are below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Canceled Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient Name:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: appointmentTime })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      locationType === "Digital" ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-[26px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-6 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: [
            "Join Meeting via ",
            channelName
          ] }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-[2px] mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 block", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Reason" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 -mt-2", children: cancelReason }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please ensure the patient has been notified and assist with rescheduling if needed." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Thank you,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var OtpSecureLoginEmail = ({
  userName = "[Practitioner Name]",
  otp = "875634",
  expiresIn = "15 minutes"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your One-Time Password (OTP) for Secure Login" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your One-Time Password (OTP) for Secure Login" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: userName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0", children: "Your One-Time Password (OTP) is:" }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-xl font-medium leading-6 mb-6 -mt-2 text-[#393CE5] font-semibold", children: otp }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "This code is valid for",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold", children: expiresIn }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0", children: "For your security:" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-12", children: [
      /* @__PURE__ */ jsxRuntime.jsx("li", { className: "!h-7", children: /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-0", children: "Please do not share this code with anyone." }) }),
      /* @__PURE__ */ jsxRuntime.jsx("li", { className: "!h-7", children: /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-0", children: "You can request a new OTP only after 1 minute if neededYou can request a new OTP only after 1 minute if needed." }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "If you did not request this OTP, please ignore this email." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Thank you,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var UpcomingAppointmentReminderEmail = ({
  practitionerName = "[Practitioner Name]",
  clinicName = "[Clinic Name]",
  patientName = "[Patient Name]",
  serviceName = "[Service Name]",
  locationType = "Digital",
  meetingLink = "https://www.google.com/",
  locationAddress = "[Location Address]",
  hourTillAppointment = 1,
  date = "Friday, May 9, 2025",
  time = "10:00 AM - 11:00 AM",
  appointmentDetailUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your appointment is coming up soon" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your appointment is coming up soon" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "This is a reminder that you have an upcoming appointment scheduled in",
      " ",
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-bold", children: [
        hourTillAppointment,
        " hour"
      ] }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Clinic:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: clinicName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Doctor:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: practitionerName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: date })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: time })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      meetingLink ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: meetingLink }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8",
        href: appointmentDetailUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "View Appointment Details" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: "Please ensure you're ready ahead of time to avoid any delays. If you're unable to attend, kindly update your appointment as soon as possible." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var GoogleAccountConnectionEmail = ({
  practitionerName = "[Practitioner Name]",
  googleAccountEmail = "japanandunicorn@gmail.com"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Your DocMap Account is Now Linked with Google" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Your DocMap Account is Now Linked with Google" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Dear ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We are happy to inform you that your Google account has been successfully linked to your DocMap account. You can now log in to DocMap using your Google credentials." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-medium leading-6 mb-2 mt-0", children: "Here are the details of your connected account:" }),
    /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "!pl-6 mt-0 mb-6", children: /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
      /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Google Account" }),
      /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-0 inline-block ml-1", children: googleAccountEmail })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "This will make logging in faster and easier each time you access DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "If you have any questions or need further assistance, feel free to reach out to us." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6", children: "Thank you for using DocMap!" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var SystemMaintainanceEmail = ({
  patientName = "[Patient Name]",
  maintainanceStartTime = "May 13, 2025  11:00pm",
  maintainanceEndTime = " May 14, 2025 2:00am (GMT+7)",
  supportEmail = "support@docmap.com"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "Scheduled System Maintenance - We're Updating to Serve You Better" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Scheduled System Maintenance - We're Updating to Serve You Better" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: patientName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We want to let you know that DocMap will undergo scheduled maintenance to improve our services and ensure a smoother experience." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-medium leading-6 mb-2 mt-0", children: "Maintenance Window:" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold", children: maintainanceStartTime }),
      " to",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold", children: maintainanceEndTime })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0", children: "During this time:" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx("li", { className: "!h-7", children: /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-0", children: "You may experience limited access to the platform." }) }),
      /* @__PURE__ */ jsxRuntime.jsx("li", { className: "!h-7", children: /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-0", children: "Appointment booking, messaging, and other features might be temporarily unavailable." }) }),
      /* @__PURE__ */ jsxRuntime.jsx("li", { className: "!h-7", children: /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-2 mt-6", children: "Your data and information remain safe and secure." }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We recommend planning your activity on DocMap accordingly. Normal services will resume automatically once maintenance is complete." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 font-semibold", children: "Need help?" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 -mt-4", children: [
      "If you have any urgent concerns or need assistance, please contact us at",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx(components.Link, { style: { color: "#1890FF" }, href: `mailto:${supportEmail}`, children: supportEmail }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0", children: "Thank you for your understanding and continued trust in DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var PractitionerUpcomingAppointmentReminderEmail = ({
  patientName = "[Patient Name]",
  userName = "[User Name]",
  serviceName = "[Service Name]",
  date = "Friday, May 9, 2025",
  time = "10:00 AM - 11:00 AM",
  meetingLink = "https://www.google.com/",
  locationAddress = "[Location Address]",
  locationType = "[Location Type]",
  appointmentDetailUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsxs(components.Preview, { children: [
    "Upcoming Appointment in 1 Hour \u2013 ",
    patientName
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Reminder of your next scheduled appointment." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: userName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "This is a reminder that you have an upcoming appointment scheduled to begin in",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-bold", children: "1 hour" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Appointment Details" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Patient:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: patientName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Service:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: serviceName })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: date })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Time:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: time })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Location:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationType })
      ] }),
      meetingLink ? /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Meeting Link:" }),
        /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(components.Link, { style: { color: "#1890FF" }, href: meetingLink, children: meetingLink }),
          " "
        ] })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Address:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: locationAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8",
        href: appointmentDetailUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "View Appointment Details" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Please ensure everything is ready before the session begins. ",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "If there are any issues or changes, please contact the admin team."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var OverduePaymentsEmail = ({
  userName = "[User Name]",
  totalCommissionFee = "\xA3226",
  billingPeriod = "09/2025",
  offset = "\xA312",
  billingAmount = "\xA3214",
  paymentDate = "Friday, Sep 19, 2025",
  overduePaymentsReviewUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "[DocMap] Overdue payment for [billing period] bill" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "An overdue payment is awaiting your action" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: userName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We wanted to remind you that a payment on your account is now overdue." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Overdue Billing Details:" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Billing Period:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: billingPeriod })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total Commission Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: totalCommissionFee })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Offset:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: offset })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Billing Amount:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: billingAmount })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Origin Due Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: paymentDate })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "To avoid service interruptions, please log in and complete your payment as soon as possible." }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8",
        href: overduePaymentsReviewUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Pay Now" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: "If you've already settled this payment, please disregard this message. Otherwise, feel free to reach out if you need help or have any questions." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var NewBillsToReviewEmail = ({
  userName = "[User Name]",
  billingPeriod = "09/2025",
  totalCommissionFee = "\xA3226",
  offset = "\xA312",
  billingAmount = "\xA3214",
  paymentDate = "Friday, Sep 19, 2025",
  billingDetailReviewUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "[DocMap] Unpaid billing requires your attention" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "You have a billing period pending review" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: userName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "We noticed that you have an unpaid billing item in your account that requires your review." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Billing Details:" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Billing Period:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: billingPeriod })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Total Commission Fee:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: totalCommissionFee })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Offset:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: offset })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Billing Amount:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: billingAmount })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Due Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: paymentDate })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please log in to your account to review and take action as soon as possible to avoid any service disruptions." }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8",
        href: billingDetailReviewUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Review Billing Now" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: "If you\u2019ve already made a payment or believe this is an error, feel free to contact our support team." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var IssuedInvoicesEmail = ({
  userName = "[User Name]",
  amount = "\xA3226",
  billingPeriod = "09/2025",
  paymentDate = "Friday, Sep 19, 2025",
  cardInfo = "1234 5678 9012 3456"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "[DocMap] Successful payment for [billing period] bill" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "Payment successful \u2013 Your invoice is ready" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: userName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "This is a confirmation that your billing has been successfully processed." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-bold leading-6 mt-0", children: "Payment summary:" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "!pl-6 -mt-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Amount Charged:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: amount })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Billing Period:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: billingPeriod })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Payment Date:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: paymentDate })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "!h-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base font-semibold leading-6 mb-2 mt-0 inline-block", children: "Payment Method:" }),
        /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0 inline-block ml-1", children: cardInfo })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: "Please find the attached invoice below for more details." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: "If you have any questions about this charge or need assistance, feel free to contact our support team." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
var UnreadMessageNotificationEmail = ({
  practitionerName = "[Practitioner Name]",
  inboxUrl = "https://www.google.com/"
}) => /* @__PURE__ */ jsxRuntime.jsxs(EmailLayout, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(components.Preview, { children: "You have an unread message waiting" }),
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white m-0 mb-8 text-trueGray", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "font-semibold text-2xl leading-8 mb-6 mt-0", children: "You have an unread message waiting" }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mb-8 mt-0", children: [
      "Hi ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: practitionerName }),
      ","
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-2", children: "You have message(s) in your inbox that haven\u2019t been replied to in over an hour." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "We wanted to make sure you don\u2019t miss anything important." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-2", children: "To view and respond to your conversation(s), click the link below:" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      components.Button,
      {
        className: "text-white bg-confirmButton text-sm w-[113px] h-8 rounded-md mb-6 text-center leading-8",
        href: inboxUrl,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "leading-[22px]", children: "Go to inbox" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "Keeping your communication timely helps ensure the best care experience possible." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-2", children: "This is an automated reminder from DocMap." }),
    /* @__PURE__ */ jsxRuntime.jsx(components.Text, { className: "text-base leading-6 mt-0 mb-6", children: "If you\u2019ve already responded, you can ignore this message." }),
    /* @__PURE__ */ jsxRuntime.jsxs(components.Text, { className: "text-base leading-6 mt-0", children: [
      "Warm regards,",
      /* @__PURE__ */ jsxRuntime.jsx("br", {}),
      "DocMap Care Team"
    ] })
  ] }) })
] });
async function renderEmail(Component, props) {
  const html = await components.render(/* @__PURE__ */ jsxRuntime.jsx(Component, { ...props }));
  return html;
}

exports.ApprovePractitionerEmail = ApprovePractitionerEmail;
exports.ClinicCancelAppointmentPatientEmail = ClinicCancelAppointmentPatientEmail;
exports.ClinicCancelAppointmentPractitionerEmail = ClinicCancelAppointmentPractitionerEmail;
exports.CreateAppointmentClinicEmail = CreateAppointmentClinicEmail;
exports.CreateAppointmentPatientEmail = CreateAppointmentPatientEmail;
exports.CreateAppointmentPractitionerEmail = CreateAppointmentPractitionerEmail;
exports.DeletedProfileEmail = DeletedProfileEmail;
exports.GoogleAccountConnectionEmail = GoogleAccountConnectionEmail;
exports.IssuedInvoicesEmail = IssuedInvoicesEmail;
exports.NewBillsToReviewEmail = NewBillsToReviewEmail;
exports.OtpSecureLoginEmail = OtpSecureLoginEmail;
exports.OverduePaymentsEmail = OverduePaymentsEmail;
exports.PasswordUpdatedEmail = PasswordUpdatedEmail;
exports.PatientCancelAppointmentPatientEmail = PatientCancelAppointmentPatientEmail;
exports.PatientCancelAppointmentPractitionerEmail = PatientCancelAppointmentPractitionerEmail;
exports.PractitionerCancelAppointmentPatientEmail = PractitionerCancelAppointmentPatientEmail;
exports.PractitionerCancelAppointmentPractitionerEmail = PractitionerCancelAppointmentPractitionerEmail;
exports.PractitionerUpcomingAppointmentReminderEmail = PractitionerUpcomingAppointmentReminderEmail;
exports.ReminderEmail = ReminderEmail;
exports.ResetYourPasswordEmail = ResetYourPasswordEmail;
exports.ReturnedPractitionerEmail = ReturnedPractitionerEmail;
exports.SystemMaintainanceEmail = SystemMaintainanceEmail;
exports.UnreadMessageNotificationEmail = UnreadMessageNotificationEmail;
exports.UpcomingAppointmentReminderEmail = UpcomingAppointmentReminderEmail;
exports.UpdateAppointmentClinicEmail = UpdateAppointmentClinicEmail;
exports.UpdateAppointmentPatientEmail = UpdateAppointmentPatientEmail;
exports.UpdateAppointmentPractitionerEmail = UpdateAppointmentPractitionerEmail;
exports.VerifyEmailAddressEmail = VerifyEmailAddressEmail;
exports.renderEmail = renderEmail;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map