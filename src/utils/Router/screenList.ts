import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import ProfileChange from 'pages/ProfileChange/ProfileChange';
import ProfilePassword from 'pages/ProfilePassword/ProfilePassword';
import Chats from 'pages/Chats/Chats';
import Error404 from 'pages/Error404/Error404';
import Error500 from 'pages/Error500/Error500';
import { BlockClass } from 'utils/Component/block';

export enum Screens {
  RegisterPage = 'register',
  LoginPage = 'login',
  ProfilePage = 'profile',
  ProfileChangePage = 'change',
  ProfilePasswordPage = 'password',
  ChatsPage = 'chats',
  Error404Page = 'error404',
  Error500Page = 'error505',
}

const map = {
  [Screens.RegisterPage]: Register,
  [Screens.LoginPage]: Login,
  [Screens.ProfilePage]: Profile,
  [Screens.ProfileChangePage]: ProfileChange,
  [Screens.ProfilePasswordPage]: ProfilePassword,
  [Screens.ChatsPage]: Chats,
  [Screens.Error404Page]: Error404,
  [Screens.Error500Page]: Error500,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => map[screen];
