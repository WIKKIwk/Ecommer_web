using System;
using System.Linq;
using System.Reflection;

namespace CSharpFunctions
{
    public class ReflectionUtilities
    {
        /// <summary>
        /// Gets all property names of a type
        /// </summary>
        public static string[] GetPropertyNames(Type type)
        {
            return type.GetProperties()
                .Select(p => p.Name)
                .ToArray();
        }
        
        /// <summary>
        /// Gets property value from object
        /// </summary>
        public static object GetPropertyValue(object obj, string propertyName)
        {
            if (obj == null)
                return null;
            
            PropertyInfo property = obj.GetType().GetProperty(propertyName);
            return property?.GetValue(obj);
        }
        
        /// <summary>
        /// Sets property value on object
        /// </summary>
        public static void SetPropertyValue(object obj, string propertyName, object value)
        {
            if (obj == null)
                return;
            
            PropertyInfo property = obj.GetType().GetProperty(propertyName);
            property?.SetValue(obj, value);
        }
    }
}
