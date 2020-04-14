export const DbModel = {
    userRole: 'userRole',
    user: 'User',
    userDetails: 'UserDetails',
    history: 'History',
    product: 'Product',
    address: 'Address',
};

export const ConnectionString = 'mongodb://localhost/cart';
// "mongodb://127.0.0.1:27017/student-app"
// "mongodb://localhost/cart";

export const jwtSecret =
    process.env.JWT_SECRET ||
    'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4';
