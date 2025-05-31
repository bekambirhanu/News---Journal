import React, { useState } from 'react';
import styles from '../style/MenuBar.module.css';

const MenuBar = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState('home');

  const categories = [
    { id: 'home', label: 'Home', isSpecial: true },
    { id: 'research', label: 'Research' },
    { id: 'news', label: 'News' },
    { id: 'event', label: 'Events' },
    { id: 'thematics', label: 'Thematics' },
    { id: 'story', label: 'Stories' }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <nav className={styles.menuBar}>

        <div className={styles.logo}>
          <label className={styles.biglogo}>Drought Predic</label><br/>
        <label className={styles.smalllogo}>Your #1 drought prediction source</label>
        </div>
      <div className={styles.menuContainer}> 
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.menuItem} ${activeCategory === category.id ? styles.active : ''} 
              ${category.isSpecial ? styles.specialItem : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MenuBar; 