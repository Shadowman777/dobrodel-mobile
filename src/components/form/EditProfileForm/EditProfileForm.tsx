import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';

import AppInput from 'components/app/AppInput/AppInput';

import {editUser} from 'store/slices/authSlice/authThunks';
import {Settings} from 'types/main/mainTypes';
import {User, IEditUserPayload} from 'types/auth/authTypes';

interface IEditProfileFormProps {
  settings: Settings;
  user: User;
  formalization?: boolean;
}

const EditProfileForm: React.FC<IEditProfileFormProps> = props => {
  const [firstName, setFirstName] = useState<string>(
    props.user.first_name || '',
  );
  const [lastName, setLastName] = useState<string>(props.user.last_name || '');
  const [email, setEmail] = useState<string>(props.user.email || '');
  const [debouncedFirstName] = useDebounce<string>(
    firstName,
    props.settings.number_seconds_autosave_profile * 1000,
  );
  const [debouncedLastName] = useDebounce<string>(
    lastName,
    props.settings.number_seconds_autosave_profile * 1000,
  );
  const [debouncedEmail] = useDebounce<string>(
    email,
    props.settings.number_seconds_autosave_profile * 1000,
  );

  const dispatch = useDispatch();

  const checkUserData = (): boolean => {
    return (
      debouncedFirstName !== props.user.first_name ||
      debouncedLastName !== props.user.last_name ||
      debouncedEmail !== props.user.email
    );
  };

  useEffect(() => {
    if (debouncedFirstName && debouncedLastName && debouncedEmail) {
      if (checkUserData()) {
        const payload: IEditUserPayload = {
          first_name: debouncedFirstName,
          last_name: debouncedLastName,
          email: debouncedEmail,
        };

        dispatch(editUser(payload));
      }
    }
  }, [debouncedFirstName, debouncedLastName, debouncedEmail]);

  return (
    <View>
      <AppInput
        value={firstName}
        setValue={setFirstName}
        label="Ваше имя"
        formalization
      />
      <View style={{marginVertical: 8}}>
        <AppInput
          value={lastName}
          setValue={setLastName}
          label="Ваша фамилия"
          formalization
        />
      </View>
      <AppInput value={email} setValue={setEmail} label="Email" />
    </View>
  );
};

export default EditProfileForm;
