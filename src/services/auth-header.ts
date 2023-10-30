export default function authHeader() {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const { accessToken } = JSON.parse(storedUser);
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }
  }
}
