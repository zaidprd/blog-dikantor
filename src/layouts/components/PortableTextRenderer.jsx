// src/components/PortableTextRenderer.jsx
import React from 'react';
import { PortableText } from '@portabletext/react';

// =========================================================================
// 🎯 DEFINISI KOMPONEN DENGAN STYLING ASLI (TANPA LOGIC TOC)
// =========================================================================
const components = {
  // 1. BLOCKS (Paragraf dan Heading)
  block: {
    // Paragraf
    normal: ({children}) => <p className="mb-4">{children}</p>, 
    
    // Headings (Dihapus ID dan CSS anti-scroll)
    h2: ({children}) => <h2 className="h2 my-6 text-xl font-medium">{children}</h2>, 
    h3: ({children}) => <h3 className="h3 my-5 text-lg font-medium">{children}</h3>, 
    h4: ({children}) => <h4 className="h4 my-4 font-medium">{children}</h4>, 
    
    // Blockquote
    blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>,
  },
  
  // 2. LISTS
  list: {
    bullet: ({children}) => <ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal ml-6 my-4 space-y-2">{children}</ol>,
  },
  listItem: ({children}) => <li className="mb-1">{children}</li>,

  // 3. ANNOTATIONS (Link)
  marks: {
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined} 
          className="text-primary hover:text-dark"
        >
          {children}
        </a>
      );
    },
  },
  
  // 4. EMBEDDED TYPES (Gambar)
  types: {
    image: ({value}) => {
        if (!value.asset || !value.asset._ref) return null;
        const imageUrl = `URL_CDN_SANITY/${value.asset._ref.split('-')[1]}.${value.asset._ref.split('-')[2]}`; 
        
        return (
            <img 
                src={imageUrl} 
                alt={value.alt || ''} 
                className="my-6 rounded-lg w-full h-auto" 
            />
        );
    }
  }
};

const PortableTextRenderer = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="portable-text-wrapper">
      <PortableText value={content} components={components} />
    </div>
  );
};

export default PortableTextRenderer;