export function formatValues(value: number | undefined) {
  if (value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  return ''
}
