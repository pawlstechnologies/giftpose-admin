// import type { Category, Subcategory } from '../../data/CategoryData'

// interface CategoryBrowserProps {
//   categories: Category[];
//   activeCategoryId: string | null;
//   activeSubId: string | null;
//   onSelectCategory: (id: string) => void;
//   onSelectSub: (id: string) => void;
//   onNewSub: () => void;
//   onNewContent: () => void;
//   onEditCategory: (cat: Category) => void;
//   onDeleteCategory: (cat: Category) => void;
// }

// /* ─── Icons ──────────────────────────────────────────────── */
// const ChevronRight = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );

// const EditIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// /**
//  * CategoryBrowser
//  * Three-column drill-down: Categories → Subcategories → Content
//  */
// export default function CategoryBrowser({
//   categories,
//   activeCategoryId,
//   activeSubId,
//   onSelectCategory,
//   onSelectSub,
//   onNewSub,
//   onNewContent,
//   onEditCategory,
// //   onDeleteCategory,
// }: CategoryBrowserProps) {
//   const activeCategory = categories.find(c => c.id === activeCategoryId) ?? null;
//   const activeSub: Subcategory | null =
//     activeCategory?.subcategories.find(s => s.id === activeSubId) ?? null;

//   return (
//     <div className="cb-grid">
//       {/* ── Col 1: Categories ── */}
//       <div className="cb-col">
//         <div className="cb-col-head">
//           <span>Categories</span>
//         </div>
//         <div className="cb-list">
//           {categories.length === 0 ? (
//             <div className="cb-empty-col">No categories yet.</div>
//           ) : (
//             categories.map(cat => (
//               <div
//                 key={cat.id}
//                 className={`cb-item${cat.id === activeCategoryId ? ' active' : ''}`}
//                 onClick={() => onSelectCategory(cat.id)}
//               >
//                 <span className="cb-item-name">{cat.name}</span>
//                 <div className="cb-item-right">
//                   <div className="cb-item-actions">
//                     <button
//                       className="cb-action-btn edit"
//                       title="Edit"
//                       onClick={e => { e.stopPropagation(); onEditCategory(cat); }}
//                     >
//                       <EditIcon />
//                     </button>
//                     {/* <button
//                       className="cb-action-btn del"
//                       title="Delete"
//                       onClick={e => { e.stopPropagation(); onDeleteCategory(cat); }}
//                     >
//                       <TrashIcon />
//                     </button> */}
//                   </div>
//                   <ChevronRight />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ── Col 2: Subcategories ── */}
//       <div className="cb-col">
//         <div className="cb-col-head">
//           <span>Sub-categories</span>
//           {activeCategory && (
//             <button className="cb-btn-new" onClick={onNewSub}>
//               <PlusIcon /> New
//             </button>
//           )}
//         </div>
//         <div className="cb-list">
//           {!activeCategory ? (
//             <div className="cb-empty-col">Select a category first.</div>
//           ) : activeCategory.subcategories.length === 0 ? (
//             <div className="cb-empty-col">No subcategories yet.</div>
//           ) : (
//             activeCategory.subcategories.map(sub => (
//               <div
//                 key={sub.id}
//                 className={`cb-item${sub.id === activeSubId ? ' active' : ''}`}
//                 onClick={() => onSelectSub(sub.id)}
//               >
//                 <span className="cb-item-name">{sub.name}</span>
//                 <div className="cb-item-right">
//                   {!sub.active && (
//                     <span className="cb-badge-inactive">Inactive</span>
//                   )}
//                   <ChevronRight />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ── Col 3: Content ── */}
//       <div className="cb-col cb-col-last">
//         <div className="cb-col-head">
//           <span>Content</span>
//           {activeSub && (
//             <button className="cb-btn-new" onClick={onNewContent}>
//               <PlusIcon /> New
//             </button>
//           )}
//         </div>
//         <div className="cb-content-list">
//           {!activeSub ? (
//             <div className="cb-empty-col">Select a subcategory.</div>
//           ) : activeSub.content.length === 0 ? (
//             <div className="cb-empty-col">No content yet.</div>
//           ) : (
//             activeSub.content.map(item => (
//               <div key={item.id} className="cb-content-item">
//                 {item.name}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
// import { Category } from '../../data/categoryData';
// import {
//   getCategoryTree,
//   type ApiTreeSubcategory,
//   type ApiTreeContent,
// } from '../../api/admin.api';

