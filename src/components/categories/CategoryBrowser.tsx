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

