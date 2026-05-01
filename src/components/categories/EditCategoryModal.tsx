// import { useState, useEffect } from 'react';
// import type { KeyboardEvent } from 'react';
// import type { Category } from '../../data/CategoryData';

// interface EditCategoryModalProps {
//   isOpen: boolean;
//   category: Category | null;
//   allCategories: Category[];
//   onSubmit: (categoryId: string, subTags: string[], contentTags: string[]) => void;
//   onClose: () => void;
// }

// /**
//  * EditCategoryModal
//  * Edit a category's subcategories and content items.
//  * Matches the HTML design's "Edit Category" modal exactly.
//  */
// export default function EditCategoryModal({
//   isOpen,
//   category,
//   allCategories,
//   onSubmit,
//   onClose,
// }: EditCategoryModalProps) {
//   const [selectedCatId, setSelectedCatId] = useState('');
//   const [subInput, setSubInput]           = useState('');
//   const [subTags, setSubTags]             = useState<string[]>([]);
//   const [contentInput, setContentInput]   = useState('');
//   const [contentTags, setContentTags]     = useState<string[]>([]);

//   useEffect(() => {
//     if (isOpen && category) {
//       setSelectedCatId(category.id);
//       setSubTags(category.subcategories.map(s => s.name));
//       const firstSub = category.subcategories[0];
//       setContentTags(firstSub?.content.map(c => c.name) ?? []);
//       setSubInput('');
//       setContentInput('');
//     }
//   }, [isOpen, category]);

//   if (!isOpen || !category) return null;

//   const addTag = (
//     val: string,
//     list: string[],
//     setter: React.Dispatch<React.SetStateAction<string[]>>,
//     inputSetter: React.Dispatch<React.SetStateAction<string>>
//   ) => {
//     const clean = val.trim().replace(/,$/, '');
//     if (clean && !list.includes(clean)) setter(prev => [...prev, clean]);
//     inputSetter('');
//   };

//   const makeKeyHandler = (
//     list: string[],
//     setter: React.Dispatch<React.SetStateAction<string[]>>,
//     inputVal: string,
//     inputSetter: React.Dispatch<React.SetStateAction<string>>
//   ) => (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(inputVal, list, setter, inputSetter); }
//     if (e.key === 'Backspace' && !inputVal && list.length) setter(prev => prev.slice(0, -1));
//   };

//   const handleSubmit = () => {
//     if (subInput.trim()) addTag(subInput, subTags, setSubTags, setSubInput);
//     if (contentInput.trim()) addTag(contentInput, contentTags, setContentTags, setContentInput);
//     onSubmit(selectedCatId, subTags, contentTags);
//     onClose();
//   };

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal" onClick={e => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose} aria-label="Close">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M18 6L6 18M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="modal-title">Edit Category</div>
//         <div className="modal-subtitle">Update subcategories and content for this category.</div>

//         {/* Parent category select */}
//         <div className="modal-field">
//           <div className="form-label">Parent Category</div>
//           <div className="cb-select-wrap">
//             <select
//               className="cb-select"
//               value={selectedCatId}
//               onChange={e => setSelectedCatId(e.target.value)}
//             >
//               {allCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//             </select>
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
//               <polyline points="6 9 12 15 18 9" />
//             </svg>
//           </div>
//         </div>

//         {/* Sub-category tag input */}
//         <div className="modal-field">
//           <div className="form-label">Sub-category Names</div>
//           <div className="cb-tag-wrap">
//             {subTags.map((t, i) => (
//               <span key={i} className="cb-tag">
//                 {t}
//                 <button onClick={() => setSubTags(p => p.filter((_, j) => j !== i))}>×</button>
//               </span>
//             ))}
//             <input
//               className="cb-tag-input"
//               placeholder={subTags.length === 0 ? 'e.g. Living Room Furniture' : ''}
//               value={subInput}
//               onChange={e => setSubInput(e.target.value)}
//               onKeyDown={makeKeyHandler(subTags, setSubTags, subInput, setSubInput)}
//               onBlur={() => { if (subInput.trim()) addTag(subInput, subTags, setSubTags, setSubInput); }}
//             />
//           </div>
//         </div>

