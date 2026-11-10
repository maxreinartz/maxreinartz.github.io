async function loadRandomQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteCharacter = document.getElementById("quote-character");
    const quoteSeries = document.getElementById("quote-series");
    const quoteSeriesLink = document.getElementById("quote-series-link");

    if (!quoteText || !quoteCharacter || !quoteSeries || !quoteSeriesLink) {
        return;
    }

    const fallbackQuote = {
        quote: "No one can just 'become' someone else. You can't be anybody but yourself. Don't give yourself up to become someone else.",
        character: { romanji: "Koito Yuu" },
        series: { english: "Bloom Into You", url: "https://anilist.co/manga/86218/Bloom-Into-You/" }
    };

    try {
        const response = await fetch("https://api.aniquotes.moe/random?fields=quote,character,series");
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();
        const characterName = data.character?.romanji || "--";
        const seriesName = data.series?.english || "--";

        quoteText.textContent = data.quote || "--";
        quoteCharacter.textContent = characterName;
        quoteSeries.textContent = seriesName;
        quoteSeriesLink.href = data.series?.url || "https://maxreinartz.dev";
    } catch (error) {
        console.error("Could not load AniQuotes API quote:", error);
        quoteText.textContent = fallbackQuote.quote;
        quoteCharacter.textContent = fallbackQuote.character.romanji;
        quoteSeries.textContent = fallbackQuote.series.english;
        quoteSeriesLink.href = fallbackQuote.series.url;
    }
}

document.addEventListener("DOMContentLoaded", loadRandomQuote);