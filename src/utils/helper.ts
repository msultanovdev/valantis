import md5 from "md5";

export function generateAuthString(password: string) {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return md5(password + "_" + timestamp);
}
