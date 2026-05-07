import https from 'https';

const isbns = [
  '9780143106456', // The Secret Garden
  '9780143106449',
  '9780142437053'
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
