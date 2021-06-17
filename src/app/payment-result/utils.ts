export function checkTrue(v: any) {
  if (typeof v === 'string') {
    return v === 'true';
  }
  return v === true;
}
