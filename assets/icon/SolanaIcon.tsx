import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;
const SolanaIcon = (props: IconProps) => {
  return (
    <div>
      <svg
        width="26"
        height="25"
        viewBox="0 0 28 28"
        className="mt-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g
          clip-path="url(#clip0_7936_21803)"
          filter="url(#filter0_d_7936_21803)"
        >
          <path
            d="M7.24869 15.2653C7.36938 15.1113 7.53533 15.0215 7.71135 15.0215H23.6731C23.9648 15.0215 24.1106 15.4706 23.9045 15.7337L20.7513 19.7568C20.6306 19.9108 20.4647 20.0006 20.2887 20.0006H4.32689C4.03521 20.0006 3.88937 19.5515 4.09556 19.2884L7.24869 15.2653Z"
            fill="url(#paint0_linear_7936_21803)"
          />
          <path
            d="M7.24869 0.243824C7.37441 0.08983 7.54036 0 7.71135 0H23.6731C23.9648 0 24.1106 0.44915 23.9045 0.712223L20.7513 4.73532C20.6306 4.88932 20.4647 4.97915 20.2887 4.97915H4.32689C4.03521 4.97915 3.88937 4.53 4.09556 4.26692L7.24869 0.243824Z"
            fill="url(#paint1_linear_7936_21803)"
          />
          <path
            d="M20.7513 7.70671C20.6306 7.55272 20.4647 7.46289 20.2887 7.46289H4.32689C4.03521 7.46289 3.88937 7.91204 4.09556 8.17511L7.24869 12.1982C7.36938 12.3522 7.53533 12.442 7.71135 12.442H23.6731C23.9648 12.442 24.1106 11.9929 23.9045 11.7298L20.7513 7.70671Z"
            fill="url(#paint2_linear_7936_21803)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_7936_21803"
            x="0"
            y="0"
            width="28"
            height="28"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_7936_21803"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_7936_21803"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_7936_21803"
            x1="22.1483"
            y1="-2.40266"
            x2="6.29677"
            y2="21.3938"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FFA3" />
            <stop offset="1" stop-color="#DC1FFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_7936_21803"
            x1="17.318"
            y1="-5.62088"
            x2="1.4665"
            y2="18.1756"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FFA3" />
            <stop offset="1" stop-color="#DC1FFF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_7936_21803"
            x1="19.7178"
            y1="-4.02174"
            x2="3.86626"
            y2="19.7747"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FFA3" />
            <stop offset="1" stop-color="#DC1FFF" />
          </linearGradient>
          <clipPath id="clip0_7936_21803">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(4)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SolanaIcon;
