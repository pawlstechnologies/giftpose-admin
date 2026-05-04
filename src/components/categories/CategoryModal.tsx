
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

export interface CategoryFormData {
  name: string;
  description: string;
  subcategories: string[];
  active: boolean;
}

interface CategoryModalProps {
  isOpen: boolean;
  initialData?: CategoryFormData | null;
  onSave: (data: CategoryFormData) => void;
  onClose: () => void;
}

const EMPTY: CategoryFormData = {
  name: '',
  description: '',
  subcategories: [],
  active: true,
};

/**
 * CategoryModal — handles both "Create" and "Edit" flows.
 * Pass `initialData` to pre-fill for editing; omit (or null) for creation.
 */
export default function CategoryModal({ isOpen, initialData, onSave, onClose }: CategoryModalProps) {
  const [form, setForm] = useState<CategoryFormData>(EMPTY);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ?? EMPTY);
      setTagInput('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isEdit = Boolean(initialData);

  const addTag = (value: string) => {
    const clean = value.trim();
    if (clean && !form.subcategories.includes(clean)) {
      setForm((f) => ({ ...f, subcategories: [...f.subcategories, clean] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) =>
    setForm((f) => ({ ...f, subcategories: f.subcategories.filter((t) => t !== tag) }));

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === 'Backspace' && !tagInput && form.subcategories.length) {
      removeTag(form.subcategories[form.subcategories.length - 1]);
    }
  };

  const handleSubmit = () => {
    if (tagInput.trim()) addTag(tagInput); // commit any pending tag
    onSave(form);
  };

  const valid = form.name.trim().length > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">{isEdit ? 'Edit Category' : 'Create Category'}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Name */}
          <div className="form-field">
            <label className="form-label">Category Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              className="form-input"
              placeholder="e.g. Furniture"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Brief description of what belongs in this category…"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          {/* Subcategories */}
          <div className="form-field">
            <label className="form-label">Subcategories</label>
            <div className="form-tags-wrap" onClick={() => document.getElementById('tag-input')?.focus()}>
              {form.subcategories.map((tag) => (
                <span key={tag} className="form-tag-chip">
                  {tag}
                  <button onClick={() => removeTag(tag)} tabIndex={-1} type="button">×</button>
                </span>
              ))}
              <input
                id="tag-input"
                className="form-tag-input"
                placeholder={form.subcategories.length === 0 ? 'Type and press Enter to add…' : ''}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
              />
            </div>
            <span style={{ fontSize: 11.5, color: '#bbb', marginTop: 2 }}>
              Press Enter or comma to add a subcategory
            </span>
          </div>

          {/* Active toggle */}
          <div className="form-field" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="form-label" style={{ marginBottom: 2 }}>Active Status</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                {form.active ? 'Category is visible to users' : 'Category is hidden from users'}
              </div>
            </div>
            <label className="switch" style={{ flexShrink: 0 }}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!valid}
            style={{ opacity: valid ? 1 : 0.5, cursor: valid ? 'pointer' : 'not-allowed' }}
          >
            {isEdit ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
}