// /* ─── Ref handle — lets parent trigger a tree refresh ───────── */
// export interface CategoryBrowserHandle {
//   /** Invalidate the cached tree for a category and re-fetch it */
//   invalidateTree: (categoryId: string) => void;
// }

// /* ─── Props ──────────────────────────────────────────────────── */
// interface CategoryBrowserProps {
//   categories: Category[];
//   activeCategoryId: string | null;
//   activeSubId: string | null;
//   onSelectCategory: (id: string) => void;
//   onSelectSub: (id: string) => void;
//   onNewSub: () => void;
//   onNewContent: () => void;
//   onEditCategory: (cat: Category) => void;
//   onDeleteCategory: (cat: Category) => void;
// }

// /* ─── Icons ──────────────────────────────────────────────────── */
// const ChevronRight = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );
// const EditIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const RetryIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M23 4v6h-6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/>
//   </svg>
// );

// /* ─── Skeleton loader ────────────────────────────────────────── */
// const ColSkeleton = () => (
//   <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//     {[80, 60, 90, 70, 55].map((w, i) => (
//       <div key={i} style={{
//         height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`,
//         animation: 'cb-pulse 1.4s ease-in-out infinite',
//         animationDelay: `${i * 0.12}s`,
//       }} />
//     ))}
//   </div>
// );

// /* ─── Component ──────────────────────────────────────────────── */
// const CategoryBrowser = forwardRef<CategoryBrowserHandle, CategoryBrowserProps>(
//   function CategoryBrowser(
//     {
//       categories,
//       activeCategoryId,
//       activeSubId,
//       onSelectCategory,
//       onSelectSub,
//       onNewSub,
//       onNewContent,
//       onEditCategory,
//       onDeleteCategory,
//     },
//     ref
//   ) {
//     /* Tree cache — keyed by categoryId, value = array of ApiTreeSubcategory */
//     const [treeCache, setTreeCache]     = useState<Record<string, ApiTreeSubcategory[]>>({});
//     const [treeLoading, setTreeLoading] = useState(false);
//     const [treeError, setTreeError]     = useState<string | null>(null);

//     /* Derived from cache */
//     const activeCategory = categories.find(c => c.id === activeCategoryId) ?? null;
//     const subcategories: ApiTreeSubcategory[] = activeCategoryId
//       ? (treeCache[activeCategoryId] ?? [])
//       : [];
//     const activeSub: ApiTreeSubcategory | null =
//       subcategories.find(s => s._id === activeSubId) ?? null;
//     const contentItems: ApiTreeContent[] = activeSub?.contents ?? [];

//     /* ── Fetch tree for a category ── */
//     const fetchTree = useCallback(async (catId: string, force = false) => {
//       if (!force && treeCache[catId]) return; // cache hit — skip
//       setTreeLoading(true);
//       setTreeError(null);
//       try {
//         const res = await getCategoryTree(catId);
//         setTreeCache(prev => ({ ...prev, [catId]: res.data.subcategories }));
//         // Auto-select first sub when nothing is selected
//         const subs = res.data.subcategories;
//         if (subs.length > 0 && (!activeSubId || !subs.find(s => s._id === activeSubId))) {
//           onSelectSub(subs[0]._id);
//         }
//       } catch (err: any) {
//         setTreeError(
//           err?.response?.data?.message ?? err?.message ?? 'Failed to load category tree.'
//         );
//       } finally {
//         setTreeLoading(false);
//       }
//     }, [treeCache, activeSubId, onSelectSub]);

//     /* ── Fetch when active category changes ── */
//     useEffect(() => {
//       if (activeCategoryId) fetchTree(activeCategoryId);
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [activeCategoryId]);

//     /* ── Expose invalidateTree to parent via ref ── */
//     useImperativeHandle(ref, () => ({
//       invalidateTree: (catId: string) => {
//         setTreeCache(prev => {
//           const next = { ...prev };
//           delete next[catId];
//           return next;
//         });
//         // Re-fetch immediately after clearing the cache
//         fetchTree(catId, true);
//       },
//     }), [fetchTree]);

