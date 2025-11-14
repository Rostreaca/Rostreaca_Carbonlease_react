import { Route, Routes } from 'react-router-dom';
import { GlobalCommonStyles } from './styles/global.styled';
import './App.css';
import Layout from "./component/Common/Layout/Layout";
import Home from "./component/Common/Home/Home";
import Boards from "./component/Board/Boards/Boards";
import ActivityBoards from "./component/ActivityBoard/ActivityBoards/ActivityBoards";
import Notices from './component/Notice/Notices/Notices';
import Campaigns from './component/Campaign/Campaigns/Campaigns';
import Login from './component/Member/Login/Login';
import EnrollForm from './component/Member/EnrollForm/EnrollForm';

function App() {
	return (
		<>
		<GlobalCommonStyles />
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/boards" element={<Boards />} />
				<Route path="/activityBoards" element={<ActivityBoards />} />
				<Route path="/notices" element={<Notices />} />
				<Route path="/campaigns" element={<Campaigns />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/member/enrollForm" element={<EnrollForm/>} />
			</Routes>
		</Layout>
		</>
	)
}

export default App
