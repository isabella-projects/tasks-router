import { inject } from '@angular/core';
import {
    CanMatchFn,
    RedirectCommand,
    Route,
    Router,
    Routes,
    UrlSegment,
} from '@angular/router';

import { routes as userRoutes } from './users/users.routes';
import {
    resolveTitle,
    resolveUserName,
    UserTasksComponent,
} from './users/user-tasks/user-tasks.component';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* Route Guard dummy example
const dummyCanMatch: CanMatchFn = (_route: Route, _segments: UrlSegment[]) => {
    const router = inject(Router);

    // Instead of that, we can create Authentication Service and implement access feature here
    const hasAccess = Math.random();
    if (hasAccess < 0.5) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
};
*/

export const routes: Routes = [
    {
        path: '', // <domain>/
        component: NoTaskComponent,
        title: 'No task selected',
    },
    {
        path: 'users/:userId', // <domain>/users/4 (e.g)
        component: UserTasksComponent,
        children: userRoutes,
        // canMatch: [dummyCanMatch],
        data: {
            message: 'Hello',
        },
        resolve: {
            userName: resolveUserName,
        },
        title: resolveTitle,
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Bad Request | Not found',
    },
];
