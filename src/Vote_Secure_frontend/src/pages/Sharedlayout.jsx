import { Outlet } from 'react-router-dom';
import Footer from '../components/global/Footer'
const Sharedlayout = () => {
  return (
    <div className='' >
      <section className=''>
        <Outlet /> {/* This renders the matched child route */}
      </section>
      <Footer/>
    </div>
  );
};

export default Sharedlayout;
