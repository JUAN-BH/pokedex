import React from 'react';
import { useLocation } from 'react-router-dom';
import TitleHeader from '../../components/TitleHeader';
import Searcher from '../../components/Searcher';

function Header() {
  const location = useLocation();
  return (
    <header>
      <nav className="menuHeader">
        <TitleHeader />
        {location.pathname.includes('detail') ? null : <Searcher />}
      </nav>
    </header>
  );
}

export default Header;
