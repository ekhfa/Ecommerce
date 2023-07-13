import logo from "./logo.svg";
import "./App.css";

function App() {
return (
	<div className="App">
	<header className="App-header">
		<img src={logo} className="App-logo"
			alt="logo" />
		
<p>A simple React app.....</p>

		<a
		className="App-link"
		href="https://reactjs.org"
		target="_blank"
		rel="noopener noreferrer"
		>
		Learn React
		</a>
		<form action="http://localhost:8080/post" method="post"
			className="form">
		<button type="submit">Connected?</button>
		</form>
    <form action="http://localhost:8080/get/ekhfaInfo" method="get"
			className="form">
		<button type="submit">EkhfaData</button>
		</form>
	</header>
	</div>
);
}

export default App;
