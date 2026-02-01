// auth-design 公共组件配置

// 生成按钮类名
export const getButtonClasses = (
  variant = 'primary',
  disabled = false,
  size = 'medium'
) => {
  const base = 'auth-demo-btn'
  const classes = [base]

  // 变体
  classes.push(`${base}-${variant}`)

  // 状态
  if (disabled) classes.push(`${base}-disabled`)

  // 大小
  classes.push(`${base}-${size}`)

  return classes.join(' ')
}

// 生成卡片类名
export const getCardClasses = (variant = 'default', clickable = false) => {
  const base = 'auth-demo-card'
  const classes = [base]

  if (variant !== 'default') {
    classes.push(`${base}-${variant}`)
  }

  if (clickable) {
    classes.push(`${base}-clickable`)
  }

  return classes.join(' ')
}

// 生成状态徽章类名
export const getBadgeClasses = (type = 'info') => {
  const types = {
    success: 'auth-badge-success',
    warning: 'auth-badge-warning',
    danger: 'auth-badge-danger',
    info: 'auth-badge-info',
    purple: 'auth-badge-purple'
  }

  return types[type] || types.info
}

// 生成进度条类名
export const getProgressClasses = (variant = 'primary') => {
  return `auth-progress auth-progress-${variant}`
}

// 格式化代码示例
export const formatCodeExample = (code, language = 'javascript') => {
  if (typeof code !== 'string') return ''
  return code.trim()
}

// 生成流程步骤类名
export const getStepClasses = (index, currentIndex, totalSteps) => {
  const classes = ['auth-step']

  if (index < currentIndex) {
    classes.push('auth-step-completed')
  } else if (index === currentIndex) {
    classes.push('auth-step-active')
  } else {
    classes.push('auth-step-pending')
  }

  return classes.join(' ')
}

// 生成表格行类名
export const getTableRowClasses = (highlight = false, index = 0) => {
  const classes = ['auth-table-row']

  if (highlight) classes.push('auth-table-row-highlight')
  if (index % 2 === 0) classes.push('auth-table-row-even')

  return classes.join(' ')
}

// 生成图标容器类名
export const getIconContainerClasses = (
  size = 'medium',
  variant = 'default'
) => {
  return `auth-icon-container auth-icon-container-${size} auth-icon-container-${variant}`
}

// 生成输入框类名
export const getInputClasses = (state = 'default', size = 'medium') => {
  const classes = ['auth-input']

  if (state !== 'default') {
    classes.push(`auth-input-${state}`)
  }

  if (size !== 'medium') {
    classes.push(`auth-input-${size}`)
  }

  return classes.join(' ')
}

// 生成通知/提示框类名
export const getAlertClasses = (type = 'info', dismissible = false) => {
  const classes = ['auth-alert', `auth-alert-${type}`]

  if (dismissible) {
    classes.push('auth-alert-dismissible')
  }

  return classes.join(' ')
}

// 生成标签类名
export const getTagClasses = (variant = 'default', size = 'medium') => {
  return `auth-tag auth-tag-${variant} auth-tag-${size}`
}

// 生成加载器类名
export const getSpinnerClasses = (size = 'medium') => {
  return `auth-spinner auth-spinner-${size}`
}

// 生成下拉菜单类名
export const getDropdownClasses = (isOpen = false, direction = 'down') => {
  const classes = ['auth-dropdown']

  if (isOpen) classes.push('auth-dropdown-open')
  classes.push(`auth-dropdown-${direction}`)

  return classes.join(' ')
}
