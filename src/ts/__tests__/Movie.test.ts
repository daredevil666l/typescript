import Movie from '../domain/Movie';

describe('Movie', () => {
  let movie: Movie;

  beforeEach(() => {
    movie = new Movie(
      1,
      'Мстители',
      'The Avengers',
      2012,
      'США',
      'Avengers Assemble!',
      ['фантастика', 'боевик', 'фэнтези', 'приключения'],
      137,
      1000
    );
  });

  test('should create Movie instance', () => {
    expect(movie).toBeInstanceOf(Movie);
  });

  test('should have correct properties', () => {
    expect(movie.id).toBe(1);
    expect(movie.name).toBe('Мстители');
    expect(movie.originalName).toBe('The Avengers');
    expect(movie.year).toBe(2012);
    expect(movie.country).toBe('США');
    expect(movie.slogan).toBe('Avengers Assemble!');
    expect(movie.duration).toBe(137);
    expect(movie.price).toBe(1000);
  });

  test('should have array of genres', () => {
    expect(Array.isArray(movie.genres)).toBe(true);
    expect(movie.genres.length).toBe(4);
    expect(movie.genres).toContain('фантастика');
  });

  test('should format duration correctly', () => {
    expect(movie.getFormattedDuration()).toBe('137 мин. / 2:17');
  });

  test('should format duration with leading zero', () => {
    const shortMovie = new Movie(
      2,
      'Короткометражка',
      'Short Film',
      2020,
      'Россия',
      'Test',
      ['драма'],
      65,
      500
    );
    expect(shortMovie.getFormattedDuration()).toBe('65 мин. / 1:05');
  });

  test('should return genres as string', () => {
    expect(movie.getGenresString()).toBe('фантастика, боевик, фэнтези, приключения');
  });

  test('should handle single genre', () => {
    const singleGenreMovie = new Movie(
      3,
      'Драма',
      'Drama',
      2021,
      'Франция',
      'Test',
      ['драма'],
      90,
      700
    );
    expect(singleGenreMovie.getGenresString()).toBe('драма');
  });

  test('should have optional poster property', () => {
    const movieWithPoster = new Movie(
      4,
      'Test',
      'Test',
      2022,
      'USA',
      'Test',
      ['action'],
      120,
      800,
      'https://example.com/poster.jpg'
    );
    expect(movieWithPoster.poster).toBe('https://example.com/poster.jpg');
  });

  test('should work without poster', () => {
    expect(movie.poster).toBeUndefined();
  });
});
