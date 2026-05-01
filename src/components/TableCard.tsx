// src/components/TableCard.tsx
import React, { useState } from 'react';
import styles from '../styles/AdminDashboard.module.css';

interface Category {
  name: string;
  desc: string;
  sub: string[];
  source: string;
  status: boolean;
}

interface TableCardProps {
  title: string;
  subtitle: string;
  categories: Category[];
}

export const TableCard: React.FC<TableCardProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className={styles['table-card']}>
      <div className={styles.tabs}>
        {['all', 'active', 'inactive', 'review'].map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      <div className={styles['table-wrap']}>
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
            {categories.map((c, i) => (
              <tr key={i}>
                <td>
                  <div className={styles['cat-name']}>{c.name}</div>
                  <div className={styles['cat-desc']}>{c.desc}</div>
                </td>
                <td className={styles['sub-wrap']}>
                  {c.sub.map((s) => (
                    <span className={styles.tag} key={s}>{s}</span>
                  ))}
                  <span className={styles['tag-add']}>+ Add</span>
                </td>
                <td>
                  <span className={c.source === 'AI GENERATED' ? styles['badge-ai'] : styles['badge-manual']}>
                    {c.source}
                  </span>
                </td>
                <td>
                  <div className={styles.toggle}>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={c.status} readOnly />
                      <span className={styles.slider}></span>
                    </label>
                    <span className={styles['status-text']}>{c.status ? 'Active' : 'Inactive'}</span>
                  </div>
                </td>
                <td>
                  <div className={styles['action-row']}>
                    <button className={styles['action-btn']} title="Edit">✎</button>
                    <button className={`${styles['action-btn']} ${styles.del}`} title="Delete">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

