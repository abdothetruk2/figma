import { CanvasElement } from '../types';
import { generateCSS } from './cssGenerator';

export const generateHTMLPreview = (elements: CanvasElement[]): string => {
  const generateElementHTML = (element: CanvasElement, parentOffset = { x: 0, y: 0 }): string => {
    const css = generateCSS(element.style)
      .split('\n')
      .map(line => `  ${line}`)
      .join('\n');
    
    // Calculate absolute position with null checks and default values
    const absX = parentOffset.x + (element.position?.x ?? 0);
    const absY = parentOffset.y + (element.position?.y ?? 0);
    
    const elementStyle = `style="
${css}
  position: absolute;
  left: ${absX}px;
  top: ${absY}px;"`;
    
    // If this is a container with children, render them inside
    let childrenHTML = '';
    if (element.children && element.children.length > 0) {
      childrenHTML = element.children.map(child => 
        generateElementHTML(child, { x: absX, y: absY })
      ).join('\n');
    }

    return `<div ${elementStyle}>${element.content || ''}${childrenHTML}</div>`;
  };

  // Only render top-level elements (not children of containers which are rendered recursively)
  const topLevelElements = elements.filter(el => !elements.some(parent => 
    parent.children?.some(child => child.id === el.id)
  ));

  const elementsHTML = topLevelElements.map(el => generateElementHTML(el)).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Design Preview</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      background-color: #f9fafb;
    }
    .canvas {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="canvas">
    ${elementsHTML}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}