//     /* ── Retry handler ── */
//     const handleRetry = () => {
//       if (!activeCategoryId) return;
//       setTreeCache(prev => { const n = { ...prev }; delete n[activeCategoryId]; return n; });
//       fetchTree(activeCategoryId, true);
//     };

//     return (
//       <>
//         <style>{`
//           @keyframes cb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//           @keyframes cb-spin   { to { transform: rotate(360deg) } }
//         `}</style>

//         <div className="cb-grid">

//           {/* ── Col 1: Categories ── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Categories</span>
//             </div>
//             <div className="cb-list">
//               {categories.length === 0 ? (
//                 <div className="cb-empty-col">No categories yet.</div>
//               ) : (
//                 categories.map(cat => (
//                   <div
//                     key={cat.id}
//                     className={`cb-item${cat.id === activeCategoryId ? ' active' : ''}`}
//                     onClick={() => onSelectCategory(cat.id)}
//                   >
//                     <span className="cb-item-name">{cat.name}</span>
//                     <div className="cb-item-right">
//                       <div className="cb-item-actions">
//                         <button
//                           className="cb-action-btn edit"
//                           title="Edit"
//                           onClick={e => { e.stopPropagation(); onEditCategory(cat); }}
//                         >
//                           <EditIcon />
//                         </button>
//                         <button
//                           className="cb-action-btn del"
//                           title="Delete"
//                           onClick={e => { e.stopPropagation(); onDeleteCategory(cat); }}
//                         >
//                           <TrashIcon />
//                         </button>
//                       </div>
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 2: Subcategories (live from tree API) ── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Sub-categories</span>
//               {activeCategory && !treeLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewSub}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-list">
//               {!activeCategory ? (
//                 <div className="cb-empty-col">Select a category first.</div>
//               ) : treeLoading ? (
//                 <ColSkeleton />
//               ) : treeError ? (
//                 <div className="cb-empty-col">
//                   <div style={{ color: '#ef4444', marginBottom: 8, fontSize: 13 }}>
//                     ⚠ {treeError}
//                   </div>
//                   <button
//                     onClick={handleRetry}
//                     style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#27ae60', background: 'none', border: '1.5px solid #b2dfcc', borderRadius: 6, cursor: 'pointer', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif' }}
//                   >
//                     <RetryIcon /> Retry
//                   </button>
//                 </div>
//               ) : subcategories.length === 0 ? (
//                 <div className="cb-empty-col">No subcategories yet. Click New to add one.</div>
//               ) : (
//                 subcategories.map(sub => (
//                   <div
//                     key={sub._id}
//                     className={`cb-item${sub._id === activeSubId ? ' active' : ''}`}
//                     onClick={() => onSelectSub(sub._id)}
//                   >
//                     <span className="cb-item-name">{sub.name}</span>
//                     <div className="cb-item-right">
//                       {sub.status === 'Inactive' && (
//                         <span className="cb-badge-inactive">Inactive</span>
//                       )}
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 3: Content (live from tree API) ── */}
//           <div className="cb-col cb-col-last">
//             <div className="cb-col-head">
//               <span>Content</span>
//               {activeSub && !treeLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewContent}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-content-list">
//               {!activeSub ? (
//                 <div className="cb-empty-col">Select a subcategory.</div>
//               ) : treeLoading ? (
//                 <ColSkeleton />
//               ) : contentItems.length === 0 ? (
//                 <div className="cb-empty-col">No content yet. Click New to add.</div>
//               ) : (
//                 contentItems.map(item => (
//                   <div key={item._id} className="cb-content-item">
//                     <span className="cb-content-name">{item.name}</span>
//                     <span className={`cb-content-status ${item.status === 'Active' ? 'active' : 'inactive'}`}>
//                       {item.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//         </div>
//       </>
//     );
//   }
// );

// export default CategoryBrowser;


// import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
// /* LocalCategory — inlined, no dummy data dependency */
// export interface LocalCategory { id: string; name: string; active: boolean; source: 'manual' | 'ai'; needsReview: boolean; }
// import {
//   getCategoryTree,
//   type ApiTreeSubcategory,
//   type ApiTreeContent,
// } from '../../api/admin.api';

