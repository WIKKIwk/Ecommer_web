using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class TrieNode
    {
        public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
        public bool IsEndOfWord = false;
    }
    
    public class TrieHelper
    {
        private TrieNode root = new TrieNode();
        
        /// <summary>
        /// Inserts a word into the trie
        /// </summary>
        public void Insert(string word)
        {
            TrieNode current = root;
            
            foreach (char c in word)
            {
                if (!current.Children.ContainsKey(c))
                    current.Children[c] = new TrieNode();
                
                current = current.Children[c];
            }
            
            current.IsEndOfWord = true;
        }
        
        /// <summary>
        /// Searches for a word in the trie
        /// </summary>
        public bool Search(string word)
        {
            TrieNode node = SearchNode(word);
            return node != null && node.IsEndOfWord;
        }
        
        /// <summary>
        /// Checks if any word starts with the given prefix
        /// </summary>
        public bool StartsWith(string prefix)
        {
            return SearchNode(prefix) != null;
        }
        
        private TrieNode SearchNode(string str)
        {
            TrieNode current = root;
            
            foreach (char c in str)
            {
                if (!current.Children.ContainsKey(c))
                    return null;
                
                current = current.Children[c];
            }
            
            return current;
        }
    }
}
