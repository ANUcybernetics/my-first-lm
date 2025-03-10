import csv
import os
import re
import sys
from collections import defaultdict


def read_file(filename):
    """Read the content of a file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

def tokenize(text):
    """Split text into words, removing all non-alphanumeric characters and tokens that contain only numbers."""
    words = re.findall(r'\w+', text.lower())
    return [word for word in words if not word.isdigit()]

def create_bigram_model(words):
    """Create a dictionary of bigram counts."""
    bigram_counts = defaultdict(int)

    for i in range(len(words) - 1):
        current_word = words[i]
        next_word = words[i + 1]
        bigram_counts[(current_word, next_word)] += 1

    return bigram_counts

def write_bigram_csv(bigram_counts, filename):
    """Write bigram counts to a CSV file with five columns: current_word, next_word,
    current_word_index, next_word_index, and count."""
    # Get all unique words from the bigrams and sort them alphabetically
    vocab = sorted(set(word for bigram in bigram_counts.keys() for word in bigram))

    # Create a mapping from word to index
    word_to_index = {word: idx for idx, word in enumerate(vocab)}

    # Create CSV output filename by replacing the extension
    csv_filename = os.path.splitext(filename)[0] + '.csv'

    with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)

        # Write the header row
        writer.writerow(['current_word', 'next_word', 'current_word_index', 'next_word_index', 'count'])

        # Write each bigram with its count
        for (current_word, next_word), count in bigram_counts.items():
            current_word_index = word_to_index[current_word]
            next_word_index = word_to_index[next_word]
            writer.writerow([current_word, next_word, current_word_index, next_word_index, count])

    return csv_filename

def main():
    if len(sys.argv) != 2:
        print("Usage: uv run create_unigram_model.py <filename>")
        sys.exit(1)

    filename = sys.argv[1]
    text = read_file(filename)
    words = tokenize(text)

    if not words:
        print("No words found in the file.")
        sys.exit(1)

    bigram_counts = create_bigram_model(words)

    # Print bigram counts
    print("Bigram counts:")
    for bigram, count in sorted(bigram_counts.items(), key=lambda x: x[1]):
        print(f"({bigram[0]}, {bigram[1]}): {count}")

    # Calculate and print the vocabulary size
    vocab = set(word for bigram in bigram_counts.keys() for word in bigram)
    print(f"\nVocabulary size: {len(vocab)}")
    print(f"Total unique bigrams: {len(bigram_counts)}")

    # Write bigram counts to CSV
    csv_filename = write_bigram_csv(bigram_counts, filename)
    print(f"\nBigram counts written to {csv_filename}")

if __name__ == "__main__":
    main()
