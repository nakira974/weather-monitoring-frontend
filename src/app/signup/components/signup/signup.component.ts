import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user = new User(this.username, this.email, this.firstName, this.lastName, this.password);
    this.userService.create(user).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.volver();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }


}
