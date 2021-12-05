export function getCookie(key: string) {
  const cookieId = document.cookie.match(
    "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
  );
  return cookieId ? cookieId.pop() : "";
}

export function currencyFormat(amount: number) {
  return "$" + (amount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
