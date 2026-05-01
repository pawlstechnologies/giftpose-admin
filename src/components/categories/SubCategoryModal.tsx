// // import { useState, useEffect } from 'react';
// // import type { KeyboardEvent } from 'react';

// // import type { Category } from '../../data/CategoryData';

// // interface SubcategoryModalProps {
// //   isOpen: boolean;
// //   categories: Category[];
// //   defaultCategoryId?: string | null;
// //   onSubmit: (categoryId: string, names: string[]) => void;
// //   onClose: () => void;
// // }

// // /**
// //  * SubcategoryModal
// //  * Allows creating one or more subcategories (as tags) under a selected parent.
// //  */
// // export default function SubcategoryModal({
// //   isOpen,
// //   categories,
// //   defaultCategoryId,
// //   onSubmit,
// //   onClose,
// // }: SubcategoryModalProps) {
// //   const [selectedCatId, setSelectedCatId] = useState('');
// //   const [tagInput, setTagInput]           = useState('');
// //   const [tags, setTags]                   = useState<string[]>([]);

// //   useEffect(() => {
// //     if (isOpen) {
// //       setSelectedCatId(defaultCategoryId ?? categories[0]?.id ?? '');
// //       setTagInput('');
// //       setTags([]);
// //     }
// //   }, [isOpen, defaultCategoryId, categories]);

// //   if (!isOpen) return null;

// //   const addTag = (val: string) => {
// //     const clean = val.trim().replace(/,$/, '');
// //     if (clean && !tags.includes(clean)) setTags(prev => [...prev, clean]);
// //     setTagInput('');
// //   };

// //   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
// //     if (e.key === 'Backspace' && !tagInput && tags.length) {
// //       setTags(prev => prev.slice(0, -1));
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (tagInput.trim()) addTag(tagInput);
// //     if (!selectedCatId || tags.length === 0) return;
// //     onSubmit(selectedCatId, tags);
// //     onClose();
// //   };

// //   return (
// //     <div className="modal-backdrop" onClick={onClose}>
// //       <div className="modal" onClick={e => e.stopPropagation()}>
// //         {/* Close */}
// //         <button className="modal-close" onClick={onClose} aria-label="Close">
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <path d="M18 6L6 18M6 6l12 12" />
// //           </svg>
// //         </button>

// //         <div className="modal-title">New Sub-category</div>
// //         <div className="modal-subtitle">Create a specialised collection within a parent category.</div>

// //         {/* Parent category select */}
// //         <div className="modal-field">
// //           <div className="form-label">Parent Category</div>
// //           <div className="cb-select-wrap">
// //             <select
// //               className="cb-select"
// //               value={selectedCatId}
// //               onChange={e => setSelectedCatId(e.target.value)}
// //             >
// //               {categories.map(c => (
// //                 <option key={c.id} value={c.id}>{c.name}</option>
// //               ))}
// //             </select>
// //             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
// //               <polyline points="6 9 12 15 18 9" />
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Tag input */}
// //         <div className="modal-field">
// //           <div className="form-label">Sub-category Names</div>
// //           <div className="cb-tag-wrap">
// //             {tags.map((t, i) => (
// //               <span key={i} className="cb-tag">
// //                 {t}
// //                 <button onClick={() => setTags(prev => prev.filter((_, j) => j !== i))}>×</button>
// //               </span>
// //             ))}
// //             <input
// //               className="cb-tag-input"
// //               type="text"
// //               placeholder={tags.length === 0 ? 'e.g. Living Room Furniture' : ''}
// //               value={tagInput}
// //               onChange={e => setTagInput(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
// //               autoFocus
// //             />
// //           </div>
// //           <div className="cb-field-hint">Press Enter or comma to add multiple names</div>
// //         </div>

// //         <button
// //           className="cb-btn-submit"
// //           onClick={handleSubmit}
// //           disabled={tags.length === 0 && !tagInput.trim()}
// //         >
// //           Submit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useState, useEffect, KeyboardEvent } from 'react';
// // import { useState, useEffect } from 'react';
// // import type { KeyboardEvent } from 'react';
// // import type { Category } from '../../data/CategoryData';
// // import { createSubcategory } from '../../api/admin.api';

