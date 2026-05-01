// // import { useState, useMemo } from "react";
// // import Sidebar from "../components/layout/Sidebar";
// // import Topbar from "../components/layout/Topbar";
// // import PageHeader from "../components/shared/PageHeader";
// // import TabBar from "../components/shared/TabBar";
// // import Pagination from "../components/shared/Pagination";
// // import ConfirmDialog from "../components/shared/ConfirmDialog";
// // import CategoryTable from "../components/categories/CategoryTable";
// // import CategoryModal from "../components/categories/CategoryModal";
// // import type { CategoryFormData } from "../components/categories/CategoryModal";
// // import "../styles/dashboard.css";

// // /* ─── Type ───────────────────────────────────────────────────────── */

// // export interface Category {
// //   id: string;
// //   name: string;
// //   description: string;
// //   subcategories: string[];
// //   source: "manual" | "ai";
// //   active: boolean;
// //   needsReview?: boolean;
// // }

// // /* ─── Dummy data ─────────────────────────────────────────────────── */

// // const SEED: Category[] = [
// //   {
// //     id: "1",
// //     name: "Furniture",
// //     description: "Home and office essential items",
// //     subcategories: ["Chairs", "Tables", "Beds"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "2",
// //     name: "Electronics",
// //     description: "Suggested by AI based on request trends",
// //     subcategories: ["Phones", "Laptops"],
// //     source: "ai",
// //     active: false,
// //     needsReview: true,
// //   },
// //   {
// //     id: "3",
// //     name: "Clothing",
// //     description: "Wearables for all age groups",
// //     subcategories: ["Kids", "Adults", "Winter Gear"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "4",
// //     name: "Books & Media",
// //     description: "Educational materials and entertainment",
// //     subcategories: ["Textbooks", "Fiction"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "5",
// //     name: "Kitchen & Home",
// //     description: "Cookware, appliances and home essentials",
// //     subcategories: ["Cookware", "Appliances"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "6",
// //     name: "Sports & Fitness",
// //     description: "Exercise equipment and outdoor gear",
// //     subcategories: ["Gym", "Cycling", "Outdoor"],
// //     source: "ai",
// //     active: false,
// //     needsReview: true,
// //   },
// //   {
// //     id: "7",
// //     name: "Toys & Games",
// //     description: "Play items for children and adults",
// //     subcategories: ["Board Games", "Outdoor Toys"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "8",
// //     name: "Baby & Toddler",
// //     description: "Items for infants and young children",
// //     subcategories: ["Clothing", "Gear", "Feeding"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "9",
// //     name: "Garden & Tools",
// //     description: "Gardening tools and outdoor equipment",
// //     subcategories: ["Tools", "Plants"],
// //     source: "manual",
// //     active: false,
// //   },
// //   {
// //     id: "10",
// //     name: "Vehicles",
// //     description: "Cars, bikes and accessories",
// //     subcategories: ["Cars", "Bikes", "Accessories"],
// //     source: "ai",
// //     active: false,
// //     needsReview: true,
// //   },
// //   {
// //     id: "11",
// //     name: "Health & Beauty",
// //     description: "Personal care and wellness products",
// //     subcategories: ["Skincare", "Fitness"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "12",
// //     name: "Office Supplies",
// //     description: "Stationery and office equipment",
// //     subcategories: ["Stationery", "Desks"],
// //     source: "manual",
// //     active: true,
// //   },
// //   {
// //     id: "13",
// //     name: "Art & Craft",
// //     description: "Creative materials and artistic tools",
// //     subcategories: ["Painting", "Knitting"],
// //     source: "ai",
// //     active: false,
// //     needsReview: true,
// //   },
// //   {
// //     id: "14",
// //     name: "Musical Instruments",
// //     description: "Instruments for all skill levels",
// //     subcategories: ["Strings", "Percussion", "Wind"],
// //     source: "manual",
// //     active: true,
// //   },
// // ];

// // const ITEMS_PER_PAGE = 4;

// // /* ─── Tab config ─────────────────────────────────────────────────── */

// // const buildTabs = (cats: Category[]) => [
// //   { label: `All Categories (${cats.length})`, value: "all" },
// //   { label: `Active (${cats.filter((c) => c.active).length})`, value: "active" },
// //   {
// //     label: `Inactive (${cats.filter((c) => !c.active).length})`,
// //     value: "inactive",
// //   },
// //   {
// //     label: `Need Review (${cats.filter((c) => c.needsReview).length})`,
// //     value: "review",
// //   },
// // ];

// // /* ─── Page ───────────────────────────────────────────────────────── */

// // export default function Categories() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [categories, setCategories] = useState<Category[]>(SEED);
// //   const [activeTab, setActiveTab] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Modal state
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editTarget, setEditTarget] = useState<Category | null>(null);

// //   // Confirm delete state
// //   const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

// //   /* ── Derived data ── */
// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case "active":
// //         return categories.filter((c) => c.active);
// //       case "inactive":
// //         return categories.filter((c) => !c.active);
// //       case "review":
// //         return categories.filter((c) => c.needsReview);
// //       default:
// //         return categories;
// //     }
// //   }, [categories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage = Math.min(currentPage, totalPages);
// //   const pageRows = filtered.slice(
// //     (safePage - 1) * ITEMS_PER_PAGE,
// //     safePage * ITEMS_PER_PAGE,
// //   );

// //   const handleTabChange = (tab: string) => {
// //     setActiveTab(tab);
// //     setCurrentPage(1);
// //   };

// //   /* ── Create ── */
// //   const handleCreate = () => {
// //     setEditTarget(null);
// //     setModalOpen(true);
// //   };

// //   /* ── Edit ── */
// //   const handleEdit = (cat: Category) => {
// //     setEditTarget(cat);
// //     setModalOpen(true);
// //   };

// //   /* ── Save (create or edit) ── */
// //   const handleSave = (data: CategoryFormData) => {
// //     if (editTarget) {
// //       setCategories((prev) =>
// //         prev.map((c) => (c.id === editTarget.id ? { ...c, ...data } : c)),
// //       );
// //     } else {
// //       const newCat: Category = {
// //         id: Date.now().toString(),
// //         source: "manual",
// //         needsReview: false,
// //         ...data,
// //       };
// //       setCategories((prev) => [newCat, ...prev]);
// //     }
// //     setModalOpen(false);
// //   };

// //   /* ── Toggle active ── */
// //   const handleToggle = (id: string, active: boolean) => {
// //     setCategories((prev) =>
// //       prev.map((c) => (c.id === id ? { ...c, active } : c)),
// //     );
// //   };

// //   /* ── Add subcategory (opens edit modal pre-focused) ── */
// //   const handleAddSubcategory = (cat: Category) => handleEdit(cat);

// //   /* ── Delete ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
// //     setDeleteTarget(null);
// //     // Adjust page if last item on page was deleted
// //     setCurrentPage((p) =>
// //       Math.max(
// //         1,
// //         Math.min(p, Math.ceil((filtered.length - 1) / ITEMS_PER_PAGE)),
// //       ),
// //     );
// //   };

// //   return (
// //     <>
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar
// //         onMenuClick={() => setSidebarOpen(true)}
// //         searchPlaceholder="Search categories…"
// //       />

// //       <main className="page-content">
// //         <PageHeader
// //           title="Category Management"
// //           subtitle="Organise item donation categories and review AI-powered catalog suggestions"
// //           actions={
// //             <button className="btn-primary" onClick={handleCreate}>
// //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <circle cx="12" cy="12" r="10" />
// //                 <path d="M12 8v8M8 12h8" />
// //               </svg>
// //               Create Category
// //             </button>
// //           }
// //         />
        

        

// //         <div className="table-card">
// //           {/* Tabs */}
// //           <TabBar
// //             tabs={buildTabs(categories)}
// //             active={activeTab}
// //             onChange={handleTabChange}
// //           />

// //           {/* Table */}
// //           <CategoryTable
// //             rows={pageRows}
// //             onEdit={handleEdit}
// //             onDelete={setDeleteTarget}
// //             onToggle={handleToggle}
// //             onAddSubcategory={handleAddSubcategory}
// //           />

// //           {/* Pagination */}
// //           {filtered.length > 0 && (
// //             <Pagination
// //               currentPage={safePage}
// //               totalPages={totalPages}
// //               totalItems={filtered.length}
// //               itemsShown={pageRows.length}
// //               itemLabel="categories"
// //               onPageChange={setCurrentPage}
// //             />
// //           )}
// //         </div>
// //       </main>

// //       {/* Create / Edit Modal */}
// //       <CategoryModal
// //         isOpen={modalOpen}
// //         initialData={
// //           editTarget
// //             ? {
// //                 name: editTarget.name,
// //                 description: editTarget.description,
// //                 subcategories: editTarget.subcategories,
// //                 active: editTarget.active,
// //               }
// //             : null
// //         }
// //         onSave={handleSave}
// //         onClose={() => setModalOpen(false)}
// //       />

// //       {/* Delete Confirmation */}
// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </>
// //   );
// // }




// // import { useState, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import EditCategoryModal from '../components/categories/EditCategoryModal';
// // // import type { SEED_CATEGORIES, Category, Subcategory, genId } from '../data/CategoryData';
// // import { SEED_CATEGORIES, genId } from '../data/CategoryData';
// // import type { Category, Subcategory } from '../data/CategoryData';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Flat type for CategoryTable (unchanged API) ─────────────────── */
// // export interface FlatCategory {
// //   id: string;
// //   name: string;
// //   description: string;
// //   subcategories: string[];
// //   source: 'manual' | 'ai';
// //   active: boolean;
// //   needsReview?: boolean;
// // }

// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: Category[]) => [
// //   { label: `All (${cats.length})`,                                    value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,           value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,        value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`, value: 'review' },
// // ];

// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );

// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );

// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );

// // export default function Categories() {
// //   const navigate = useNavigate();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');
// //   const [categories, setCategories]   = useState<Category[]>(SEED_CATEGORIES);
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [activeCatId, setActiveCatId] = useState<string | null>(SEED_CATEGORIES[0]?.id ?? null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(SEED_CATEGORIES[0]?.subcategories[0]?.id ?? null);
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen]       = useState(false);
// //   const [editTarget, setEditTarget]             = useState<Category | null>(null);
// //   const [deleteTarget, setDeleteTarget]         = useState<Category | null>(null);
// //   const [newCatName, setNewCatName] = useState('');

// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id: c.id, name: c.name, description: c.description,
// //       subcategories: c.subcategories.map(s => s.name),
// //       source: c.source, active: c.active, needsReview: c.needsReview,
// //     })), [categories]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     const cat = categories.find(c => c.id === id);
// //     setActiveSubId(cat?.subcategories[0]?.id ?? null);
// //   };

// //   const handleCreateCategory = () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     const newCat: Category = { id: genId(), name, description: '', source: 'manual', active: true, subcategories: [] };
// //     setCategories(prev => [newCat, ...prev]);
// //     setActiveCatId(newCat.id);
// //     setActiveSubId(null);
// //     setNewCatName('');
// //   };

// //   const handleAddSubcategory = (categoryId: string, names: string[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== categoryId) return c;
// //       const newSubs: Subcategory[] = names.map(name => ({ id: genId(), name, active: true, content: [] }));
// //       setActiveSubId(prev => newSubs[0]?.id ?? prev);
// //       return { ...c, subcategories: [...c.subcategories, ...newSubs] };
// //     }));
// //   };