// /* ─── Ref handle — lets parent trigger a tree refresh ───────── */
// export interface CategoryBrowserHandle {
//   /** Invalidate the cached tree for a category and re-fetch it */
//   invalidateTree: (categoryId: string) => void;
// }

// /* ─── Props ──────────────────────────────────────────────────── */
// interface CategoryBrowserProps {
//   categories: LocalCategory[];
//   activeCategoryId: string | null;
//   activeSubId: string | null;
//   onSelectCategory: (id: string) => void;
//   onSelectSub: (id: string) => void;
//   onNewSub: () => void;
//   onNewContent: () => void;
//   onEditCategory?: (cat: LocalCategory) => void;
//   onDeleteCategory: (cat: LocalCategory) => void;
// }

// /* ─── Icons ──────────────────────────────────────────────────── */
// const ChevronRight = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );
// const EditIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const RetryIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M23 4v6h-6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/>
//   </svg>
// );

// /* ─── Skeleton loader ────────────────────────────────────────── */
// const ColSkeleton = () => (
//   <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//     {[80, 60, 90, 70, 55].map((w, i) => (
//       <div key={i} style={{
//         height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`,
//         animation: 'cb-pulse 1.4s ease-in-out infinite',
//         animationDelay: `${i * 0.12}s`,
//       }} />
//     ))}
//   </div>
// );

// /* ─── Component ──────────────────────────────────────────────── */
// const CategoryBrowser = forwardRef<CategoryBrowserHandle, CategoryBrowserProps>(
//   function CategoryBrowser(
//     {
//       categories,
//       activeCategoryId,
//       activeSubId,
//       onSelectCategory,
//       onSelectSub,
//       onNewSub,
//       onNewContent,
//       onEditCategory,
//       onDeleteCategory,
//     },
//     ref
//   ) {
//     /* Tree cache — keyed by categoryId, value = array of ApiTreeSubcategory */
//     const [treeCache, setTreeCache]     = useState<Record<string, ApiTreeSubcategory[]>>({});
//     const [treeLoading, setTreeLoading] = useState(false);
//     const [treeError, setTreeError]     = useState<string | null>(null);

//     /* Derived from cache */
//     const activeCategory = categories.find(c => c.id === activeCategoryId) ?? null;
//     const subcategories: ApiTreeSubcategory[] = activeCategoryId
//       ? (treeCache[activeCategoryId] ?? [])
//       : [];
//     const activeSub: ApiTreeSubcategory | null =
//       subcategories.find(s => s._id === activeSubId) ?? null;
//     const contentItems: ApiTreeContent[] = activeSub?.contents ?? [];

//     /* ── Fetch tree for a category ── */
//     const fetchTree = useCallback(async (catId: string, force = false) => {
//       if (!force && treeCache[catId]) return; // cache hit — skip
//       setTreeLoading(true);
//       setTreeError(null);
//       try {
//         const res = await getCategoryTree(catId);
//         setTreeCache(prev => ({ ...prev, [catId]: res.data.subcategories }));
//         // Auto-select first sub when nothing is selected
//         const subs = res.data.subcategories;
//         if (subs.length > 0 && (!activeSubId || !subs.find(s => s._id === activeSubId))) {
//           onSelectSub(subs[0]._id);
//         }
//       } catch (err: any) {
//         setTreeError(
//           err?.response?.data?.message ?? err?.message ?? 'Failed to load category tree.'
//         );
//       } finally {
//         setTreeLoading(false);
//       }
//     }, [treeCache, activeSubId, onSelectSub]);

//     /* ── Fetch when active category changes ── */
//     useEffect(() => {
//       if (activeCategoryId) fetchTree(activeCategoryId);
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [activeCategoryId]);

//     /* ── Expose invalidateTree to parent via ref ── */
//     useImperativeHandle(ref, () => ({
//       invalidateTree: (catId: string) => {
//         setTreeCache(prev => {
//           const next = { ...prev };
//           delete next[catId];
//           return next;
//         });
//         // Re-fetch immediately after clearing the cache
//         fetchTree(catId, true);
//       },
//     }), [fetchTree]);

