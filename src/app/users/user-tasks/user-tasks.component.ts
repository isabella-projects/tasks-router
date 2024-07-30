import {
    Component,
    inject,
    input,
    // Input,
    // DestroyRef,
    // OnInit,
} from '@angular/core';

import { UsersService } from '../users.service';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterLink,
    RouterOutlet,
    RouterStateSnapshot,
} from '@angular/router';

// import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-tasks',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './user-tasks.component.html',
    styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
    userName = input.required<string>();
    message = input.required<string>();

    /* Instead of this we are using resolver function
    userId = input.required<string>();
    private usersService = inject(UsersService);

    userName = computed(
        () =>
            this.usersService.users.find((user) => user.id === this.userId())
                ?.name
    );
    */

    /* Another old approach by using observables - same property as the route name is NOT needed
    userName = '';

    constructor(
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef
    ) {}
    // or injecting it directly in the constructor

    ngOnInit(): void {
        console.log(this.activatedRoute);
        const subscription = this.activatedRoute.paramMap.subscribe({
            next: (paramMap) => {
                this.userName =
                    this.usersService.users.find(
                        (user) => user.id === paramMap.get('userId')
                    )?.name || '';
            },
        });
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
    */

    /* Getting username without signals - reminder of old inputs
    @Input({ required: true }) userId!: string;

    get userName() {
        return this.usersService.users.find((user) => user.id === this.userId)
            ?.name;
    }
    */
}

// Resolver function for getting username
export const resolveUserName: ResolveFn<string> = (
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
) => {
    const usersService = inject(UsersService);
    const userName =
        usersService.users.find(
            (user) => user.id === activatedRoute.paramMap.get('userId')
        )?.name || '';

    return userName;
};

export const resolveTitle: ResolveFn<string> = (
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
) => {
    return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
