// import AllReminders from './views/AllTickets';
// import OneReminder from './views/OneTicket';
// import New from './views/NewTicket';
// import Edit from './views/EditTicket';
// import './App.css';
// import { Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     /// <BrowserRouter> basically plugged in here - see index.js file
//     <div className="App">
//       <Routes>
//         <Route path='/' element={<AllReminders />} />
//         <Route path='/:_id' element={<OneReminder />} />
//         <Route path='/new' element={<New/>} />
//         <Route path='/edit/:_id' element={<Edit />} />
//       </Routes>
//     </div>
//     ///</BrowserRouter> basically plugged in here - see index.js file
//   );
// }

// export default App;

//=================================================================================================================\\

import AllPosts from './views/ForumPage';
import OneTicket from './views/OnePost';
import NewPost from './views/NewPosts';
import EditTicket from './views/EditPost';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './login/Login';
import RegisterPage from './login/Register';
import ForgotPass from './login/ForgotPass';

function App() {
  return (
    /// <BrowserRouter> basically plugged in here - see index.js file
    <div className="App">
      <Routes>
        <Route path='/home' element={<AllPosts />} />
        <Route path='/newTicket' element={<NewPost/>} />
        <Route path='/ticket/:_id' element={<OneTicket />} />
        <Route path='/editTicket/:_id' element={<EditTicket />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/recover' element={<ForgotPass />} />
      </Routes>
    </div>
    ///</BrowserRouter> basically plugged in here - see index.js file
  );
}

export default App;