// //   const handleAddContent = (categoryId: string, subId: string, items: string[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== categoryId) return c;
// //       return {
// //         ...c, subcategories: c.subcategories.map(s => {
// //           if (s.id !== subId) return s;
// //           return { ...s, content: [...s.content, ...items.map(name => ({ id: genId(), name }))] };
// //         }),
// //       };
// //     }));
// //   };

// //   const handleOpenEdit = (cat: Category) => { setEditTarget(cat); setEditModalOpen(true); };

// //   const handleEditSubmit = (catId: string, subNames: string[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== catId) return c;
// //       const existing = c.subcategories.map(s => s.name);
// //       const toAdd = subNames.filter(n => !existing.includes(n));
// //       const newSubs: Subcategory[] = toAdd.map(name => ({ id: genId(), name, active: true, content: [] }));
// //       return { ...c, subcategories: [...c.subcategories, ...newSubs] };
// //     }));
// //     setEditModalOpen(false);
// //   };

// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         setActiveCatId(next[0]?.id ?? null);
// //         setActiveSubId(next[0]?.subcategories[0]?.id ?? null);
// //       }
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">
// //         {/* Header */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //             {/* <div className="page-subtitle">Organise item donation categories and review AI-powered catalog suggestions</div> */}
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view" style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //             {/* <button className="btn-primary" onClick={() => navigate('/categories/create')}>
// //               <PlusIcon /> Create Category__
// //             </button> */}
// //           </div>
// //         </div>

// //         {/* Browser View */}
// //         {viewMode === 'browser' && (
// //           <>
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => setNewCatName(e.target.value)}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //               />
// //               <div className="cb-create-footer">
// //                 <button className="cb-btn-create" onClick={handleCreateCategory}>
// //                   <PlusIcon /> Create Category
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="cb-card">
// //               <CategoryBrowser
// //                 categories={categories}
// //                 activeCategoryId={activeCatId}
// //                 activeSubId={activeSubId}
// //                 onSelectCategory={handleSelectCategory}
// //                 onSelectSub={setActiveSubId}
// //                 onNewSub={() => setSubModalOpen(true)}
// //                 onNewContent={() => setContentModalOpen(true)}
// //                 onEditCategory={handleOpenEdit}
// //                 onDeleteCategory={setDeleteTarget}
// //               />
// //             </div>
// //           </>
// //         )}

// //         {/* Table View */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar tabs={buildTabs(categories)} active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }} />
// //             <CategoryTable
// //               rows={pageRows}
// //               onEdit={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //               onDelete={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setDeleteTarget(cat); }}
// //               onToggle={(id, active) => setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c))}
// //               onAddSubcategory={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //             />
// //             {filtered.length > 0 && (
// //               <Pagination currentPage={safePage} totalPages={totalPages}
// //                 totalItems={filtered.length} itemsShown={pageRows.length}
// //                 itemLabel="categories" onPageChange={setCurrentPage} />
// //             )}
// //           </div>
// //         )}
// //       </main>

// //       <SubcategoryModal isOpen={subModalOpen} categories={categories}
// //         defaultCategoryId={activeCatId} onSubmit={handleAddSubcategory}
// //         onClose={() => setSubModalOpen(false)} />

// //       <ContentModal isOpen={contentModalOpen} categories={categories}
// //         defaultCategoryId={activeCatId} defaultSubId={activeSubId}
// //         onSubmit={handleAddContent} onClose={() => setContentModalOpen(false)} />

// //       <EditCategoryModal isOpen={editModalOpen} category={editTarget}
// //         allCategories={categories} onSubmit={handleEditSubmit}
// //         onClose={() => setEditModalOpen(false)} />

// //       <ConfirmDialog isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)} />
// //     </div>
// //   );
// // }





// // import { useState, useMemo, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import EditCategoryModal from '../components/categories/EditCategoryModal';
// // import { SEED_CATEGORIES, genId } from '../data/CategoryData';
// // import type { Category, Subcategory } from '../data/CategoryData';
// // import {
// //   listCategories,
// //   createCategory,
// //   type ApiCategory,
// // } from '../api/admin.api';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Helpers ────────────────────────────────────────────────────── */

// // /** Map an API category shape → local Category type */
// // function apiToLocal(api: ApiCategory): Category {
// //   return {
// //     id:            api._id,
// //     name:          api.name,
// //     description:   '',
// //     source:        'manual',
// //     active:        api.status === 'Active',
// //     needsReview:   false,
// //     subcategories: [],
// //   };
// // }

// // /* ─── Flat type for CategoryTable (unchanged) ────────────────────── */
// // export interface FlatCategory {
// //   id: string;
// //   name: string;
// //   description: string;
// //   subcategories: string[];
// //   source: 'manual' | 'ai';
// //   active: boolean;
// //   needsReview?: boolean;
// // }

// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: Category[]) => [
// //   { label: `All (${cats.length})`,                                    value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,           value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,        value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`, value: 'review' },
// // ];

// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );

// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );

// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );

// // const SpinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite' }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // /* ─── Page ───────────────────────────────────────────────────────── */
// // export default function Categories() {
// //   const navigate = useNavigate();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

// //   /* ── Category state ── */
// //   const [categories, setCategories]   = useState<Category[]>(SEED_CATEGORIES);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [fetchError, setFetchError]     = useState<string | null>(null);

// //   /* ── Browser state ── */
// //   const [activeCatId, setActiveCatId] = useState<string | null>(SEED_CATEGORIES[0]?.id ?? null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(SEED_CATEGORIES[0]?.subcategories[0]?.id ?? null);
// //   const [newCatName, setNewCatName]   = useState('');
// //   const [createLoading, setCreateLoading] = useState(false);
// //   const [createError, setCreateError]     = useState<string | null>(null);

// //   /* ── Table state ── */
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   /* ── Modal state ── */
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen]       = useState(false);
// //   const [editTarget, setEditTarget]             = useState<Category | null>(null);
// //   const [deleteTarget, setDeleteTarget]         = useState<Category | null>(null);

// //   /* ── Load real categories on mount ── */
// //   useEffect(() => {
// //     (async () => {
// //       setFetchLoading(true);
// //       setFetchError(null);
// //       try {
// //         const res = await listCategories();
// //         if (res.success && res.data.length > 0) {
// //           const loaded = res.data.map(apiToLocal);
// //           setCategories(loaded);
// //           setActiveCatId(loaded[0]?.id ?? null);
// //           setActiveSubId(null);
// //         }
// //         // If API returns empty, SEED_CATEGORIES remain as fallback
// //       } catch {
// //         setFetchError('Could not load categories from server. Showing local data.');
// //       } finally {
// //         setFetchLoading(false);
// //       }
// //     })();
// //   }, []);

// //   /* ── Derived: flat list for table ── */
// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id: c.id, name: c.name, description: c.description,
// //       subcategories: c.subcategories.map(s => s.name),
// //       source: c.source, active: c.active, needsReview: c.needsReview,
// //     })), [categories]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   /* ── Browser: select category ── */
// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     const cat = categories.find(c => c.id === id);
// //     setActiveSubId(cat?.subcategories[0]?.id ?? null);
// //   };

// //   /* ── Browser: create category via API ── */
// //   const handleCreateCategory = async () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     setCreateError(null);
// //     setCreateLoading(true);
// //     try {
// //       const res = await createCategory({ name, status: 'Active' });
// //       const newCat = apiToLocal(res.data);
// //       setCategories(prev => [newCat, ...prev]);
// //       setActiveCatId(newCat.id);
// //       setActiveSubId(null);
// //       setNewCatName('');
// //     } catch (err: any) {
// //       setCreateError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create category.'
// //       );
// //     } finally {
// //       setCreateLoading(false);
// //     }
// //   };

// //   /* ── Subcategory created (real API ids come back from modal) ── */
// //   const handleAddSubcategory = (categoryId: string, created: { id: string; name: string }[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== categoryId) return c;
// //       const newSubs: Subcategory[] = created.map(({ id, name }) => ({ id, name, active: true, content: [] }));
// //       // Select the first new subcategory
// //       setActiveSubId(newSubs[0]?.id ?? activeSubId);
// //       return { ...c, subcategories: [...c.subcategories, ...newSubs] };
// //     }));
// //   };

// //   /* ── Content created (real API ids come back from modal) ── */
// //   const handleAddContent = (categoryId: string, subId: string, created: { id: string; name: string }[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== categoryId) return c;
// //       return {
// //         ...c, subcategories: c.subcategories.map(s => {
// //           if (s.id !== subId) return s;
// //           return { ...s, content: [...s.content, ...created] };
// //         }),
// //       };
// //     }));
// //   };

// //   /* ── Edit ── */
// //   const handleOpenEdit = (cat: Category) => { setEditTarget(cat); setEditModalOpen(true); };

// //   const handleEditSubmit = (catId: string, subNames: string[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== catId) return c;
// //       const existing = c.subcategories.map(s => s.name);
// //       const toAdd = subNames.filter(n => !existing.includes(n));
// //       const newSubs: Subcategory[] = toAdd.map(name => ({ id: genId(), name, active: true, content: [] }));
// //       return { ...c, subcategories: [...c.subcategories, ...newSubs] };
// //     }));
// //     setEditModalOpen(false);
// //   };

// //   /* ── Delete ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         setActiveCatId(next[0]?.id ?? null);
// //         setActiveSubId(next[0]?.subcategories[0]?.id ?? null);
// //       }
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">

// //         {/* ── Header — exact from document ── */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view" style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Fetch error banner ── */}
// //         {fetchError && (
// //           <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 9, padding: '10px 16px', fontSize: 13, color: '#92400e', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
// //             </svg>
// //             {fetchError}
// //           </div>
// //         )}

// //         {/* ── Browser View — exact from document ── */}
// //         {viewMode === 'browser' && (
// //           <>
// //             {/* Create card with API */}
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //                 disabled={createLoading}
// //               />
// //               {/* Create error inline */}
// //               {createError && (
// //                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
// //                   {createError}
// //                 </div>
// //               )}
// //               <div className="cb-create-footer">
// //                 <button
// //                   className="cb-btn-create"
// //                   onClick={handleCreateCategory}
// //                   disabled={createLoading || !newCatName.trim()}
// //                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
// //                 >
// //                   {createLoading ? <SpinIcon /> : <PlusIcon />}
// //                   {createLoading ? 'Creating…' : 'Create Category'}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* 3-column browser */}
// //             <div className="cb-card">
// //               {fetchLoading ? (
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                   <SpinIcon /> Loading categories…
// //                 </div>
// //               ) : (
// //                 <CategoryBrowser
// //                   categories={categories}
// //                   activeCategoryId={activeCatId}
// //                   activeSubId={activeSubId}
// //                   onSelectCategory={handleSelectCategory}
// //                   onSelectSub={setActiveSubId}
// //                   onNewSub={() => setSubModalOpen(true)}
// //                   onNewContent={() => setContentModalOpen(true)}
// //                   onEditCategory={handleOpenEdit}
// //                   onDeleteCategory={setDeleteTarget}
// //                 />
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* ── Table View — exact from document ── */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar tabs={buildTabs(categories)} active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }} />
// //             {fetchLoading ? (
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                 <SpinIcon /> Loading categories…
// //               </div>
// //             ) : (
// //               <CategoryTable
// //                 rows={pageRows}
// //                 onEdit={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //                 onDelete={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setDeleteTarget(cat); }}
// //                 onToggle={(id, active) => setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c))}
// //                 onAddSubcategory={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //               />
// //             )}
// //             {!fetchLoading && filtered.length > 0 && (
// //               <Pagination currentPage={safePage} totalPages={totalPages}
// //                 totalItems={filtered.length} itemsShown={pageRows.length}
// //                 itemLabel="categories" onPageChange={setCurrentPage} />
// //             )}
// //           </div>
// //         )}
// //       </main>

