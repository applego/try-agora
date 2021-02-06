export async function fetchImages(
  breed: string,
  num: number
): Promise<string[]> {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/${num.toString()}`
  );
  const data = await response.json();
  return data.message;
}