// // interface SubcategoryModalProps {
// //   isOpen: boolean;
// //   categories: Category[];
// //   defaultCategoryId?: string | null;
// //   /** Called after successful API creation — receives the real API _id and name per sub */
// //   onSubmit: (categoryId: string, created: { id: string; name: string }[]) => void;
// //   onClose: () => void;
// // }

// // const SpinIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
// //     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
// //   </svg>
// // );

// // export default function SubcategoryModal({
// //   isOpen,
// //   categories,
// //   defaultCategoryId,
// //   onSubmit,
// //   onClose,
// // }: SubcategoryModalProps) {
// //   const [selectedCatId, setSelectedCatId] = useState('');
// //   const [tagInput, setTagInput]           = useState('');
// //   const [tags, setTags]                   = useState<string[]>([]);
// //   const [loading, setLoading]             = useState(false);
// //   const [error, setError]                 = useState<string | null>(null);

// //   useEffect(() => {
// //     if (isOpen) {
// //       setSelectedCatId(defaultCategoryId ?? categories[0]?.id ?? '');
// //       setTagInput('');
// //       setTags([]);
// //       setError(null);
// //       setLoading(false);
// //     }
// //   }, [isOpen, defaultCategoryId, categories]);

// //   if (!isOpen) return null;

// //   const addTag = (val: string) => {
// //     const clean = val.trim().replace(/,$/, '');
// //     if (clean && !tags.includes(clean)) setTags(prev => [...prev, clean]);
// //     setTagInput('');
// //   };

// //   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
// //     if (e.key === 'Backspace' && !tagInput && tags.length) setTags(prev => prev.slice(0, -1));
// //   };

// //   const handleSubmit = async () => {
// //     // Commit any pending typed value
// //     const finalTags = [...tags];
// //     if (tagInput.trim() && !tags.includes(tagInput.trim())) finalTags.push(tagInput.trim());
// //     if (!selectedCatId || finalTags.length === 0) return;

// //     setError(null);
// //     setLoading(true);

// //     try {
// //       // Create all subcategories in parallel
// //       const results = await Promise.all(
// //         finalTags.map(name =>
// //           createSubcategory({ name, categoryId: selectedCatId, status: 'Active' })
// //             .then(r => ({ id: r.data._id, name: r.data.name }))
// //         )
// //       );
// //       onSubmit(selectedCatId, results);
// //       onClose();
// //     } catch (err: any) {
// //       setError(
// //         err?.response?.data?.message ??
// //         err?.response?.data?.error ??
// //         err?.message ??
// //         'Failed to create subcategory. Please try again.'
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const canSubmit = (tags.length > 0 || tagInput.trim().length > 0) && !loading;

// //   return (
// //     <div className="modal-backdrop" onClick={onClose}>
// //       <div className="modal" onClick={e => e.stopPropagation()}>
// //         <button className="modal-close" onClick={onClose} aria-label="Close" disabled={loading}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <path d="M18 6L6 18M6 6l12 12" />
// //           </svg>
// //         </button>

// //         <div className="modal-title">New Sub-category</div>
// //         <div className="modal-subtitle">Create a specialised collection within a parent category.</div>

// //         {/* Error */}
// //         {error && (
// //           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
// //               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
// //             </svg>
// //             {error}
// //           </div>
// //         )}

// //         {/* Parent category select */}
// //         <div className="modal-field">
// //           <div className="form-label">Parent Category</div>
// //           <div className="cb-select-wrap">
// //             <select className="cb-select" value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)} disabled={loading}>
// //               {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
// //             </select>
// //             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
// //               <polyline points="6 9 12 15 18 9" />
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Tag input */}
// //         <div className="modal-field">
// //           <div className="form-label">Sub-category Names</div>
// //           <div className="cb-tag-wrap">
// //             {tags.map((t, i) => (
// //               <span key={i} className="cb-tag">
// //                 {t}
// //                 <button onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} disabled={loading}>×</button>
// //               </span>
// //             ))}
// //             <input
// //               className="cb-tag-input"
// //               type="text"
// //               placeholder={tags.length === 0 ? 'e.g. Living Room Furniture' : ''}
// //               value={tagInput}
// //               onChange={e => setTagInput(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
// //               disabled={loading}
// //               autoFocus
// //             />
// //           </div>
// //           <div className="cb-field-hint">Press Enter or comma to add multiple names</div>
// //         </div>

