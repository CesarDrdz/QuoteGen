const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// to add our local quotes comment everything that has to do with the api out and add localQuotes 

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote 
function newQuote () {
    loading();
    // pick a random quote from apiQuote arr
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// check if Author feild is blank and replace it with 'Unknown'
if(!quote.author){
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}
// check quote length to determine the styling 

if (quote.text.length > 80 ){
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// set the quote and hide the loader 
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        console.log(apiQuotes[55]);

    } catch (error) {
        // catch error here 
        alert(error)
    }
}

// Tweet a Quote 
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load 
getQuotes();
// loading();
