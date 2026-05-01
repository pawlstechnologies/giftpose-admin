/* ═══════════════════════════════════════════════════════════
   src/data/categoryData.ts
   Central type definitions + rich dummy data for the
   Category Management section.
   ═══════════════════════════════════════════════════════════ */

/* ─── Types ──────────────────────────────────────────────── */

export interface ContentItem {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
  active: boolean;
  content: ContentItem[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  source: 'manual' | 'ai';
  active: boolean;
  needsReview?: boolean;
  subcategories: Subcategory[];
}

/* ─── Helpers ────────────────────────────────────────────── */
let _nextId = 1000;
export const genId = () => String(_nextId++);

/* ─── Dummy data ─────────────────────────────────────────── */

export const SEED_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Interior Design',
    description: 'Home and office décor items',
    source: 'manual',
    active: true,
    subcategories: [
      {
        id: 's1',
        name: 'Furniture',
        active: true,
        content: [
          { id: 'c1', name: 'Arm Chair' },
          { id: 'c2', name: 'Office Chair' },
          { id: 'c3', name: 'Dining Chair' },
        ],
      },
      {
        id: 's2',
        name: 'Lighting',
        active: true,
        content: [
          { id: 'c4', name: 'Floor Lamp' },
          { id: 'c5', name: 'Pendant Light' },
          { id: 'c6', name: 'Wall Sconce' },
        ],
      },
      {
        id: 's3',
        name: 'Wall Decor',
        active: true,
        content: [
          { id: 'c7', name: 'Canvas Print' },
          { id: 'c8', name: 'Mirror' },
        ],
      },
      {
        id: 's4',
        name: 'Rugs & Carpets',
        active: false,
        content: [
          { id: 'c9', name: 'Wool Rug' },
          { id: 'c10', name: 'Jute Mat' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Electronics',
    description: 'Gadgets, devices and accessories',
    source: 'ai',
    active: true,
    needsReview: true,
    subcategories: [
      {
        id: 's5',
        name: 'Smartphones',
        active: true,
        content: [
          { id: 'c11', name: 'iPhone 15' },
          { id: 'c12', name: 'Samsung S24' },
          { id: 'c13', name: 'Google Pixel 8' },
        ],
      },
      {
        id: 's6',
        name: 'Laptops',
        active: true,
        content: [
          { id: 'c14', name: 'MacBook Pro' },
          { id: 'c15', name: 'Dell XPS 15' },
        ],
      },
      {
        id: 's7',
        name: 'Audio',
        active: true,
        content: [
          { id: 'c16', name: 'AirPods Pro' },
          { id: 'c17', name: 'Sony WH-1000XM5' },
          { id: 'c18', name: 'Bose QC45' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Apparel',
    description: 'Clothing and fashion accessories',
    source: 'manual',
    active: true,
    subcategories: [
      {
        id: 's8',
        name: 'Men',
        active: true,
        content: [
          { id: 'c19', name: 'T-Shirts' },
          { id: 'c20', name: 'Trousers' },
          { id: 'c21', name: 'Formal Shirts' },
        ],
      },
      {
        id: 's9',
        name: 'Women',
        active: true,
        content: [
          { id: 'c22', name: 'Dresses' },
          { id: 'c23', name: 'Blouses' },
          { id: 'c24', name: 'Skirts' },
        ],
      },
      {
        id: 's10',
        name: 'Kids',
        active: false,
        content: [
          { id: 'c25', name: 'Shorts' },
          { id: 'c26', name: 'Tops' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Outdoor & Garden',
    description: 'Tools and furniture for outdoor spaces',
    source: 'manual',
    active: true,
    subcategories: [
      {
        id: 's11',
        name: 'Garden Tools',
        active: true,
        content: [
          { id: 'c27', name: 'Shovel' },
          { id: 'c28', name: 'Rake' },
          { id: 'c29', name: 'Pruning Shears' },
        ],
      },
      {
        id: 's12',
        name: 'Outdoor Furniture',
        active: true,
        content: [
          { id: 'c30', name: 'Garden Chair' },
          { id: 'c31', name: 'Bench' },
          { id: 'c32', name: 'Hammock' },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Books & Media',
    description: 'Educational materials and entertainment',
    source: 'manual',
    active: true,
    subcategories: [
      {
        id: 's13',
        name: 'Textbooks',
        active: true,
        content: [
          { id: 'c33', name: 'Mathematics' },
          { id: 'c34', name: 'Science' },
          { id: 'c35', name: 'History' },
        ],
      },
      {
        id: 's14',
        name: 'Fiction',
        active: true,
        content: [
          { id: 'c36', name: 'Novels' },
          { id: 'c37', name: 'Short Stories' },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Sports & Fitness',
    description: 'Exercise equipment and outdoor gear',
    source: 'ai',
    active: false,
    needsReview: true,
    subcategories: [
      {
        id: 's15',
        name: 'Gym Equipment',
        active: false,
        content: [
          { id: 'c38', name: 'Dumbbells' },
          { id: 'c39', name: 'Resistance Bands' },
        ],
      },
      {
        id: 's16',
        name: 'Cycling',
        active: true,
        content: [
          { id: 'c40', name: 'Road Bike' },
          { id: 'c41', name: 'Helmet' },
        ],
      },
    ],
  },
];