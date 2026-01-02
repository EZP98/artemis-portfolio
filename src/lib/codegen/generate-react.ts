/**
 * Codegen - Schema → React + Tailwind
 *
 * Prende un TplNode e genera codice JSX con classi Tailwind.
 * Nessuna AI, solo trasformazione deterministica.
 */

import type { TplNode, Page } from '@/types/schema'

// ============================================
// MAIN EXPORT
// ============================================
export function generateReact(page: Page): string {
  const jsx = nodeToJSX(page.root, 1)

  return `export default function ${toPascalCase(page.name)}Page() {
  return (
${jsx}
  )
}
`
}

// ============================================
// NODE → JSX
// ============================================
function nodeToJSX(node: TplNode, depth: number): string {
  const indent = '    '.repeat(depth)
  const className = generateTailwind(node)

  // Testo
  if (node.type === 'text') {
    const text = node.content?.text || 'Text'
    return `${indent}<p className="${className}">${text}</p>`
  }

  // Immagine
  if (node.type === 'image') {
    const src = node.content?.src || '/placeholder.jpg'
    const alt = node.content?.alt || ''
    return `${indent}<img src="${src}" alt="${alt}" className="${className}" />`
  }

  // Frame (container)
  if (node.children.length === 0) {
    return `${indent}<div className="${className}" />`
  }

  const children = node.children
    .map(child => nodeToJSX(child, depth + 1))
    .join('\n')

  return `${indent}<div className="${className}">
${children}
${indent}</div>`
}

// ============================================
// TAILWIND GENERATOR
// ============================================
function generateTailwind(node: TplNode): string {
  const classes: string[] = []
  const { layout, styles } = node

  // === LAYOUT ===

  // Width
  if (layout.width) {
    classes.push(`w-[${layout.width}px]`)
  }

  // Height
  if (layout.height) {
    classes.push(`h-[${layout.height}px]`)
  }

  // Display
  if (layout.display === 'flex') {
    classes.push('flex')
    if (layout.flexDirection === 'column') classes.push('flex-col')
    if (layout.justifyContent) classes.push(justifyMap[layout.justifyContent])
    if (layout.alignItems) classes.push(alignMap[layout.alignItems])
    if (layout.gap) classes.push(`gap-[${layout.gap}px]`)
  }

  // === STYLES ===

  // Background
  if (styles.backgroundColor) {
    classes.push(colorToTailwind('bg', styles.backgroundColor))
  }

  // Text color
  if (styles.color) {
    classes.push(colorToTailwind('text', styles.color))
  }

  // Font size
  if (styles.fontSize) {
    classes.push(fontSizeToTailwind(styles.fontSize))
  }

  // Font weight
  if (styles.fontWeight) {
    classes.push(`font-${styles.fontWeight}`)
  }

  // Padding
  if (styles.padding) {
    classes.push(spacingToTailwind('p', styles.padding))
  }

  // Border radius
  if (styles.borderRadius) {
    classes.push(borderRadiusToTailwind(styles.borderRadius))
  }

  // Border
  if (styles.borderWidth) {
    classes.push(`border-[${styles.borderWidth}px]`)
    if (styles.borderColor) {
      classes.push(colorToTailwind('border', styles.borderColor))
    }
  }

  // Opacity
  if (styles.opacity !== undefined && styles.opacity !== 1) {
    classes.push(`opacity-[${styles.opacity}]`)
  }

  return classes.join(' ')
}

// ============================================
// MAPPINGS
// ============================================

const justifyMap: Record<string, string> = {
  'flex-start': 'justify-start',
  'center': 'justify-center',
  'flex-end': 'justify-end',
  'space-between': 'justify-between'
}

const alignMap: Record<string, string> = {
  'flex-start': 'items-start',
  'center': 'items-center',
  'flex-end': 'items-end',
  'stretch': 'items-stretch'
}

function colorToTailwind(prefix: string, color: string): string {
  // Colori comuni
  const colorMap: Record<string, string> = {
    '#ffffff': 'white',
    '#000000': 'black',
    '#f8fafc': 'slate-50',
    '#e2e8f0': 'slate-200',
    '#64748b': 'slate-500',
    '#0f172a': 'slate-900',
    '#3b82f6': 'blue-500',
    '#ef4444': 'red-500',
    '#22c55e': 'green-500'
  }

  const mapped = colorMap[color.toLowerCase()]
  if (mapped) return `${prefix}-${mapped}`
  return `${prefix}-[${color}]`
}

function fontSizeToTailwind(size: number): string {
  const sizeMap: Record<number, string> = {
    12: 'text-xs',
    14: 'text-sm',
    16: 'text-base',
    18: 'text-lg',
    20: 'text-xl',
    24: 'text-2xl',
    30: 'text-3xl',
    36: 'text-4xl',
    48: 'text-5xl'
  }
  return sizeMap[size] || `text-[${size}px]`
}

function spacingToTailwind(prefix: string, value: number): string {
  const spacingMap: Record<number, string> = {
    0: '0',
    4: '1',
    8: '2',
    12: '3',
    16: '4',
    20: '5',
    24: '6',
    32: '8',
    40: '10',
    48: '12'
  }
  const mapped = spacingMap[value]
  if (mapped) return `${prefix}-${mapped}`
  return `${prefix}-[${value}px]`
}

function borderRadiusToTailwind(radius: number): string {
  const radiusMap: Record<number, string> = {
    0: 'rounded-none',
    4: 'rounded',
    8: 'rounded-lg',
    12: 'rounded-xl',
    16: 'rounded-2xl',
    9999: 'rounded-full'
  }
  return radiusMap[radius] || `rounded-[${radius}px]`
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^./, (chr) => chr.toUpperCase())
}
