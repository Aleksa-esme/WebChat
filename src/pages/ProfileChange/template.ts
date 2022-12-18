const template = `
    <section class="profile-page">
        <a href="#" class="profile-page__button-back">
            <img src="../../assets/svg/arrow_button.svg" alt="back">
        </a>
        <div class="profile">
            <form id="form" action="#" method="POST" class="profile-form">
                <div class="profile-form__photo"></div>
                <input type="file" name="avatar" accept="image/png, image/jpeg" class="profile-form__photo__input">
                <ul class="form-list">
                    <li>
                        {{{ Input label='Почта' value="pochta@yandex.ru" name="email" type="email" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                    <li>
                        {{{ Input label='Логин' value="ivanivanov" name="login" type="text" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                    <li>
                        {{{ Input label='Имя' value="Иван" name="first_name" type="text" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                    <li>
                        {{{ Input label='Фамилия' value="Иванов" name="second_name" type="text" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                    <li>
                        {{{ Input label='Имя в чате' value="Иван" name="display_name" type="text" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                    <li>
                        {{{ Input label='Телефон' value="+7(909)967-30-30" name="phone" type="telephone" classLabel='profile-form__label' classInput='profile-form__value' }}}
                    </li>
                </ul>
                {{{ Button title='Сохранить' class="profile-form__button-submit" }}}
            </form>
        </div>
    </section>
`;

export default template;
