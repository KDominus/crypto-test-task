import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className='h-[50px] flex justify-between px-5 bg-violet-300 '>
      <button>
        <Link to='/'>Trade Stream</Link>
      </button>
      <button>
        <Link to='/exchange'>Crypto Exchange</Link>
      </button>
    </nav>
  );
}
