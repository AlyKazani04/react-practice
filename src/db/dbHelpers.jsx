import { client as db } from "./connection.jsx";

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const rows = await db
      .from('metrics')
      .select('*')
      .eq('search_term', searchTerm);

    console.log(`Selected for ${searchTerm}:`);
    console.table(rows.data);

    if (rows.data && rows.data.length > 0) {
      const row = rows.data[0];

      const updatedRows = await db
        .from('metrics')
        .update({ count: row.count + 1 })
        .eq('id', row.id);

      console.log('Updated:');
      console.table(updatedRows);
    } else {
      console.log('No Row found, inserting...');
      const insertedRows = await db
        .from('metrics')
        .insert({
          count: 1,
          search_term: searchTerm,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });

      console.log('Inserted:');
      console.table(insertedRows);
    }
  } catch (e) {
    console.error('Neon API Error:', e)
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await db
      .from('metrics')
      .select('*')
      .limit(10)
      .order('count', { ascending: false })

    return result.data;
  } catch (e) {

  }
}
