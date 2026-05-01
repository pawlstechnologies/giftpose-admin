// import { useState, useEffect, KeyboardEvent } from 'react';
/* LocalCategory — inlined, no dummy data dependency */

import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

interface Subcategory {
  id: string;
  name: string;
}

interface Category { id: string; name: string; active: boolean; source: 'manual' | 'ai'; needsReview: boolean; subcategories: Subcategory[]; }

import { createContent } from '../../api/admin.api';

interface ContentModalProps {
  isOpen: boolean;
  categories: Category[];
  defaultCategoryId?: string | null;
  defaultSubId?: string | null;
  /** Called after successful API creation — receives subId and created items */
  onSubmit: (categoryId: string) => void;
  onClose: () => void;
}

const SpinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ animation: 'cb-spin .7s linear infinite', flexShrink: 0 }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

export default function ContentModal({
  isOpen,
  categories,
  defaultCategoryId,
  defaultSubId,
  onSubmit,
  onClose,
}: ContentModalProps) {
  const [selectedCatId, setSelectedCatId] = useState('');
  const [selectedSubId, setSelectedSubId] = useState('');
  const [tagInput, setTagInput]           = useState('');
  const [tags, setTags]                   = useState<string[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  const activeCat = categories.find(c => c.id === selectedCatId);
  const subs = activeCat?.subcategories ?? [];
//   const content = subs.find(s => s.id === selectedSubId)?.content ?? [];

  useEffect(() => {
    if (isOpen) {
      const catId = defaultCategoryId ?? categories[0]?.id ?? '';
      setSelectedCatId(catId);
      const cat = categories.find(c => c.id === catId);
      setSelectedSubId(defaultSubId ?? cat?.subcategories[0]?.id ?? '');
      setTagInput('');
      setTags([]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, defaultCategoryId, defaultSubId, categories]);

  const handleCatChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = categories.find(c => c.id === catId);
    setSelectedSubId(cat?.subcategories[0]?.id ?? '');
  };

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
    const finalTags = [...tags];
    if (tagInput.trim() && !tags.includes(tagInput.trim())) finalTags.push(tagInput.trim());
    if (!selectedCatId || !selectedSubId || finalTags.length === 0) return;

    setError(null);
    setLoading(true);

    try {
      // Create all content items in parallel
      // const results = await Promise.all(
      //   finalTags.map(name =>
      //     createContent({ name, subcategoryId: selectedSubId, status: 'Active' })
      //       .then(r => ({ id: r.data._id, name: r.data.name }))
      //   )
      // );
      onSubmit(selectedCatId);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        'Failed to create content. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = (tags.length > 0 || tagInput.trim().length > 0) && !!selectedSubId && !loading;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close" disabled={loading}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-title">Create New Content</div>
        <div className="modal-subtitle">Add content items to a subcategory collection.</div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Parent category */}
        <div className="modal-field">
          <div className="form-label">Parent Category</div>
          <div className="cb-select-wrap">
            <select className="cb-select" value={selectedCatId} onChange={e => handleCatChange(e.target.value)} disabled={loading}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Subcategory */}
        <div className="modal-field">
          <div className="form-label">Sub-category</div>
          <div className="cb-select-wrap">
            <select
              className="cb-select"
              value={selectedSubId}
              onChange={e => setSelectedSubId(e.target.value)}
              disabled={subs.length === 0 || loading}
            >
              {subs.length === 0
                ? <option>No subcategories</option>
                : subs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
              }
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cb-select-icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Content tag input */}
        <div className="modal-field">
          <div className="form-label">Content Items</div>
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
              placeholder={tags.length === 0 ? 'e.g. Armchairs' : ''}
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="cb-field-hint">Press Enter or comma to add multiple items</div>
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

