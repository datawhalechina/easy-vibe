<template>
  <div class="css-props-ref">
    <div class="intro">
      CSS
      属性就像装修队的“施工指令”。常用的其实只有几十个，这里有一份“装修菜单”供你参考：
    </div>

    <div class="categories">
      <div v-for="(cat, index) in categories" :key="index" class="category">
        <div class="cat-title">{{ cat.title }}</div>
        <div class="props-grid">
          <div
            v-for="prop in cat.props"
            :key="prop.name"
            class="prop-item"
            @click="activeProp = prop"
            :class="{ active: activeProp && activeProp.name === prop.name }"
          >
            <div class="prop-name">{{ prop.name }}</div>
            <div class="prop-desc">{{ prop.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeProp" class="prop-detail">
      <div class="detail-header">
        <span class="detail-name">{{ activeProp.name }}</span>
        <span class="detail-cat-badge">{{ activeProp.categoryLabel }}</span>
      </div>
      <div class="detail-desc">{{ activeProp.fullDesc }}</div>
      <div class="detail-code">
        <div class="code-label">示例代码：</div>
        <pre><code>{{ activeProp.example }}</code></pre>
      </div>
    </div>
    <div v-else class="prop-detail empty">点击上面的属性看看它能做什么 👆</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeProp = ref(null)

const categories = [
  {
    title: '📝 文字与排版',
    props: [
      {
        name: 'color',
        desc: '文字颜色',
        categoryLabel: '文字',
        fullDesc:
          '改变文字的颜色。可以使用英文单词(red)、十六进制(#ff0000)或RGB值。',
        example: 'color: #333333;'
      },
      {
        name: 'font-size',
        desc: '字号大小',
        categoryLabel: '文字',
        fullDesc: '设置文字的大小。常用单位是 px (像素) 或 rem。',
        example: 'font-size: 16px;'
      },
      {
        name: 'font-weight',
        desc: '字体粗细',
        categoryLabel: '文字',
        fullDesc: '设置文字的粗细。bold 是加粗，normal 是正常。',
        example: 'font-weight: bold;'
      },
      {
        name: 'text-align',
        desc: '对齐方式',
        categoryLabel: '排版',
        fullDesc:
          '设置文字水平对齐方式：左对齐(left)、居中(center)、右对齐(right)。',
        example: 'text-align: center;'
      },
      {
        name: 'line-height',
        desc: '行高',
        categoryLabel: '排版',
        fullDesc: '设置行间距。通常设为 1.5 左右让阅读更舒服。',
        example: 'line-height: 1.5;'
      }
    ]
  },
  {
    title: '📦 盒子与大小',
    props: [
      {
        name: 'width / height',
        desc: '宽 / 高',
        categoryLabel: '尺寸',
        fullDesc: '设置元素的宽度和高度。',
        example: 'width: 100px;\nheight: 50px;'
      },
      {
        name: 'padding',
        desc: '内边距',
        categoryLabel: '间距',
        fullDesc:
          '盒子内部的空间（内容距离边框的距离）。像填充泡沫一样撑大盒子。',
        example: 'padding: 20px;'
      },
      {
        name: 'margin',
        desc: '外边距',
        categoryLabel: '间距',
        fullDesc: '盒子外部的空间（盒子与其他元素之间的距离）。',
        example: 'margin: 20px;'
      },
      {
        name: 'background',
        desc: '背景',
        categoryLabel: '外观',
        fullDesc: '设置背景颜色或背景图片。',
        example: 'background: #f0f0f0;'
      }
    ]
  },
  {
    title: '🎨 边框与装饰',
    props: [
      {
        name: 'border',
        desc: '边框',
        categoryLabel: '边框',
        fullDesc: '设置边框的粗细、样式和颜色。',
        example: 'border: 1px solid #ccc;'
      },
      {
        name: 'border-radius',
        desc: '圆角',
        categoryLabel: '边框',
        fullDesc: '让盒子的角变圆润。现在的按钮通常都有点圆角。',
        example: 'border-radius: 8px;'
      },
      {
        name: 'box-shadow',
        desc: '阴影',
        categoryLabel: '装饰',
        fullDesc: '给盒子添加阴影效果，增加立体感和层次感。',
        example: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);'
      },
      {
        name: 'opacity',
        desc: '透明度',
        categoryLabel: '装饰',
        fullDesc: '设置元素的透明度，0 是全透明（看不见但还在），1 是不透明。',
        example: 'opacity: 0.8;'
      }
    ]
  },
  {
    title: '📐 布局与定位',
    props: [
      {
        name: 'display',
        desc: '显示模式',
        categoryLabel: '布局',
        fullDesc:
          '决定盒子怎么摆。block(独占一行), flex(弹性布局), none(隐藏)。',
        example: 'display: flex;'
      },
      {
        name: 'position',
        desc: '定位方式',
        categoryLabel: '定位',
        fullDesc:
          '决定盒子怎么定位。relative(相对), absolute(绝对), fixed(固定在屏幕)。',
        example: 'position: absolute;\ntop: 0;\nleft: 0;'
      },
      {
        name: 'z-index',
        desc: '层级',
        categoryLabel: '定位',
        fullDesc: '决定谁叠在谁上面。数字越大越靠上。',
        example: 'z-index: 100;'
      },
      {
        name: 'cursor',
        desc: '鼠标手势',
        categoryLabel: '交互',
        fullDesc: '鼠标移上去变成什么样。pointer(小手), text(输入光标)。',
        example: 'cursor: pointer;'
      }
    ]
  }
]
</script>

<style scoped>
.css-props-ref {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
}

.intro {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cat-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  border-left: 3px solid var(--vp-c-brand);
  padding-left: 8px;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.prop-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.prop-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.prop-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.prop-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 2px;
}

.prop-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.prop-detail {
  margin-top: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  animation: fadeIn 0.3s ease;
}

.prop-detail.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
  border-style: dashed;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.detail-name {
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.detail-cat-badge {
  font-size: 11px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.detail-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 12px;
}

.detail-code {
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.code-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
  font-weight: 600;
}

pre {
  margin: 0;
  background: transparent !important;
  padding: 0 !important;
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
