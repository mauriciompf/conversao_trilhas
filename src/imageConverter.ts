export async function imageConverter(zip: any, urls: string[]) {
  const fetchPromises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${url}`);

      const blob = await response.blob();
      return zip.file(url, blob);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  await Promise.all(fetchPromises);

  return zip;
}