// //         <button
// //           className="cb-btn-submit"
// //           onClick={handleSubmit}
// //           disabled={!canSubmit}
// //           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
// //         >
// //           {loading && <SpinIcon />}
// //           {loading ? 'Creating…' : 'Submit'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useState, useEffect, KeyboardEvent } from 'react';
// import { useState, useEffect } from 'react';
// import type { KeyboardEvent } from 'react';
// /* LocalCategory — inlined, no dummy data dependency */
// interface LocalCategory { id: string; name: string; active: boolean; source: 'manual' | 'ai'; needsReview: boolean; }

// import { createSubcategory } from '../../api/admin.api';

// interface SubcategoryModalProps {
//   isOpen: boolean;
//   categories: LocalCategory[];
//   defaultCategoryId?: string | null;
//   /** Called after successful API creation — receives the real API _id and name per sub */
//   onSubmit: (categoryId: string, created: { id: string; name: string }[]) => void;
//   onClose: () => void;
// }

// const SpinIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//     style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
//     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//   </svg>
// );

// export default function SubcategoryModal({
//   isOpen,
//   categories,
//   defaultCategoryId,
//   onSubmit,
//   onClose,
// }: SubcategoryModalProps) {
//   const [selectedCatId, setSelectedCatId] = useState('');
//   const [tagInput, setTagInput]           = useState('');
//   const [tags, setTags]                   = useState<string[]>([]);
//   const [loading, setLoading]             = useState(false);
//   const [error, setError]                 = useState<string | null>(null);

//   useEffect(() => {
//     if (isOpen) {
//       setSelectedCatId(defaultCategoryId ?? categories[0]?.id ?? '');
//       setTagInput('');
//       setTags([]);
//       setError(null);
//       setLoading(false);
//     }
//   }, [isOpen, defaultCategoryId, categories]);

//   if (!isOpen) return null;

//   const addTag = (val: string) => {
//     const clean = val.trim().replace(/,$/, '');
//     if (clean && !tags.includes(clean)) setTags(prev => [...prev, clean]);
//     setTagInput('');
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
//     if (e.key === 'Backspace' && !tagInput && tags.length) setTags(prev => prev.slice(0, -1));
//   };

//   const handleSubmit = async () => {
//     // Commit any pending typed value
//     const finalTags = [...tags];
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) finalTags.push(tagInput.trim());
//     if (!selectedCatId || finalTags.length === 0) return;

//     setError(null);
//     setLoading(true);

//     try {
//       // Create all subcategories in parallel
//       const results = await Promise.all(
//         finalTags.map(name =>
//           createSubcategory({ name, categoryId: selectedCatId, status: 'Active' })
//             .then(r => ({ id: r.data._id, name: r.data.name }))
//         )
//       );
//       onSubmit(selectedCatId, results);
//       onClose();
//     } catch (err: any) {
//       setError(
//         err?.response?.data?.message ??
//         err?.response?.data?.error ??
//         err?.message ??
//         'Failed to create subcategory. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const canSubmit = (tags.length > 0 || tagInput.trim().length > 0) && !loading;

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal" onClick={e => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose} aria-label="Close" disabled={loading}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M18 6L6 18M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="modal-title">New Sub-category</div>
//         <div className="modal-subtitle">Create a specialised collection within a parent category.</div>

//         {/* Error */}
//         {error && (
//           <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
//               <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//             </svg>
//             {error}
//           </div>
//         )}

//         {/* Parent category select */}
//         <div className="modal-field">
//           <div className="form-label">Parent Category</div>
//           <div className="cb-select-wrap">
//             <select className="cb-select" value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)} disabled={loading}>
//               {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//             </select>
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
//               <polyline points="6 9 12 15 18 9" />
//             </svg>
//           </div>
//         </div>

