import { atomFamily } from 'recoil';

export const isModalOpenState = atomFamily<boolean, string>({
  key: 'isModalOpenState',
  // 식별을 위한 파라미터로 사용
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: (_: unknown) => false,
});
