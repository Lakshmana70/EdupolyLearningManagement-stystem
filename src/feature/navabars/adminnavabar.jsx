import React from 'react'

export default function Adminnavabar() {
  return (
    <div>
       <div class="p-2 text-bg-primary bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg> */}
        </a>
         
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" class="nav-link px-2 text-white fs-5"><img src="https://edupoly.in/common/assets/edupoly-logo-light.png" alt=""  className='logo '  style={{width:"150px",height:""}}    /></a></li>
          <li><a href="/" class="nav-link px-2 text-white fs-5">Technology</a></li>
        </ul>

       
        {/* <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2" >Sign Up</button>
          <button type="button" class="btn btn-outline-light me-2" >Logout</button>
        </div> */}
      </div>
    </div>
  </div>
    </div>
  )
}
