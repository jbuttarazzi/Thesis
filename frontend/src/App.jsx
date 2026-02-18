import ChatWidget from "ChatWidget";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome International Students</h1>

      <section>
        <h2>Preparation Video Series</h2>
        <p>Videos will appear here.</p>
        {/* Later: embed YouTube / hosted videos */}
      </section>

      <ChatWidget />
    </div>
  );
}

export default App;