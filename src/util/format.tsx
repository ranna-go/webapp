export function linebreak(v: string): JSX.Element[] {
  const res = v
    .split(/\r?\n/)
    .map((v, i) => [<span key={i}>{v}</span>, <br />])
    .flat();
  res.pop();
  return res;
}
