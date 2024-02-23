// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//     const { user } = useSelector((state) => state.auth);
  
//     return (
//       <Route
//         {...rest}
//         element={user ? <Element /> : <Navigate to="/login" replace />}
//       />
//     );
//   };

// export default PrivateRoute;
