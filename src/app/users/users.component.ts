import { Component, inject } from '@angular/core';

import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [UserComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
})
export class UsersComponent {
    private usersService = inject(UsersService);
    users = this.usersService.users;
}
