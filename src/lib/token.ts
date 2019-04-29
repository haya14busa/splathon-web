const KEY = 'SPLATHON_API_TOKEN';

export const Set = (token: string) => {
  localStorage.setItem(KEY, token);
};

export const Get = (): string | null => {
  return localStorage.getItem(KEY);
};

export const Remove = ()  => {
  localStorage.removeItem(KEY);
};
