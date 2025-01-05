import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  template : `
          <div class="row flex-center min-vh-100 py-6 text-center">
            <div class="col-sm-10 col-md-8 col-lg-6 col-xxl-5">
              <a class="d-flex flex-center mb-4" href="../../index.html">
                <span class="font-sans-serif text-primary fw-bolder fs-4 d-inline-block">Hunter's League</span>
              </a>
              <div class="card">
                <div class="card-body p-4 p-sm-5">
                  <div class="fw-black lh-1 text-300 fs-error">403</div>
                  <p class="lead mt-4 text-800 font-sans-serif fw-semi-bold w-md-75 w-xl-100 mx-auto">You are not authorized to access this page.</p>
                  <hr />
                  <p>If you believe this is a mistake or need further assistance, <a href="mailto:info@example.com">contact us</a>.</p>
                  <a class="btn btn-primary btn-sm mt-3" href="../../index.html">
                    <span class="fas fa-home me-2"></span>Take me home
                  </a>
                </div>
              </div>
            </div>
          </div>
  `
})
export class UnauthorizedComponent {}
