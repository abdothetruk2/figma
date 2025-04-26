export interface ElementStyle {
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: number;
  boxShadow: {
    offsetX: number;
    offsetY: number;
    blurRadius: number;
    spreadRadius: number;
    color: string;
    inset: boolean;
  };
  opacity: number;
  transform: string;
  zIndex: number;
  gradient: {
    type: 'linear' | 'radial';
    angle?: number;
    colors: string[];
  } | null;
  image?: {
    url: string;
    fit: 'cover' | 'contain' | 'fill' | 'none';
    position: string;
  };
  filter: {
    blur: number;
    brightness: number;
    contrast: number;
    saturate: number;
  };
  backdropFilter: {
    blur: number;
    brightness: number;
  };
  font?: {
    family: string;
    size: number;
    weight: number;
    color: string;
  };
  display?: 'flex' | 'block';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  gap?: number;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface CanvasElement {
  id: string;
  type: 'rectangle' | 'circle' | 'text' | 'image' | 'container';
  position: {
    x: number;
    y: number;
  };
  style: ElementStyle;
  content?: string;
  children?: CanvasElement[];
  parentId?: string;
}

export interface CanvasState {
  elements: CanvasElement[];
  selectedElementId: string | null;
  history: {
    past: CanvasElement[][];
    future: CanvasElement[][];
  };
  scale: number;
  offset: {
    x: number;
    y: number;
  };
}

export interface ToolState {
  activeTool: 'select' | 'rectangle' | 'circle' | 'text' | 'image' | 'container';
  isDrawing: boolean;
}