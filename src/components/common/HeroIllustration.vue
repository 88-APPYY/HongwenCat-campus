<script setup>
/**
 * 首屏主视觉插画（手绘 SVG）：
 * 用抽象的“校园数字化中台”界面替代实景照片，避免版权问题。
 */
</script>

<template>
  <svg
    class="hero-art"
    viewBox="0 0 560 440"
    role="img"
    aria-label="校园数字化中台界面示意图"
  >
    <defs>
      <linearGradient id="ha-blue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1D4E9E" />
        <stop offset="100%" stop-color="#3F74C9" />
      </linearGradient>
      <linearGradient id="ha-red" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#C8102E" />
        <stop offset="100%" stop-color="#E0324F" />
      </linearGradient>
      <linearGradient id="ha-soft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F5F7FB" />
        <stop offset="100%" stop-color="#EAF1FC" />
      </linearGradient>
      <filter id="ha-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F2440" flood-opacity="0.14" />
      </filter>
    </defs>

    <!-- 背景装饰环 -->
    <circle cx="430" cy="96" r="66" fill="none" stroke="#EAF1FC" stroke-width="16" />
    <circle cx="92" cy="360" r="44" fill="none" stroke="#FDECEF" stroke-width="14" />

    <!-- 主面板 -->
    <g filter="url(#ha-shadow)">
      <rect x="58" y="52" width="444" height="292" rx="18" fill="#FFFFFF" />
    </g>

    <!-- 窗口标题栏 -->
    <rect x="58" y="52" width="444" height="42" rx="18" fill="url(#ha-blue)" />
    <rect x="58" y="80" width="444" height="14" fill="url(#ha-blue)" />
    <circle cx="84" cy="73" r="5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="102" cy="73" r="5" fill="#FFFFFF" opacity="0.4" />
    <circle cx="120" cy="73" r="5" fill="#FFFFFF" opacity="0.28" />
    <rect x="150" y="66" width="150" height="14" rx="7" fill="#FFFFFF" opacity="0.32" />

    <!-- 左侧导航 -->
    <rect x="80" y="112" width="104" height="212" rx="12" fill="url(#ha-soft)" />
    <rect x="96" y="132" width="72" height="10" rx="5" fill="#1D4E9E" opacity="0.85" />
    <rect x="96" y="158" width="56" height="8" rx="4" fill="#93A1B8" />
    <rect x="96" y="180" width="64" height="8" rx="4" fill="#93A1B8" />
    <rect x="96" y="202" width="48" height="8" rx="4" fill="#93A1B8" />
    <rect x="96" y="224" width="60" height="8" rx="4" fill="#93A1B8" />
    <rect x="96" y="286" width="72" height="24" rx="12" fill="url(#ha-red)" />

    <!-- 数据卡片 -->
    <rect x="202" y="112" width="128" height="66" rx="12" fill="#FFFFFF" stroke="#E5EAF3" />
    <rect x="218" y="128" width="42" height="8" rx="4" fill="#C3CDDE" />
    <rect x="218" y="148" width="62" height="16" rx="6" fill="url(#ha-blue)" />

    <rect x="346" y="112" width="128" height="66" rx="12" fill="#FFFFFF" stroke="#E5EAF3" />
    <rect x="362" y="128" width="42" height="8" rx="4" fill="#C3CDDE" />
    <rect x="362" y="148" width="52" height="16" rx="6" fill="url(#ha-red)" />

    <!-- 折线图卡片 -->
    <rect x="202" y="192" width="272" height="132" rx="12" fill="#FFFFFF" stroke="#E5EAF3" />
    <rect x="218" y="208" width="70" height="8" rx="4" fill="#C3CDDE" />
    <path
      d="M220 300 L252 274 L284 286 L316 248 L348 262 L380 226 L412 240 L452 208"
      fill="none"
      stroke="#1D4E9E"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M220 300 L252 274 L284 286 L316 248 L348 262 L380 226 L412 240 L452 208 L452 310 L220 310 Z"
      fill="#1D4E9E"
      opacity="0.08"
    />
    <circle cx="316" cy="248" r="5" fill="#FFFFFF" stroke="#1D4E9E" stroke-width="3" />
    <circle cx="452" cy="208" r="5" fill="#FFFFFF" stroke="#C8102E" stroke-width="3" />

    <!-- 底部进度条 -->
    <rect x="220" y="318" width="120" height="8" rx="4" fill="#EAF1FC" />
    <rect x="220" y="318" width="82" height="8" rx="4" fill="#1D4E9E" opacity="0.6" />

    <!-- 悬浮小卡片：消息通知 -->
    <g filter="url(#ha-shadow)">
      <rect x="24" y="228" width="128" height="72" rx="14" fill="#FFFFFF" />
    </g>
    <circle cx="52" cy="256" r="14" fill="#EAF1FC" />
    <path d="M46 256l4 4 8-8" fill="none" stroke="#1D4E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="74" y="246" width="62" height="8" rx="4" fill="#C3CDDE" />
    <rect x="74" y="264" width="44" height="8" rx="4" fill="#E5EAF3" />

    <!-- 悬浮小卡片：移动端 -->
    <g filter="url(#ha-shadow)">
      <rect x="432" y="300" width="104" height="118" rx="16" fill="#FFFFFF" />
    </g>
    <rect x="446" y="316" width="76" height="10" rx="5" fill="#EAF1FC" />
    <rect x="446" y="336" width="76" height="46" rx="10" fill="url(#ha-blue)" opacity="0.14" />
    <path d="M458 366l10-11 9 8 11-14" fill="none" stroke="#1D4E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="446" y="392" width="76" height="10" rx="5" fill="#E5EAF3" />
    <rect x="470" y="408" width="28" height="4" rx="2" fill="#E5EAF3" />
  </svg>
</template>

<style scoped>
.hero-art {
  width: 100%;
  height: auto;
  max-width: 560px;
}
</style>
