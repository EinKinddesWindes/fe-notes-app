# Intructions

- Create a few `entries` in `Diary` and a few `notes` in `SchoolNotes`
- In `src/components/Notes/NotesAISummary`:
  - Getting the response from our `proxy` is implemented already for both `streaming` and `json` modes <3
  - Observe how the `fetch` request handles the response for `streaming` vs `json` modes. Depending on how you want to display the response, you might want one or the other:
    - Objects and array of complex structures? ➡️ Wait for the response as normally and provide a loading feedback
    - Text/Markdown? ➡️ Feel free to stream for an immediate feedback!
- In `src/components/Diary/MoodAnalysis`:
  - Send the diary entries as the `user` message
  - Modify the `system prompt` in the request so you can get a mood analysis. As you can see, the modal is divided in two:
    - On the left side, show a summary in text of the mood analysis.
    - On the right side, create a chart or charts representing the mood analysis by date and by feelings (for this you need to request OpenAI to respond in JSON format 😉 )
    - You can get the data for both tasks from a single request or two, your (literal) call
