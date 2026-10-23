export function moduleUrl(source: string) {
  const bytes = new TextEncoder().encode(source)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192))
  }
  return 'data:text/javascript;base64,' + btoa(binary)
}
