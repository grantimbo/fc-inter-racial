import { PortableTextBlock } from '@portabletext/types';

// Standard Sanity Image structure
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface Player {
  _id: string;
  _type: 'player'; // Good practice to include the document type
  name: string;
  position?: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  
  // Images are objects, not strings (URLs)
  image?: SanityImage; 
  profilePicture?: SanityImage;
  
  squadNumber?: number;
  dob?: string; // "YYYY-MM-DD"
  nationality?: string;
  dateSigned?: string;
  
  // Bio is usually 'array' of 'block' in Sanity (Portable Text)
  bio?: PortableTextBlock[]; 
  
  formerClubs?: string[];
  
  // Gallery is an array of image objects
  gallery?: SanityImage[];
  
  // Socials (URLs are strings in Sanity)
  facebook?: string; 
  instagram?: string;
}