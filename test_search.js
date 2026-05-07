import https from 'https';

const isbns = [
  '9780141439587',
  '9780141439662',
  '9780140449174'
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
