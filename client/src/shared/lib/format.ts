/**
 * 금액을 세 자리마다 쉼표를 넣은 문자열로 변환
 *
 * @param value 금액
 * @returns 쉼표가 들어간 금액 문자열, 값이 없으면 빈 문자열
 */
export function formatAmount(value?: number | null) {
  return value == null ? "" : value.toLocaleString("ko-KR")
}

/**
 * 입력한 금액 문자열에서 숫자만 꺼내 변환
 *
 * @param text 입력 문자열
 * @returns 금액, 숫자가 없으면 null
 */
export function parseAmount(text: string) {
  const digits = text.replace(/\D/g, "").slice(0, 15)
  return digits === "" ? null : Number(digits)
}
