export function getCookie(key: string) {
  const cookieId = document.cookie.match(
    "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
  );
  return cookieId ? cookieId.pop() : "";
}
