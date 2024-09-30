// Wait for DOMContentLoaded to ensure everything has loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if the 'supabase' object is available
  if (typeof supabase !== "undefined") {
    const supabaseUrl = "https://egzhuriimugvkjiauphl.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnemh1cmlpbXVndmtqaWF1cGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNjcsImV4cCI6MjAzOTY0NzM2N30.29e4s0hYCEB3e4m0GDB2WgSpEDbiJSSC4FOg5aU8ZOk";

    // Initialize the Supabase client only when the library is available
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // Now proceed with the rest of your app logic
    async function insertUserName(fullName) {
      try {
        const { error } = await supabaseClient
          .from("Table_1")
          .insert({ firstName: fullName });
        if (error) throw error;
        console.log("User name added to Table_1:", fullName);
      } catch (error) {
        console.error("Error inserting user name:", error);
      }
    }

    document
      .getElementById("signupForm")
      .addEventListener("submit", async function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
          const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) throw error;

          // Insert the user's full name into Table_1 after sign-up
          await insertUserName(fullName);

          alert("Check your email for the verification link");
        } catch (error) {
          alert(error.message);
        }
      });
  } else {
    console.error("Supabase library is not loaded.");
  }
});