//     /* ── Retry handler ── */
//     const handleRetry = () => {
//       if (!activeCategoryId) return;
//       setTreeCache(prev => { const n = { ...prev }; delete n[activeCategoryId]; return n; });
//       fetchTree(activeCategoryId, true);
//     };

//     return (
//       <>
//         <style>{`
//           @keyframes cb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//           @keyframes cb-spin   { to { transform: rotate(360deg) } }
//         `}</style>

//         <div className="cb-grid">

//           {/* ── Col 1: Categories ── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Categories</span>
//             </div>
//             <div className="cb-list">
//               {categories.length === 0 ? (
//                 <div className="cb-empty-col">No categories yet.</div>
//               ) : (
//                 categories.map(cat => (
//                   <div
//                     key={cat.id}
//                     className={`cb-item${cat.id === activeCategoryId ? ' active' : ''}`}
//                     onClick={() => onSelectCategory(cat.id)}
//                   >
//                     <span className="cb-item-name">{cat.name}</span>
//                     <div className="cb-item-right">
//                       <div className="cb-item-actions">
//                         <button
//                           className="cb-action-btn edit"
//                           title="Edit"
//                           onClick={e => { e.stopPropagation(); onEditCategory?.(cat); }}
//                         >
//                           <EditIcon />
//                         </button>
//                         <button
//                           className="cb-action-btn del"
//                           title="Delete"
//                           onClick={e => { e.stopPropagation(); onDeleteCategory(cat); }}
//                         >
//                           <TrashIcon />
//                         </button>
//                       </div>
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 2: Subcategories (live from tree API) ── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Sub-categories</span>
//               {activeCategory && !treeLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewSub}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-list">
//               {!activeCategory ? (
//                 <div className="cb-empty-col">Select a category first.</div>
//               ) : treeLoading ? (
//                 <ColSkeleton />
//               ) : treeError ? (
//                 <div className="cb-empty-col">
//                   <div style={{ color: '#ef4444', marginBottom: 8, fontSize: 13 }}>
//                     ⚠ {treeError}
//                   </div>
//                   <button
//                     onClick={handleRetry}
//                     style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#27ae60', background: 'none', border: '1.5px solid #b2dfcc', borderRadius: 6, cursor: 'pointer', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif' }}
//                   >
//                     <RetryIcon /> Retry
//                   </button>
//                 </div>
//               ) : subcategories.length === 0 ? (
//                 <div className="cb-empty-col">No subcategories yet. Click New to add one.</div>
//               ) : (
//                 subcategories.map(sub => (
//                   <div
//                     key={sub._id}
//                     className={`cb-item${sub._id === activeSubId ? ' active' : ''}`}
//                     onClick={() => onSelectSub(sub._id)}
//                   >
//                     <span className="cb-item-name">{sub.name}</span>
//                     <div className="cb-item-right">
//                       {sub.status === 'Inactive' && (
//                         <span className="cb-badge-inactive">Inactive</span>
//                       )}
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 3: Content (live from tree API) ── */}
//           <div className="cb-col cb-col-last">
//             <div className="cb-col-head">
//               <span>Content</span>
//               {activeSub && !treeLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewContent}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-content-list">
//               {!activeSub ? (
//                 <div className="cb-empty-col">Select a subcategory.</div>
//               ) : treeLoading ? (
//                 <ColSkeleton />
//               ) : contentItems.length === 0 ? (
//                 <div className="cb-empty-col">No content yet. Click New to add.</div>
//               ) : (
//                 contentItems.map(item => (
//                   <div key={item._id} className="cb-content-item">
//                     <span className="cb-content-name">{item.name}</span>
//                     <span className={`cb-content-status ${item.status === 'Active' ? 'active' : 'inactive'}`}>
//                       {item.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//         </div>
//       </>
//     );
//   }
// );

// export default CategoryBrowser;



// import { useImperativeHandle, forwardRef } from 'react';
// import {
//   type ApiTreeSubcategory,
//   type ApiTreeContent,
// } from '../../api/admin.api';

// /* ─── Types ──────────────────────────────────────────────────── */
// export interface LocalCategory {
//   id:          string;
//   name:        string;
//   active:      boolean;
//   source:      'manual' | 'ai';
//   needsReview: boolean;
// }

