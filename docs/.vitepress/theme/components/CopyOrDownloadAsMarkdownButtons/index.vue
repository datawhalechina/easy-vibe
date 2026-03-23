<template>
	<div class="markdown-copy-buttons">
		<div class="markdown-copy-buttons-inner">
			<div class="dropdown-container" ref="dropdownContainer">
				<!-- Main button -->
				<div class="dropdown-trigger">
					<!-- Copy area -->
					<button class="copy-page" @click="copyAsMarkdown">
						<span v-html="copied ? iconCheck : iconCopy" class="icon"></span>
						<span class="label">
							{{ copied ? 'Copied' : 'Copy page' }}
						</span>
					</button>

					<span class="divider"></span>

					<!-- Chevron area -->
					<button class="chevron-wrapper" @click.stop="toggleDropdown">
						<span v-html="iconChevron" class="icon chevron" :class="{ open: isOpen }"></span>
					</button>
				</div>

				<!-- Dropdown -->
				<div v-if="isRendered" ref="dropdownMenu" class="dropdown-menu" :class="{ open: isOpen }">
					<button class="dropdown-item" @click="viewAsMarkdown">
						<span v-html="iconMarkdown" class="icon"></span>
						View as Markdown
						<span v-html="iconExternal" class="icon external"></span>
					</button>

					<button
						v-for="provider in aiProviders"
						:key="provider.name"
						class="dropdown-item"
						@click="openInAI(provider)"
					>
						<span v-html="provider.icon" class="icon"></span>
						Open in {{ provider.name }}
						<span v-html="iconExternal" class="icon external"></span>
					</button>
				</div>
			</div>

			<!-- Download button -->
			<button class="download-btn" @click="downloadMarkdown">
				<span v-html="downloaded ? iconCheck : iconDownload" class="icon"></span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useData } from 'vitepress'

import iconChatGPT from './icons/chatgpt.svg?raw'
import iconCheck from './icons/check.svg?raw'
import iconChevron from './icons/chevron.svg?raw'
import iconClaude from './icons/claude.svg?raw'
import iconCopy from './icons/copy.svg?raw'
import iconDownload from './icons/download.svg?raw'
import iconExternal from './icons/external.svg?raw'
import iconMarkdown from './icons/markdown.svg?raw'

import { downloadFile } from './utils'

const { page, site } = useData()

const getMarkdownUrl = () => {
	const origin = window.location.origin
	let base = site.value.base || '/'
	if (!base.endsWith('/')) base += '/'
	return `${origin}${base}${page.value.filePath}`
}

const aiProviders = [
	{ name: 'ChatGPT', icon: iconChatGPT, url: 'https://chatgpt.com/?hints=search&prompt=' },
	{ name: 'Claude', icon: iconClaude, url: 'https://claude.ai/new?q=' },
]

const isOpen = ref(false)
const copied = ref(false)
const downloaded = ref(false)
const dropdownContainer = ref(null)
const isRendered = ref(false)
const dropdownMenu = ref(null)

function toggleDropdown() {
	if (isOpen.value) {
		// close
		isOpen.value = false

		const el = dropdownMenu.value
		if (!el) return

		const onEnd = () => {
			isRendered.value = false
			el.removeEventListener('transitionend', onEnd)
		}

		el.addEventListener('transitionend', onEnd)
	} else {
		// open
		isRendered.value = true
		requestAnimationFrame(() => {
			isOpen.value = true
		})
	}
}

function copyAsMarkdown() {
	fetch(getMarkdownUrl())
		.then((r) => r.text())
		.then((text) => navigator.clipboard.writeText(text))
		.then(() => {
			copied.value = true
			setTimeout(() => {
				copied.value = false
			}, 2000)
		})
		.catch((e) => console.error('❌ Error:', e))

	isOpen.value = false
}

function viewAsMarkdown() {
	window.open(getMarkdownUrl(), '_blank')
	isOpen.value = false
}

function openInAI(provider) {
	const markdownUrl = getMarkdownUrl()
	const prompt = `Read from ${markdownUrl} so I can ask questions about it.`
	window.open(provider.url + encodeURIComponent(prompt), '_blank')
	isOpen.value = false
}

function downloadMarkdown() {
	fetch(getMarkdownUrl())
		.then((r) => r.text())
		.then((text) => {
			const filename = page.value.filePath.split('/').pop() || 'page.md'
			downloadFile(filename, text, 'text/markdown')
			downloaded.value = true
			setTimeout(() => {
				downloaded.value = false
			}, 2000)
		})
		.catch((e) => console.error('❌ Error:', e))
}

function handleClickOutside(event) {
	if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
		isOpen.value = false
	}
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.markdown-copy-buttons {
	width: 100%;
	display: flex;
	margin-bottom: 16px;
}

.markdown-copy-buttons-inner {
	margin: 16px 0;
	display: flex;
	gap: 8px;
	position: relative;
}

.dropdown-container {
	position: relative;
}

.dropdown-trigger {
	display: flex;
	align-items: stretch;
	background: transparent;
	border: 1px solid var(--vp-c-divider);
	border-radius: 6px;
	color: var(--vp-c-text-1);
	font-size: 14px;
	padding: 0;
	overflow: hidden;
}

.copy-page {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	cursor: pointer;
	white-space: nowrap;
	background: transparent;
	border: none;
}

.label {
	white-space: nowrap;
}

.divider {
	width: 1px;
	height: 25px;
	align-self: center;
	background: var(--vp-c-divider);
	opacity: 0.6;
}

.chevron-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	cursor: pointer;
	background: transparent;
	border: none;
}

.dropdown-menu {
	position: absolute;
	top: calc(100% + 4px);
	left: 0;
	min-width: 240px;
	background: var(--vp-c-bg-elv);
	border: 1px solid var(--vp-c-divider);
	border-radius: 8px;
	overflow: hidden;
	z-index: 100;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

	opacity: 0;
	transform: translateY(-6px) scale(0.96);
	pointer-events: none;
}

.dropdown-menu.open {
	opacity: 1;
	transform: translateY(0) scale(1);
	pointer-events: auto;
}

.dropdown-item {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px 16px;
	background: transparent;
	border: none;
	color: var(--vp-c-text-1);
	font-size: 14px;
	cursor: pointer;
	text-align: left;
}

.dropdown-item .icon.external {
	margin-left: auto;
	opacity: 0.6;
}

.download-btn {
	display: flex;
	align-items: center;
	padding: 8px 12px;
	background: transparent;
	border: 1px solid var(--vp-c-divider);
	border-radius: 6px;
	color: var(--vp-c-text-1);
	cursor: pointer;
}

.icon {
	width: 18px;
	height: 18px;
}

.chevron.open {
	transform: rotate(180deg);
}

.dropdown-item:hover .icon.external {
	opacity: 1;
	transform: translateX(2px);
}

@media (prefers-reduced-motion: no-preference) {
	.dropdown-menu {
		transition:
			opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: top;
	}

	/* Hover zones */
	.copy-page:hover,
	.chevron-wrapper:hover,
	.download-btn:hover {
		background: var(--vp-c-bg-soft);
	}

	.dropdown-trigger,
	.copy-page,
	.chevron-wrapper,
	.dropdown-item,
	.dropdown-item .icon.external,
	.download-btn {
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.dropdown-trigger:hover,
	.download-btn:hover {
		border-color: var(--vp-c-brand-1);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.dropdown-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 100%;
		background: var(--vp-c-brand-1);
		transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.dropdown-item:hover {
		padding-left: 20px;
	}

	.dropdown-item:hover::before {
		width: 3px;
	}

	.chevron {
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}
}
</style>

