import { Icon as LucideIcon, type LucideProps } from "lucide-react"

export type Icon = typeof LucideIcon

export const Icon = {
  logo: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1250 1250"
      role="img"
      aria-labelledby="title desc"
      {...props}
    >
      <title id="title">Cuenta overlapping cards logo</title>
      <desc id="desc">
        Two overlapping rounded payment cards in orange-yellow and blue, drawn
        entirely with vector paths, gradients, masks, and filters on a
        transparent background.
      </desc>

      <defs>
        <linearGradient id="blueCard" x1="0.05" y1="0.05" x2="0.9" y2="0.95">
          <stop offset="0" stopColor="#eaf4ff" />
          <stop offset="0.35" stopColor="#aac9ff" />
          <stop offset="0.72" stopColor="#6fa2fb" />
          <stop offset="1" stopColor="#4b85f0" />
        </linearGradient>
        <radialGradient id="blueGlow" cx="38%" cy="34%" r="78%">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".52" />
          <stop offset=".55" stopColor="#cfe0ff" stopOpacity=".12" />
          <stop offset="1" stopColor="#5d91f5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blueShade" x1="0" y1="0" x2="1" y2=".7">
          <stop offset="0" stopColor="#5b8fe8" stopOpacity="0" />
          <stop offset="1" stopColor="#3476ee" stopOpacity=".55" />
        </linearGradient>

        <linearGradient id="whiteCard" x1=".06" y1=".05" x2=".95" y2=".9">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".94" />
          <stop offset=".58" stopColor="#eff6ff" stopOpacity=".9" />
          <stop offset="1" stopColor="#d6e7ff" stopOpacity=".82" />
        </linearGradient>
        <linearGradient id="whiteSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".58" />
          <stop offset=".62" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="orangeCard" x1=".08" y1=".05" x2=".83" y2="1">
          <stop offset="0" stopColor="#ffd12a" />
          <stop offset=".34" stopColor="#ffbd20" />
          <stop offset=".73" stopColor="#ff9e17" />
          <stop offset="1" stopColor="#ff8614" />
        </linearGradient>
        <radialGradient id="yellowGlow" cx="63%" cy="10%" r="76%">
          <stop offset="0" stopColor="#fff078" stopOpacity=".9" />
          <stop offset=".48" stopColor="#ffd536" stopOpacity=".3" />
          <stop offset="1" stopColor="#ff9a18" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orangeShade" x1=".12" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#ffad14" stopOpacity=".12" />
          <stop offset=".35" stopColor="#ff8912" stopOpacity=".48" />
          <stop offset="1" stopColor="#ff9f1b" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="slot" x1="0" y1="0" x2="1" y2=".2">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".56" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#fff9e9" stopOpacity=".92" />
        </linearGradient>

        <clipPath id="blueClip">
          <rect x="293" y="250" width="900" height="600" rx="112" />
        </clipPath>
        <clipPath id="whiteClip">
          <rect x="343" y="366" width="670" height="365" rx="88" />
        </clipPath>
        <clipPath id="orangeClip">
          <rect x="65" y="486" width="855" height="525" rx="112" />
        </clipPath>

        <filter
          id="softShadow"
          x="-20%"
          y="-25%"
          width="145%"
          height="165%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#16499e"
            floodOpacity=".08"
          />
        </filter>
        <filter
          id="orangeShadow"
          x="-20%"
          y="-25%"
          width="145%"
          height="165%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#d95800"
            floodOpacity=".08"
          />
        </filter>
      </defs>

      <g transform="rotate(-17 743 550)" filter="url(#softShadow)">
        <rect
          x="293"
          y="250"
          width="900"
          height="600"
          rx="112"
          fill="url(#blueCard)"
        />
        <ellipse
          cx="560"
          cy="395"
          rx="430"
          ry="315"
          fill="url(#blueGlow)"
          clipPath="url(#blueClip)"
        />
        <path
          d="M250 690 C535 724 871 650 1248 538 L1248 925 L260 925 Z"
          fill="url(#blueShade)"
          clipPath="url(#blueClip)"
        />
      </g>

      <g transform="rotate(-13 678 548)">
        <rect
          x="343"
          y="366"
          width="670"
          height="365"
          rx="88"
          fill="url(#whiteCard)"
        />
        <ellipse
          cx="540"
          cy="430"
          rx="345"
          ry="228"
          fill="url(#whiteSheen)"
          clipPath="url(#whiteClip)"
        />
      </g>

      <g transform="rotate(-11 493 748)" filter="url(#orangeShadow)">
        <rect
          x="65"
          y="486"
          width="855"
          height="525"
          rx="112"
          fill="url(#orangeCard)"
        />
        <ellipse
          cx="615"
          cy="510"
          rx="500"
          ry="355"
          fill="url(#yellowGlow)"
          clipPath="url(#orangeClip)"
        />

        <path
          d="M350 675 C505 719 696 700 967 628 L967 1045 L350 1045 C327 940 315 796 350 675 Z"
          fill="url(#orangeShade)"
          clipPath="url(#orangeClip)"
        />

        <rect
          x="205"
          y="635"
          width="210"
          height="98"
          rx="25"
          fill="url(#slot)"
        />
        <path
          d="M332 635 H390 A25 25 0 0 1 415 660 V708 A25 25 0 0 1 390 733 H332 Z"
          fill="#ffffff"
          opacity=".3"
        />
      </g>
    </svg>
  ),
}
