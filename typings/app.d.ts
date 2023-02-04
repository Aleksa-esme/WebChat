import { Screens } from 'utils/Router/screenList';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    chats: Array<Chat> | null;
    chatId: string | null;
    chatTitle: string;
    users: Array<User>;
    messages: Array<Message> | Array<NewMessage>;
    fileId: string | null;
    stickers: Array<any>;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: LastMessage | null;
  };

  export type LastMessage = {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  };

  export type Message = {
    chatID: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
  };

  export type NewMessage = {
    content: string;
    id: number;
    time: string;
    type: string;
    user_id: number;
  };
}

export {};
