export default function Navbar(){
    return (
        <nav className='navbar navbar-light navbar-expand-lg shadow' style={{backgroundColor: "#e3f2fd"}}>
        <div className='container-fluid'>
          <img className='nav-logo d-inline-block px-4' src="/main-ave-logo.svg" alt="" />
          <button 
            className='navbar-toggler' 
            type='button' 
            data-bs-toggle='collapse' 
            data-bs-target='#navbarNavDropdown' 
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle Navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link active' href="#">Home</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href="#">Search Books</a>
              </li>
            </ul>

            <ul className='navbar-nav ms-auto'>
              <li className='nav-item m-1'>
                <a className='btn btn-outline-dark' type='button' href="#">Sign in</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}