using System;
using System.Text.Json;

namespace CSharpFunctions
{
    public class JsonHelper
    {
        /// <summary>
        /// Serializes an object to JSON string
        /// </summary>
        public static string Serialize<T>(T obj)
        {
            if (obj == null)
                return "null";
            
            return JsonSerializer.Serialize(obj);
        }
        
        /// <summary>
        /// Deserializes JSON string to object
        /// </summary>
        public static T Deserialize<T>(string json)
        {
            if (string.IsNullOrWhiteSpace(json))
                return default(T);
            
            return JsonSerializer.Deserialize<T>(json);
        }
        
        /// <summary>
        /// Pretty prints JSON string
        /// </summary>
        public static string PrettyPrint(string json)
        {
            var jsonDocument = JsonDocument.Parse(json);
            return JsonSerializer.Serialize(jsonDocument, new JsonSerializerOptions { WriteIndented = true });
        }
    }
}
