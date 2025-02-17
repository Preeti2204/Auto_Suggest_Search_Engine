class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.frequency = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.frequency++; 
    }

    search(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._findAllWords(node, prefix);
    }

    _findAllWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) {
            results.push({ word: prefix, frequency: node.frequency });
        }
        for (let char in node.children) {
            results = results.concat(this._findAllWords(node.children[char], prefix + char));
        }
        return results;
    }
}

// Examples
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("bat");
trie.insert("ball");
trie.insert("batman");
trie.insert("batting");
trie.insert("banana");


const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");

searchInput.addEventListener("input", function() {
    const query = searchInput.value.trim();
    
    suggestionsList.innerHTML = "";
    
    if (query.length > 0) {
        const suggestions = trie.search(query);


        suggestions.sort((a, b) => b.frequency - a.frequency);

        suggestions.slice(0, 5).forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion.word;
            suggestionsList.appendChild(li);
        });
    }
});


suggestionsList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        searchInput.value = event.target.textContent;
        suggestionsList.innerHTML = ""; 
    }
});