// /** Full tree data keyed by categoryId — passed in from parent */
// export type TreeCache = Record<string, ApiTreeSubcategory[]>;

// /* ─── Ref handle ─────────────────────────────────────────────── */
// export interface CategoryBrowserHandle {
//   /** Parent calls this after creating sub/content so parent can re-fetch + update treeData */
//   refresh: (categoryId: string) => void;
// }

// /* ─── Props ──────────────────────────────────────────────────── */
// interface CategoryBrowserProps {
//   categories:       LocalCategory[];
//   treeData:         TreeCache;           // pre-fetched from parent
//   treeLoading:      boolean;             // parent loading state
//   treeError:        string | null;       // per-category error from parent
//   activeCategoryId: string | null;
//   activeSubId:      string | null;
//   onSelectCategory: (id: string) => void;
//   onSelectSub:      (id: string) => void;
//   onNewSub:         () => void;
//   onNewContent:     () => void;
//   onDeleteCategory: (cat: LocalCategory) => void;
//   onRetry:          (categoryId: string) => void;
// }

// /* ─── Icons ──────────────────────────────────────────────────── */
// const ChevronRight = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// /* ─── Skeleton loader ────────────────────────────────────────── */
// const ColSkeleton = () => (
//   <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//     {[80, 55, 90, 65, 75].map((w, i) => (
//       <div key={i} style={{
//         height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`,
//         animation: 'cb-pulse 1.4s ease-in-out infinite',
//         animationDelay: `${i * 0.12}s`,
//       }} />
//     ))}
//   </div>
// );

// /* ─── Component ──────────────────────────────────────────────── */
// const CategoryBrowser = forwardRef<CategoryBrowserHandle, CategoryBrowserProps>(
//   function CategoryBrowser(
//     {
//       categories,
//       treeData,
//       treeLoading,
//       treeError,
//       activeCategoryId,
//       activeSubId,
//       onSelectCategory,
//       onSelectSub,
//       onNewSub,
//       onNewContent,
//       onDeleteCategory,
//       onRetry,
//     },
//     ref
//   ) {
//     /* Expose refresh handle to parent (parent does the actual re-fetch) */
//     useImperativeHandle(ref, () => ({
//       refresh: (_categoryId: string) => {
//         // No-op here — parent handles the re-fetch via onRetry / its own state
//       },
//     }));

//     /* ── Derived from pre-fetched treeData ── */
//     const subcategories: ApiTreeSubcategory[] =
//       activeCategoryId ? (treeData[activeCategoryId] ?? []) : [];
//     const activeSub: ApiTreeSubcategory | null =
//       subcategories.find(s => s._id === activeSubId) ?? null;
//     const contentItems: ApiTreeContent[] = activeSub?.contents ?? [];

//     const isCatLoading = treeLoading && activeCategoryId && !treeData[activeCategoryId];

//     return (
//       <>
//         <style>{`
//           @keyframes cb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//           @keyframes cb-spin   { to { transform: rotate(360deg) } }
//         `}</style>

//         <div className="cb-grid">

