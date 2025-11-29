import React from 'react';
import Icon from '../AppIcon';
import { useSidebar } from './Sidebar';

const MobileMenuButton = () => {
  const { toggleMobile } = useSidebar();

  return (
    <button
      onClick={toggleMobile}
      className="mobile-menu-button"
      aria-label="Toggle mobile menu"
    >
      <Icon name="Menu" size={24} />
    </button>
  );
};

export default MobileMenuButton;