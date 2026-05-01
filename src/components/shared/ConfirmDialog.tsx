interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * ConfirmDialog — destructive action confirmation modal.
 * Reusable across delete flows for any entity.
 *
 * Usage:
 * <ConfirmDialog
 *   isOpen={showDelete}
 *   title="Delete Category?"
 *   description="This will permanently remove Furniture and all its subcategories."
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDelete(false)}
 * />
 */
export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Yes, Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div className="confirm-body">
          <div className="confirm-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
          </div>
          <div className="confirm-title">{title}</div>
          <div className="confirm-desc">{description}</div>
        </div>
        <div className="confirm-footer">
          <button className="btn-cancel" onClick={onCancel}>{cancelLabel}</button>
          <button className="btn-danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}