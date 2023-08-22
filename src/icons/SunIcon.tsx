import React from "react";

type TProps = React.SVGProps<SVGSVGElement>;

const SunIcon = (props: TProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    x="0px"
    y="0px"
    id="sun-icon"
    {...props}
  >
    <circle cx="12" cy="12" r="6" />
    <path d="M13,4V3a1,1,0,0,0-2,0V4A1,1,0,0,0,13,4Z" />
    <path d="M11,20v1a1,1,0,0,0,2,0V20A1,1,0,0,0,11,20Z" />
    <path d="M21,11H20a1,1,0,0,0,0,2h1A1,1,0,0,0,21,11Z" />
    <path d="M4,11H3a1,1,0,0,0,0,2H4A1,1,0,0,0,4,11Z" />
    <path d="M18.3643,7.05l.707-.707a1,1,0,0,0-1.4141-1.4141l-.707.707A1,1,0,0,0,18.3643,7.05Z" />
    <path d="M5.6357,16.95l-.707.707a1,1,0,0,0,1.4141,1.4141l.707-.707A1,1,0,0,0,5.6357,16.95Z" />
    <path d="M18.3643,16.95A1,1,0,0,0,16.95,18.3643l.707.707a1,1,0,0,0,1.4141-1.4141Z" />
    <path d="M5.6357,7.05A1,1,0,1,0,7.05,5.6357l-.707-.707A1,1,0,0,0,4.9287,6.3428Z" />
  </svg>
);

export default SunIcon;
