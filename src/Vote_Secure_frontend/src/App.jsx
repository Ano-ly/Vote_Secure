import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import {Dashboard,
        Pollcreation, 
        AddCandidates, 
        Csvupload,
        PollCreated,
        VotingManagement1,
        VotingManagement2,} from './pages/dashboard';
import {
  Home,
  Login,
  Adminsignup,
  Sharedlayout,
  Voterlogin,
  Votingpage,
  VotingResults

} from "./pages";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sharedlayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="adminsignup" element={<Adminsignup />} />
            <Route path="voterlogin" element={<Voterlogin />} />
            <Route path="votingpage" element={<Votingpage />} />
            <Route path="votingresults" element={<VotingResults />} />
            <Route path="votingm1" element={<VotingManagement1 />} />
            <Route path="votingm2" element={<VotingManagement2 />} />
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='pollcreation' element={<Pollcreation/>}/>
            <Route path='addcandidates' element={<AddCandidates/>}/>
            <Route path='csvupload' element={<Csvupload/>}/>
            <Route path='Pollcreated' element={<PollCreated/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