// //       {/* ── Modals — SubcategoryModal and ContentModal now call real API ── */}
// //       <SubcategoryModal
// //         isOpen={subModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         onSubmit={handleAddSubcategory}
// //         onClose={() => setSubModalOpen(false)}
// //       />

// //       <ContentModal
// //         isOpen={contentModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         defaultSubId={activeSubId}
// //         onSubmit={handleAddContent}
// //         onClose={() => setContentModalOpen(false)}
// //       />

// //       <EditCategoryModal
// //         isOpen={editModalOpen}
// //         category={editTarget}
// //         allCategories={categories}
// //         onSubmit={handleEditSubmit}
// //         onClose={() => setEditModalOpen(false)}
// //       />

// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </div>
// //   );
// // }


// // import { useState, useMemo, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser, { type CategoryBrowserHandle } from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import EditCategoryModal from '../components/categories/EditCategoryModal';
// // import { SEED_CATEGORIES, genId } from '../data/CategoryData';
// // import type { Category, Subcategory } from '../data/CategoryData';
// // import {
// //   listCategories,
// //   createCategory,
// //   type ApiCategory,
// // } from '../api/admin.api';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Helper: map API shape → local Category type ───────────── */
// // function apiToLocal(api: ApiCategory): Category {
// //   return {
// //     id:            api._id,
// //     name:          api.name,
// //     description:   '',
// //     source:        'manual',
// //     active:        api.status === 'Active',
// //     needsReview:   false,
// //     subcategories: [],  // tree loaded lazily by CategoryBrowser
// //   };
// // }

// // /* ─── Flat type for CategoryTable ───────────────────────────── */
// // export interface FlatCategory {
// //   id: string;
// //   name: string;
// //   description: string;
// //   subcategories: string[];
// //   source: 'manual' | 'ai';
// //   active: boolean;
// //   needsReview?: boolean;
// // }

// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: Category[]) => [
// //   { label: `All (${cats.length})`,                                    value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,           value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,        value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`, value: 'review' },
// // ];

// // /* ─── Icons ──────────────────────────────────────────────────── */
// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );
// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );
// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );
// // const SpinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite' }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // /* ─── Page ───────────────────────────────────────────────────── */
// // export default function Categories() {
// //   const navigate    = useNavigate();
// //   const browserRef  = useRef<CategoryBrowserHandle>(null);

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

// //   /* ── Category list state ── */
// //   const [categories, setCategories]     = useState<Category[]>(SEED_CATEGORIES);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [fetchError, setFetchError]     = useState<string | null>(null);

// //   /* ── Browser selection ── */
// //   const [activeCatId, setActiveCatId] = useState<string | null>(SEED_CATEGORIES[0]?.id ?? null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(null);

// //   /* ── Create category form ── */
// //   const [newCatName, setNewCatName]       = useState('');
// //   const [createLoading, setCreateLoading] = useState(false);
// //   const [createError, setCreateError]     = useState<string | null>(null);

// //   /* ── Table state ── */
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   /* ── Modal state ── */
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen]       = useState(false);
// //   const [editTarget, setEditTarget]             = useState<Category | null>(null);
// //   const [deleteTarget, setDeleteTarget]         = useState<Category | null>(null);

// //   /* ── Load real categories on mount ── */
// //   useEffect(() => {
// //     (async () => {
// //       setFetchLoading(true);
// //       setFetchError(null);
// //       try {
// //         const res = await listCategories();
// //         if (res.success && res.data.length > 0) {
// //           const loaded = res.data.map(apiToLocal);
// //           setCategories(loaded);
// //           setActiveCatId(loaded[0]?.id ?? null);
// //           setActiveSubId(null);
// //         }
// //         // If server returns empty, seed data stays as fallback
// //       } catch {
// //         setFetchError('Could not reach server. Showing local data.');
// //       } finally {
// //         setFetchLoading(false);
// //       }
// //     })();
// //   }, []);

// //   /* ── Derived flat list for table view ── */
// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id: c.id, name: c.name, description: c.description,
// //       subcategories: c.subcategories.map(s => s.name),
// //       source: c.source, active: c.active, needsReview: c.needsReview,
// //     })), [categories]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   /* ── Select category — also clears sub selection ── */
// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     setActiveSubId(null);
// //   };

// //   /* ── Create category via API ── */
// //   const handleCreateCategory = async () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     setCreateError(null);
// //     setCreateLoading(true);
// //     try {
// //       const res = await createCategory({ name, status: 'Active' });
// //       const newCat = apiToLocal(res.data);
// //       setCategories(prev => [newCat, ...prev]);
// //       setActiveCatId(newCat.id);
// //       setActiveSubId(null);
// //       setNewCatName('');
// //     } catch (err: any) {
// //       setCreateError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create category.'
// //       );
// //     } finally {
// //       setCreateLoading(false);
// //     }
// //   };

// //   /* ── After SubcategoryModal succeeds → invalidate tree so browser re-fetches ── */
// //   const handleSubcategoryCreated = (categoryId: string, _created: { id: string; name: string }[]) => {
// //     // Invalidate the cached tree for this category — browser will re-fetch from API
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── After ContentModal succeeds → invalidate tree ── */
// //   const handleContentCreated = (categoryId: string, _subId: string, _created: { id: string; name: string }[]) => {
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── Edit (local only for now — no edit API provided) ── */
// //   const handleOpenEdit = (cat: Category) => { setEditTarget(cat); setEditModalOpen(true); };

// //   const handleEditSubmit = (catId: string, subNames: string[]) => {
// //     setCategories(prev => prev.map(c => {
// //       if (c.id !== catId) return c;
// //       const existing = c.subcategories.map(s => s.name);
// //       const toAdd = subNames.filter(n => !existing.includes(n));
// //       const newSubs: Subcategory[] = toAdd.map(name => ({ id: genId(), name, active: true, content: [] }));
// //       return { ...c, subcategories: [...c.subcategories, ...newSubs] };
// //     }));
// //     setEditModalOpen(false);
// //   };

// //   /* ── Delete (local only — no delete API provided) ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         setActiveCatId(next[0]?.id ?? null);
// //         setActiveSubId(null);
// //       }
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">

// //         {/* ── Header — exact from design ── */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view" style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Server warning banner ── */}
// //         {fetchError && (
// //           <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 9, padding: '10px 16px', fontSize: 13, color: '#92400e', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
// //               <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
// //             </svg>
// //             {fetchError}
// //           </div>
// //         )}

// //         {/* ══════════ BROWSER VIEW ══════════ */}
// //         {viewMode === 'browser' && (
// //           <>
// //             {/* Create category card */}
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //                 disabled={createLoading}
// //               />
// //               {createError && (
// //                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //                   </svg>
// //                   {createError}
// //                 </div>
// //               )}
// //               <div className="cb-create-footer">
// //                 <button
// //                   className="cb-btn-create"
// //                   onClick={handleCreateCategory}
// //                   disabled={createLoading || !newCatName.trim()}
// //                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
// //                 >
// //                   {createLoading ? <SpinIcon /> : <PlusIcon />}
// //                   {createLoading ? 'Creating…' : 'Create Category'}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* 3-column browser — ref wired for tree invalidation */}
// //             <div className="cb-card">
// //               {fetchLoading ? (
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                   <SpinIcon /> Loading categories…
// //                 </div>
// //               ) : (
// //                 <CategoryBrowser
// //                   ref={browserRef}
// //                   categories={categories}
// //                   activeCategoryId={activeCatId}
// //                   activeSubId={activeSubId}
// //                   onSelectCategory={handleSelectCategory}
// //                   onSelectSub={setActiveSubId}
// //                   onNewSub={() => setSubModalOpen(true)}
// //                   onNewContent={() => setContentModalOpen(true)}
// //                   onEditCategory={handleOpenEdit}
// //                   onDeleteCategory={setDeleteTarget}
// //                 />
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* ══════════ TABLE VIEW ══════════ */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar tabs={buildTabs(categories)} active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }} />
// //             {fetchLoading ? (
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                 <SpinIcon /> Loading categories…
// //               </div>
// //             ) : (
// //               <CategoryTable
// //                 rows={pageRows}
// //                 onEdit={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //                 onDelete={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setDeleteTarget(cat); }}
// //                 onToggle={(id, active) => setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c))}
// //                 onAddSubcategory={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) handleOpenEdit(cat); }}
// //               />
// //             )}
// //             {!fetchLoading && filtered.length > 0 && (
// //               <Pagination currentPage={safePage} totalPages={totalPages}
// //                 totalItems={filtered.length} itemsShown={pageRows.length}
// //                 itemLabel="categories" onPageChange={setCurrentPage} />
// //             )}
// //           </div>
// //         )}

// //       </main>

// //       {/* ── Modals ── */}
// //       <SubcategoryModal
// //         isOpen={subModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         onSubmit={handleSubcategoryCreated}
// //         onClose={() => setSubModalOpen(false)}
// //       />

// //       <ContentModal
// //         isOpen={contentModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         defaultSubId={activeSubId}
// //         onSubmit={handleContentCreated}
// //         onClose={() => setContentModalOpen(false)}
// //       />

// //       <EditCategoryModal
// //         isOpen={editModalOpen}
// //         category={editTarget}
// //         allCategories={categories}
// //         onSubmit={handleEditSubmit}
// //         onClose={() => setEditModalOpen(false)}
// //       />

// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </div>
// //   );
// // }



// // import { useState, useMemo, useEffect, useRef } from 'react';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser, { type CategoryBrowserHandle } from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import EditCategoryModal from '../components/categories/EditCategoryModal';
// // import {
// //   listCategories,
// //   createCategory,
// //   type ApiCategory,
// // } from '../api/admin.api';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Types (no external dependency) ───────────────────────── */
// // export interface LocalCategory {
// //   id:          string;
// //   name:        string;
// //   active:      boolean;
// //   source:      'manual' | 'ai';
// //   needsReview: boolean;
// // }

// // /* ─── Flat type for CategoryTable ───────────────────────────── */
// // export interface FlatCategory {
// //   id:            string;
// //   name:          string;
// //   description:   string;
// //   subcategories: string[];
// //   source:        'manual' | 'ai';
// //   active:        boolean;
// //   needsReview?:  boolean;
// // }

// // /* ─── Map API response → local shape ───────────────────────── */
// // function apiToLocal(api: ApiCategory): LocalCategory {
// //   return {
// //     id:          api._id,
// //     name:        api.name,
// //     active:      api.status === 'Active',
// //     source:      'manual',
// //     needsReview: false,
// //   };
// // }

// // /* ─── Constants ─────────────────────────────────────────────── */
// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: LocalCategory[]) => [
// //   { label: `All (${cats.length})`,                                       value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,              value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,           value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`,    value: 'review' },
// // ];

// // /* ─── Icons ──────────────────────────────────────────────────── */
// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );
// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );
// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );
// // const SpinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite' }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // /* ─── Page ───────────────────────────────────────────────────── */
// // export default function Categories() {
// //   const browserRef = useRef<CategoryBrowserHandle>(null);

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

