import React from "react";

import NextScript from "next/script";

import { GA_TRACKING_ID, isProd } from "@utils/constant/env";

const Analytics = () => {
  if (!isProd) return null;

  return (
    <>
      <NextScript
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <NextScript
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                  `,
        }}
      />
    </>
  );
};

export default Analytics;
