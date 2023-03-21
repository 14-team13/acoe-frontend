import { atom } from 'recoil';
import { UserInfo } from 'types';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const saveValue = localStorage.getItem(key);
    if (saveValue !== null) {
      setSelf(JSON.parse(saveValue));
    }

    onSet((newValue: UserInfo, _: unknown, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const authState = atom<UserInfo>({
  key: 'authState',
  default: {} as UserInfo,
  effects: [localStorageEffect('userInfo')],
});