// //   /* ── Category list — starts empty, filled by API ── */
// //   const [categories, setCategories]     = useState<LocalCategory[]>([]);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [fetchError, setFetchError]     = useState<string | null>(null);

// //   /* ── Browser selection ── */
// //   const [activeCatId, setActiveCatId] = useState<string | null>(null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(null);

// //   /* ── Create category form ── */
// //   const [newCatName, setNewCatName]       = useState('');
// //   const [createLoading, setCreateLoading] = useState(false);
// //   const [createError, setCreateError]     = useState<string | null>(null);

// //   /* ── Table state ── */
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   /* ── Modal state ── */
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen]       = useState(false);
// //   const [editTarget, setEditTarget]             = useState<LocalCategory | null>(null);
// //   const [deleteTarget, setDeleteTarget]         = useState<LocalCategory | null>(null);

// //   /* ── Load categories from API on mount ── */
// //   useEffect(() => {
// //     (async () => {
// //       setFetchLoading(true);
// //       setFetchError(null);
// //       try {
// //         const res = await listCategories();
// //         if (res.success) {
// //           const loaded = res.data.map(apiToLocal);
// //           setCategories(loaded);
// //           if (loaded.length > 0) {
// //             setActiveCatId(loaded[0].id);
// //           }
// //         }
// //       } catch (err: any) {
// //         setFetchError(
// //           err?.response?.data?.message ??
// //           err?.message ??
// //           'Failed to load categories from server.'
// //         );
// //       } finally {
// //         setFetchLoading(false);
// //       }
// //     })();
// //   }, []);

// //   /* ── Derived flat list for table view ── */
// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id:            c.id,
// //       name:          c.name,
// //       description:   '',
// //       subcategories: [],   // table view doesn't need sub names — tree API handles that
// //       source:        c.source,
// //       active:        c.active,
// //       needsReview:   c.needsReview,
// //     })), [categories]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   /* ── Select category ── */
// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     setActiveSubId(null);
// //   };

// //   /* ── Create category via API ── */
// //   const handleCreateCategory = async () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     setCreateError(null);
// //     setCreateLoading(true);
// //     try {
// //       const res = await createCategory({ name, status: 'Active' });
// //       const newCat = apiToLocal(res.data);
// //       setCategories(prev => [newCat, ...prev]);
// //       setActiveCatId(newCat.id);
// //       setActiveSubId(null);
// //       setNewCatName('');
// //     } catch (err: any) {
// //       setCreateError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create category.'
// //       );
// //     } finally {
// //       setCreateLoading(false);
// //     }
// //   };

// //   /* ── After SubcategoryModal succeeds → invalidate tree cache ── */
// //   const handleSubcategoryCreated = (categoryId: string, _created: { id: string; name: string }[]) => {
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── After ContentModal succeeds → invalidate tree cache ── */
// //   const handleContentCreated = (categoryId: string, _subId: string, _created: { id: string; name: string }[]) => {
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── Toggle active (local optimistic update) ── */
// //   const handleToggle = (id: string, active: boolean) => {
// //     setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c));
// //   };

// //   /* ── Delete (local — no delete API provided yet) ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         setActiveCatId(next[0]?.id ?? null);
// //         setActiveSubId(null);
// //       }
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">

// //         {/* ── Header ── */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view"
// //                 style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Error banner ── */}
// //         {fetchError && (
// //           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 9, padding: '11px 16px', fontSize: 13, color: '#dc2626', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //             </svg>
// //             {fetchError}
// //             <button
// //               onClick={() => window.location.reload()}
// //               style={{ marginLeft: 'auto', fontSize: 12, color: '#dc2626', background: 'none', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', padding: '3px 10px', fontFamily: 'DM Sans, sans-serif' }}
// //             >
// //               Retry
// //             </button>
// //           </div>
// //         )}

// //         {/* ══════════ BROWSER VIEW ══════════ */}
// //         {viewMode === 'browser' && (
// //           <>
// //             {/* Create category card */}
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //                 disabled={createLoading}
// //               />
// //               {createError && (
// //                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //                   </svg>
// //                   {createError}
// //                 </div>
// //               )}
// //               <div className="cb-create-footer">
// //                 <button
// //                   className="cb-btn-create"
// //                   onClick={handleCreateCategory}
// //                   disabled={createLoading || !newCatName.trim()}
// //                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
// //                 >
// //                   {createLoading ? <SpinIcon /> : <PlusIcon />}
// //                   {createLoading ? 'Creating…' : 'Create Category'}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* 3-column browser */}
// //             <div className="cb-card">
// //               {fetchLoading ? (
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                   <SpinIcon /> Loading categories…
// //                 </div>
// //               ) : categories.length === 0 && !fetchError ? (
// //                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 10, color: '#9ca3af', textAlign: 'center' }}>
// //                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
// //                     <path d="M4 6h16M4 12h8m-8 6h16"/>
// //                   </svg>
// //                   <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No categories yet</div>
// //                   <div style={{ fontSize: 13 }}>Create your first category using the form above.</div>
// //                 </div>
// //               ) : (
// //                 <CategoryBrowser
// //                   ref={browserRef}
// //                   categories={categories}
// //                   activeCategoryId={activeCatId}
// //                   activeSubId={activeSubId}
// //                   onSelectCategory={handleSelectCategory}
// //                   onSelectSub={setActiveSubId}
// //                   onNewSub={() => setSubModalOpen(true)}
// //                   onNewContent={() => setContentModalOpen(true)}
// //                   onDeleteCategory={setDeleteTarget}
// //                 />
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* ══════════ TABLE VIEW ══════════ */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar
// //               tabs={buildTabs(categories)}
// //               active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }}
// //             />
// //             {fetchLoading ? (
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                 <SpinIcon /> Loading categories…
// //               </div>
// //             ) : (
// //               <CategoryTable
// //                 rows={pageRows}
// //                 onEdit={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setEditTarget(cat); setEditModalOpen(true); }}
// //                 onDelete={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setDeleteTarget(cat); }}
// //                 onToggle={handleToggle}
// //                 onAddSubcategory={flat => {
// //                   setActiveCatId(flat.id);
// //                   setViewMode('browser');
// //                   setTimeout(() => setSubModalOpen(true), 100);
// //                 }}
// //               />
// //             )}
// //             {!fetchLoading && filtered.length > 0 && (
// //               <Pagination
// //                 currentPage={safePage}
// //                 totalPages={totalPages}
// //                 totalItems={filtered.length}
// //                 itemsShown={pageRows.length}
// //                 itemLabel="categories"
// //                 onPageChange={setCurrentPage}
// //               />
// //             )}
// //           </div>
// //         )}

// //       </main>

// //       {/* ── Modals ── */}
// //       <SubcategoryModal
// //         isOpen={subModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         onSubmit={handleSubcategoryCreated}
// //         onClose={() => setSubModalOpen(false)}
// //       />

// //       <ContentModal
// //         isOpen={contentModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         defaultSubId={activeSubId}
// //         onSubmit={handleContentCreated}
// //         onClose={() => setContentModalOpen(false)}
// //       />

// //       <EditCategoryModal
// //         isOpen={editModalOpen}
// //         category={editTarget}
// //         allCategories={categories}
// //         onSubmit={(_catId, _subNames) => setEditModalOpen(false)}
// //         onClose={() => setEditModalOpen(false)}
// //       />

// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </div>
// //   );
// // }


// // import { useState, useMemo, useEffect, useRef } from 'react';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser, { type CategoryBrowserHandle } from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import EditCategoryModal from '../components/categories/EditCategoryModal';
// // import {
// //   listCategories,
// //   createCategory,
// //   type ApiCategory,
// // } from '../api/admin.api';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Types (no external dependency) ───────────────────────── */
// // export interface LocalCategory {
// //   id:          string;
// //   name:        string;
// //   active:      boolean;
// //   source:      'manual' | 'ai';
// //   needsReview: boolean;
// // }

// // /* ─── Flat type for CategoryTable ───────────────────────────── */
// // export interface FlatCategory {
// //   id:            string;
// //   name:          string;
// //   description:   string;
// //   subcategories: string[];
// //   source:        'manual' | 'ai';
// //   active:        boolean;
// //   needsReview?:  boolean;
// // }

// // /* ─── Map API response → local shape ───────────────────────── */
// // function apiToLocal(api: ApiCategory): LocalCategory {
// //   return {
// //     id:          api._id,
// //     name:        api.name,
// //     active:      api.status === 'Active',
// //     source:      'manual',
// //     needsReview: false,
// //   };
// // }

// // /* ─── Constants ─────────────────────────────────────────────── */
// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: LocalCategory[]) => [
// //   { label: `All (${cats.length})`,                                       value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,              value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,           value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`,    value: 'review' },
// // ];

// // /* ─── Icons ──────────────────────────────────────────────────── */
// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );
// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );
// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );
// // const SpinIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite' }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // /* ─── Page ───────────────────────────────────────────────────── */
// // export default function Categories() {
// //   const browserRef = useRef<CategoryBrowserHandle>(null);

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

// //   /* ── Category list — starts empty, filled by API ── */
// //   const [categories, setCategories]     = useState<LocalCategory[]>([]);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [fetchError, setFetchError]     = useState<string | null>(null);

// //   /* ── Browser selection ── */
// //   const [activeCatId, setActiveCatId] = useState<string | null>(null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(null);

// //   /* ── Create category form ── */
// //   const [newCatName, setNewCatName]       = useState('');
// //   const [createLoading, setCreateLoading] = useState(false);
// //   const [createError, setCreateError]     = useState<string | null>(null);

// //   /* ── Table state ── */
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   /* ── Modal state ── */
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen]       = useState(false);
// //   const [editTarget, setEditTarget]             = useState<LocalCategory | null>(null);
// //   const [deleteTarget, setDeleteTarget]         = useState<LocalCategory | null>(null);

// //   /* ── Load categories from API on mount ── */
// //   useEffect(() => {
// //     (async () => {
// //       setFetchLoading(true);
// //       setFetchError(null);
// //       try {
// //         const res = await listCategories();

// //         // Guard: res.data must be an array before calling .map()
// //         const raw = Array.isArray(res?.data) ? res.data : [];
// //         const loaded = raw.map(apiToLocal);

// //         setCategories(loaded);
// //         if (loaded.length > 0) {
// //           setActiveCatId(loaded[0].id);
// //         }
// //       } catch (err: any) {
// //         setFetchError(
// //           err?.response?.data?.message ??
// //           err?.message ??
// //           'Failed to load categories from server.'
// //         );
// //       } finally {
// //         setFetchLoading(false);
// //       }
// //     })();
// //   }, []);

// //   /* ── Derived flat list for table view ── */
// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id:            c.id,
// //       name:          c.name,
// //       description:   '',
// //       subcategories: [],   // table view doesn't need sub names — tree API handles that
// //       source:        c.source,
// //       active:        c.active,
// //       needsReview:   c.needsReview,
// //     })), [categories]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   /* ── Select category ── */
// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     setActiveSubId(null);
// //   };

// //   /* ── Create category via API ── */
// //   const handleCreateCategory = async () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     setCreateError(null);
// //     setCreateLoading(true);
// //     try {
// //       const res = await createCategory({ name, status: 'Active' });
// //       const newCat = apiToLocal(res.data);
// //       setCategories(prev => [newCat, ...prev]);
// //       setActiveCatId(newCat.id);
// //       setActiveSubId(null);
// //       setNewCatName('');
// //     } catch (err: any) {
// //       setCreateError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create category.'
// //       );
// //     } finally {
// //       setCreateLoading(false);
// //     }
// //   };

