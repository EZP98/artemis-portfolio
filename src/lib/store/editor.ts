/**
 * Editor Store - Zustand + Immer
 *
 * Gestisce lo stato dell'editor:
 * - Schema del progetto
 * - Elemento selezionato
 * - Tool attivo
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from 'nanoid'
import type { TplNode, Page, Project } from '@/types/schema'

// ============================================
// STATE
// ============================================
interface EditorState {
  // Dati
  project: Project | null
  currentPageId: string | null
  selectedNodeId: string | null

  // UI
  tool: 'select' | 'frame' | 'text'
  zoom: number
}

// ============================================
// ACTIONS
// ============================================
interface EditorActions {
  // Project
  createProject: (name: string) => void

  // Pages
  addPage: (name: string) => void
  deletePage: (pageId: string) => void
  setCurrentPage: (pageId: string) => void
  renamePage: (pageId: string, name: string) => void

  // Nodes
  addNode: (node: TplNode, parentId?: string) => void
  updateNode: (nodeId: string, updates: Partial<TplNode>) => void
  updateNodeLayout: (nodeId: string, layout: Partial<TplNode['layout']>) => void
  updateNodeStyles: (nodeId: string, styles: Partial<TplNode['styles']>) => void
  deleteNode: (nodeId: string) => void

  // Selection
  selectNode: (nodeId: string | null) => void

  // Tools
  setTool: (tool: EditorState['tool']) => void
  setZoom: (zoom: number) => void

  // Helpers
  getCurrentPage: () => Page | null
  getSelectedNode: () => TplNode | null
}

// ============================================
// HELPERS
// ============================================

// Trova un nodo ricorsivamente
function findNode(node: TplNode, id: string): TplNode | null {
  if (node.id === id) return node
  for (const child of node.children) {
    const found = findNode(child, id)
    if (found) return found
  }
  return null
}

// Aggiorna un nodo ricorsivamente
function updateNodeInTree(node: TplNode, id: string, updates: Partial<TplNode>): TplNode {
  if (node.id === id) {
    return { ...node, ...updates }
  }
  return {
    ...node,
    children: node.children.map(child => updateNodeInTree(child, id, updates))
  }
}

// Elimina un nodo ricorsivamente
function deleteNodeFromTree(node: TplNode, id: string): TplNode {
  return {
    ...node,
    children: node.children
      .filter(child => child.id !== id)
      .map(child => deleteNodeFromTree(child, id))
  }
}

// Aggiunge un nodo come figlio
function addNodeToParent(node: TplNode, parentId: string, newNode: TplNode): TplNode {
  if (node.id === parentId) {
    return { ...node, children: [...node.children, newNode] }
  }
  return {
    ...node,
    children: node.children.map(child => addNodeToParent(child, parentId, newNode))
  }
}

// ============================================
// STORE
// ============================================
export const useEditorStore = create<EditorState & EditorActions>()(
  immer((set, get) => ({
    // Initial state
    project: null,
    currentPageId: null,
    selectedNodeId: null,
    tool: 'select',
    zoom: 1,

    // ========== PROJECT ==========
    createProject: (name) => {
      const pageId = nanoid()
      const rootId = nanoid()

      set({
        project: {
          id: nanoid(),
          name,
          pages: [{
            id: pageId,
            name: 'Home',
            root: {
              id: rootId,
              type: 'frame',
              name: 'Root',
              layout: {
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              },
              styles: {
                backgroundColor: '#ffffff',
                padding: 24
              },
              children: []
            }
          }]
        },
        currentPageId: pageId
      })
    },

    // ========== PAGES ==========
    addPage: (name) => {
      set((state) => {
        if (!state.project) return

        const pageId = nanoid()
        const rootId = nanoid()

        state.project.pages.push({
          id: pageId,
          name,
          root: {
            id: rootId,
            type: 'frame',
            name: 'Root',
            layout: {
              x: 0,
              y: 0,
              width: 800,
              height: 600,
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            },
            styles: {
              backgroundColor: '#ffffff',
              padding: 24
            },
            children: []
          }
        })
        state.currentPageId = pageId
        state.selectedNodeId = null
      })
    },

    deletePage: (pageId) => {
      set((state) => {
        if (!state.project || state.project.pages.length <= 1) return

        const index = state.project.pages.findIndex(p => p.id === pageId)
        if (index === -1) return

        state.project.pages.splice(index, 1)

        // Se era la pagina corrente, seleziona un'altra
        if (state.currentPageId === pageId) {
          state.currentPageId = state.project.pages[0].id
          state.selectedNodeId = null
        }
      })
    },

    setCurrentPage: (pageId) => {
      set({ currentPageId: pageId, selectedNodeId: null })
    },

    renamePage: (pageId, name) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === pageId)
        if (page) page.name = name
      })
    },

    // ========== NODES ==========
    addNode: (node, parentId) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === state.currentPageId)
        if (!page) return

        const targetId = parentId || page.root.id
        page.root = addNodeToParent(page.root, targetId, node)
      })

      // Seleziona il nuovo nodo
      get().selectNode(node.id)
    },

    updateNode: (nodeId, updates) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === state.currentPageId)
        if (!page) return
        page.root = updateNodeInTree(page.root, nodeId, updates)
      })
    },

    updateNodeLayout: (nodeId, layout) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === state.currentPageId)
        if (!page) return

        const node = findNode(page.root, nodeId)
        if (!node) return

        page.root = updateNodeInTree(page.root, nodeId, {
          layout: { ...node.layout, ...layout }
        })
      })
    },

    updateNodeStyles: (nodeId, styles) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === state.currentPageId)
        if (!page) return

        const node = findNode(page.root, nodeId)
        if (!node) return

        page.root = updateNodeInTree(page.root, nodeId, {
          styles: { ...node.styles, ...styles }
        })
      })
    },

    deleteNode: (nodeId) => {
      set((state) => {
        const page = state.project?.pages.find(p => p.id === state.currentPageId)
        if (!page) return

        page.root = deleteNodeFromTree(page.root, nodeId)

        // Deseleziona se era selezionato
        if (state.selectedNodeId === nodeId) {
          state.selectedNodeId = null
        }
      })
    },

    // ========== SELECTION ==========
    selectNode: (nodeId) => {
      set({ selectedNodeId: nodeId })
    },

    // ========== TOOLS ==========
    setTool: (tool) => {
      set({ tool })
    },

    setZoom: (zoom) => {
      set({ zoom: Math.max(0.25, Math.min(2, zoom)) })
    },

    // ========== HELPERS ==========
    getCurrentPage: () => {
      const { project, currentPageId } = get()
      if (!project || !currentPageId) return null
      return project.pages.find(p => p.id === currentPageId) || null
    },

    getSelectedNode: () => {
      const { selectedNodeId } = get()
      const page = get().getCurrentPage()
      if (!page || !selectedNodeId) return null
      return findNode(page.root, selectedNodeId)
    }
  }))
)