//           {/* ── Col 1: Categories ─────────────────────────────── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Categories</span>
//             </div>
//             <div className="cb-list">
//               {categories.length === 0 ? (
//                 <div className="cb-empty-col">No categories yet.</div>
//               ) : (
//                 categories.map(cat => (
//                   <div
//                     key={cat.id}
//                     className={`cb-item${cat.id === activeCategoryId ? ' active' : ''}`}
//                     onClick={() => onSelectCategory(cat.id)}
//                   >
//                     <span className="cb-item-name">{cat.name}</span>
//                     <div className="cb-item-right">
//                       <div className="cb-item-actions">
//                         <button
//                           className="cb-action-btn del"
//                           title="Delete"
//                           onClick={e => { e.stopPropagation(); onDeleteCategory(cat); }}
//                         >
//                           <TrashIcon />
//                         </button>
//                       </div>
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 2: Subcategories ──────────────────────────── */}
//           <div className="cb-col">
//             <div className="cb-col-head">
//               <span>Sub-categories</span>
//               {activeCategoryId && !isCatLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewSub}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-list">
//               {!activeCategoryId ? (
//                 <div className="cb-empty-col">Select a category.</div>
//               ) : isCatLoading ? (
//                 <ColSkeleton />
//               ) : treeError ? (
//                 <div className="cb-empty-col">
//                   <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>⚠ {treeError}</div>
//                   <button
//                     onClick={() => onRetry(activeCategoryId)}
//                     style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#27ae60', background: 'none', border: '1.5px solid #b2dfcc', borderRadius: 6, cursor: 'pointer', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif' }}
//                   >
//                     Retry
//                   </button>
//                 </div>
//               ) : subcategories.length === 0 ? (
//                 <div className="cb-empty-col">No subcategories yet.</div>
//               ) : (
//                 subcategories.map(sub => (
//                   <div
//                     key={sub._id}
//                     className={`cb-item${sub._id === activeSubId ? ' active' : ''}`}
//                     onClick={() => onSelectSub(sub._id)}
//                   >
//                     <span className="cb-item-name">{sub.name}</span>
//                     <div className="cb-item-right">
//                       {sub.status === 'Inactive' && (
//                         <span className="cb-badge-inactive">Inactive</span>
//                       )}
//                       <ChevronRight />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ── Col 3: Content ────────────────────────────────── */}
//           <div className="cb-col cb-col-last">
//             <div className="cb-col-head">
//               <span>Content</span>
//               {activeSub && !isCatLoading && !treeError && (
//                 <button className="cb-btn-new" onClick={onNewContent}>
//                   <PlusIcon /> New
//                 </button>
//               )}
//             </div>
//             <div className="cb-content-list">
//               {!activeSub ? (
//                 <div className="cb-empty-col">Select a subcategory.</div>
//               ) : isCatLoading ? (
//                 <ColSkeleton />
//               ) : contentItems.length === 0 ? (
//                 <div className="cb-empty-col">No content yet.</div>
//               ) : (
//                 contentItems.map(item => (
//                   <div key={item._id} className="cb-content-item">
//                     <span className="cb-content-name">{item.name}</span>
//                     <span className={`cb-content-status ${item.status === 'Active' ? 'active' : 'inactive'}`}>
//                       {item.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//         </div>
//       </>
//     );
//   }
// );

// export default CategoryBrowser;



import { useImperativeHandle, forwardRef } from 'react';
import {
  type ApiTreeSubcategory,
  type ApiTreeContent,
} from '../../api/admin.api';

/* ─── Types ──────────────────────────────────────────────────── */
export interface LocalCategory {
  id:            string;
  name:          string;
  active:        boolean;
  source:        'manual' | 'ai';
  needsReview:   boolean;
  subcategories: { id: string; name: string }[];  // required by ContentModal
}

/** Full tree data keyed by categoryId — passed in from parent */
export type TreeCache = Record<string, ApiTreeSubcategory[]>;

/* ─── Ref handle ─────────────────────────────────────────────── */
export interface CategoryBrowserHandle {
  refresh: (categoryId: string) => void;
}

/* ─── Props ──────────────────────────────────────────────────── */
interface CategoryBrowserProps {
  categories:       LocalCategory[];
  treeData:         TreeCache;
  treeLoading:      boolean;
  treeError:        string | null;
  activeCategoryId: string | null;
  activeSubId:      string | null;
  onSelectCategory: (id: string) => void;
  onSelectSub:      (id: string) => void;
  onNewSub:         () => void;
  onNewContent:     () => void;
  onDeleteCategory: (cat: LocalCategory) => void;
  onRetry:          (categoryId: string) => void;
}

/* ─── Icons ──────────────────────────────────────────────────── */
const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ─── Skeleton loader ────────────────────────────────────────── */
const ColSkeleton = () => (
  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
    {[80, 55, 90, 65, 75].map((w, i) => (
      <div key={i} style={{
        height: 14, borderRadius: 6, background: '#f0f0f0', width: `${w}%`,
        animation: 'cb-pulse 1.4s ease-in-out infinite',
        animationDelay: `${i * 0.12}s`,
      }} />
    ))}
  </div>
);

