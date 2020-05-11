import { fetchMe } from '@/services/user';

export async function getInitialState() {
  const result = await fetchMe({
    p: 'admin',
  });
  const me = result && result.result ? result.data : null;

  return {
    me,
  };
}
