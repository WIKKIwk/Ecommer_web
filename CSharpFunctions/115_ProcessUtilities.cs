using System;
using System.Diagnostics;

namespace CSharpFunctions
{
    public class ProcessUtilities
    {
        /// <summary>
        /// Executes a shell command
        /// </summary>
        public static string ExecuteCommand(string command, string arguments = "")
        {
            ProcessStartInfo psi = new ProcessStartInfo
            {
                FileName = command,
                Arguments = arguments,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            
            using (Process process = Process.Start(psi))
            {
                string output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return output;
            }
        }
        
        /// <summary>
        /// Gets current process ID
        /// </summary>
        public static int GetCurrentProcessId()
        {
            return Process.GetCurrentProcess().Id;
        }
    }
}
