import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vyaktigatavRtta';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Handle redirect parameter for GitHub Pages
    this.route.queryParams.subscribe(params => {
      const redirectTo = params['redirect'];
      if (redirectTo) {
        // Remove leading/trailing slashes and clean up the path
        const cleanPath = redirectTo.replace(/^\/+|\/+$/g, '');
        // Navigate without redirect parameter to prevent loops
        this.router.navigate(['/' + cleanPath], {
          replaceUrl: true,
          queryParamsHandling: 'merge',
          queryParams: { redirect: null }
        });
      }
    });
  }
}
