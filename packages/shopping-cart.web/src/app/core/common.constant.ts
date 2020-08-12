export const BroadcastKeys = {
    headerSearchValue: 'headerSearchValue',
    userRoles: 'userRoles',
    cartCount: 'cartCount',
};

export const Roles = {
    admin: 'Admin',
    user: 'User',
    superAdmin: 'SuperAdmin',
}

export const SideBar = [
    {
        displayName: 'Home',
        route: '/home',
        access: [Roles.admin, Roles.superAdmin, Roles.user],
        icon: 'home',
    },
    {
        displayName: 'Manage',
        route: '/manage',
        access: [Roles.superAdmin, Roles.admin],
        icon: 'build',
        subMenus: [
            {
                displayName: 'Products',
                route: '/manage/product',
                access: [Roles.superAdmin, Roles.admin],
                icon: 'scatter_plot',
            },
            {
                displayName: 'Admins',
                route: '/manage/admin',
                access: [Roles.superAdmin],
                icon: 'supervised_user_circle',
            },
        ]
    },
    {
        displayName: 'Shop by Categories',
        route: '/product', // category',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'category',
    },
    {
        displayName: 'Orders',
        route: '/history',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'timeline',
    },
    {
        displayName: 'Favourites',
        route: '/fav',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'favorite',
    },
    {
        displayName: 'Profile Settings',
        route: '/profile/settings',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'settings',
    },
    {
        displayName: 'FAQs',
        route: '/faq',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'question_answer',
    },
    {
        displayName: 'Contact Us',
        route: '/contact',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'contact_page',
    },
    {
        displayName: 'Feedback',
        route: '/feedback',
        access: [Roles.superAdmin, Roles.admin, Roles.user],
        icon: 'feedback',
    },
]