/* ─── Component ──────────────────────────────────────────────── */
const CategoryBrowser = forwardRef<CategoryBrowserHandle, CategoryBrowserProps>(
  function CategoryBrowser(
    {
      categories,
      treeData,
      treeLoading,
      treeError,
      activeCategoryId,
      activeSubId,
      onSelectCategory,
      onSelectSub,
      onNewSub,
      onNewContent,
      onDeleteCategory,
      onRetry,
    },
    ref
  ) {
    useImperativeHandle(ref, () => ({
      refresh: (_categoryId: string) => {
        // No-op — parent handles re-fetch via onRetry
      },
    }));

    const subcategories: ApiTreeSubcategory[] =
      activeCategoryId ? (treeData[activeCategoryId] ?? []) : [];
    const activeSub: ApiTreeSubcategory | null =
      subcategories.find(s => s._id === activeSubId) ?? null;
    const contentItems: ApiTreeContent[] = activeSub?.contents ?? [];

    const isCatLoading = treeLoading && activeCategoryId && !treeData[activeCategoryId];

    return (
      <>
        <style>{`
          @keyframes cb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
          @keyframes cb-spin   { to { transform: rotate(360deg) } }
        `}</style>

        <div className="cb-grid">

          {/* Col 1: Categories */}
          <div className="cb-col">
            <div className="cb-col-head"><span>Categories</span></div>
            <div className="cb-list">
              {categories.length === 0 ? (
                <div className="cb-empty-col">No categories yet.</div>
              ) : (
                categories.map(cat => (
                  <div
                    key={cat.id}
                    className={`cb-item${cat.id === activeCategoryId ? ' active' : ''}`}
                    onClick={() => onSelectCategory(cat.id)}
                  >
                    <span className="cb-item-name">{cat.name}</span>
                    <div className="cb-item-right">
                      <div className="cb-item-actions">
                        <button
                          className="cb-action-btn del"
                          title="Delete"
                          onClick={e => { e.stopPropagation(); onDeleteCategory(cat); }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <ChevronRight />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Col 2: Subcategories */}
          <div className="cb-col">
            <div className="cb-col-head">
              <span>Sub-categories</span>
              {activeCategoryId && !isCatLoading && !treeError && (
                <button className="cb-btn-new" onClick={onNewSub}><PlusIcon /> New</button>
              )}
            </div>
            <div className="cb-list">
              {!activeCategoryId ? (
                <div className="cb-empty-col">Select a category.</div>
              ) : isCatLoading ? (
                <ColSkeleton />
              ) : treeError ? (
                <div className="cb-empty-col">
                  <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>⚠ {treeError}</div>
                  <button
                    onClick={() => onRetry(activeCategoryId)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#27ae60', background: 'none', border: '1.5px solid #b2dfcc', borderRadius: 6, cursor: 'pointer', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Retry
                  </button>
                </div>
              ) : subcategories.length === 0 ? (
                <div className="cb-empty-col">No subcategories yet.</div>
              ) : (
                subcategories.map(sub => (
                  <div
                    key={sub._id}
                    className={`cb-item${sub._id === activeSubId ? ' active' : ''}`}
                    onClick={() => onSelectSub(sub._id)}
                  >
                    <span className="cb-item-name">{sub.name}</span>
                    <div className="cb-item-right">
                      {sub.status === 'Inactive' && <span className="cb-badge-inactive">Inactive</span>}
                      <ChevronRight />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Col 3: Content */}
          <div className="cb-col cb-col-last">
            <div className="cb-col-head">
              <span>Content</span>
              {activeSub && !isCatLoading && !treeError && (
                <button className="cb-btn-new" onClick={onNewContent}><PlusIcon /> New</button>
              )}
            </div>
            <div className="cb-content-list">
              {!activeSub ? (
                <div className="cb-empty-col">Select a subcategory.</div>
              ) : isCatLoading ? (
                <ColSkeleton />
              ) : contentItems.length === 0 ? (
                <div className="cb-empty-col">No content yet.</div>
              ) : (
                contentItems.map(item => (
                  <div key={item._id} className="cb-content-item">
                    <span className="cb-content-name">{item.name}</span>
                    <span className={`cb-content-status ${item.status === 'Active' ? 'active' : 'inactive'}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </>
    );
  }
);

export default CategoryBrowser;

