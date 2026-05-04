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
  return { id: c._id, name: c.name, active: c.status === 'Active', source: 'manual', needsReview: false, subcategories: [] };
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
      // Cast to any so we can handle any response shape the server returns
      // regardless of what TypeScript thinks the type is
      const catRes = await listCategories() as any;

      let rawList: any[] = [];
      if (Array.isArray(catRes))                 rawList = catRes;
      else if (Array.isArray(catRes?.data?.data)) rawList = catRes?.data?.data;
      else if (Array.isArray(catRes?.data))       rawList = catRes.data;

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
          const val = r.value as any;  // cast — server shape may differ from declared type
          const subs =
            Array.isArray(val?.data?.subcategories) ? val.data.subcategories :
            Array.isArray(val?.data)                ? val.data :
            Array.isArray(val)                      ? val : [];
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
