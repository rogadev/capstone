declare global {
  type ClientUserObject = {
    id: string;
    email: string;
    name?: string;
    photo?: string;
  };
}