import { ElementStyle } from '../types';

// Format the box shadow CSS property
export const formatBoxShadow = (shadow: ElementStyle['boxShadow']): string => {
  const { offsetX, offsetY, blurRadius, spreadRadius, color, inset } = shadow;
  return `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
};

// Generate gradient CSS
export const formatGradient = (gradient: ElementStyle['gradient']): string => {
  if (!gradient) return '';
  
  if (gradient.type === 'linear') {
    return `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`;
  } else {
    return `radial-gradient(circle, ${gradient.colors.join(', ')})`;
  }
};

// Generate image CSS
export const formatImage = (image: ElementStyle['image']): string => {
  if (!image?.url) return '';
  
  return `url(${image.url})`;
};

// Generate filter CSS
export const formatFilter = (filter: ElementStyle['filter']): string => {
  if (!filter) {
    return 'none';
  }
  const { blur = 0, brightness = 100, contrast = 100, saturate = 100 } = filter;
  return `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
};

// Generate backdrop filter CSS
export const formatBackdropFilter = (backdropFilter: ElementStyle['backdropFilter']): string => {
  if (!backdropFilter) {
    return 'none';
  }
  const { blur = 0, brightness = 100 } = backdropFilter;
  return `blur(${blur}px) brightness(${brightness}%)`;
};

// Generate font CSS
export const formatFont = (font: ElementStyle['font']): React.CSSProperties => {
  if (!font) {
    return {};
  }
  return {
    fontFamily: font.family,
    fontSize: `${font.size}px`,
    fontWeight: font.weight,
    color: font.color,
  };
};

// Generate CSS from an element's style properties
export const generateCSS = (style: ElementStyle): string => {
  const { width, height, backgroundColor, borderRadius, boxShadow, opacity, transform, zIndex, gradient, image, filter, backdropFilter, font } = style;
  
  const background = image?.url
    ? `background-image: ${formatImage(image)};
background-size: ${image.fit};
background-position: ${image.position};`
    : gradient
    ? `background: ${formatGradient(gradient)};`
    : `background-color: ${backgroundColor};`;
  
  const fontStyles = font ? `
font-family: ${font.family};
font-size: ${font.size}px;
font-weight: ${font.weight};
color: ${font.color};` : '';
  
  return `width: ${width}px;
height: ${height}px;
${background}
border-radius: ${borderRadius}px;
box-shadow: ${formatBoxShadow(boxShadow)};
opacity: ${opacity};
transform: ${transform};
z-index: ${zIndex};
filter: ${formatFilter(filter)};
backdrop-filter: ${formatBackdropFilter(backdropFilter)};${fontStyles}`;
};

// Generate a CSS object from an element's style properties (for inline styling in React)
export const generateCSSObject = (style: ElementStyle): React.CSSProperties => {
  const { width, height, backgroundColor, borderRadius, opacity, transform, zIndex, gradient, image, filter, backdropFilter, font } = style;
  
  const backgroundStyles: React.CSSProperties = image?.url
    ? {
        backgroundImage: formatImage(image),
        backgroundSize: image.fit,
        backgroundPosition: image.position,
      }
    : {
        background: gradient ? formatGradient(gradient) : backgroundColor,
      };
  
  return {
    width: `${width}px`,
    height: `${height}px`,
    ...backgroundStyles,
    borderRadius: `${borderRadius}px`,
    boxShadow: formatBoxShadow(style.boxShadow),
    opacity,
    transform,
    zIndex,
    filter: formatFilter(filter),
    backdropFilter: formatBackdropFilter(backdropFilter),
    ...(font ? formatFont(font) : {}),
  };
};

// Copy CSS to clipboard
export const copyToClipboard = async (css: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(css);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};