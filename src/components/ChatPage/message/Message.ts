import Component from 'utils/Component/Component';

interface IMessageProps {
  name?: String;
  content: String;
  date?: String;
  type: String;
  path?: String;
  classes: String;
}

class Message extends Component {
  static componentName = 'Message';

  constructor(props: IMessageProps) {
    super(props);
  }

  render() {
    return `
      <div class='message {{ classes }}'>
        {{#if ${!!this.props.name} }}
          <div class='message__name'>
            <span>{{ name }}</span>
          </div>
        {{/if}}
        {{#if ${this.props.type === 'message'} }}
        <div>
          <p class='message__content-text'>{{ content }}</p>
          <p class='message__content-date'>{{ date }}</p>
        </div>
        {{/if}}
        {{#if ${this.props.type === 'file'} }}
          <div>
            <img src="{{ path }}" class='message__content-image'>
          </div>
        {{/if}}
      </div>
    `;
  }
}

export default Message;
