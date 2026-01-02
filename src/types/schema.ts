/**
 * Schema Types - La struttura dati di ogni elemento
 *
 * Ogni elemento nel canvas è un TplNode.
 * Lo schema è la "fonte di verità" - tutto viene generato da qui.
 */

// Un singolo nodo nell'albero
export interface TplNode {
  id: string
  type: 'frame' | 'text' | 'image'
  name: string

  // Posizione e dimensioni
  layout: {
    x: number
    y: number
    width: number
    height: number
    // Flexbox
    display?: 'block' | 'flex'
    flexDirection?: 'row' | 'column'
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
    gap?: number
  }

  // Stili visivi
  styles: {
    backgroundColor?: string
    color?: string
    fontSize?: number
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
    padding?: number
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
    opacity?: number
  }

  // Contenuto (per text/image)
  content?: {
    text?: string
    src?: string
    alt?: string
  }

  // Figli (albero)
  children: TplNode[]
}

// Una pagina del progetto
export interface Page {
  id: string
  name: string
  root: TplNode  // Il nodo radice della pagina
}

// Il progetto completo
export interface Project {
  id: string
  name: string
  pages: Page[]
}
