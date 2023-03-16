import { atom, RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const countState = atom({
  key: "countState",
  default: 0 
});

export const userState = atom({
  key: 'user',
  default: { email: 'aluminum@beside.com', username: 'aluminum' }
});
