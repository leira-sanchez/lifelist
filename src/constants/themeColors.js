const colorScheme = {
  brandColor: '#fe5504',
  lightAccent: '#a4a6af',
  darkAccent: '#D23D66',
  darkShades: '#252431',
  lightShades: '#F0F3F1',
};

const lightTheme = {
  background: colorScheme.lightShades,
  text: colorScheme.darkAccent,
  header: colorScheme.brandColor 
};

const darkTheme = {
  background: colorScheme.darkShades,
  text: colorScheme.lightShades,
  header: colorScheme.lightAccent
};

export { lightTheme, darkTheme };