// //   /* ── After SubcategoryModal succeeds → invalidate tree cache ── */
// //   const handleSubcategoryCreated = (categoryId: string, _created: { id: string; name: string }[]) => {
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── After ContentModal succeeds → invalidate tree cache ── */
// //   const handleContentCreated = (categoryId: string, _subId: string, _created: { id: string; name: string }[]) => {
// //     browserRef.current?.invalidateTree(categoryId);
// //   };

// //   /* ── Toggle active (local optimistic update) ── */
// //   const handleToggle = (id: string, active: boolean) => {
// //     setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c));
// //   };

// //   /* ── Delete (local — no delete API provided yet) ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         setActiveCatId(next[0]?.id ?? null);
// //         setActiveSubId(null);
// //       }
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">

// //         {/* ── Header ── */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view"
// //                 style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Error banner ── */}
// //         {fetchError && (
// //           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 9, padding: '11px 16px', fontSize: 13, color: '#dc2626', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //             </svg>
// //             {fetchError}
// //             <button
// //               onClick={() => window.location.reload()}
// //               style={{ marginLeft: 'auto', fontSize: 12, color: '#dc2626', background: 'none', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', padding: '3px 10px', fontFamily: 'DM Sans, sans-serif' }}
// //             >
// //               Retry
// //             </button>
// //           </div>
// //         )}

// //         {/* ══════════ BROWSER VIEW ══════════ */}
// //         {viewMode === 'browser' && (
// //           <>
// //             {/* Create category card */}
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //                 disabled={createLoading}
// //               />
// //               {createError && (
// //                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //                   </svg>
// //                   {createError}
// //                 </div>
// //               )}
// //               <div className="cb-create-footer">
// //                 <button
// //                   className="cb-btn-create"
// //                   onClick={handleCreateCategory}
// //                   disabled={createLoading || !newCatName.trim()}
// //                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
// //                 >
// //                   {createLoading ? <SpinIcon /> : <PlusIcon />}
// //                   {createLoading ? 'Creating…' : 'Create Category'}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* 3-column browser */}
// //             <div className="cb-card">
// //               {fetchLoading ? (
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                   <SpinIcon /> Loading categories…
// //                 </div>
// //               ) : categories.length === 0 && !fetchError ? (
// //                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 10, color: '#9ca3af', textAlign: 'center' }}>
// //                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
// //                     <path d="M4 6h16M4 12h8m-8 6h16"/>
// //                   </svg>
// //                   <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No categories yet</div>
// //                   <div style={{ fontSize: 13 }}>Create your first category using the form above.</div>
// //                 </div>
// //               ) : (
// //                 <CategoryBrowser
// //                   ref={browserRef}
// //                   categories={categories}
// //                   activeCategoryId={activeCatId}
// //                   activeSubId={activeSubId}
// //                   onSelectCategory={handleSelectCategory}
// //                   onSelectSub={setActiveSubId}
// //                   onNewSub={() => setSubModalOpen(true)}
// //                   onNewContent={() => setContentModalOpen(true)}
// //                   onDeleteCategory={setDeleteTarget}
// //                 />
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* ══════════ TABLE VIEW ══════════ */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar
// //               tabs={buildTabs(categories)}
// //               active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }}
// //             />
// //             {fetchLoading ? (
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                 <SpinIcon /> Loading categories…
// //               </div>
// //             ) : (
// //               <CategoryTable
// //                 rows={pageRows}
// //                 onEdit={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setEditTarget(cat); setEditModalOpen(true); }}
// //                 onDelete={flat => { const cat = categories.find(c => c.id === flat.id); if (cat) setDeleteTarget(cat); }}
// //                 onToggle={handleToggle}
// //                 onAddSubcategory={flat => {
// //                   setActiveCatId(flat.id);
// //                   setViewMode('browser');
// //                   setTimeout(() => setSubModalOpen(true), 100);
// //                 }}
// //               />
// //             )}
// //             {!fetchLoading && filtered.length > 0 && (
// //               <Pagination
// //                 currentPage={safePage}
// //                 totalPages={totalPages}
// //                 totalItems={filtered.length}
// //                 itemsShown={pageRows.length}
// //                 itemLabel="categories"
// //                 onPageChange={setCurrentPage}
// //               />
// //             )}
// //           </div>
// //         )}

// //       </main>

// //       {/* ── Modals ── */}
// //       <SubcategoryModal
// //         isOpen={subModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         onSubmit={handleSubcategoryCreated}
// //         onClose={() => setSubModalOpen(false)}
// //       />

// //       <ContentModal
// //         isOpen={contentModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         defaultSubId={activeSubId}
// //         onSubmit={handleContentCreated}
// //         onClose={() => setContentModalOpen(false)}
// //       />

// //       <EditCategoryModal
// //         isOpen={editModalOpen}
// //         category={editTarget}
// //         allCategories={categories}
// //         onSubmit={(_catId, _subNames) => setEditModalOpen(false)}
// //         onClose={() => setEditModalOpen(false)}
// //       />

// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </div>
// //   );
// // }


// // import { useState, useMemo, useEffect, useRef } from 'react';
// // import Sidebar from '../components/layout/Sidebar';
// // import Topbar from '../components/layout/Topbar';
// // import TabBar from '../components/shared/TabBar';
// // import Pagination from '../components/shared/Pagination';
// // import ConfirmDialog from '../components/shared/ConfirmDialog';
// // import CategoryTable from '../components/categories/CategoryTable';
// // import CategoryBrowser, {
// //   type CategoryBrowserHandle,
// //   type LocalCategory,
// //   type TreeCache,
// // } from '../components/categories/CategoryBrowser';
// // import SubcategoryModal from '../components/categories/SubCategoryModal';
// // import ContentModal from '../components/categories/ContentModal';
// // import {
// //   listCategories,
// //   createCategory,
// //   getCategoryTree,
// //   type ApiCategory,
// // } from '../api/admin.api';
// // import '../styles/dashboard.css';
// // import '../styles/category-browser.css';

// // /* ─── Flat type for CategoryTable ───────────────────────────── */
// // interface FlatCategory {
// //   id:            string;
// //   name:          string;
// //   description:   string;
// //   subcategories: string[];
// //   source:        'manual' | 'ai';
// //   active:        boolean;
// //   needsReview?:  boolean;
// // }

// // /* ─── Map API → local ───────────────────────────────────────── */
// // function apiToLocal(api: ApiCategory): LocalCategory {
// //   return {
// //     id:          api._id,
// //     name:        api.name,
// //     active:      api.status === 'Active',
// //     source:      'manual',
// //     needsReview: false,
// //   };
// // }

// // /* ─── Constants ─────────────────────────────────────────────── */
// // const ITEMS_PER_PAGE = 4;
// // type ViewMode = 'table' | 'browser';

// // const buildTabs = (cats: LocalCategory[]) => [
// //   { label: `All (${cats.length})`,                                    value: 'all' },
// //   { label: `Active (${cats.filter(c => c.active).length})`,           value: 'active' },
// //   { label: `Inactive (${cats.filter(c => !c.active).length})`,        value: 'inactive' },
// //   { label: `Need Review (${cats.filter(c => c.needsReview).length})`, value: 'review' },
// // ];

// // /* ─── Icons ──────────────────────────────────────────────────── */
// // const TableIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
// //   </svg>
// // );
// // const BrowserIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
// //     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
// //   </svg>
// // );
// // const PlusIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
// //   </svg>
// // );
// // const SpinIcon = ({ color = 'currentColor' }: { color?: string }) => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // /* ─── Page ───────────────────────────────────────────────────── */
// // export default function Categories() {
// //   const browserRef = useRef<CategoryBrowserHandle>(null);

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

// //   /* ── Category list ── */
// //   const [categories, setCategories]     = useState<LocalCategory[]>([]);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [fetchError, setFetchError]     = useState<string | null>(null);

// //   /* ── Tree data for all categories — populated on load ── */
// //   const [treeData, setTreeData]       = useState<TreeCache>({});
// //   const [treeLoading, setTreeLoading] = useState(false);
// //   const [treeError, setTreeError]     = useState<string | null>(null);

// //   /* ── Browser selection ── */
// //   const [activeCatId, setActiveCatId] = useState<string | null>(null);
// //   const [activeSubId, setActiveSubId] = useState<string | null>(null);

// //   /* ── Create category form ── */
// //   const [newCatName, setNewCatName]       = useState('');
// //   const [createLoading, setCreateLoading] = useState(false);
// //   const [createError, setCreateError]     = useState<string | null>(null);

// //   /* ── Table state ── */
// //   const [activeTab, setActiveTab]     = useState('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   /* ── Modal state ── */
// //   const [subModalOpen, setSubModalOpen]         = useState(false);
// //   const [contentModalOpen, setContentModalOpen] = useState(false);
// //   const [deleteTarget, setDeleteTarget]         = useState<LocalCategory | null>(null);

// //   /* ────────────────────────────────────────────────────────────
// //      STEP 1: Load all categories
// //      STEP 2: Fetch every category's tree in parallel
// //      Result: browser is fully populated on first render
// //      ──────────────────────────────────────────────────────────── */
// //   useEffect(() => {
// //     (async () => {
// //       setFetchLoading(true);
// //       setFetchError(null);
// //       try {
// //         /* Step 1 — list categories */
// //         const res = await listCategories();
// //         const raw = Array.isArray(res?.data) ? res.data : [];
// //         const loaded = raw.map(apiToLocal);
// //         setCategories(loaded);

// //         if (loaded.length === 0) return;

// //         /* Auto-select first category */
// //         const firstId = loaded[0].id;
// //         setActiveCatId(firstId);

// //         /* Step 2 — fetch trees for ALL categories in parallel */
// //         setTreeLoading(true);
// //         setTreeError(null);

// //         const treeResults = await Promise.allSettled(
// //           loaded.map(cat =>
// //             getCategoryTree(cat.id).then(r => ({ catId: cat.id, subs: r.data.subcategories }))
// //           )
// //         );

// //         const cache: TreeCache = {};
// //         let firstSubId: string | null = null;

// //         treeResults.forEach(result => {
// //           if (result.status === 'fulfilled') {
// //             const { catId, subs } = result.value;
// //             cache[catId] = subs;
// //             /* Auto-select first sub of the first category */
// //             if (catId === firstId && subs.length > 0 && !firstSubId) {
// //               firstSubId = subs[0]._id;
// //             }
// //           }
// //           /* Silently skip failed trees — they show Retry in the UI */
// //         });

// //         setTreeData(cache);
// //         if (firstSubId) setActiveSubId(firstSubId);

// //       } catch (err: any) {
// //         setFetchError(
// //           err?.response?.data?.message ??
// //           err?.message ??
// //           'Failed to load categories from server.'
// //         );
// //       } finally {
// //         setFetchLoading(false);
// //         setTreeLoading(false);
// //       }
// //     })();
// //   }, []);

// //   /* ── Re-fetch tree for a single category (after adding sub/content) ── */
// //   const refetchTree = async (catId: string) => {
// //     try {
// //       const res = await getCategoryTree(catId);
// //       const subs = res.data.subcategories;
// //       setTreeData(prev => ({ ...prev, [catId]: subs }));
// //       /* Auto-select first new sub if current sub is gone */
// //       if (subs.length > 0) setActiveSubId(subs[0]._id);
// //     } catch {
// //       /* Silently fail — user can retry via the Retry button */
// //     }
// //   };