//         {/* Tag input */}
//         <div className="modal-field">
//           <div className="form-label">Sub-category Names</div>
//           <div className="cb-tag-wrap">
//             {tags.map((t, i) => (
//               <span key={i} className="cb-tag">
//                 {t}
//                 <button onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} disabled={loading}>×</button>
//               </span>
//             ))}
//             <input
//               className="cb-tag-input"
//               type="text"
//               placeholder={tags.length === 0 ? 'e.g. Living Room Furniture' : ''}
//               value={tagInput}
//               onChange={e => setTagInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
//               disabled={loading}
//               autoFocus
//             />
//           </div>
//           <div className="cb-field-hint">Press Enter or comma to add multiple names</div>
//         </div>

//         <button
//           className="cb-btn-submit"
//           onClick={handleSubmit}
//           disabled={!canSubmit}
//           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
//         >
//           {loading && <SpinIcon />}
//           {loading ? 'Creating…' : 'Submit'}
//         </button>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect, KeyboardEvent } from 'react';
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
/* LocalCategory — inlined, no dummy data dependency */
interface LocalCategory { id: string; name: string; active: boolean; source: 'manual' | 'ai'; needsReview: boolean; }

import { createSubcategory } from '../../api/admin.api';

interface SubcategoryModalProps {
  isOpen: boolean;
  categories: LocalCategory[];
  defaultCategoryId?: string | null;
  /** Called after successful API creation — receives the real API _id and name per sub */
  onSubmit: (categoryId: string) => void;
  onClose: () => void;
}

const SpinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

export default function SubcategoryModal({
  isOpen,
  categories,
  defaultCategoryId,
  onSubmit,
  onClose,
}: SubcategoryModalProps) {
  const [selectedCatId, setSelectedCatId] = useState('');
  const [tagInput, setTagInput]           = useState('');
  const [tags, setTags]                   = useState<string[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCatId(defaultCategoryId ?? categories[0]?.id ?? '');
      setTagInput('');
      setTags([]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, defaultCategoryId, categories]);

  if (!isOpen) return null;

  const addTag = (val: string) => {
    const clean = val.trim().replace(/,$/, '');
    if (clean && !tags.includes(clean)) setTags(prev => [...prev, clean]);
    setTagInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
    if (e.key === 'Backspace' && !tagInput && tags.length) setTags(prev => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    // Commit any pending typed value
    const finalTags = [...tags];
    if (tagInput.trim() && !tags.includes(tagInput.trim())) finalTags.push(tagInput.trim());
    if (!selectedCatId || finalTags.length === 0) return;

    setError(null);
    setLoading(true);

    try {
      // Create all subcategories in parallel
      const results = await Promise.all(
        finalTags.map(name =>
          createSubcategory({ name, categoryId: selectedCatId, status: 'Active' })
            .then(r => ({ id: r.data._id, name: r.data.name }))
        )
      );
      onSubmit(selectedCatId);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        'Failed to create subcategory. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = (tags.length > 0 || tagInput.trim().length > 0) && !loading;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close" disabled={loading}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-title">New Sub-category</div>
        <div className="modal-subtitle">Create a specialised collection within a parent category.</div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Parent category select */}
        <div className="modal-field">
          <div className="form-label">Parent Category</div>
          <div className="cb-select-wrap">
            <select className="cb-select" value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)} disabled={loading}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Tag input */}
        <div className="modal-field">
          <div className="form-label">Sub-category Names</div>
          <div className="cb-tag-wrap">
            {tags.map((t, i) => (
              <span key={i} className="cb-tag">
                {t}
                <button onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} disabled={loading}>×</button>
              </span>
            ))}
            <input
              className="cb-tag-input"
              type="text"
              placeholder={tags.length === 0 ? 'e.g. Living Room Furniture' : ''}
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="cb-field-hint">Press Enter or comma to add multiple names</div>
        </div>

        <button
          className="cb-btn-submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {loading && <SpinIcon />}
          {loading ? 'Creating…' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