//         {/* Content tag input */}
//         <div className="modal-field">
//           <div className="form-label">Content</div>
//           <div className="cb-tag-wrap">
//             {contentTags.map((t, i) => (
//               <span key={i} className="cb-tag">
//                 {t}
//                 <button onClick={() => setContentTags(p => p.filter((_, j) => j !== i))}>×</button>
//               </span>
//             ))}
//             <input
//               className="cb-tag-input"
//               placeholder={contentTags.length === 0 ? 'e.g. Arm Chair' : ''}
//               value={contentInput}
//               onChange={e => setContentInput(e.target.value)}
//               onKeyDown={makeKeyHandler(contentTags, setContentTags, contentInput, setContentInput)}
//               onBlur={() => { if (contentInput.trim()) addTag(contentInput, contentTags, setContentTags, setContentInput); }}
//             />
//           </div>
//         </div>

//         <button className="cb-btn-submit" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect, KeyboardEvent } from 'react';
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
/* LocalCategory — inlined, no dummy data dependency */
interface Category { id: string; name: string; active: boolean; source: 'manual' | 'ai'; needsReview: boolean; }


interface EditCategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  allCategories: Category[];
  onSubmit: (categoryId: string, subTags: string[], contentTags: string[]) => void;
  onClose: () => void;
}

/**
 * EditCategoryModal
 * Edit a category's subcategories and content items.
 * Matches the HTML design's "Edit Category" modal exactly.
 */
export default function EditCategoryModal({
  isOpen,
  category,
  allCategories,
  onSubmit,
  onClose,
}: EditCategoryModalProps) {
  const [selectedCatId, setSelectedCatId] = useState('');
  const [subInput, setSubInput]           = useState('');
  const [subTags, setSubTags]             = useState<string[]>([]);
  const [contentInput, setContentInput]   = useState('');
  const [contentTags, setContentTags]     = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && category) {
      setSelectedCatId(category.id);
      setSubTags(category.subcategories.map(s => s.name));
      const firstSub = category.subcategories[0];
      setContentTags(firstSub?.content.map(c => c.name) ?? []);
      setSubInput('');
      setContentInput('');
    }
  }, [isOpen, category]);

  if (!isOpen || !category) return null;

  const addTag = (
    val: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const clean = val.trim().replace(/,$/, '');
    if (clean && !list.includes(clean)) setter(prev => [...prev, clean]);
    inputSetter('');
  };

  const makeKeyHandler = (
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputVal: string,
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(inputVal, list, setter, inputSetter); }
    if (e.key === 'Backspace' && !inputVal && list.length) setter(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (subInput.trim()) addTag(subInput, subTags, setSubTags, setSubInput);
    if (contentInput.trim()) addTag(contentInput, contentTags, setContentTags, setContentInput);
    onSubmit(selectedCatId, subTags, contentTags);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-title">Edit Category</div>
        <div className="modal-subtitle">Update subcategories and content for this category.</div>

        {/* Parent category select */}
        <div className="modal-field">
          <div className="form-label">Parent Category</div>
          <div className="cb-select-wrap">
            <select
              className="cb-select"
              value={selectedCatId}
              onChange={e => setSelectedCatId(e.target.value)}
            >
              {allCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Sub-category tag input */}
        <div className="modal-field">
          <div className="form-label">Sub-category Names</div>
          <div className="cb-tag-wrap">
            {subTags.map((t, i) => (
              <span key={i} className="cb-tag">
                {t}
                <button onClick={() => setSubTags(p => p.filter((_, j) => j !== i))}>×</button>
              </span>
            ))}
            <input
              className="cb-tag-input"
              placeholder={subTags.length === 0 ? 'e.g. Living Room Furniture' : ''}
              value={subInput}
              onChange={e => setSubInput(e.target.value)}
              onKeyDown={makeKeyHandler(subTags, setSubTags, subInput, setSubInput)}
              onBlur={() => { if (subInput.trim()) addTag(subInput, subTags, setSubTags, setSubInput); }}
            />
          </div>
        </div>

        {/* Content tag input */}
        <div className="modal-field">
          <div className="form-label">Content</div>
          <div className="cb-tag-wrap">
            {contentTags.map((t, i) => (
              <span key={i} className="cb-tag">
                {t}
                <button onClick={() => setContentTags(p => p.filter((_, j) => j !== i))}>×</button>
              </span>
            ))}
            <input
              className="cb-tag-input"
              placeholder={contentTags.length === 0 ? 'e.g. Arm Chair' : ''}
              value={contentInput}
              onChange={e => setContentInput(e.target.value)}
              onKeyDown={makeKeyHandler(contentTags, setContentTags, contentInput, setContentInput)}
              onBlur={() => { if (contentInput.trim()) addTag(contentInput, contentTags, setContentTags, setContentInput); }}
            />
          </div>
        </div>

        <button className="cb-btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}


