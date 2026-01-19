// auth-design 公共样式配置
export const commonStyles = {
  // 容器样式
  container: {
    base: 'auth-demo-container',
    classes: {
      border: '1px solid var(--vp-c-divider)',
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      fontFamily: 'var(--vp-font-family-base)'
    }
  },

  // 标题样式
  header: {
    title: {
      fontWeight: '700',
      fontSize: '1.2rem',
      marginBottom: '0.3rem',
      background: 'linear-gradient(120deg, var(--vp-c-brand), #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      color: 'var(--vp-c-text-2)',
      fontSize: '0.9rem'
    }
  },

  // 按钮样式
  button: {
    base: 'auth-demo-btn',
    primary: 'auth-demo-btn-primary',
    variants: {
      primary: {
        background: 'var(--vp-c-brand)',
        color: 'white'
      },
      success: {
        background: '#22c55e',
        color: 'white'
      },
      danger: {
        background: '#ef4444',
        color: 'white'
      },
      secondary: {
        background: '#64748b',
        color: 'white'
      }
    }
  },

  // 卡片样式
  card: {
    base: 'auth-demo-card',
    background: 'var(--vp-c-bg)',
    border: '1px solid var(--vp-c-divider)',
    borderRadius: '10px',
    padding: '1.25rem'
  },

  // 代码块样式
  codeBlock: {
    background: '#1e293b',
    color: '#e2e8f0',
    fontFamily: "'Courier New', monospace",
    fontSize: '0.8rem',
    lineHeight: '1.6',
    padding: '0.75rem',
    borderRadius: '6px'
  }
}

// 动画配置
export const animations = {
  fadeIn: {
    name: 'fadeIn',
    css: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
  },
  slideIn: {
    name: 'slideIn',
    css: `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
  },
  pulse: {
    name: 'pulse',
    css: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `
  },
  bounce: {
    name: 'bounce',
    css: `
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-5px); }
      }
    `
  },
  spin: {
    name: 'spin',
    css: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
  }
}

// 颜色配置
export const colors = {
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6'
}

// 响应式断点
export const breakpoints = {
  mobile: '768px'
}
