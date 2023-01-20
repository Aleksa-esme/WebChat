import Block from 'utils/Component/block';

interface IChatProps {
  id: string,
  name: String;
  date?: String;
  message?: String;
  messages?: String;
  onClick?: () => void;
}

class Chat extends Block {
  static componentName = 'Chat';

  constructor({
    id, name, date, message, messages, onClick,
  }: IChatProps) {
    super({
      id,
      name,
      date,
      message,
      messages,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <div class="chat" id={{id}}>
          <div class="chat__image">
              <img src="https://dummyimage.com/47x47/999999" alt="chat">
          </div>
          <div class="chat__text">
              <div class="chat_line">
                  <p class="chat__title">{{name}}</p>
                  {{#if ${this.props.message !== 'undefined'} }}
                    <p class="chat__date">{{date}}</p>
                  {{/if}}
              </div>
              <div class="chat_line">
                {{#if ${this.props.message !== 'undefined'} }}
                  <p class="chat__message">{{message}}</p>
                  <div class="chat__indicator"><span>{{messages}}</span></div>
                  {{else}}
                    <p class="chat__message">Нет сообщений</p>
                {{/if}}
              </div>
          </div>
      </div>
    `;
  }
}

export default Chat;

// return `
//       <div class="chat">
//           <div class="chat__image">
//               <img src="https://dummyimage.com/47x47/999999" alt="user">
//           </div>
//           <div>
//               <div class="chat_line">
//                   <p class="chat__user">{{name}}</p>
//                   <p class="chat__date">{{date}}</p>
//               </div>
//               <div class="chat_line">
//                   <p class="chat__message">{{message}}</p>
//                   <div class="chat__indicator"><span>{{messages}}</span></div>
//               </div>
//           </div>
//       </div>
//     `;