// //   /* ── Create category via API ── */
// //   const handleCreateCategory = async () => {
// //     const name = newCatName.trim();
// //     if (!name) return;
// //     setCreateError(null);
// //     setCreateLoading(true);
// //     try {
// //       const res = await createCategory({ name, status: 'Active' });
// //       const newCat = apiToLocal(res.data);
// //       setCategories(prev => [newCat, ...prev]);
// //       /* New category has no tree yet — set empty array */
// //       setTreeData(prev => ({ ...prev, [newCat.id]: [] }));
// //       setActiveCatId(newCat.id);
// //       setActiveSubId(null);
// //       setNewCatName('');
// //     } catch (err: any) {
// //       setCreateError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create category.'
// //       );
// //     } finally {
// //       setCreateLoading(false);
// //     }
// //   };

// //   /* ── Select category → auto-select its first subcategory ── */
// //   const handleSelectCategory = (id: string) => {
// //     setActiveCatId(id);
// //     const subs = treeData[id] ?? [];
// //     setActiveSubId(subs.length > 0 ? subs[0]._id : null);
// //   };

// //   /* ── After SubcategoryModal succeeds → re-fetch tree ── */
// //   const handleSubcategoryCreated = (categoryId: string, _created: { id: string; name: string }[]) => {
// //     refetchTree(categoryId);
// //   };

// //   /* ── After ContentModal succeeds → re-fetch tree ── */
// //   const handleContentCreated = (categoryId: string, _subId: string, _created: { id: string; name: string }[]) => {
// //     refetchTree(categoryId);
// //   };

// //   /* ── Delete category (local — no delete API yet) ── */
// //   const handleDeleteConfirm = () => {
// //     if (!deleteTarget) return;
// //     setCategories(prev => {
// //       const next = prev.filter(c => c.id !== deleteTarget.id);
// //       if (activeCatId === deleteTarget.id) {
// //         const nextId = next[0]?.id ?? null;
// //         setActiveCatId(nextId);
// //         setActiveSubId(nextId ? (treeData[nextId]?.[0]?._id ?? null) : null);
// //       }
// //       return next;
// //     });
// //     setTreeData(prev => {
// //       const next = { ...prev };
// //       delete next[deleteTarget.id];
// //       return next;
// //     });
// //     setDeleteTarget(null);
// //   };

// //   /* ── Table: toggle active (optimistic) ── */
// //   const handleToggle = (id: string, active: boolean) => {
// //     setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c));
// //   };

// //   /* ── Derived flat list for table view ── */
// //   const flatCategories: FlatCategory[] = useMemo(() =>
// //     categories.map(c => ({
// //       id:            c.id,
// //       name:          c.name,
// //       description:   '',
// //       subcategories: (treeData[c.id] ?? []).map(s => s.name),
// //       source:        c.source,
// //       active:        c.active,
// //       needsReview:   c.needsReview,
// //     })), [categories, treeData]);

// //   const filtered = useMemo(() => {
// //     switch (activeTab) {
// //       case 'active':   return flatCategories.filter(c => c.active);
// //       case 'inactive': return flatCategories.filter(c => !c.active);
// //       case 'review':   return flatCategories.filter(c => c.needsReview);
// //       default:         return flatCategories;
// //     }
// //   }, [flatCategories, activeTab]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
// //   const safePage   = Math.min(currentPage, totalPages);
// //   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

// //   const toggleStyle = (active: boolean) => ({
// //     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
// //     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
// //     fontSize: 13, fontWeight: 500,
// //     background: active ? 'var(--green-pale)' : '#fff',
// //     color: active ? 'var(--green)' : '#666',
// //     transition: 'all .15s',
// //   });

// //   const isLoadingAll = fetchLoading || treeLoading;

// //   return (
// //     <div className="admin-layout">
// //       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
// //       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

// //       <main className="page-content">

// //         {/* ── Header ── */}
// //         <div className="page-hdr-row">
// //           <div>
// //             <div className="page-title">Category Management</div>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
// //             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
// //               <button onClick={() => setViewMode('browser')} title="Browser view"
// //                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
// //                 <BrowserIcon /> Category Browser View
// //               </button>
// //               <button onClick={() => setViewMode('table')} title="Table view"
// //                 style={toggleStyle(viewMode === 'table')}>
// //                 <TableIcon /> Category Table View
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Fetch error ── */}
// //         {fetchError && (
// //           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 9, padding: '11px 16px', fontSize: 13, color: '#dc2626', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //             </svg>
// //             {fetchError}
// //             <button onClick={() => window.location.reload()}
// //               style={{ marginLeft: 'auto', fontSize: 12, color: '#dc2626', background: 'none', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', padding: '3px 10px', fontFamily: 'DM Sans, sans-serif' }}>
// //               Retry
// //             </button>
// //           </div>
// //         )}

// //         {/* ══════════ BROWSER VIEW ══════════ */}
// //         {viewMode === 'browser' && (
// //           <>
// //             {/* Create category card */}
// //             <div className="cb-create-card">
// //               <div className="cb-create-title">General Information</div>
// //               <div className="cb-create-field-label">Category Name</div>
// //               <input
// //                 className="cb-create-input"
// //                 type="text"
// //                 placeholder="e.g. Interior Design"
// //                 value={newCatName}
// //                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
// //                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
// //                 disabled={createLoading}
// //               />
// //               {createError && (
// //                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //                   </svg>
// //                   {createError}
// //                 </div>
// //               )}
// //               <div className="cb-create-footer">
// //                 <button
// //                   className="cb-btn-create"
// //                   onClick={handleCreateCategory}
// //                   disabled={createLoading || !newCatName.trim()}
// //                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
// //                 >
// //                   {createLoading ? <SpinIcon /> : <PlusIcon />}
// //                   {createLoading ? 'Creating…' : 'Create Category'}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* 3-column browser */}
// //             <div className="cb-card">
// //               {isLoadingAll ? (
// //                 /* Full-panel skeleton while everything loads */
// //                 <div className="cb-grid">
// //                   {[1, 2, 3].map(col => (
// //                     <div key={col} className={`cb-col${col === 3 ? ' cb-col-last' : ''}`}>
// //                       <div className="cb-col-head">
// //                         <span style={{ background: '#f0f0f0', borderRadius: 4, width: col === 1 ? 80 : col === 2 ? 100 : 60, height: 12, display: 'block', animation: 'cb-pulse 1.4s ease-in-out infinite' }} />
// //                       </div>
// //                       <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
// //                         {[70, 90, 55, 80, 65].map((w, i) => (
// //                           <div key={i} style={{ height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`, animation: 'cb-pulse 1.4s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : categories.length === 0 && !fetchError ? (
// //                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 10, color: '#9ca3af', textAlign: 'center' }}>
// //                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
// //                     <path d="M4 6h16M4 12h8m-8 6h16"/>
// //                   </svg>
// //                   <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No categories yet</div>
// //                   <div style={{ fontSize: 13 }}>Create your first category using the form above.</div>
// //                 </div>
// //               ) : (
// //                 <CategoryBrowser
// //                   ref={browserRef}
// //                   categories={categories}
// //                   treeData={treeData}
// //                   treeLoading={treeLoading}
// //                   treeError={treeError}
// //                   activeCategoryId={activeCatId}
// //                   activeSubId={activeSubId}
// //                   onSelectCategory={handleSelectCategory}
// //                   onSelectSub={setActiveSubId}
// //                   onNewSub={() => setSubModalOpen(true)}
// //                   onNewContent={() => setContentModalOpen(true)}
// //                   onDeleteCategory={setDeleteTarget}
// //                   onRetry={refetchTree}
// //                 />
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* ══════════ TABLE VIEW ══════════ */}
// //         {viewMode === 'table' && (
// //           <div className="table-card">
// //             <TabBar
// //               tabs={buildTabs(categories)}
// //               active={activeTab}
// //               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }}
// //             />
// //             {isLoadingAll ? (
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
// //                 <SpinIcon /> Loading categories…
// //               </div>
// //             ) : (
// //               <CategoryTable
// //                 rows={pageRows}
// //                 onEdit={() => {}}
// //                 onDelete={flat => {
// //                   const cat = categories.find(c => c.id === flat.id);
// //                   if (cat) setDeleteTarget(cat);
// //                 }}
// //                 onToggle={handleToggle}
// //                 onAddSubcategory={flat => {
// //                   setActiveCatId(flat.id);
// //                   const subs = treeData[flat.id] ?? [];
// //                   setActiveSubId(subs[0]?._id ?? null);
// //                   setViewMode('browser');
// //                   setTimeout(() => setSubModalOpen(true), 100);
// //                 }}
// //               />
// //             )}
// //             {!isLoadingAll && filtered.length > 0 && (
// //               <Pagination
// //                 currentPage={safePage}
// //                 totalPages={totalPages}
// //                 totalItems={filtered.length}
// //                 itemsShown={pageRows.length}
// //                 itemLabel="categories"
// //                 onPageChange={setCurrentPage}
// //               />
// //             )}
// //           </div>
// //         )}

// //       </main>

// //       {/* ── Modals ── */}
// //       <SubcategoryModal
// //         isOpen={subModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         onSubmit={handleSubcategoryCreated}
// //         onClose={() => setSubModalOpen(false)}
// //       />

// //       <ContentModal
// //         isOpen={contentModalOpen}
// //         categories={categories}
// //         defaultCategoryId={activeCatId}
// //         defaultSubId={activeSubId}
// //         onSubmit={handleContentCreated}
// //         onClose={() => setContentModalOpen(false)}
// //       />

// //       <ConfirmDialog
// //         isOpen={Boolean(deleteTarget)}
// //         title={`Delete "${deleteTarget?.name}"?`}
// //         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
// //         confirmLabel="Yes, Delete"
// //         onConfirm={handleDeleteConfirm}
// //         onCancel={() => setDeleteTarget(null)}
// //       />
// //     </div>
// //   );
// // }




// import { useState, useMemo, useEffect, useRef } from 'react';
// import Sidebar from '../components/layout/Sidebar';
// import Topbar from '../components/layout/Topbar';
// import TabBar from '../components/shared/TabBar';
// import Pagination from '../components/shared/Pagination';
// import ConfirmDialog from '../components/shared/ConfirmDialog';
// import CategoryTable from '../components/categories/CategoryTable';
// import CategoryBrowser, {
//   type CategoryBrowserHandle,
//   type LocalCategory,
//   type TreeCache,
// } from '../components/categories/CategoryBrowser';
// import SubcategoryModal from '../components/categories/SubCategoryModal';
// import ContentModal from '../components/categories/ContentModal';
// import {
//   listCategories,
//   createCategory,
//   getCategoryTree,
//   type ApiCategory,
// } from '../api/admin.api';
// import '../styles/dashboard.css';
// import '../styles/category-browser.css';

// /* ─── Flat type for CategoryTable ───────────────────────────── */
// interface FlatCategory {
//   id:            string;
//   name:          string;
//   description:   string;
//   subcategories: string[];
//   source:        'manual' | 'ai';
//   active:        boolean;
//   needsReview?:  boolean;
// }

// /* ─── Map API → local ───────────────────────────────────────── */
// function apiToLocal(api: ApiCategory): LocalCategory {
//   return {
//     id:          api._id,
//     name:        api.name,
//     active:      api.status === 'Active',
//     source:      'manual',
//     needsReview: false,
//   };
// }

