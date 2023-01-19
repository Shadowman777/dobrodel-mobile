import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/core';

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: any): void => {
  navigationRef?.current?.navigate(name, params);
};

export const getRoute = (): string | undefined => {
  return navigationRef?.current?.getCurrentRoute()?.name;
};
