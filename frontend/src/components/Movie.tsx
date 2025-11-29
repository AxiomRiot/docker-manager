import type { MovieType } from '../types/containerTypes';

interface MovieProps {
  data: MovieType;
}

export default function Movie({ data }: MovieProps) {
  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.tagline}</p>
      <p>{data.overview}</p>
    </>
  );
}