// /* ─── Constants ─────────────────────────────────────────────── */
// const ITEMS_PER_PAGE = 4;
// type ViewMode = 'table' | 'browser';

// const buildTabs = (cats: LocalCategory[]) => [
//   { label: `All (${cats.length})`,                                    value: 'all' },
//   { label: `Active (${cats.filter(c => c.active).length})`,           value: 'active' },
//   { label: `Inactive (${cats.filter(c => !c.active).length})`,        value: 'inactive' },
//   { label: `Need Review (${cats.filter(c => c.needsReview).length})`, value: 'review' },
// ];

// /* ─── Icons ──────────────────────────────────────────────────── */
// const TableIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
//   </svg>
// );
// const BrowserIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
//   </svg>
// );
// const PlusIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
//   </svg>
// );
// const SpinIcon = ({ color = 'currentColor' }: { color?: string }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"
//     style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
//     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//   </svg>
// );

// /* ─── Page ───────────────────────────────────────────────────── */
// export default function Categories() {
//   const browserRef = useRef<CategoryBrowserHandle>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [viewMode, setViewMode]       = useState<ViewMode>('browser');

//   /* ── Category list ── */
//   const [categories, setCategories]     = useState<LocalCategory[]>([]);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [fetchError, setFetchError]     = useState<string | null>(null);

//   /* ── Tree data for all categories — populated on load ── */
//   const [treeData, setTreeData]       = useState<TreeCache>({});
//   const [treeLoading, setTreeLoading] = useState(false);
//   const [treeError, setTreeError]     = useState<string | null>(null);

//   /* ── Browser selection ── */
//   const [activeCatId, setActiveCatId] = useState<string | null>(null);
//   const [activeSubId, setActiveSubId] = useState<string | null>(null);

//   /* ── Create category form ── */
//   const [newCatName, setNewCatName]       = useState('');
//   const [createLoading, setCreateLoading] = useState(false);
//   const [createError, setCreateError]     = useState<string | null>(null);

//   /* ── Table state ── */
//   const [activeTab, setActiveTab]     = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ── Modal state ── */
//   const [subModalOpen, setSubModalOpen]         = useState(false);
//   const [contentModalOpen, setContentModalOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget]         = useState<LocalCategory | null>(null);

//   /* ────────────────────────────────────────────────────────────
//      STEP 1: Load all categories
//      STEP 2: Fetch every category's tree in parallel
//      Result: browser is fully populated on first render
//      ──────────────────────────────────────────────────────────── */
//   useEffect(() => {
//     (async () => {
//       setFetchLoading(true);
//       setFetchError(null);
//       try {
//         /* ── Step 1: List categories ── */
//         const res = await listCategories();
//         console.log('[Categories] listCategories response:', res);

//         const raw = Array.isArray(res?.data) ? res.data : [];
//         const loaded = raw.map(apiToLocal);
//         console.log('[Categories] loaded categories:', loaded);
//         setCategories(loaded);

//         if (loaded.length === 0) {
//           console.log('[Categories] no categories returned — skipping tree fetch');
//           return;
//         }

//         /* Auto-select first category */
//         const firstId = loaded[0].id;
//         setActiveCatId(firstId);

//         /* ── Step 2: Fetch trees for ALL categories in parallel ── */
//         setTreeLoading(true);
//         setTreeError(null);

//         const treeResults = await Promise.allSettled(
//           loaded.map(cat =>
//             getCategoryTree(cat.id)
//               .then(r => {
//                 console.log(`[Categories] tree for "${cat.name}" (${cat.id}):`, r);
//                 const subs = Array.isArray(r?.data?.subcategories)
//                   ? r.data.subcategories
//                   : [];
//                 return { catId: cat.id, subs };
//               })
//           )
//         );

//         const cache: TreeCache = {};
//         let firstSubId: string | null = null;

//         treeResults.forEach((result, i) => {
//           if (result.status === 'fulfilled') {
//             const { catId, subs } = result.value;
//             cache[catId] = subs;
//             if (catId === firstId && subs.length > 0 && !firstSubId) {
//               firstSubId = subs[0]._id;
//             }
//           } else {
//             console.error(`[Categories] tree fetch failed for category index ${i}:`, result.reason);
//           }
//         });

//         console.log('[Categories] final treeData cache:', cache);
//         setTreeData(cache);
//         if (firstSubId) setActiveSubId(firstSubId);

//       } catch (err: any) {
//         console.error('[Categories] fetch error:', err);
//         setFetchError(
//           err?.response?.data?.message ??
//           err?.message ??
//           'Failed to load categories from server.'
//         );
//       } finally {
//         setFetchLoading(false);
//         setTreeLoading(false);
//       }
//     })();
//   }, []);

//   /* ── Re-fetch tree for a single category (after adding sub/content) ── */
//   const refetchTree = async (catId: string) => {
//     try {
//       const res = await getCategoryTree(catId);
//       const subs = res.data.subcategories;
//       setTreeData(prev => ({ ...prev, [catId]: subs }));
//       /* Auto-select first new sub if current sub is gone */
//       if (subs.length > 0) setActiveSubId(subs[0]._id);
//     } catch {
//       /* Silently fail — user can retry via the Retry button */
//     }
//   };

//   /* ── Create category via API ── */
//   const handleCreateCategory = async () => {
//     const name = newCatName.trim();
//     if (!name) return;
//     setCreateError(null);
//     setCreateLoading(true);
//     try {
//       const res = await createCategory({ name, status: 'Active' });
//       const newCat = apiToLocal(res.data);
//       setCategories(prev => [newCat, ...prev]);
//       /* New category has no tree yet — set empty array */
//       setTreeData(prev => ({ ...prev, [newCat.id]: [] }));
//       setActiveCatId(newCat.id);
//       setActiveSubId(null);
//       setNewCatName('');
//     } catch (err: any) {
//       setCreateError(
//         err?.response?.data?.message ??
//         err?.response?.data?.error ??
//         err?.message ??
//         'Failed to create category.'
//       );
//     } finally {
//       setCreateLoading(false);
//     }
//   };

//   /* ── Select category → auto-select its first subcategory ── */
//   const handleSelectCategory = (id: string) => {
//     setActiveCatId(id);
//     const subs = treeData[id] ?? [];
//     setActiveSubId(subs.length > 0 ? subs[0]._id : null);
//   };

//   /* ── After SubcategoryModal succeeds → re-fetch tree ── */
//   const handleSubcategoryCreated = (categoryId: string, _created: { id: string; name: string }[]) => {
//     refetchTree(categoryId);
//   };

//   /* ── After ContentModal succeeds → re-fetch tree ── */
//   const handleContentCreated = (categoryId: string, _subId: string, _created: { id: string; name: string }[]) => {
//     refetchTree(categoryId);
//   };

//   /* ── Delete category (local — no delete API yet) ── */
//   const handleDeleteConfirm = () => {
//     if (!deleteTarget) return;
//     setCategories(prev => {
//       const next = prev.filter(c => c.id !== deleteTarget.id);
//       if (activeCatId === deleteTarget.id) {
//         const nextId = next[0]?.id ?? null;
//         setActiveCatId(nextId);
//         setActiveSubId(nextId ? (treeData[nextId]?.[0]?._id ?? null) : null);
//       }
//       return next;
//     });
//     setTreeData(prev => {
//       const next = { ...prev };
//       delete next[deleteTarget.id];
//       return next;
//     });
//     setDeleteTarget(null);
//   };

//   /* ── Table: toggle active (optimistic) ── */
//   const handleToggle = (id: string, active: boolean) => {
//     setCategories(prev => prev.map(c => c.id === id ? { ...c, active } : c));
//   };

//   /* ── Derived flat list for table view ── */
//   const flatCategories: FlatCategory[] = useMemo(() =>
//     categories.map(c => ({
//       id:            c.id,
//       name:          c.name,
//       description:   '',
//       subcategories: (treeData[c.id] ?? []).map(s => s.name),
//       source:        c.source,
//       active:        c.active,
//       needsReview:   c.needsReview,
//     })), [categories, treeData]);

//   const filtered = useMemo(() => {
//     switch (activeTab) {
//       case 'active':   return flatCategories.filter(c => c.active);
//       case 'inactive': return flatCategories.filter(c => !c.active);
//       case 'review':   return flatCategories.filter(c => c.needsReview);
//       default:         return flatCategories;
//     }
//   }, [flatCategories, activeTab]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   const safePage   = Math.min(currentPage, totalPages);
//   const pageRows   = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

//   const toggleStyle = (active: boolean) => ({
//     display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
//     border: 'none', cursor: 'pointer' as const, fontFamily: 'DM Sans, sans-serif',
//     fontSize: 13, fontWeight: 500,
//     background: active ? 'var(--green-pale)' : '#fff',
//     color: active ? 'var(--green)' : '#666',
//     transition: 'all .15s',
//   });

//   const isLoadingAll = fetchLoading || treeLoading;

//   return (
//     <div className="admin-layout">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

//       <main className="page-content">

//         {/* ── Header ── */}
//         <div className="page-hdr-row">
//           <div>
//             <div className="page-title">Category Management</div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
//             <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 9, overflow: 'hidden', background: '#fff' }}>
//               <button onClick={() => setViewMode('browser')} title="Browser view"
//                 style={{ ...toggleStyle(viewMode === 'browser'), borderRight: '1.5px solid var(--border)' }}>
//                 <BrowserIcon /> Category Browser View
//               </button>
//               <button onClick={() => setViewMode('table')} title="Table view"
//                 style={toggleStyle(viewMode === 'table')}>
//                 <TableIcon /> Category Table View
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Fetch error ── */}
//         {fetchError && (
//           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 9, padding: '11px 16px', fontSize: 13, color: '#dc2626', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
//               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//             </svg>
//             {fetchError}
//             <button onClick={() => window.location.reload()}
//               style={{ marginLeft: 'auto', fontSize: 12, color: '#dc2626', background: 'none', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', padding: '3px 10px', fontFamily: 'DM Sans, sans-serif' }}>
//               Retry
//             </button>
//           </div>
//         )}

//         {/* ══════════ BROWSER VIEW ══════════ */}
//         {viewMode === 'browser' && (
//           <>
//             {/* Create category card */}
//             <div className="cb-create-card">
//               <div className="cb-create-title">General Information</div>
//               <div className="cb-create-field-label">Category Name</div>
//               <input
//                 className="cb-create-input"
//                 type="text"
//                 placeholder="e.g. Interior Design"
//                 value={newCatName}
//                 onChange={e => { setNewCatName(e.target.value); setCreateError(null); }}
//                 onKeyDown={e => { if (e.key === 'Enter') handleCreateCategory(); }}
//                 disabled={createLoading}
//               />
//               {createError && (
//                 <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                   </svg>
//                   {createError}
//                 </div>
//               )}
//               <div className="cb-create-footer">
//                 <button
//                   className="cb-btn-create"
//                   onClick={handleCreateCategory}
//                   disabled={createLoading || !newCatName.trim()}
//                   style={{ opacity: (!newCatName.trim() || createLoading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
//                 >
//                   {createLoading ? <SpinIcon /> : <PlusIcon />}
//                   {createLoading ? 'Creating…' : 'Create Category'}
//                 </button>
//               </div>
//             </div>

