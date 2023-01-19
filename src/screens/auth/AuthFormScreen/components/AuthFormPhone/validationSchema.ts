import * as Yup from 'yup';

const parsePhoneString = (value: string) => {
  return value.replace(/[\(\)\- ]/g, '');
};

export default Yup.object().shape({
  phone: Yup.string()
    .required('Поле обязательно для заполнения')
    .transform(parsePhoneString)
    .matches(/\+[0-9]{11}/, 'Некорректный номер телефона'),
});
