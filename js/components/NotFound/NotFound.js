import './NotFound.scss';

// this is the not found component
const NotFound = () => {
  return (
    <div className={'page-not-found'}>
      <div id='background' />
      <div className='top'>
        <h1>404</h1>
        <h3>page not found</h3>
      </div>
      <div className='container'>
        <div className='ghost-copy'>
          <div className='one' />
          <div className='two' />
          <div className='three' />
          <div className='four' />
        </div>
        <div className='ghost'>
          <div className='face'>
            <div className='eye' />
            <div className='eye-right' />
            <div className='mouth' />
          </div>
        </div>
        <div className='shadow' />
      </div>
    </div>
  );
};

export default NotFound;
