import https from 'https';

const isbns = [
  '9780141439518', // Pride and Prejudice
  '9780141439556', // Wuthering Heights
  '9780147514011', // Little Women
  '9780141439686', // Persuasion
  '9780141441146', // Jane Eyre
  '9781853260001',
  '9781853260018',
  '9781853260162',
  '9781853260568',
  '9781853260209'
];

async function checkISBNS() {
  for (const isbn of isbns) {
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
    await new Promise((resolve) => {
      https.get(url, (res) => {
        console.log(`ISBN: ${isbn} -> Status: ${res.statusCode}`);
        resolve();
      });
    });
  }
}

checkISBNS();
