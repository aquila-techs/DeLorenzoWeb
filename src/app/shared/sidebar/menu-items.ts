import { RouteInfo } from './sidebar.metadata';
import * as english from "../translation/english";
import * as dutch from "../translation/dutch";

const language = localStorage.getItem("language");

console.log('************ menu ****************', language);


export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard/classic',
        title: 'Dashboard',
        icon: 'mdi mdi-view-dashboard',
        class: '', //has-arrow
        extralink: false,
        submenu:[]
    },
    {
        path: '',
        title: `${language === "English" ? english.posts : dutch.posts}`,
        icon: 'mdi mdi-pin',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                        path: '/post/all',
                        title: `${language === "English" ? english.all_posts : dutch.all_posts}`,
                        icon: 'mdi mdi-twitch',
                        class: '',
                        extralink: false,
                        submenu: []
            },
            {
                path: '/post/add',
                title: `${language === "English" ? english.add_post : dutch.add_post}`,
                icon: 'mdi mdi-message-plus',
                class: '',
                extralink: false,
                submenu: []
            },
            // {
            //     path: '/post/categories',
            //     title: 'Categories',
            //     icon: 'mdi mdi-apps',
            //     class: '',
            //     extralink: false,
            //     submenu: []
            // },
            // {
            //     path: '/post/tags',
            //     title: 'Tags',
            //     icon: 'mdi mdi-tag-multiple',
            //     class: '',
            //     extralink: false,
            //     submenu: []
            // }

        ]
    },
    {
        path: '',
        title: `${language === "English" ? english.recipes : dutch.recipes}`,
        icon: 'mdi mdi-food',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                path: '/recipes/all',
                title: `${language === "English" ? english.all_recipes : dutch.all_recipes}`,
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                        path: '/recipes/addrecipe',
                        title: `${language === "English" ? english.add_recipe : dutch.add_recipe}`,
                        icon: 'mdi mdi-adjust',
                        class: '',
                        extralink: false,
                        submenu: []
            }
        ]
    },
    // {
    //     path: '',
    //     title: 'WorkOut',
    //     icon: 'mdi mdi-dumbbell',
    //     class: 'has-arrow', //has-arrow
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/workout/all',
    //             title: 'All Workouts',
    //             icon: 'mdi mdi-adjust',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/workout/addworkout',
    //             title: 'Add Workout',
    //             icon: 'mdi mdi-adjust',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },
    {
        path: '/profile',
        title: `${language === "English" ? english.profile : dutch.profile}`,
        icon: 'mdi mdi-account-network',
        class: '', //has-arrow
        extralink: false,
        submenu:[]
    }
        // {
        //     path: '/users',
        //     title: 'Users',
        //     icon: 'mdi mdi-account-multiple',
        //     class: '',
        //     extralink: false,
        //     submenu: []
        // },


];
