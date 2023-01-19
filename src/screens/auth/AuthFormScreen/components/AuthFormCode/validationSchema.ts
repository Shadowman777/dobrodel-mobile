import * as Yup from 'yup';

export default Yup.object().shape({
  sms_code: Yup.string()
    .required('Поле "Смс-код" должно быть заполнено')
    .test('len', 'Код должен состоять из 4 цифр', v => !!v && v.length === 4),
});
