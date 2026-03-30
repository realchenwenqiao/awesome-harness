// Logo 组件 - 现代简洁设计
// 设计概念: 代码花括号 + 中国印章元素的结合

export function Logo({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 外框 - 圆角矩形 */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="8"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* 左花括号 */}
      <path
        d="M14 12C12 14 12 16 12 18C12 20 11 20 10 20C11 20 12 20 12 22C12 24 12 26 14 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 右花括号 */}
      <path
        d="M26 12C28 14 28 16 28 18C28 20 29 20 30 20C29 20 28 20 28 22C28 24 28 26 26 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 中间点 - 代表"中国" */}
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}

// 备选设计 2: 简约的代码符号
export function LogoAlt({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 背景 */}
      <rect width="40" height="40" rx="10" fill="currentColor" />
      {/* 代码符号 </> */}
      <path
        d="M14 20L10 24L14 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 20L30 24L26 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 14L18 30"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 备选设计 3: 字母组合 CO (China Open)
export function LogoText({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="currentColor" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="600"
        fontFamily="var(--font-serif)"
      >
        开
      </text>
    </svg>
  );
}

// 备选设计 4: 星形 + 代码元素
export function LogoStar({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.1" />
      {/* 六角星形 */}
      <path
        d="M20 8L22.5 15H30L24 19.5L26.5 27L20 22.5L13.5 27L16 19.5L10 15H17.5L20 8Z"
        fill="currentColor"
      />
      {/* 代码暗示 - 底部横线 */}
      <rect x="10" y="32" width="20" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

export default Logo;
