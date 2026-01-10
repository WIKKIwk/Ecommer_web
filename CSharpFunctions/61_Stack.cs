using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class StackHelper<T>
    {
        private List<T> items = new List<T>();
        
        /// <summary>
        /// Pushes an item onto the stack
        /// </summary>
        public void Push(T item)
        {
            items.Add(item);
        }
        
        /// <summary>
        /// Pops an item from the stack
        /// </summary>
        public T Pop()
        {
            if (items.Count == 0)
                throw new InvalidOperationException("Stack is empty");
            
            T item = items[items.Count - 1];
            items.RemoveAt(items.Count - 1);
            return item;
        }
        
        /// <summary>
        /// Peeks at the top item without removing it
        /// </summary>
        public T Peek()
        {
            if (items.Count == 0)
                throw new InvalidOperationException("Stack is empty");
            
            return items[items.Count - 1];
        }
        
        /// <summary>
        /// Gets the count of items
        /// </summary>
        public int Count => items.Count;
    }
}
