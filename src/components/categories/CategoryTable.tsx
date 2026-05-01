// import type { FlatCategory } from '../../pages/Categories';
import type { Category } from '../../pages/Categories';

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

interface CategoryTableProps {
  rows: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
  onToggle: (id: string, active: boolean) => void;
  onAddSubcategory: (cat: Category) => void;
}

/**
 * CategoryTable — renders the categories data table.
 * Receives rows + event handlers from the parent page.
 */
export default function CategoryTable({
  rows,
  onEdit,
  // onDelete,
  onToggle,
  onAddSubcategory,
}: CategoryTableProps) {
  if (rows.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
            <path d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <div className="empty-title">No categories found</div>
        <div className="empty-desc">Try switching tabs or create a new category.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Item Category</th>
            <th>Subcategories</th>
            <th>Source</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((cat) => (
            <tr key={cat.id}>
              {/* Category name + desc */}
              <td>
                <div className="cat-name">
                  {cat.name}
                  {cat.source === 'ai' && <span className="ai-star">✦</span>}
                </div>
                <div className="cat-desc">{cat.description}</div>
              </td>

              {/* Subcategory tags */}
              <td>
                {cat.subcategories.map((sub) => (
                  <span key={sub} className="tag">{sub}</span>
                ))}
                <span className="tag-add" onClick={() => onAddSubcategory(cat)}>+ Add</span>
              </td>

              {/* Source badge */}
              <td>
                {cat.source === 'ai'
                  ? <span className="badge-ai">AI GENERATED</span>
                  : <span className="badge-manual">MANUAL</span>
                }
              </td>

              {/* Toggle */}
              <td>
                <div className="toggle-cell">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={cat.active}
                      onChange={(e) => onToggle(cat.id, e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                  <span className={`status-text${cat.active ? '' : ' inactive'}`}>
                    {cat.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td>
                <div className="action-row">
                  <button
                    className="action-btn"
                    title="Edit category"
                    onClick={() => onEdit(cat)}
                  >
                    <EditIcon />
                  </button>
                  {/* <button
                    className="action-btn danger"
                    title="Delete category"
                    onClick={() => onDelete(cat)}
                  >
                    <DeleteIcon />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


