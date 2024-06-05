import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content overflow-hidden'>
        <label htmlFor='my-drawer-2' className='w-full btn drawer-button lg:hidden'>
          Menu
        </label>
        <Outlet />
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/diary'>Diary</NavLink>
          </li>
          <li>
            <NavLink to='/notes'>School Notes</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RootLayout;
