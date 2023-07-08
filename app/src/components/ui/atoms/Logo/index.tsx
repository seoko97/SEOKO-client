import React from "react";
import Link from "next/link";
import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

const Logo = () => {
  return (
    <Container>
      <Link href="/">
        <svg width="98" height="23" viewBox="0 0 98 23" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.32715 22.3C6.92715 22.3 5.66715 22.13 4.54715 21.79C3.42715 21.43 2.35715 20.81 1.33715 19.93C1.07715 19.71 0.877148 19.46 0.737149 19.18C0.597149 18.9 0.527149 18.62 0.527149 18.34C0.527149 17.88 0.687149 17.48 1.00715 17.14C1.34715 16.78 1.76715 16.6 2.26715 16.6C2.64715 16.6 2.98715 16.72 3.28715 16.96C4.04715 17.58 4.79715 18.05 5.53715 18.37C6.29715 18.69 7.22715 18.85 8.32715 18.85C9.06715 18.85 9.74715 18.74 10.3671 18.52C10.9871 18.28 11.4871 17.97 11.8671 17.59C12.2471 17.19 12.4371 16.74 12.4371 16.24C12.4371 15.64 12.2571 15.13 11.8971 14.71C11.5371 14.29 10.9871 13.94 10.2471 13.66C9.50715 13.36 8.56715 13.13 7.42715 12.97C6.34715 12.81 5.39715 12.57 4.57715 12.25C3.75715 11.91 3.06715 11.49 2.50715 10.99C1.96715 10.47 1.55715 9.87 1.27715 9.19C0.997149 8.49 0.857149 7.71 0.857149 6.85C0.857149 5.55 1.18715 4.44 1.84715 3.52C2.52715 2.6 3.43715 1.9 4.57715 1.42C5.71715 0.939999 6.97715 0.699999 8.35715 0.699999C9.65715 0.699999 10.8571 0.899999 11.9571 1.3C13.0771 1.68 13.9871 2.17 14.6871 2.77C15.2671 3.23 15.5571 3.76 15.5571 4.36C15.5571 4.8 15.3871 5.2 15.0471 5.56C14.7071 5.92 14.3071 6.1 13.8471 6.1C13.5471 6.1 13.2771 6.01 13.0371 5.83C12.7171 5.55 12.2871 5.29 11.7471 5.05C11.2071 4.79 10.6371 4.58 10.0371 4.42C9.43715 4.24 8.87715 4.15 8.35715 4.15C7.49715 4.15 6.76715 4.26 6.16715 4.48C5.58715 4.7 5.14715 5 4.84715 5.38C4.54715 5.76 4.39715 6.2 4.39715 6.7C4.39715 7.3 4.56715 7.8 4.90715 8.2C5.26715 8.58 5.77715 8.89 6.43715 9.13C7.09715 9.35 7.88715 9.55 8.80715 9.73C10.0071 9.95 11.0571 10.21 11.9571 10.51C12.8771 10.81 13.6371 11.2 14.2371 11.68C14.8371 12.14 15.2871 12.73 15.5872 13.45C15.8871 14.15 16.0371 15.01 16.0371 16.03C16.0371 17.33 15.6771 18.45 14.9571 19.39C14.2371 20.33 13.2871 21.05 12.1071 21.55C10.9471 22.05 9.68715 22.3 8.32715 22.3ZM21.3075 0.999999H31.3575C31.8775 0.999999 32.3075 1.17 32.6475 1.51C33.0075 1.83 33.1875 2.25 33.1875 2.77C33.1875 3.27 33.0075 3.68 32.6475 4C32.3075 4.3 31.8775 4.45 31.3575 4.45H22.9575L23.2275 3.94V9.79L22.9875 9.55H30.0075C30.5275 9.55 30.9575 9.72 31.2975 10.06C31.6575 10.38 31.8375 10.8 31.8375 11.32C31.8375 11.82 31.6575 12.23 31.2975 12.55C30.9575 12.85 30.5275 13 30.0075 13H23.0775L23.2275 12.76V18.82L22.9875 18.55H31.3575C31.8775 18.55 32.3075 18.73 32.6475 19.09C33.0075 19.43 33.1875 19.83 33.1875 20.29C33.1875 20.79 33.0075 21.2 32.6475 21.52C32.3075 21.84 31.8775 22 31.3575 22H21.3075C20.7875 22 20.3475 21.83 19.9875 21.49C19.6475 21.13 19.4775 20.69 19.4775 20.17V2.83C19.4775 2.31 19.6475 1.88 19.9875 1.54C20.3475 1.18 20.7875 0.999999 21.3075 0.999999ZM73.8692 22C73.3092 22 72.8592 21.77 72.5192 21.31L65.5892 12.19L68.3192 9.4L75.4892 18.88C75.7692 19.26 75.9092 19.67 75.9092 20.11C75.9092 20.67 75.6992 21.13 75.2792 21.49C74.8592 21.83 74.3892 22 73.8692 22ZM74.2292 0.849999C74.7092 0.849999 75.0992 1.05 75.3992 1.45C75.7192 1.83 75.8792 2.22 75.8792 2.62C75.8792 3.04 75.6992 3.43 75.3392 3.79L62.7692 15.82L62.6192 11.53L72.7592 1.54C73.2192 1.08 73.7092 0.849999 74.2292 0.849999ZM61.2692 22C60.7092 22 60.2592 21.83 59.9192 21.49C59.5792 21.13 59.4092 20.69 59.4092 20.17V2.83C59.4092 2.31 59.5892 1.88 59.9492 1.54C60.3092 1.18 60.7692 0.999999 61.3292 0.999999C61.8892 0.999999 62.3292 1.18 62.6492 1.54C62.9892 1.88 63.1592 2.31 63.1592 2.83V20.17C63.1592 20.69 62.9892 21.13 62.6492 21.49C62.3092 21.83 61.8492 22 61.2692 22ZM97.4792 11.5C97.4792 13 97.2292 14.4 96.7292 15.7C96.2292 17 95.5192 18.15 94.5992 19.15C93.6992 20.13 92.6192 20.9 91.3592 21.46C90.1192 22.02 88.7592 22.3 87.2792 22.3C85.7992 22.3 84.4392 22.02 83.1992 21.46C81.9592 20.9 80.8792 20.13 79.9592 19.15C79.0592 18.15 78.3592 17 77.8592 15.7C77.3592 14.4 77.1092 13 77.1092 11.5C77.1092 10 77.3592 8.6 77.8592 7.3C78.3592 6 79.0592 4.86 79.9592 3.88C80.8792 2.88 81.9592 2.1 83.1992 1.54C84.4392 0.979999 85.7992 0.699999 87.2792 0.699999C88.7592 0.699999 90.1192 0.979999 91.3592 1.54C92.6192 2.1 93.6992 2.88 94.5992 3.88C95.5192 4.86 96.2292 6 96.7292 7.3C97.2292 8.6 97.4792 10 97.4792 11.5ZM93.5792 11.5C93.5792 10.16 93.3092 8.95 92.7692 7.87C92.2292 6.77 91.4892 5.9 90.5492 5.26C89.6092 4.62 88.5192 4.3 87.2792 4.3C86.0392 4.3 84.9492 4.62 84.0092 5.26C83.0692 5.9 82.3292 6.76 81.7892 7.84C81.2692 8.92 81.0092 10.14 81.0092 11.5C81.0092 12.84 81.2692 14.06 81.7892 15.16C82.3292 16.24 83.0692 17.1 84.0092 17.74C84.9492 18.38 86.0392 18.7 87.2792 18.7C88.5192 18.7 89.6092 18.38 90.5492 17.74C91.4892 17.1 92.2292 16.24 92.7692 15.16C93.3092 14.06 93.5792 12.84 93.5792 11.5Z"
            className="fill_dark"
          />
          <path
            d="M55.9655 11.5C55.9655 13 55.7155 14.4 55.2155 15.7C54.7155 17 54.0055 18.15 53.0855 19.15C52.1855 20.13 51.1055 20.9 49.8455 21.46C48.6055 22.02 47.2455 22.3 45.7655 22.3C44.2855 22.3 42.9255 22.02 41.6855 21.46C40.4455 20.9 39.3655 20.13 38.4455 19.15C37.5455 18.15 36.8455 17 36.3455 15.7C35.8455 14.4 35.5955 13 35.5955 11.5C35.5955 10 35.8455 8.6 36.3455 7.3C36.8455 6 37.5455 4.86 38.4455 3.88C39.3655 2.88 40.4455 2.1 41.6855 1.54C42.9255 0.979999 44.2855 0.699999 45.7655 0.699999C47.2455 0.699999 48.6055 0.979999 49.8455 1.54C51.1055 2.1 52.1855 2.88 53.0855 3.88C54.0055 4.86 54.7155 6 55.2155 7.3C55.7155 8.6 55.9655 10 55.9655 11.5ZM52.0655 11.5C52.0655 10.16 51.7955 8.95 51.2555 7.87C50.7155 6.77 49.9755 5.9 49.0355 5.26C48.0955 4.62 47.0055 4.3 45.7655 4.3C44.5255 4.3 43.4355 4.62 42.4955 5.26C41.5555 5.9 40.8155 6.76 40.2755 7.84C39.7555 8.92 39.4955 10.14 39.4955 11.5C39.4955 12.84 39.7555 14.06 40.2755 15.16C40.8155 16.24 41.5555 17.1 42.4955 17.74C43.4355 18.38 44.5255 18.7 45.7655 18.7C47.0055 18.7 48.0955 18.38 49.0355 17.74C49.9755 17.1 50.7155 16.24 51.2555 15.16C51.7955 14.06 52.0655 12.84 52.0655 11.5Z"
            className="fill_theme"
          />
        </svg>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & .fill_theme {
    fill: ${({ theme }) => theme.primary};
  }

  & .fill_dark {
    fill: ${({ theme }) => theme.font_color1};
  }

  & path {
    ${getTransitionEffect("fill")}
  }
`;

export default React.memo(Logo);
