// Logo 组件 - AI Agent Harness 主题设计
// 设计概念: 六边形蜂巢 + 连接节点 + 代码括号

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
      {/* 外框 - 六边形蜂巢 */}
      <path
        d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 中心连接节点 */}
      <circle cx="20" cy="20" r="5" fill="currentColor" />
      {/* 连接线 - 左上 */}
      <line x1="20" y1="15" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" />
      {/* 连接线 - 右上 */}
      <line x1="20" y1="15" x2="28" y2="10" stroke="currentColor" strokeWidth="1.5" />
      {/* 连接线 - 下方 */}
      <line x1="20" y1="25" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" />
      {/* 小节点 */}
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      <circle cx="28" cy="10" r="2" fill="currentColor" />
      <circle cx="20" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

// 备选设计 2: 简约代码括号 + Agent 节点
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
      {/* 背景圆 */}
      <circle cx="20" cy="20" r="18" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      {/* 左括号 */}
      <path
        d="M14 12C11 14 11 17 11 20C11 23 11 26 14 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* 右括号 */}
      <path
        d="M26 12C29 14 29 17 29 20C29 23 29 26 26 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* 中心 Agent 节点 */}
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

// 备选设计 3: 字母 AH (Awesome Harmless)
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
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        AH
      </text>
    </svg>
  );
}

export default Logo;
