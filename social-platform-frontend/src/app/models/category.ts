/**
 * Purpose: Data model for post categories.
 * Note: categories are pre-seeded and can't be created/edited by users.
 */

export interface Category {
  id: number;     // unique id for the category
  name: string;   // visible name (ex: "Technology")
  slug: string;   // URL-friendly identifier (used for filters/links)
} 