//             {/* 3-column browser */}
//             <div className="cb-card">
//               {isLoadingAll ? (
//                 /* Full-panel skeleton while everything loads */
//                 <div className="cb-grid">
//                   {[1, 2, 3].map(col => (
//                     <div key={col} className={`cb-col${col === 3 ? ' cb-col-last' : ''}`}>
//                       <div className="cb-col-head">
//                         <span style={{ background: '#f0f0f0', borderRadius: 4, width: col === 1 ? 80 : col === 2 ? 100 : 60, height: 12, display: 'block', animation: 'cb-pulse 1.4s ease-in-out infinite' }} />
//                       </div>
//                       <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//                         {[70, 90, 55, 80, 65].map((w, i) => (
//                           <div key={i} style={{ height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`, animation: 'cb-pulse 1.4s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : categories.length === 0 && !fetchError ? (
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 10, color: '#9ca3af', textAlign: 'center' }}>
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
//                     <path d="M4 6h16M4 12h8m-8 6h16"/>
//                   </svg>
//                   <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No categories yet</div>
//                   <div style={{ fontSize: 13 }}>Create your first category using the form above.</div>
//                 </div>
//               ) : (
//                 <CategoryBrowser
//                   ref={browserRef}
//                   categories={categories}
//                   treeData={treeData}
//                   treeLoading={treeLoading}
//                   treeError={treeError}
//                   activeCategoryId={activeCatId}
//                   activeSubId={activeSubId}
//                   onSelectCategory={handleSelectCategory}
//                   onSelectSub={setActiveSubId}
//                   onNewSub={() => setSubModalOpen(true)}
//                   onNewContent={() => setContentModalOpen(true)}
//                   onDeleteCategory={setDeleteTarget}
//                   onRetry={refetchTree}
//                 />
//               )}
//             </div>
//           </>
//         )}

//         {/* ══════════ TABLE VIEW ══════════ */}
//         {viewMode === 'table' && (
//           <div className="table-card">
//             <TabBar
//               tabs={buildTabs(categories)}
//               active={activeTab}
//               onChange={tab => { setActiveTab(tab); setCurrentPage(1); }}
//             />
//             {isLoadingAll ? (
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: '#9ca3af', fontSize: 14 }}>
//                 <SpinIcon /> Loading categories…
//               </div>
//             ) : (
//               <CategoryTable
//                 rows={pageRows}
//                 onEdit={() => {}}
//                 onDelete={flat => {
//                   const cat = categories.find(c => c.id === flat.id);
//                   if (cat) setDeleteTarget(cat);
//                 }}
//                 onToggle={handleToggle}
//                 onAddSubcategory={flat => {
//                   setActiveCatId(flat.id);
//                   const subs = treeData[flat.id] ?? [];
//                   setActiveSubId(subs[0]?._id ?? null);
//                   setViewMode('browser');
//                   setTimeout(() => setSubModalOpen(true), 100);
//                 }}
//               />
//             )}
//             {!isLoadingAll && filtered.length > 0 && (
//               <Pagination
//                 currentPage={safePage}
//                 totalPages={totalPages}
//                 totalItems={filtered.length}
//                 itemsShown={pageRows.length}
//                 itemLabel="categories"
//                 onPageChange={setCurrentPage}
//               />
//             )}
//           </div>
//         )}

//       </main>

//       {/* ── Modals ── */}
//       <SubcategoryModal
//         isOpen={subModalOpen}
//         categories={categories}
//         defaultCategoryId={activeCatId}
//         onSubmit={handleSubcategoryCreated}
//         onClose={() => setSubModalOpen(false)}
//       />

//       <ContentModal
//         isOpen={contentModalOpen}
//         categories={categories}
//         defaultCategoryId={activeCatId}
//         defaultSubId={activeSubId}
//         onSubmit={handleContentCreated}
//         onClose={() => setContentModalOpen(false)}
//       />

//       <ConfirmDialog
//         isOpen={Boolean(deleteTarget)}
//         title={`Delete "${deleteTarget?.name}"?`}
//         description="This will permanently remove the category and all its subcategories. This action cannot be undone."
//         confirmLabel="Yes, Delete"
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => setDeleteTarget(null)}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import CategoryBrowser, {
  type CategoryBrowserHandle,
  type LocalCategory,
  type TreeCache,
} from '../components/categories/CategoryBrowser';
import SubcategoryModal from '../components/categories/SubCategoryModal';
import ContentModal from '../components/categories/ContentModal';
import {
  listCategories,
  getCategoryTree,
  createCategory,
  type ApiCategory,
  type ApiTreeSubcategory,
} from '../api/admin.api';
import '../styles/dashboard.css';
import '../styles/category-browser.css';

function toLocal(c: ApiCategory): LocalCategory {
  return { id: c._id, name: c.name, active: c.status === 'Active', source: 'manual', needsReview: false };
}

const Spin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5"
    style={{ animation: 'cb-spin .7s linear infinite', display: 'block' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

export default function Categories() {
  const browserRef = useRef<CategoryBrowserHandle>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data
  const [categories, setCategories] = useState<LocalCategory[]>([]);
  const [treeData,   setTreeData]   = useState<TreeCache>({});

  // UI state
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  // Create form
  const [newCatName,    setNewCatName]    = useState('');
  const [creating,      setCreating]      = useState(false);
  const [createError,   setCreateError]   = useState('');

  // Modals
  const [subModal,     setSubModal]     = useState(false);
  const [contentModal, setContentModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LocalCategory | null>(null);

  // ── Load everything on mount ──────────────────────────────────
  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      // 1. Get category list
      const catRes = await listCategories();

      console.log('[loadAll] raw catRes:', catRes);
      // Handle any response shape the server returns
      // Could be: { data: [] } or { data: { data: [] } } or just []
      let rawList: any[] = [];
      if (Array.isArray(catRes))            rawList = catRes;
      else if (Array.isArray(catRes?.data)) rawList = catRes.data;
      else if (Array.isArray(catRes?.data?.data)) rawList = catRes.data.data;

      const cats = rawList.map(toLocal);
      setCategories(cats);

      if (cats.length === 0) { setLoading(false); return; }

      // 2. Fetch all trees in parallel
      const results = await Promise.allSettled(
        cats.map(c => getCategoryTree(c.id))
      );

      const cache: TreeCache = {};
      results.forEach((r, i) => {
        if (r.status === 'fulfilled') {
          const val = r.value;
          // Handle: { data: { subcategories: [] } } or { subcategories: [] } or []
          const subs =
            Array.isArray(val?.data?.subcategories) ? val.data.subcategories :
            // Array.isArray(val?.subcategories)        ? val.subcategories :
            Array.isArray(val?.data)                 ? val.data :
            Array.isArray(val)                       ? val : [];
          cache[cats[i].id] = subs;
        } else {
          cache[cats[i].id] = [];
        }
      });

      setTreeData(cache);

      // 3. Auto-select first category and its first sub
      const firstCat = cats[0];
      setActiveCatId(firstCat.id);
      const firstSubs = cache[firstCat.id] ?? [];
      if (firstSubs.length > 0) setActiveSubId(firstSubs[0]._id);

    } catch (e: any) {
      setError(e?.message ?? 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  // Re-fetch one category's tree after creating sub/content
  async function refetchTree(catId: string) {
    try {
      const res = await getCategoryTree(catId);
      const subs: ApiTreeSubcategory[] = res.data?.subcategories ?? [];
      setTreeData(prev => ({ ...prev, [catId]: subs }));
      if (subs.length > 0 && !activeSubId) setActiveSubId(subs[0]._id);
    } catch { /* silent */ }
  }

  async function handleCreateCategory() {
    const name = newCatName.trim();
    if (!name) return;
    setCreating(true);
    setCreateError('');
    try {
      const res = await createCategory({ name, status: 'Active' });
      const cat = toLocal(res.data);
      setCategories(prev => [cat, ...prev]);
      setTreeData(prev => ({ ...prev, [cat.id]: [] }));
      setActiveCatId(cat.id);
      setActiveSubId(null);
      setNewCatName('');
    } catch (e: any) {
      setCreateError(e?.response?.data?.message ?? 'Failed to create category');
    } finally {
      setCreating(false);
    }
  }

  function handleSelectCategory(id: string) {
    setActiveCatId(id);
    const subs = treeData[id] ?? [];
    setActiveSubId(subs.length > 0 ? subs[0]._id : null);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setCategories(p => p.filter(c => c.id !== deleteTarget.id));
    setTreeData(p => { const n = { ...p }; delete n[deleteTarget.id]; return n; });
    if (activeCatId === deleteTarget.id) { setActiveCatId(null); setActiveSubId(null); }
    setDeleteTarget(null);
  }

  const toggleStyle = (on: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
    border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
    fontSize: 13, fontWeight: 500,
    background: on ? 'var(--green-pale)' : '#fff',
    color: on ? 'var(--green)' : '#666',
  });

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search categories…" />

      <main className="page-content">
        {/* Header */}
        <div className="page-hdr-row">
          <div className="page-title">Category Management</div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 9, padding: '11px 16px', fontSize: 13, color: '#dc2626', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {error}
            <button onClick={loadAll} style={{ fontSize: 12, color: '#dc2626', background: 'none', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', padding: '3px 10px' }}>
              Retry
            </button>
          </div>
        )}

        {/* Create card */}
        <div className="cb-create-card">
          <div className="cb-create-title">General Information</div>
          <div className="cb-create-field-label">Category Name</div>
          <input
            className="cb-create-input"
            placeholder="e.g. Interior Design"
            value={newCatName}
            onChange={e => { setNewCatName(e.target.value); setCreateError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleCreateCategory()}
            disabled={creating}
          />
          {createError && <div style={{ color: '#dc2626', fontSize: 12.5, marginTop: 6 }}>{createError}</div>}
          <div className="cb-create-footer">
            <button
              className="cb-btn-create"
              onClick={handleCreateCategory}
              disabled={creating || !newCatName.trim()}
              style={{ opacity: creating || !newCatName.trim() ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
            >
              {creating ? <Spin /> : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                </svg>
              )}
              {creating ? 'Creating…' : 'Create Category'}
            </button>
          </div>
        </div>

        {/* Browser */}
        <div className="cb-card">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '60px 20px', color: '#9ca3af', fontSize: 14 }}>
              <Spin /> Loading categories…
            </div>
          ) : categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 4 }}>No categories yet</div>
              <div style={{ fontSize: 13 }}>Create your first category above.</div>
            </div>
          ) : (
            <CategoryBrowser
              ref={browserRef}
              categories={categories}
              treeData={treeData}
              treeLoading={false}
              treeError={null}
              activeCategoryId={activeCatId}
              activeSubId={activeSubId}
              onSelectCategory={handleSelectCategory}
              onSelectSub={setActiveSubId}
              onNewSub={() => setSubModal(true)}
              onNewContent={() => setContentModal(true)}
              onDeleteCategory={setDeleteTarget}
              onRetry={refetchTree}
            />
          )}
        </div>
      </main>

      <SubcategoryModal
        isOpen={subModal}
        categories={categories}
        defaultCategoryId={activeCatId}
        onSubmit={(catId) => { refetchTree(catId); }}
        onClose={() => setSubModal(false)}
      />

      <ContentModal
        isOpen={contentModal}
        categories={categories}
        defaultCategoryId={activeCatId}
        defaultSubId={activeSubId}
        onSubmit={(catId) => { refetchTree(catId); }}
        onClose={() => setContentModal(false)}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This will permanently remove this category."
        confirmLabel="Yes, Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}